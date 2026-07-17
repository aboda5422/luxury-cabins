import type { RentalCategory } from "@/lib/cms/types";

export function rentalSlug(category: Pick<RentalCategory, "id" | "slug">): string {
  return (category.slug || category.id || "").trim();
}

export function rentalPath(category: Pick<RentalCategory, "id" | "slug">): string {
  return `/rental/${rentalSlug(category)}`;
}

export function rentalSeoTitle(category: RentalCategory): string {
  return (category.seoTitle || category.h1 || category.title || "").trim();
}

export function rentalSeoDescription(category: RentalCategory): string {
  return (
    category.seoDescription || category.shortDescription || category.description || ""
  ).trim();
}

export function rentalH1(category: RentalCategory): string {
  return (category.h1 || category.seoTitle || category.title || "").trim();
}

export function getRentalBySlug(
  categories: RentalCategory[],
  slug: string,
): RentalCategory | undefined {
  const key = decodeURIComponent(slug).trim();
  return categories.find((c) => rentalSlug(c) === key || c.id === key);
}

export function normalizeRentalCategories(categories: RentalCategory[]): RentalCategory[] {
  return categories.map((c, index) => {
    const id = String(c.id || `rental-${index + 1}`).trim();
    const title = String(c.title || "").trim();
    const slug =
      String(c.slug || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "") || id;
    return {
      ...c,
      id,
      title,
      shortDescription: String(c.shortDescription || ""),
      description: String(c.description || ""),
      specs: Array.isArray(c.specs) ? c.specs.map(String) : [],
      images: Array.isArray(c.images) ? c.images.map(String).filter(Boolean) : [],
      whatsappMessage: String(c.whatsappMessage || ""),
      slug,
      seoTitle: String(c.seoTitle || "").trim(),
      seoDescription: String(c.seoDescription || "").trim(),
      h1: String(c.h1 || "").trim(),
      seoKeywords: Array.isArray(c.seoKeywords)
        ? c.seoKeywords.map(String).filter(Boolean)
        : [],
    };
  });
}
