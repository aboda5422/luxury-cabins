"use client";

import { useCallback, useState } from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { BackLink } from "@/components/BackLink";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductShareButton } from "@/components/ProductShareButton";
import { RequestFormModal } from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";

type Props = {
  productId: string;
};

export function ProductDetailClient({ productId }: Props) {
  const { catalogProducts, site } = useLocalizedCms();
  const { t } = useLocale();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);
  const product = catalogProducts.find((p) => p.id === productId);
  if (!product) return null;

  const requestLabel = `${t.askProduct} ${product.title}`.trim();
  const waLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `${t.waProductQuote} ${product.title}`,
  )}`;

  return (
    <section className="bg-[#F7F4F0] pb-16 pt-[6.5rem] md:pb-24 md:pt-[8.5rem]">
      <div className="container-site">
        <BackLink href="/manufacturing" label={t.backToProducts} className="mb-8" />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={product.images} title={product.title} />

          <div className="min-w-0">
            <span className="mb-4 inline-block rounded-full bg-[var(--gold)]/15 px-3 py-1 text-xs font-medium text-[#8a6200]">
              {product.priceLabel}
            </span>
            <h1 className="heading-display text-3xl md:text-4xl">{product.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-[#777]">
              {product.shortDescription}
            </p>
            <p className="mt-5 leading-8 text-[#333]">{product.description}</p>
            <p className="mt-3 text-sm text-[#999]">{product.priceNote}</p>

            <ul className="mt-6 space-y-2">
              {product.specs.map((spec) => (
                <li key={spec} className="flex items-start gap-2 text-sm text-[#555]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <ProductShareButton
                title={product.title}
                text={product.shortDescription}
                url={`/manufacturing/${product.id}`}
                label={t.share}
                className="border-[#e8e4de] bg-white px-5 py-2.5 text-[#555]"
              />
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1ebe57]"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                {t.whatsapp}
              </a>
              <button
                type="button"
                onClick={() => setQuoteOpen(true)}
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#e8e4de] bg-white px-5 py-2.5 text-sm font-medium text-[#555] transition hover:bg-[#faf8f4] hover:text-[var(--gold)]"
              >
                <ExternalLink size={15} className="shrink-0" />
                <span className="truncate">{requestLabel}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <RequestFormModal
        open={quoteOpen}
        onClose={closeQuote}
        title={requestLabel}
        intro={t.quoteRequestIntro.replace("{title}", product.title)}
        consultationType={requestLabel}
      />
    </section>
  );
}
