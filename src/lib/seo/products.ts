import type { CatalogProduct } from "@/lib/cms/types";

/** Legacy id-based paths → SEO-friendly slugs */
export const PRODUCT_SLUG_ALIASES: Record<string, string> = {
  houses: "ready-houses",
  rooms: "ready-rooms",
  offices: "portable-offices",
};

export function slugifyProduct(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function canonicalProductSlug(slugOrId: string): string {
  const key = slugOrId.trim();
  return PRODUCT_SLUG_ALIASES[key] || key;
}

/**
 * Prefer an explicit SEO slug from defaults when the stored value is empty
 * or still equals the internal id (legacy CMS rows).
 */
export function resolveProductSlug(
  product: Pick<CatalogProduct, "id" | "slug">,
  preferredSlug?: string,
): string {
  const id = String(product.id || "").trim();
  const stored = String(product.slug || "").trim();
  const preferred = String(preferredSlug || "").trim();

  if (preferred) {
    if (!stored || stored === id || PRODUCT_SLUG_ALIASES[stored] === preferred) {
      return preferred;
    }
  }

  if (stored) return canonicalProductSlug(stored);
  if (id) return canonicalProductSlug(id);
  return "";
}

export function productSlug(product: Pick<CatalogProduct, "id" | "slug">): string {
  return resolveProductSlug(product);
}

export function productPath(product: Pick<CatalogProduct, "id" | "slug">): string {
  return `/manufacturing/${productSlug(product)}`;
}

export function productSeoTitle(product: CatalogProduct): string {
  return (product.seoTitle || product.h1 || product.title || "").trim();
}

export function productSeoDescription(product: CatalogProduct): string {
  return (product.seoDescription || product.shortDescription || product.description || "").trim();
}

export function productH1(product: CatalogProduct): string {
  return (product.h1 || product.seoTitle || product.title || "").trim();
}

export function getProductBySlug(
  products: CatalogProduct[],
  slug: string,
): CatalogProduct | undefined {
  const key = decodeURIComponent(slug).trim();
  const canonical = canonicalProductSlug(key);
  return products.find((p) => {
    const s = productSlug(p);
    return s === key || s === canonical || p.id === key || canonicalProductSlug(p.id) === canonical;
  });
}

/** Normalize CMS products so slug/SEO fields always exist (scalable for new products). */
export function normalizeCatalogProducts(products: CatalogProduct[]): CatalogProduct[] {
  return products.map((p, index) => {
    const id = String(p.id || `product-${index + 1}`).trim();
    const title = String(p.title || "").trim();
    const slug =
      resolveProductSlug({ id, slug: p.slug }) ||
      slugifyProduct(id) ||
      `product-${index + 1}`;
    return {
      ...p,
      id,
      title,
      shortDescription: String(p.shortDescription || ""),
      description: String(p.description || ""),
      priceLabel: String(p.priceLabel || ""),
      priceNote: String(p.priceNote || ""),
      specs: Array.isArray(p.specs) ? p.specs.map(String) : [],
      images: Array.isArray(p.images) ? p.images.map(String).filter(Boolean) : [],
      slug,
      seoTitle: String(p.seoTitle || "").trim(),
      seoDescription: String(p.seoDescription || "").trim(),
      h1: String(p.h1 || "").trim(),
      seoKeywords: Array.isArray(p.seoKeywords)
        ? p.seoKeywords.map(String).filter(Boolean)
        : [],
    };
  });
}
