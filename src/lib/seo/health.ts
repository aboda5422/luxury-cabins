import type { CmsData } from "@/lib/cms/types";
import { productSlug } from "@/lib/seo/products";

/** Admin sidebar tab ids that can fix the issue */
export type SeoAdminTab =
  | "company"
  | "catalog"
  | "faqs"
  | "home"
  | "manufacturing"
  | "seo";

export type SeoHealthIssue = {
  severity: "error" | "warn" | "info";
  scope: string;
  message: string;
  /** Where to fix this inside the admin panel */
  adminTab?: SeoAdminTab;
  actionLabel?: string;
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
    const label = product.title || product.id;
    if (!slug || /^product-/i.test(slug) || slug.includes(" ")) {
      issues.push({
        severity: "error",
        scope: "product",
        message: `منتج بلا slug صالح: ${label}`,
        adminTab: "catalog",
        actionLabel: "فتح منتجات المتجر",
      });
    }
    if (!product.seoTitle && !product.h1) {
      issues.push({
        severity: "warn",
        scope: "product",
        message: `منتج بلا seoTitle/H1: ${label}`,
        adminTab: "catalog",
        actionLabel: "فتح منتجات المتجر",
      });
    }
    if (!product.seoDescription && !product.shortDescription) {
      issues.push({
        severity: "warn",
        scope: "product",
        message: `منتج بلا وصف SEO: ${label}`,
        adminTab: "catalog",
        actionLabel: "فتح منتجات المتجر",
      });
    }
    if (!product.images?.length) {
      issues.push({
        severity: "warn",
        scope: "product",
        message: `منتج بلا صور: ${label}`,
        adminTab: "catalog",
        actionLabel: "فتح منتجات المتجر",
      });
    }
  }

  for (const city of cms.site.cities) {
    const label = city.nameAr || city.nameEn || city.slug;
    if (!city.slug || /^city-[a-z0-9]+$/i.test(city.slug)) {
      issues.push({
        severity: "error",
        scope: "city",
        message: `مدينة بـ slug غير صديق لمحركات البحث: ${label}`,
        adminTab: "company",
        actionLabel: "فتح بيانات الشركة / المدن",
      });
    }
    if (!city.nameEn || /[\u0600-\u06FF]/.test(city.nameEn)) {
      issues.push({
        severity: "warn",
        scope: "city",
        message: `يُفضّل اسم إنجليزي واضح للمدينة: ${city.nameAr}`,
        adminTab: "company",
        actionLabel: "فتح بيانات الشركة / المدن",
      });
    }
  }

  if (!cms.site.description?.trim()) {
    issues.push({
      severity: "error",
      scope: "site",
      message: "وصف الموقع (meta description العام) فارغ",
      adminTab: "company",
      actionLabel: "فتح بيانات الشركة",
    });
  }

  if (!cms.faqs?.length) {
    issues.push({
      severity: "info",
      scope: "faq",
      message: "لا توجد أسئلة شائعة — صفحة FAQ ستكون ضعيفة لـ schema",
      adminTab: "faqs",
      actionLabel: "فتح الأسئلة الشائعة",
    });
  }

  const knownBroken = [
    "/manufacturing/Readycommercial%20units",
    "/manufacturing/Readycommercial units",
  ];
  for (const path of knownBroken) {
    issues.push({
      severity: "info",
      scope: "redirect",
      message: `رابط قديم تم تحويله بـ 301 في الإعدادات: ${path}`,
      adminTab: "seo",
      actionLabel: "تم المعالجة تلقائياً",
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
