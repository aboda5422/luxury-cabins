"use client";

import Image from "next/image";
import { CheckCircle2, Award, Clock, Ruler } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { ProductCatalog } from "@/components/ProductCatalog";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";

const highlightIcons = [Award, Ruler, Clock];

export function ManufacturingPageClient() {
  const { manufacturingPage, manufacturingExtras, navLinks, pageHeroImages } = useLocalizedCms();
  const { t } = useLocale();

  const pageLabel =
    navLinks.find((l) => l.href === "/manufacturing")?.label || manufacturingPage.heroTitle;

  return (
    <>
      <PageHero
        eyebrow={pageLabel}
        title={manufacturingPage.heroTitle}
        description={manufacturingPage.heroDescription}
        backgroundImage={pageHeroImages.manufacturing}
        breadcrumbs={[{ label: t.home, href: "/" }, { label: pageLabel }]}
      />

      <section className="section-pad bg-white">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">{manufacturingPage.introEyebrow}</p>
            <h2 className="heading-display mt-3 text-3xl md:text-4xl">
              {manufacturingPage.introTitle}
            </h2>
            <p className="mt-5 leading-8 text-[#777]">{manufacturingPage.introBody}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {manufacturingPage.highlights.map((label, i) => {
                const Icon = highlightIcons[i] ?? Award;
                return (
                  <div
                    key={label}
                    className="border border-[#eee] bg-[#F7F4F0] p-4 text-center"
                  >
                    <Icon className="mx-auto h-6 w-6 text-[var(--gold)]" />
                    <p className="mt-2 text-sm font-bold text-[#0f0f0f]">{label}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f5f5]">
            <Image
              src={manufacturingPage.introImage || "/images/custom-portable-cabin-manufacturing.webp"}
              alt={manufacturingPage.introTitle || manufacturingPage.heroTitle || "تصنيع وبيع الوحدات الجاهزة"}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
              unoptimized={Boolean(manufacturingPage.introImage?.startsWith("http"))}
            />
          </div>
        </div>
      </section>

      <ProductCatalog />

      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">{manufacturingPage.extrasEyebrow}</p>
            <h2 className="heading-display mt-3 text-3xl">
              {manufacturingPage.extrasTitle}
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {manufacturingExtras.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 border border-[#eee] bg-[#F7F4F0] px-4 py-3"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--gold)]" />
                <span className="font-semibold text-[#0f0f0f]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad bg-[#0f0f0f]">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="text-white">
            <p className="text-sm font-bold text-[var(--gold)]">
              {manufacturingPage.ctaEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
              {manufacturingPage.ctaTitle}
            </h2>
            <p className="mt-4 leading-8 text-white/70">{manufacturingPage.ctaBody}</p>
          </div>
          <div className="min-w-0 overflow-hidden bg-white">
            <ContactForm title={t.manufacturingFormTitle} />
          </div>
        </div>
      </section>
    </>
  );
}
