"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Award, Clock3, ShieldCheck, Zap } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";

const cards = [
  {
    href: "/rental",
    image: "/images/rental/units/unit-2.jpg",
    titleKey: "servicesCardRentalTitle" as const,
    bodyKey: "servicesCardRentalBody" as const,
  },
  {
    href: "/manufacturing",
    image: "/images/cabin-1.jpg",
    titleKey: "servicesCardSalesTitle" as const,
    bodyKey: "servicesCardSalesBody" as const,
  },
];

const whyItems = [
  {
    icon: Award,
    titleKey: "servicesWhy1Title" as const,
    bodyKey: "servicesWhy1Body" as const,
  },
  {
    icon: ShieldCheck,
    titleKey: "servicesWhy2Title" as const,
    bodyKey: "servicesWhy2Body" as const,
  },
  {
    icon: Zap,
    titleKey: "servicesWhy3Title" as const,
    bodyKey: "servicesWhy3Body" as const,
  },
  {
    icon: Clock3,
    titleKey: "servicesWhy4Title" as const,
    bodyKey: "servicesWhy4Body" as const,
  },
];

export function ServicesPageClient() {
  const { home, site } = useLocalizedCms();
  const { t } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t.servicesPageEyebrow}
        title={t.servicesPageTitle}
        description={t.servicesPageHeroDesc}
        breadcrumbs={[
          { label: t.home, href: "/" },
          { label: t.servicesPageTitle },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site text-center">
          <p className="eyebrow">{t.servicesPageEyebrow}</p>
          <h2 className="heading-display mx-auto mt-3 max-w-3xl text-3xl md:text-4xl">
            {t.servicesPageHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-[#777]">
            {t.servicesPageIntro}
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group overflow-hidden border border-[#eee] bg-[#F7F4F0] text-start transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-28px_rgba(15,15,15,0.28)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#efebe6]">
                  <Image
                    src={card.image}
                    alt={t[card.titleKey]}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7 md:p-8">
                  <h3 className="text-2xl font-extrabold text-[#0f0f0f]">
                    {t[card.titleKey]}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#666]">{t[card.bodyKey]}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--gold)] transition group-hover:gap-3">
                    {t.more}
                    <ArrowLeft className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111] py-16 text-white md:py-20">
        <div className="container-site flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold md:text-3xl">{t.servicesForwardTitle}</h2>
            <p className="mt-4 leading-8 text-white/70">{t.servicesForwardBody}</p>
          </div>
          <Link href="/contact" className="btn-primary shrink-0">
            {t.contactNow}
          </Link>
        </div>
      </section>

      <section className="section-pad bg-[#F7F4F0]">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">{t.servicesWhyEyebrow}</p>
            <h2 className="heading-display mt-3 text-3xl md:text-4xl">
              {t.servicesWhyTitle}
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyItems.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.titleKey}
                  className="border border-[#eee] bg-white p-6 text-center"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-extrabold text-[#0f0f0f]">
                    {t[item.titleKey]}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#666]">{t[item.bodyKey]}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="heading-display text-3xl md:text-4xl">{home.visionTitle}</h2>
            <p className="mt-5 leading-8 text-[#777]">{home.visionBody}</p>
            <Link href="/contact" className="btn-primary mt-8">
              {home.visionCta}
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#efebe6]">
            <Image
              src={home.visionImage || "/images/vision-side.jpg"}
              alt={site.nameEn}
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#F8F8F8]">
        <div className="container-site grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow">{t.contactPageEyebrow}</p>
            <h2 className="heading-display mt-3 text-3xl md:text-4xl">
              {t.contactFormTitle}
            </h2>
            <p className="mt-4 leading-8 text-[#777]">{home.contactSubtitle}</p>
          </div>
          <div className="card-frame bg-white">
            <ContactForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
