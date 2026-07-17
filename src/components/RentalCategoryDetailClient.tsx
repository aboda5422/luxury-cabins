"use client";

import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { RentalCategoryCard } from "@/components/RentalCategoryCard";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";
import { rentalH1 } from "@/lib/seo/rentals";

type Props = {
  categoryId: string;
};

export function RentalCategoryDetailClient({ categoryId }: Props) {
  const { rentalCategories, navLinks } = useLocalizedCms();
  const { t } = useLocale();
  const category = rentalCategories.find((c) => c.id === categoryId);
  if (!category) return null;

  const heading = rentalH1(category);
  const rentalLabel = navLinks.find((l) => l.href === "/rental")?.label || t.rental;

  return (
    <section className="bg-[#F7F4F0] pb-16 pt-[6.5rem] md:pb-24 md:pt-[8.5rem]">
      <div className="container-site">
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-[#777]">
          <Link href="/" className="transition hover:text-[var(--gold)]">
            {t.home}
          </Link>
          <span aria-hidden>/</span>
          <Link href="/rental" className="transition hover:text-[var(--gold)]">
            {rentalLabel}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-[#333]">{heading}</span>
        </nav>
        <BackLink href="/rental" label={t.backToProducts} className="mb-8" />
        <RentalCategoryCard category={category} />
      </div>
    </section>
  );
}
