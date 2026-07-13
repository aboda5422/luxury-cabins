"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLocalizedCms } from "@/components/CmsProvider";

export function HeroSection() {
  const { site, home } = useLocalizedCms();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[82vh] overflow-hidden pt-[72px] text-white md:min-h-[90vh] md:pt-[100px]">
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${home.heroImage || "/images/cover-hero.webp"})`,
        }}
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.06, 1],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/45" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[50%] bg-gradient-to-r from-[var(--gold)]/18 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-soft-light"
        style={{
          backgroundImage: "url(/images/ar-bg.png)",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      />

      <div className="container-site relative flex min-h-[calc(82vh-72px)] items-center md:min-h-[calc(90vh-100px)]">
        <motion.div
          className="ms-auto w-full max-w-2xl py-16 text-center md:w-[52%] md:py-24"
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
