"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { ProductShareButton } from "@/components/ProductShareButton";
import { useLocale } from "@/components/LocaleProvider";
import { useImageSlider } from "@/hooks/useImageSlider";
import { productPath } from "@/lib/seo/products";

export type CatalogProductCard = {
  id: string;
  slug?: string;
  title: string;
  shortDescription: string;
  priceLabel: string;
  images: readonly string[];
};

type Props = {
  product: CatalogProductCard;
};

export function ProductCard({ product }: Props) {
  const { t } = useLocale();
  const href = productPath(product);
  const images = product.images.filter(Boolean);
  const total = images.length;
  const { index, swipeHandlers, consumeSwipe } = useImageSlider(total, 3800);

  return (
    <div className="luxe-card group relative flex h-full flex-col overflow-hidden text-start">
      <div
        className="absolute end-3 top-3 z-10"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <ProductShareButton
          title={product.title}
          text={product.shortDescription}
          url={href}
          className="bg-white/90 shadow-sm backdrop-blur-sm"
        />
      </div>

      <Link
        href={href}
        className="flex h-full flex-col overflow-hidden"
        onClick={(e) => {
          if (consumeSwipe()) e.preventDefault();
        }}
      >
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
                  alt={`${product.title} — ${i + 1}`}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
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

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--gold)]/15 px-2.5 py-1 text-[11px] font-medium text-[#8a6200]">
              <Package size={12} /> {t.product}
            </span>
            {product.priceLabel && (
              <span className="shrink-0 text-xs text-[#777]">{product.priceLabel}</span>
            )}
          </div>

          <h3 className="line-clamp-2 text-xl font-semibold text-[#0f0f0f]">
            {product.title}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-[#777]">
            {product.shortDescription}
          </p>

          <div className="mt-4 flex items-center justify-between text-xs text-[#777] transition-colors group-hover:text-[#0f0f0f]">
            <span>{t.details}</span>
            <ArrowLeft size={14} />
          </div>
        </div>
      </Link>
    </div>
  );
}
