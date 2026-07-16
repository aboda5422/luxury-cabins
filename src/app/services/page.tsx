import type { Metadata } from "next";
import { ServicesPageClient } from "@/components/ServicesPageClient";
import { SEO_CITIES } from "@/lib/seo/cities";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "الخدمات",
  description:
    "استكشف حلول الكبائن الفاخرة في التأجير والبيع والتصنيع للوحدات المتنقلة في مدن المملكة.",
  alternates: { canonical: "/services" },
  keywords: [
    "خدمات كبائن",
    "تأجير وحدات متنقلة",
    "تصنيع كبائن السعودية",
    ...SEO_CITIES.slice(0, 6).map((c) => `كبائن ${c.nameAr}`),
  ],
};

export default function ServicesPage() {
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
      areaServed: SEO_CITIES.map((c) => c.nameAr),
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
