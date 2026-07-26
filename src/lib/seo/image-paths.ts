import pathMap from "./image-path-map.json";

const upgrades = pathMap as Record<string, string>;

function normalizeKey(input: string): string {
  const trimmed = input.trim();
  try {
    // Decode once so map keys match both encoded and raw CMS URLs
    return decodeURIComponent(trimmed);
  } catch {
    return trimmed;
  }
}

/** Rewrite legacy / oversized CMS image URLs to SEO-friendly local WebP paths. */
export function upgradeImagePath(input: string | undefined, fallback = ""): string {
  const value = normalizeKey((input || "").trim() || fallback);
  if (!value) return fallback;
  return upgrades[value] || upgrades[normalizeKey(value)] || value;
}

export function upgradeImageList(images: string[] | undefined): string[] {
  if (!Array.isArray(images)) return [];
  return images.map((img) => upgradeImagePath(img)).filter(Boolean);
}
