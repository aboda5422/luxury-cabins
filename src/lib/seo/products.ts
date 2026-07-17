import type { CatalogProduct } from "@/lib/cms/types";

export function slugifyProduct(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function productSlug(product: Pick<CatalogProduct, "id" | "slug">): string {
  return (product.slug || product.id || "").trim();
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
  return products.find((p) => productSlug(p) === key || p.id === key);
}

/** Normalize CMS products so slug/SEO fields always exist (scalable for new products). */
export function normalizeCatalogProducts(products: CatalogProduct[]): CatalogProduct[] {
  return products.map((p, index) => {
    const id = String(p.id || `product-${index + 1}`).trim();
    const title = String(p.title || "").trim();
    const slug =
      slugifyProduct(String(p.slug || "")) ||
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
