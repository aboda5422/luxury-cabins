import { JWT } from "google-auth-library";
import { SITE_ORIGIN } from "@/lib/seo/urls";
import type { GoogleIndexResponse, GoogleIndexResult } from "./types";

const SITEMAP_URL = `${SITE_ORIGIN}/sitemap.xml`;
const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const MAX_URLS_PER_REQUEST = 100;

type ServiceAccount = {
  client_email: string;
  private_key: string;
};

function loadServiceAccount(): ServiceAccount {
  const raw = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON?.trim();
  if (!raw) {
    throw new Error("Missing GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON");
  }
  const parsed = JSON.parse(raw) as ServiceAccount;
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("Invalid service account JSON");
  }
  return parsed;
}

function normalizeUrl(input: string): string | null {
  try {
    const url = new URL(input.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    const siteHost = new URL(SITE_ORIGIN).hostname;
    const allowedHosts = new Set([siteHost, `www.${siteHost}`]);
    if (!allowedHosts.has(url.hostname)) return null;
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

async function getAccessToken(sa: ServiceAccount): Promise<string> {
  const client = new JWT({
    email: sa.client_email,
    key: sa.private_key,
    scopes: [INDEXING_SCOPE],
  });
  const tokens = await client.authorize();
  if (!tokens.access_token) {
    throw new Error("Failed to obtain Google access token");
  }
  return tokens.access_token;
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
    urls = [...new Set(
      input.urls.map((u) => normalizeUrl(u)).filter((u): u is string => !!u),
    )];
    if (!urls.length) {
      throw new Error(`No valid URLs for ${SITE_ORIGIN}`);
    }
  } else {
    throw new Error("Provide url, urls, or mode=sitemap");
  }

  if (urls.length > MAX_URLS_PER_REQUEST) {
    throw new Error(`Too many URLs (max ${MAX_URLS_PER_REQUEST} per request)`);
  }

  const sa = loadServiceAccount();
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
