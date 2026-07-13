"use client";

import Image from "next/image";
import { useImageSlider } from "@/hooks/useImageSlider";

type Props = {
  images: readonly string[];
  title: string;
};

export function ProductGallery({ images, title }: Props) {
  const slides = images.filter(Boolean);
  const total = slides.length;
  const { index, setIndex, swipeHandlers } = useImageSlider(total, 4000);

  if (!slides.length) return null;

  return (
    <div className="w-full min-w-0">
      <div
        className="relative aspect-[4/3] w-full touch-pan-y overflow-hidden rounded-2xl bg-[#efebe6] shadow-[0_24px_60px_-24px_rgba(15,15,15,0.18)]"
        dir="ltr"
        {...swipeHandlers}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((src, i) => (
            <div key={`${src}-${i}`} className="relative h-full w-full shrink-0 grow-0 basis-full">
              <Image
                src={src}
                alt={`${title} — ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(max-width:1024px) 100vw, 50vw"
                className="pointer-events-none object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <div className="mt-4 flex justify-center gap-2" dir="ltr">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`صورة ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === index
                  ? "w-8 bg-[var(--gold)]"
                  : "w-2 bg-[#ddd] hover:bg-[#bbb]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
