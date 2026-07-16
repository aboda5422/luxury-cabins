import type { CmsData } from "@/lib/cms/types";
import type { Locale } from "./config";
import { enCmsOverlay } from "./en-cms";

function mergeById<T extends { id?: string }>(base: T[], overlay?: Array<Partial<T>>): T[] {
  if (!overlay?.length) return base;
  return base.map((item) => {
    const match =
      item.id != null
        ? overlay.find((o) => o.id === item.id)
        : undefined;
    return match ? { ...item, ...match } : item;
  });
}

function mergeByIndex<T>(base: T[], overlay?: Array<Partial<T>>): T[] {
  if (!overlay?.length) return base;
  return base.map((item, i) => (overlay[i] ? { ...item, ...overlay[i] } : item));
}

/** Apply English overlay for public display. Admin must keep using raw CMS. */
export function localizeCms(cms: CmsData, locale: Locale): CmsData {
  if (locale !== "en") return cms;
  const o = enCmsOverlay;

  return {
    ...cms,
    site: {
      ...cms.site,
      ...(o.site || {}),
      cities: cms.site.cities.map((city) => ({ ...city })),
      social: cms.site.social,
    },
    navLinks: o.navLinks?.length
      ? o.navLinks.map((l, i) => ({
          href: l.href || cms.navLinks[i]?.href || "/",
          label: l.label || cms.navLinks[i]?.label || "",
        }))
      : cms.navLinks,
    home: { ...cms.home, ...(o.home || {}) },
    pageHeroImages: {
      ...cms.pageHeroImages,
      ...(o.pageHeroImages || {}),
    },
    services: mergeById(cms.services, o.services),
    processSteps: mergeByIndex(cms.processSteps, o.processSteps),
    catalogProducts: mergeById(cms.catalogProducts, o.catalogProducts).map((p) => ({
      ...p,
      specs: [...p.specs],
      images: [...p.images],
    })),
    rentalCategories: mergeById(cms.rentalCategories, o.rentalCategories).map((c) => ({
      ...c,
      specs: [...c.specs],
      images: [...c.images],
    })),
    manufacturingExtras: o.manufacturingExtras?.length
      ? [...o.manufacturingExtras]
      : cms.manufacturingExtras,
    projects: mergeByIndex(cms.projects, o.projects),
    sampleClients: mergeByIndex(cms.sampleClients, o.sampleClients).map((c, i) => ({
      ...c,
      name: o.sampleClients?.[i]?.name || c.nameEn || c.name,
      nameEn: c.nameEn,
    })),
    faqs: mergeByIndex(cms.faqs, o.faqs),
    aboutStats: mergeByIndex(cms.aboutStats, o.aboutStats),
    about: {
      ...cms.about,
      ...(o.about || {}),
      values: o.about?.values?.length ? [...o.about.values] : cms.about.values,
    },
    rentalPage: {
      ...cms.rentalPage,
      ...(o.rentalPage || {}),
      bullets: o.rentalPage?.bullets?.length
        ? [...o.rentalPage.bullets]
        : cms.rentalPage.bullets,
    },
    manufacturingPage: {
      ...cms.manufacturingPage,
      ...(o.manufacturingPage || {}),
      highlights: o.manufacturingPage?.highlights?.length
        ? [...o.manufacturingPage.highlights]
        : cms.manufacturingPage.highlights,
    },
    footer: {
      ...cms.footer,
      ...(o.footer || {}),
      serviceLinks: o.footer?.serviceLinks?.length
        ? o.footer.serviceLinks.map((l, i) => ({
            href: l.href || cms.footer.serviceLinks[i]?.href || "/",
            label: l.label || cms.footer.serviceLinks[i]?.label || "",
          }))
        : cms.footer.serviceLinks,
      companyLinks: o.footer?.companyLinks?.length
        ? o.footer.companyLinks.map((l, i) => ({
            href: l.href || cms.footer.companyLinks[i]?.href || "/",
            label: l.label || cms.footer.companyLinks[i]?.label || "",
          }))
        : cms.footer.companyLinks,
    },
  };
}
