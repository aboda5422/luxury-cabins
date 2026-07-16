import { ContactInfoCards } from "@/components/ContactInfoCards";
import { ClientsGrid } from "@/components/ClientsGrid";
import { HeroSection } from "@/components/HeroSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ServicesSection } from "@/components/ServicesSection";
import { VisionSection } from "@/components/VisionSection";
import type { Metadata } from "next";
import { SEO_CITIES } from "@/lib/seo/cities";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  keywords: [
    "كبائن",
    "وحدات متنقلة",
    "تأجير كبائن",
    "تصنيع كبائن",
    "بركسات",
    "كرفانات",
    "Luxury Cabins",
    "السعودية",
    ...SEO_CITIES.map((c) => `كبائن ${c.nameAr}`),
    ...SEO_CITIES.map((c) => `تأجير كبائن ${c.nameAr}`),
  ],
  openGraph: {
    url: "https://luxurycabins.com.sa",
    title: `${siteConfig.nameAr} | ${siteConfig.nameEn} — تأجير وبيع وتصنيع الوحدات المتنقلة`,
    description: siteConfig.description,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <VisionSection />
      <ProcessSection />

      <ClientsGrid asSection />

      <section className="section-pad bg-[#F8F8F8]">
        <div className="container-site">
          <ContactInfoCards />
        </div>
      </section>
    </>
  );
}
