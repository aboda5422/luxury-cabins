import { PRODUCT_SLUG_ALIASES } from "@/lib/seo/products";

export const SITE_HOST = "luxurycabins.com.sa";
export const SITE_ORIGIN = `https://${SITE_HOST}`;

/** Internal path aliases that must never be linked or listed in the sitemap. */
export const LEGACY_INTERNAL_REDIRECTS: Record<string, string> = {
  "/manufacturing/rooms": "/manufacturing/ready-rooms",
  "/manufacturing/houses": "/manufacturing/ready-houses",
  "/manufacturing/offices": "/manufacturing/portable-offices",
  "/manufacturing/portable-cabins": "/manufacturing",
  "/manufacturing/guard-rooms": "/manufacturing",
};

export function stripTrailingSlash(pathname: string): string {
  if (!pathname) return "/";
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.replace(/\/+$/, "") || "/";
  }
  return pathname;
}

/** Normalize CMS/nav hrefs to the final on-site path (relative, no trailing slash). */
export function normalizeInternalHref(href: string): string {
  const raw = (href || "").trim();
  if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:")) {
    return raw;
  }
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    try {
      const u = new URL(raw);
      if (u.hostname === SITE_HOST || u.hostname === `www.${SITE_HOST}`) {
        return normalizeInternalHref(`${u.pathname}${u.search}${u.hash}`);
      }
      // Force https for same-site accidental http absolute links already handled above
      if (u.protocol === "http:") {
        u.protocol = "https:";
        return u.toString();
      }
      return raw;
    } catch {
      return raw;
    }
  }

  const path = raw.startsWith("/") ? raw : `/${raw}`;
  const qIndex = path.indexOf("?");
  const hIndex = path.indexOf("#");
  let pathname = path;
  let rest = "";
  if (qIndex >= 0 || hIndex >= 0) {
    const cut = Math.min(
      qIndex >= 0 ? qIndex : Infinity,
      hIndex >= 0 ? hIndex : Infinity,
    );
    pathname = path.slice(0, cut);
    rest = path.slice(cut);
  }

  pathname = stripTrailingSlash(pathname);
  pathname = LEGACY_INTERNAL_REDIRECTS[pathname] || pathname;

  // /manufacturing/{legacyId}
  const m = pathname.match(/^\/manufacturing\/([^/]+)$/);
  if (m) {
    const alias = PRODUCT_SLUG_ALIASES[m[1]];
    if (alias) pathname = `/manufacturing/${alias}`;
  }

  return `${pathname}${rest}`;
}

export function absoluteUrl(pathOrUrl: string): string {
  const value = (pathOrUrl || "").trim() || "/";
  if (value.startsWith("https://")) return value;
  if (value.startsWith("http://")) {
    return value.replace(/^http:\/\//i, "https://");
  }
  const path = normalizeInternalHref(value.startsWith("/") ? value : `/${value}`);
  return `${SITE_ORIGIN}${path === "/" ? "" : path}`;
}

export function isLegacySitemapPath(pathname: string): boolean {
  const p = stripTrailingSlash(pathname);
  if (LEGACY_INTERNAL_REDIRECTS[p]) return true;
  const m = p.match(/^\/manufacturing\/([^/]+)$/);
  return Boolean(m && PRODUCT_SLUG_ALIASES[m[1]]);
}
