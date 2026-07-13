"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** spot = ركن ذهبي متحرك، sweep = مسح لوني، both = الاثنين */
  accent?: "spot" | "sweep" | "both";
  /** اتجاه الركن الذهبي */
  spotCorner?: "tr" | "tl" | "br" | "bl";
};

const spotPos = {
  tr: "top-0 right-0",
  tl: "top-0 left-0",
  br: "bottom-0 right-0",
  bl: "bottom-0 left-0",
} as const;

export function AnimatedMedia({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className = "",
  accent = "both",
  spotCorner = "tr",
}: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`group relative overflow-hidden ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-[1400ms] ease-out will-change-transform group-hover:scale-110"
      />

      {/* طبقة تباين لونية خفيفة دائماً */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-90" />

      {/* مسح ذهبي عند الهوفر — لون مخالف على جزء من الصورة */}
      {(accent === "sweep" || accent === "both") && (
        <div
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-[var(--gold)]/35 to-transparent opacity-0 transition duration-700 group-hover:left-[120%] group-hover:opacity-100"
          aria-hidden
        />
      )}

      {/* بقعة ذهبية متحركة في ركن الصورة */}
      {(accent === "spot" || accent === "both") && (
        <motion.div
          className={`pointer-events-none absolute h-28 w-28 rounded-full bg-[var(--gold)]/30 blur-2xl ${spotPos[spotCorner]}`}
          aria-hidden
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.25, 0.55, 0.25],
                  scale: [1, 1.25, 1],
                }
          }
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* إطار ذهبي يظهر عند الهوفر */}
      <div
        className="pointer-events-none absolute inset-3 border border-[var(--gold)]/0 transition duration-500 group-hover:border-[var(--gold)]/55"
        aria-hidden
      />
    </motion.div>
  );
}
