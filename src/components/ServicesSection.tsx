"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedMedia } from "@/components/AnimatedMedia";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";

export function ServicesSection() {
  const { home, services } = useLocalizedCms();
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-pad bg-[#F7F4F0]">
      <div className="container-site">
        <motion.div
          className="mb-10 text-center md:text-start"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">{home.servicesEyebrow}</p>
          <h2 className="heading-display mt-2 text-[1.7rem] leading-[1.55] md:text-[1.95rem] md:leading-[1.5]">
            {home.servicesTitle}
            <br className="hidden sm:block" />
            <span className="mt-1 inline-block">{home.servicesTitleLine2}</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              className="card-frame flex flex-col overflow-hidden"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.1 }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
            >
              <AnimatedMedia
                src={service.image}
                alt={service.title}
                className="h-48"
                sizes="(max-width:768px) 100vw, 33vw"
                spotCorner={index === 1 ? "tl" : index === 2 ? "br" : "tr"}
              />
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-xl font-extrabold text-[#0f0f0f]">{service.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-[#777]">{service.short}</p>
                <Link href={service.href} className="btn-primary mt-6 self-start text-sm">
                  {t.discoverMore}
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-5"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <Link
            href="/manufacturing"
            className="card-frame group flex items-center justify-between gap-4 overflow-hidden p-7 transition hover:-translate-y-0.5"
          >
            <div>
              <h3 className="text-xl font-extrabold text-[#0f0f0f] transition group-hover:text-[var(--gold)]">
                {home.manufacturingBandTitle}
              </h3>
              <p className="mt-2 text-sm text-[#777]">{home.manufacturingBandText}</p>
            </div>
            <ArrowLeft className="h-5 w-5 text-[var(--gold)] transition group-hover:-translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
