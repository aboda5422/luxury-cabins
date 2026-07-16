import type { ServiceCity } from "@/lib/cms/types";

export type SeoCity = ServiceCity;

/** المدن الافتراضية للظهور المحلي — يمكن تعديلها من لوحة التحكم */
export const SEO_CITIES: SeoCity[] = [
  { slug: "riyadh", nameAr: "الرياض", nameEn: "Riyadh", regionAr: "منطقة الرياض", regionEn: "Riyadh Region", priority: "primary" },
  { slug: "jeddah", nameAr: "جدة", nameEn: "Jeddah", regionAr: "منطقة مكة المكرمة", regionEn: "Makkah Region", priority: "primary" },
  { slug: "makkah", nameAr: "مكة المكرمة", nameEn: "Makkah", regionAr: "منطقة مكة المكرمة", regionEn: "Makkah Region", priority: "primary" },
  { slug: "madinah", nameAr: "المدينة المنورة", nameEn: "Madinah", regionAr: "منطقة المدينة المنورة", regionEn: "Madinah Region", priority: "primary" },
  { slug: "dammam", nameAr: "الدمام", nameEn: "Dammam", regionAr: "المنطقة الشرقية", regionEn: "Eastern Province", priority: "primary" },
  { slug: "khobar", nameAr: "الخبر", nameEn: "Khobar", regionAr: "المنطقة الشرقية", regionEn: "Eastern Province", priority: "primary" },
  { slug: "jubail", nameAr: "الجبيل", nameEn: "Jubail", regionAr: "المنطقة الشرقية", regionEn: "Eastern Province", priority: "primary" },
  { slug: "tabuk", nameAr: "تبوك", nameEn: "Tabuk", regionAr: "منطقة تبوك", regionEn: "Tabuk Region", priority: "secondary" },
  { slug: "abha", nameAr: "أبها", nameEn: "Abha", regionAr: "منطقة عسير", regionEn: "Asir Region", priority: "secondary" },
  { slug: "qassim", nameAr: "القصيم", nameEn: "Qassim", regionAr: "منطقة القصيم", regionEn: "Qassim Region", priority: "secondary" },
  { slug: "hail", nameAr: "حائل", nameEn: "Hail", regionAr: "منطقة حائل", regionEn: "Hail Region", priority: "secondary" },
];

export function slugifyCity(input: string): string {
  const ascii = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  if (ascii) return ascii;
  return `city-${Date.now().toString(36)}`;
}

export function normalizeCities(input: unknown, fallback: SeoCity[] = SEO_CITIES): SeoCity[] {
  if (!Array.isArray(input) || input.length === 0) return fallback.map((c) => ({ ...c }));

  return input.map((raw, index) => {
    if (typeof raw === "string") {
      const known = fallback.find((c) => c.nameAr === raw || c.nameEn === raw);
      if (known) return { ...known };
      return {
        slug: slugifyCity(raw) || `city-${index + 1}`,
        nameAr: raw,
        nameEn: raw,
        regionAr: "",
        regionEn: "",
        priority: "secondary" as const,
      };
    }

    const item = (raw || {}) as Partial<SeoCity>;
    const nameAr = String(item.nameAr || item.nameEn || "").trim();
    const nameEn = String(item.nameEn || item.nameAr || "").trim();
    const known = fallback.find(
      (c) =>
        c.slug === item.slug ||
        c.nameAr === nameAr ||
        c.nameEn === nameEn,
    );

    return {
      slug: String(item.slug || known?.slug || slugifyCity(nameEn || nameAr) || `city-${index + 1}`),
      nameAr: nameAr || known?.nameAr || `مدينة ${index + 1}`,
      nameEn: nameEn || known?.nameEn || nameAr || `City ${index + 1}`,
      regionAr: String(item.regionAr ?? known?.regionAr ?? ""),
      regionEn: String(item.regionEn ?? known?.regionEn ?? ""),
      priority: item.priority === "primary" ? "primary" : "secondary",
    };
  });
}

export function getCityBySlug(
  slug: string,
  cities: SeoCity[] = SEO_CITIES,
): SeoCity | undefined {
  return cities.find((c) => c.slug === slug);
}

export function cityPath(slug: string): string {
  return `/locations/${slug}`;
}

export function cityTitleAr(city: SeoCity): string {
  return `تأجير وبيع وتصنيع كبائن في ${city.nameAr}`;
}

export function cityDescriptionAr(city: SeoCity, brand: string): string {
  const region = city.regionAr ? ` و${city.regionAr}` : "";
  return `${brand} تقدّم خدمات تأجير وبيع وتصنيع الكبائن والوحدات المتنقلة في ${city.nameAr}${region} — توريد وتركيب ودعم لوجستي للمشاريع والفعاليات.`;
}

export function emptyServiceCity(): SeoCity {
  return {
    slug: "",
    nameAr: "",
    nameEn: "",
    regionAr: "",
    regionEn: "",
    priority: "secondary",
  };
}
