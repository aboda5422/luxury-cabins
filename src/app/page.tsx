import { ContactInfoCards } from "@/components/ContactInfoCards";
import { ClientsGrid } from "@/components/ClientsGrid";
import { HeroSection } from "@/components/HeroSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ServicesSection } from "@/components/ServicesSection";
import { VisionSection } from "@/components/VisionSection";
import type { Metadata } from "next";
import { readCms } from "@/lib/cms/store";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await readCms();
  const cities = cms.site.cities || [];
  return {
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
      ...cities.map((c) => `كبائن ${c.nameAr}`),
      ...cities.map((c) => `تأجير كبائن ${c.nameAr}`),
    ],
    openGraph: {
      url: "https://luxurycabins.com.sa",
      title: `${cms.site.nameAr || siteConfig.nameAr} | ${cms.site.nameEn || siteConfig.nameEn} — تأجير وبيع وتصنيع الوحدات المتنقلة`,
      description: cms.site.description || siteConfig.description,
    },
  };
}

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
