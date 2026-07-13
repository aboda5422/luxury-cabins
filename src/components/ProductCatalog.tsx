"use client";

import { Package, Clock } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useLocalizedCms } from "@/components/CmsProvider";

export function ProductCatalog() {
  const { manufacturingPage, catalogProducts } = useLocalizedCms();

  return (
    <section className="section-pad bg-[#F7F4F0]">
      <div className="container-site">
        <div className="mb-14 max-w-3xl">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e8e4de] bg-white px-4 py-1.5 text-xs text-[#777]">
              <Package size={14} /> {manufacturingPage.catalogEyebrow}
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--gold)]/15 px-3.5 py-1.5 text-xs font-medium text-[#8a6200]">
              <Clock size={13} />
              {manufacturingPage.catalogBadge}
            </div>
          </div>
          <h2 className="heading-display text-3xl md:text-4xl">
            {manufacturingPage.catalogTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#777]">
            {manufacturingPage.catalogBody}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {catalogProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
