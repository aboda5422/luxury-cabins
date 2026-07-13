"use client";

import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { RentalCategoryCard } from "@/components/RentalCategoryCard";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function RentalPageClient() {
  const { rentalPage, rentalCategories, site, navLinks } = useLocalizedCms();
  const { t } = useLocale();

  const generalWa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t.waRentalGeneral)}`;

  const rentalLabel = navLinks.find((l) => l.href === "/rental")?.label || t.rental;

  return (
    <>
      <PageHero
        eyebrow={rentalLabel}
        title={rentalLabel}
        description={rentalPage.heroDescription}
        breadcrumbs={[{ label: t.home, href: "/" }, { label: rentalLabel }]}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-3xl text-center md:text-start">
          <p className="eyebrow">{t.rentalEyebrow}</p>
          <h2 className="heading-display mt-3 text-3xl md:text-4xl">
            {rentalPage.sectionTitle}
          </h2>
          <p className="mt-5 leading-8 text-[#777]">{rentalPage.sectionBody}</p>
          <ul className="mt-8 grid gap-3 text-start sm:grid-cols-2">
            {rentalPage.bullets.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[#0f0f0f]">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[var(--gold)]" />
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad bg-[#F7F4F0]">
        <div className="container-site">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">{t.rentalCatalogEyebrow}</p>
            <h2 className="heading-display mt-3 text-3xl md:text-4xl">
              {rentalPage.catalogTitle}
            </h2>
            <p className="mt-4 leading-8 text-[#777]">{rentalPage.catalogBody}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {rentalCategories.map((category) => (
              <RentalCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#0f0f0f]">
        <div className="container-site flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold text-[var(--gold)]">{t.rentalReady}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white md:text-3xl">
              {rentalPage.ctaTitle}
            </h2>
            <p className="mt-3 max-w-xl leading-8 text-white/65">{rentalPage.ctaBody}</p>
          </div>
          <a
            href={generalWa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#1ebe57]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {t.whatsappNow}
          </a>
        </div>
      </section>
    </>
  );
}
