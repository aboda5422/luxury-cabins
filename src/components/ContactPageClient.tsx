"use client";

import dynamic from "next/dynamic";
import { ContactInfoCards } from "@/components/ContactInfoCards";
import { PageHero } from "@/components/PageHero";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";

const ContactForm = dynamic(
  () => import("@/components/ContactForm").then((m) => m.ContactForm),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[320px] items-center justify-center text-sm text-[#777]">
        جارٍ تحميل النموذج...
      </div>
    ),
  },
);

export function ContactPageClient() {
  const { contactPage, pageHeroImages, navLinks } = useLocalizedCms();
  const { t } = useLocale();

  const pageLabel =
    navLinks.find((l) => l.href === "/contact")?.label ||
    contactPage.heroEyebrow ||
    t.contactPageEyebrow;

  return (
    <>
      <PageHero
        eyebrow={contactPage.heroEyebrow || pageLabel}
        title={contactPage.heroTitle || t.contactPageTitle}
        description={contactPage.heroDescription}
        backgroundImage={pageHeroImages.contact}
        breadcrumbs={[
          { label: t.home, href: "/" },
          { label: pageLabel },
        ]}
      />

      <section className="section-pad bg-[#F8F8F8]">
        <div className="container-site space-y-12">
          <ContactInfoCards showIntro={false} />

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card-frame overflow-hidden bg-white">
              <iframe
                title="Luxury Cabins map"
                src={
                  contactPage.mapEmbedUrl ||
                  "https://www.google.com/maps?q=Riyadh,Saudi+Arabia&output=embed"
                }
                className="h-full min-h-[320px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="card-frame min-w-0 overflow-hidden bg-white">
              <ContactForm title={contactPage.formTitle || contactPage.heroTitle || t.contactPageTitle} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
