import { ContactInfoCards } from "@/components/ContactInfoCards";
import { ClientsGrid } from "@/components/ClientsGrid";
import { HeroSection } from "@/components/HeroSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ServicesSection } from "@/components/ServicesSection";
import { VisionSection } from "@/components/VisionSection";

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
