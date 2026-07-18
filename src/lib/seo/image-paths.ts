import pathMap from "./image-path-map.json";

const upgrades = pathMap as Record<string, string>;

/** Rewrite legacy image URLs to SEO-friendly WebP paths. */
export function upgradeImagePath(input: string | undefined, fallback = ""): string {
  const value = (input || "").trim() || fallback;
  return upgrades[value] || value;
}

export function upgradeImageList(images: string[] | undefined): string[] {
  if (!Array.isArray(images)) return [];
  return images.map((img) => upgradeImagePath(img)).filter(Boolean);
}
