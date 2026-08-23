import { getCloudflareContext } from "@opennextjs/cloudflare";
import { SITE_ORIGIN } from "@/lib/seo/urls";
import type { GoogleIndexResponse, GoogleIndexResult } from "./types";

const SITEMAP_URL = `${SITE_ORIGIN}/sitemap.xml`;
const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const MAX_URLS_PER_REQUEST = 100;

type ServiceAccount = {
  client_email: string;
  private_key: string;
};

async function readServiceAccountJson(): Promise<string | undefined> {
  const fromProcess = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON?.trim();
  if (fromProcess) return fromProcess;

  try {
    const { env } = await getCloudflareContext({ async: true });
    const fromCf = (env as Record<string, unknown>)
      ?.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON;
    if (typeof fromCf === "string" && fromCf.trim()) return fromCf.trim();
  } catch {
    // Local Next.js / non-Cloudflare runtime
  }
  return undefined;
}

async function loadServiceAccount(): Promise<ServiceAccount> {
  const raw = await readServiceAccountJson();
  if (!raw) {
    throw new Error("Missing GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON");
  }
  let parsed: ServiceAccount;
  try {
    parsed = JSON.parse(raw) as ServiceAccount;
  } catch {
    throw new Error("Invalid GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON (not valid JSON)");
  }
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("Invalid service account JSON (missing client_email/private_key)");
  }
  // Cloudflare/secret paste sometimes stores literal "\\n" instead of newlines
  if (parsed.private_key.includes("\\n") && !parsed.private_key.includes("\n")) {
    parsed = {
      ...parsed,
      private_key: parsed.private_key.replace(/\\n/g, "\n"),
    };
  }
  return parsed;
}

function normalizeUrl(input: string): string | null {
  let value = (input || "").trim();
  // Common paste mistakes from admin UI
  value = value.replace(/^\/+/, "");
  if (!/^https?:\/\//i.test(value)) {
    value = value.startsWith("luxurycabins.com.sa")
      ? `https://${value}`
      : value.startsWith("/")
        ? `${SITE_ORIGIN}${value}`
        : value;
  }
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    const siteHost = new URL(SITE_ORIGIN).hostname;
    const allowed = new Set([siteHost, `www.${siteHost}`]);
    if (!allowed.has(url.hostname)) return null;
    url.protocol = "https:";
    url.hostname = siteHost;
    url.hash = "";
    const normalized = url.toString().replace(/\/$/, "");
    return normalized || SITE_ORIGIN;
  } catch {
    return null;
  }
}

function parseSitemapLocs(xml: string): string[] {
  const matches = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)];
  const urls = matches
    .map((m) => normalizeUrl(m[1]))
    .filter((u): u is string => !!u);
  return [...new Set(urls)];
}

function base64UrlEncode(data: ArrayBuffer | Uint8Array | string): string {
  const bytes =
    typeof data === "string"
      ? new TextEncoder().encode(data)
      : data instanceof Uint8Array
        ? data
        : new Uint8Array(data);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN [^-]+-----/g, "")
    .replace(/-----END [^-]+-----/g, "")
    .replace(/\s+/g, "");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

/** Workers-safe Google OAuth (no google-auth-library / Node crypto). */
async function getAccessToken(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64UrlEncode(
    JSON.stringify({
      iss: sa.client_email,
      sub: sa.client_email,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
      scope: INDEXING_SCOPE,
    }),
  );
  const unsigned = `${header}.${claim}`;

  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(sa.private_key),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsigned),
  );
  const jwt = `${unsigned}.${base64UrlEncode(signature)}`;

  const tokenRes = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const tokenJson = (await tokenRes.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };
  if (!tokenRes.ok || !tokenJson.access_token) {
    throw new Error(
      tokenJson.error_description ||
        tokenJson.error ||
        `Failed to obtain Google access token (${tokenRes.status})`,
    );
  }
  return tokenJson.access_token;
}

async function publishUrl(accessToken: string, url: string): Promise<GoogleIndexResult> {
  const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, type: "URL_UPDATED" }),
  });

  const text = await res.text();
  let message = text;
  try {
    const json = JSON.parse(text) as { error?: { message?: string } };
    message = json.error?.message || text;
  } catch {
    // keep raw text
  }

  return {
    url,
    ok: res.ok,
    status: res.status,
    message: res.ok ? "تم الإرسال" : message,
  };
}

export async function runGoogleIndexing(input: {
  url?: string;
  urls?: string[];
  mode?: "url" | "sitemap";
}): Promise<GoogleIndexResponse> {
  let urls: string[] = [];

  if (input.mode === "sitemap") {
    const res = await fetch(SITEMAP_URL, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to fetch sitemap (${res.status})`);
    }
    urls = parseSitemapLocs(await res.text());
  } else if (input.url) {
    const normalized = normalizeUrl(input.url);
    if (!normalized) {
      throw new Error(`URL must belong to ${SITE_ORIGIN}`);
    }
    urls = [normalized];
  } else if (Array.isArray(input.urls) && input.urls.length) {
    urls = [
      ...new Set(input.urls.map((u) => normalizeUrl(u)).filter((u): u is string => !!u)),
    ];
    if (!urls.length) {
      throw new Error(`No valid URLs for ${SITE_ORIGIN}`);
    }
  } else {
    throw new Error("Provide url, urls, or mode=sitemap");
  }

  if (urls.length > MAX_URLS_PER_REQUEST) {
    throw new Error(`Too many URLs (max ${MAX_URLS_PER_REQUEST} per request)`);
  }

  const sa = await loadServiceAccount();
  const accessToken = await getAccessToken(sa);
  const results: GoogleIndexResult[] = [];

  for (const url of urls) {
    results.push(await publishUrl(accessToken, url));
    if (urls.length > 1) {
      await new Promise((r) => setTimeout(r, 120));
    }
  }

  const succeeded = results.filter((r) => r.ok).length;
  return {
    ok: succeeded === results.length,
    submitted: results.length,
    succeeded,
    failed: results.length - succeeded,
    results,
  };
}
