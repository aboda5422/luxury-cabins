import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { readCms } from "@/lib/cms/store";
import { cityPath, cityTitleAr } from "@/lib/seo/cities";
import { breadcrumbSchema } from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await readCms();
  const cities = cms.site.cities;
  return {
    title: "خدماتنا في مدن المملكة",
    description: `تأجير وبيع وتصنيع الكبائن والوحدات المتنقلة في ${cities
      .slice(0, 5)
      .map((c) => c.nameAr)
      .join(" و")} ومدن المملكة مع ${cms.site.nameAr}.`,
    alternates: { canonical: "/locations" },
    keywords: [
      "كبائن الرياض",
      "تأجير كبائن جدة",
      "وحدات متنقلة الدمام",
      "تصنيع كبائن السعودية",
      ...cities.map((c) => `كبائن ${c.nameAr}`),
    ],
  };
}

export default async function LocationsIndexPage() {
  const cms = await readCms();
  const cities = cms.site.cities;
  const primary = cities.filter((c) => c.priority === "primary");
  const secondary = cities.filter((c) => c.priority !== "primary");

  const schema = breadcrumbSchema([
    { name: "الرئيسية", path: "/" },
    { name: "المدن" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageHero
        title="نخدم مشاريعكم في مدن المملكة"
        description="صفحات مخصصة لكل مدينة رئيسية لمساعدتكم في الوصول سريعاً إلى حلول التأجير والبيع والتصنيع الأقرب لموقع مشروعكم."
        backgroundImage={cms.pageHeroImages.locations}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المدن" },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site">
          {primary.length ? (
            <>
              <h2 className="heading-display mb-8 text-2xl md:text-3xl">المدن الرئيسية</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {primary.map((city) => (
                  <Link
                    key={city.slug}
                    href={cityPath(city.slug)}
                    className="border border-[#e8e4de] bg-[#F8F8F8] px-5 py-6 transition hover:border-[var(--gold)] hover:bg-white"
                  >
                    <p className="text-lg font-extrabold text-[#1a1a1a]">{city.nameAr}</p>
                    <p className="mt-1 text-sm text-[#777]">
                      {city.nameEn}
                      {city.regionAr ? ` — ${city.regionAr}` : ""}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-[var(--gold)]">
                      {cityTitleAr(city)}
                    </p>
                  </Link>
                ))}
              </div>
            </>
          ) : null}

          {secondary.length ? (
            <>
              <h2 className="heading-display mb-8 mt-14 text-2xl md:text-3xl">مدن إضافية نغطيها</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {secondary.map((city) => (
                  <Link
                    key={city.slug}
                    href={cityPath(city.slug)}
                    className="border border-[#e8e4de] px-5 py-5 transition hover:border-[var(--gold)]"
                  >
                    <p className="font-extrabold text-[#1a1a1a]">{city.nameAr}</p>
                    <p className="mt-1 text-sm text-[#777]">{city.nameEn}</p>
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>

      <CtaBand
        title="هل مشروعكم في مدينة أخرى؟"
        primaryLabel="تواصل معنا"
        primaryHref="/contact"
      />
    </>
  );
}
