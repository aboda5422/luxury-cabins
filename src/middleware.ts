import { NextRequest, NextResponse } from "next/server";

const SITE_HOST = "luxurycabins.com.sa";
const SITE_ORIGIN = `https://${SITE_HOST}`;

/** Legacy product paths → final SEO slugs (single hop, no trailing-slash chain). */
const LEGACY_PATHS: Record<string, string> = {
  "/manufacturing/rooms": "/manufacturing/ready-rooms",
  "/manufacturing/houses": "/manufacturing/ready-houses",
  "/manufacturing/offices": "/manufacturing/portable-offices",
  "/manufacturing/portable-cabins": "/manufacturing",
  "/manufacturing/guard-rooms": "/manufacturing",
};

function firstHeader(value: string | null): string {
  return (value || "").split(",")[0]?.trim().toLowerCase() || "";
}

function clientScheme(request: NextRequest): string {
  const cfVisitor = request.headers.get("cf-visitor");
  if (cfVisitor) {
    try {
      const parsed = JSON.parse(cfVisitor) as { scheme?: string };
      if (parsed.scheme) return parsed.scheme.toLowerCase();
    } catch {
      /* ignore */
    }
  }
  const proto = firstHeader(request.headers.get("x-forwarded-proto"));
  if (proto) return proto;
  return request.nextUrl.protocol.replace(":", "");
}

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.replace(/\/+$/, "") || "/";
  }
  return pathname;
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = firstHeader(request.headers.get("host")).replace(/:\d+$/, "");
  const scheme = clientScheme(request);

  const isLocal =
    host.includes("localhost") ||
    host.startsWith("127.") ||
    host.endsWith(".local");

  const originalPath = url.pathname;
  let pathname = normalizePathname(originalPath);
  if (LEGACY_PATHS[pathname]) {
    pathname = LEGACY_PATHS[pathname];
  }

  const needsHttps = !isLocal && scheme === "http";
  const needsApex = host === `www.${SITE_HOST}`;
  const needsPath = pathname !== originalPath;

  if (!needsHttps && !needsApex && !needsPath) {
    const res = NextResponse.next();
    res.headers.set("x-lc-mw", "1");
    res.headers.set("x-lc-scheme", scheme);
    res.headers.set("x-lc-host", host || "-");
    return res;
  }

  if (isLocal) {
    const target = url.clone();
    target.pathname = pathname;
    return NextResponse.redirect(target, 301);
  }

  // Absolute https Location (apex host) — preferred by Google & OpenNext-safe
  const target = new URL(`${pathname}${url.search}`, SITE_ORIGIN);
  const redirect = NextResponse.redirect(target.toString(), 301);
  redirect.headers.set("x-lc-mw", "redirect");
  redirect.headers.set("x-lc-scheme", scheme);
  return redirect;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|map|woff2?|ttf|txt|xml)$).*)",
  ],
};
