"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";

export function AboutPageClient() {
  const { about, aboutStats, site } = useLocalizedCms();
  const { t } = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t.aboutEyebrow}
        title={about.heroTitle}
        description={about.heroDescription}
        breadcrumbs={[{ label: t.home, href: "/" }, { label: t.aboutEyebrow }]}
      />

      <section className="section-pad bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">{t.whoWeAre}</p>
            <h2 className="heading-display mt-3 text-3xl md:text-4xl">{about.whoTitle}</h2>
            <p className="mt-5 leading-8 text-muted">{about.whoBody1}</p>
            <p className="mt-4 leading-8 text-muted">
              {about.whoBody2}
              <br />
              {t.commercialRegister} {site.commercialRegister}
              <br />
              {site.addressDetail}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/cabin-2.jpg"
              alt={about.whoTitle}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-navy/8 bg-cream py-12">
        <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-[family-name:var(--font-tajawal)] text-3xl font-extrabold text-orange md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-navy">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad surface-grain">
        <div className="container-site grid gap-8 md:grid-cols-2">
          <div className="bg-white p-8 shadow-[0_16px_40px_rgba(26,35,50,0.06)]">
            <h3 className="heading-display text-2xl">{about.visionTitle}</h3>
            <p className="mt-4 leading-8 text-muted">{about.visionBody}</p>
          </div>
          <div className="bg-white p-8 shadow-[0_16px_40px_rgba(26,35,50,0.06)]">
            <h3 className="heading-display text-2xl">{about.missionTitle}</h3>
            <p className="mt-4 leading-8 text-muted">{about.missionBody}</p>
          </div>
        </div>

        <div className="container-site mt-10">
          <h3 className="heading-display mb-6 text-2xl">{about.valuesTitle}</h3>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.values.map((value) => (
              <li
                key={value}
                className="flex items-start gap-3 border border-navy/8 bg-white p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                <span className="font-semibold text-navy">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
