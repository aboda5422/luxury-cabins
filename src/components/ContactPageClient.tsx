"use client";

import { ContactInfoCards } from "@/components/ContactInfoCards";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";

export function ContactPageClient() {
  const { home, pageHeroImages } = useLocalizedCms();
  const { t } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t.contactPageEyebrow}
        title={t.contactPageTitle}
        description={home.contactSubtitle}
        backgroundImage={pageHeroImages.contact}
        breadcrumbs={[
          { label: t.home, href: "/" },
          { label: t.contactPageEyebrow },
        ]}
      />

      <section className="section-pad bg-[#F8F8F8]">
        <div className="container-site space-y-12">
          <ContactInfoCards showIntro={false} />

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card-frame overflow-hidden bg-white">
              <iframe
                title="Luxury Cabins map"
                src="https://www.google.com/maps?q=Riyadh,Saudi+Arabia&output=embed"
                className="h-full min-h-[320px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="card-frame min-w-0 overflow-hidden bg-white">
              <ContactForm title={t.contactPageTitle} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
