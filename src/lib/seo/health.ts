import type { CmsData } from "@/lib/cms/types";
import { productPath, productSlug } from "@/lib/seo/products";
import { cityPath } from "@/lib/seo/cities";

export type SeoHealthIssue = {
  severity: "error" | "warn" | "info";
  scope: string;
  message: string;
  href?: string;
};

export type SeoHealthReport = {
  generatedAt: string;
  counts: {
    staticPages: number;
    cities: number;
    products: number;
    faqs: number;
    estimatedSitemapUrls: number;
  };
  issues: SeoHealthIssue[];
};

const STATIC_PATHS = [
  "/",
  "/about",
  "/services",
  "/rental",
  "/manufacturing",
  "/projects",
  "/locations",
  "/faq",
  "/contact",
];

export function buildSeoHealthReport(cms: CmsData): SeoHealthReport {
  const issues: SeoHealthIssue[] = [];

  for (const product of cms.catalogProducts) {
    const slug = productSlug(product);
    const path = productPath(product);
    if (!slug || /^product-/i.test(slug) || slug.includes(" ")) {
      issues.push({
        severity: "error",
        scope: "product",
        message: `منتج بلا slug صالح: ${product.title || product.id}`,
        href: path,
      });
    }
    if (!product.seoTitle && !product.h1) {
      issues.push({
        severity: "warn",
        scope: "product",
        message: `منتج بلا seoTitle/H1: ${product.title || product.id}`,
        href: path,
      });
    }
    if (!product.seoDescription && !product.shortDescription) {
      issues.push({
        severity: "warn",
        scope: "product",
        message: `منتج بلا وصف SEO: ${product.title || product.id}`,
        href: path,
      });
    }
    if (!product.images?.length) {
      issues.push({
        severity: "warn",
        scope: "product",
        message: `منتج بلا صور: ${product.title || product.id}`,
        href: path,
      });
    }
  }

  for (const city of cms.site.cities) {
    if (!city.slug || /^city-[a-z0-9]+$/i.test(city.slug)) {
      issues.push({
        severity: "error",
        scope: "city",
        message: `مدينة بـ slug غير صديق لمحركات البحث: ${city.nameAr || city.nameEn}`,
        href: city.slug ? cityPath(city.slug) : undefined,
      });
    }
    if (!city.nameEn || /[\u0600-\u06FF]/.test(city.nameEn)) {
      issues.push({
        severity: "warn",
        scope: "city",
        message: `يُفضّل اسم إنجليزي واضح للمدينة: ${city.nameAr}`,
        href: cityPath(city.slug),
      });
    }
  }

  if (!cms.site.description?.trim()) {
    issues.push({
      severity: "error",
      scope: "site",
      message: "وصف الموقع (meta description العام) فارغ",
    });
  }

  if (!cms.faqs?.length) {
    issues.push({
      severity: "info",
      scope: "faq",
      message: "لا توجد أسئلة شائعة — صفحة FAQ ستكون ضعيفة لـ schema",
      href: "/faq",
    });
  }

  const knownBroken = [
    "/manufacturing/Readycommercial%20units",
    "/manufacturing/Readycommercial units",
  ];
  for (const href of knownBroken) {
    issues.push({
      severity: "info",
      scope: "redirect",
      message: `رابط معروف يحتاج 301 (مضبوط في next.config): ${href}`,
      href,
    });
  }

  return {
    generatedAt: new Date().toISOString(),
    counts: {
      staticPages: STATIC_PATHS.length,
      cities: cms.site.cities.length,
      products: cms.catalogProducts.length,
      faqs: cms.faqs.length,
      estimatedSitemapUrls:
        STATIC_PATHS.length + cms.site.cities.length + cms.catalogProducts.length,
    },
    issues,
  };
}
