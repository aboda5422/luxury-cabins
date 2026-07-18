"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocalizedCms } from "@/components/CmsProvider";

const FALLBACK_HERO = "/images/luxury-portable-cabins-page-hero.webp";

export function HeroSection() {
  const { site, home } = useLocalizedCms();
  const heroSrc = home.heroImage?.trim() || FALLBACK_HERO;

  return (
    <section className="relative min-h-[82vh] overflow-hidden pt-[72px] text-white md:min-h-[90vh] md:pt-[100px]">
      <div className="absolute inset-0 will-change-transform animate-[hero-zoom_22s_ease-in-out_infinite]">
        <Image
          src={heroSrc}
          alt={home.heroTitle || site.nameAr}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
          unoptimized={heroSrc.startsWith("http")}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/45" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[50%] bg-gradient-to-r from-[var(--gold)]/18 to-transparent" />

      <div className="container-site relative flex min-h-[calc(82vh-72px)] items-center md:min-h-[calc(90vh-100px)]">
        <div className="ms-auto w-full max-w-2xl animate-[hero-fade_0.75s_ease-out] py-16 text-center md:w-[52%] md:py-24">
          <p className="font-display text-base font-extrabold tracking-wide text-[var(--gold)] md:text-lg">
            {site.nameAr}
          </p>
          <h1 className="font-display mt-4 text-[2.15rem] font-black leading-[1.45] text-white sm:text-5xl sm:leading-[1.4] md:text-[3.25rem] md:leading-[1.38] lg:text-[3.5rem] lg:leading-[1.35]">
            {home.heroTitle}
          </h1>
          <p className="mt-5 text-base font-medium leading-8 text-white/92 md:text-xl md:leading-9">
            {home.heroSubtitle}
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/services"
              className="btn-primary px-8 py-3.5 text-base shadow-[0_16px_40px_-12px_rgba(255,180,0,0.65)] md:text-lg"
            >
              {home.heroCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
