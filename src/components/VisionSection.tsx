"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedMedia } from "@/components/AnimatedMedia";
import { useLocalizedCms } from "@/components/CmsProvider";

export function VisionSection() {
  const { home } = useLocalizedCms();
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-pad bg-white">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="heading-display text-3xl md:text-4xl">{home.visionTitle}</h2>
          <p className="mt-5 leading-8 text-[#777]">{home.visionBody}</p>
          <Link href="/contact" className="btn-primary mt-8">
            {home.visionCta}
          </Link>
        </motion.div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <AnimatedMedia
            src={home.visionImage || "/images/cms/luxury-cabins-field-services.webp"}
            alt={home.visionTitle || "خدمات ميدانية ووحدات متنقلة فاخرة"}
            className="aspect-[3/4] w-full"
            sizes="(max-width:1024px) 90vw, 420px"
            accent="both"
            spotCorner="bl"
          />
        </div>
      </div>
    </section>
  );
}
