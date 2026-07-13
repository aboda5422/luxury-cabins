"use client";

import Image from "next/image";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useImageSlider } from "@/hooks/useImageSlider";
import type { RentalCategory } from "@/lib/cms/types";

type Props = {
  category: RentalCategory;
};

export function RentalCategoryCard({ category }: Props) {
  const { site } = useLocalizedCms();
  const { t } = useLocale();
  const images = category.images.filter(Boolean);
  const total = images.length;
  const { index, swipeHandlers } = useImageSlider(total, 3800);

  const waHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    category.whatsappMessage,
  )}`;

  return (
    <article className="luxe-card flex h-full flex-col overflow-hidden bg-white">
      <div
        className="relative aspect-[16/10] touch-pan-y overflow-hidden bg-[#efebe6]"
        dir="ltr"
        {...swipeHandlers}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={`${src}-${i}`} className="relative h-full w-full shrink-0 grow-0 basis-full">
              <Image
                src={src}
                alt={`${category.title} — ${i + 1}`}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="pointer-events-none object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {total > 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-3 z-[1] flex items-center justify-center gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-white" : "w-1.5 bg-white/55"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="text-xs font-semibold text-[var(--gold)]">{t.rental}</p>
        <h3 className="mt-1 text-2xl font-extrabold text-[#0f0f0f]">{category.title}</h3>
        <p className="mt-3 text-sm leading-7 text-[#777]">{category.shortDescription}</p>
        <p className="mt-3 text-sm leading-7 text-[#555]">{category.description}</p>

        <ul className="mt-5 space-y-2 border-t border-[#eee] pt-4">
          {category.specs.map((spec) => (
            <li key={spec} className="flex items-start gap-2 text-sm text-[#555]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--gold)]" aria-hidden />
              <span>{spec}</span>
            </li>
          ))}
        </ul>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 bg-[#25D366] px-4 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#1ebe57]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {t.contactWhatsApp}
        </a>
      </div>
    </article>
  );
}
