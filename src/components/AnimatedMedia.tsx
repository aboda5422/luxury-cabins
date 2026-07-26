"use client";

import Image from "next/image";

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
  sizes = "(max-width:768px) 100vw, 560px",
  priority = false,
  className = "",
  accent = "both",
  spotCorner = "tr",
}: Props) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={75}
        className="object-cover transition-transform duration-[1400ms] ease-out will-change-transform group-hover:scale-110"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-90" />

      {(accent === "sweep" || accent === "both") && (
        <div
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-[var(--gold)]/35 to-transparent opacity-0 transition duration-700 group-hover:left-[120%] group-hover:opacity-100"
          aria-hidden
        />
      )}

      {(accent === "spot" || accent === "both") && (
        <div
          className={`pointer-events-none absolute h-28 w-28 animate-[media-spot_4.2s_ease-in-out_infinite] rounded-full bg-[var(--gold)]/30 blur-2xl ${spotPos[spotCorner]}`}
          aria-hidden
        />
      )}

      <div
        className="pointer-events-none absolute inset-3 border border-[var(--gold)]/0 transition duration-500 group-hover:border-[var(--gold)]/55"
        aria-hidden
      />
    </div>
  );
}
