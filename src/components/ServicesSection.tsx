"use client";

import Link from "next/link";
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
          </h2>
          {home.servicesTitleLine2 ? (
            <p className="mt-3 max-w-3xl text-base leading-8 text-[#555] md:text-[1.05rem]">
              {home.servicesTitleLine2}
            </p>
          ) : null}
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
                alt={`${service.title} — خدمات Luxury Cabins للوحدات المتنقلة`}
                className="h-48"
                sizes="(max-width:768px) 92vw, (max-width:1200px) 40vw, 420px"
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
      </div>
    </section>
  );
}
