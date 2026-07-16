import type { Metadata } from "next";
import { ServicesPageClient } from "@/components/ServicesPageClient";
import { readCms } from "@/lib/cms/store";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await readCms();
  const cities = cms.site.cities || [];
  return {
    title: "الخدمات",
    description:
      "استكشف حلول الكبائن الفاخرة في التأجير والبيع والتصنيع للوحدات المتنقلة في مدن المملكة.",
    alternates: { canonical: "/services" },
    keywords: [
      "خدمات كبائن",
      "تأجير وحدات متنقلة",
      "تصنيع كبائن السعودية",
      ...cities.slice(0, 6).map((c) => `كبائن ${c.nameAr}`),
    ],
  };
}

export default async function ServicesPage() {
  const cms = await readCms();
  const cities = cms.site.cities || [];

  const schemas = [
    breadcrumbSchema([
      { name: "الرئيسية", path: "/" },
      { name: "الخدمات" },
    ]),
    serviceSchema({
      name: "خدمات تأجير وبيع وتصنيع الكبائن",
      description:
        "حلول متكاملة لتأجير وبيع وتصنيع الكبائن والوحدات المتنقلة في المملكة العربية السعودية.",
      path: "/services",
      serviceType: "Mobile cabin rental, sales, and manufacturing",
      areaServed: cities.map((c) => c.nameAr),
    }),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ServicesPageClient />
    </>
  );
}
