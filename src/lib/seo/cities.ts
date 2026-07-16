export type SeoCity = {
  slug: string;
  nameAr: string;
  nameEn: string;
  regionAr: string;
  regionEn: string;
  priority: "primary" | "secondary";
};

/** المدن المستهدفة للظهور المحلي — الأولوية للمدن الرئيسية */
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

export function getCityBySlug(slug: string): SeoCity | undefined {
  return SEO_CITIES.find((c) => c.slug === slug);
}

export function cityPath(slug: string): string {
  return `/locations/${slug}`;
}

export function cityTitleAr(city: SeoCity): string {
  return `تأجير وبيع وتصنيع كبائن في ${city.nameAr}`;
}

export function cityDescriptionAr(city: SeoCity, brand: string): string {
  return `${brand} تقدّم خدمات تأجير وبيع وتصنيع الكبائن والوحدات المتنقلة في ${city.nameAr} و${city.regionAr} — توريد وتركيب ودعم لوجستي للمشاريع والفعاليات.`;
}
