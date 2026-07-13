import type { Metadata } from "next";
import { ServicesPageClient } from "@/components/ServicesPageClient";

export const metadata: Metadata = {
  title: "الخدمات",
  description:
    "استكشف حلول الكبائن الفاخرة في التأجير والبيع والتصنيع للوحدات المتنقلة.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
