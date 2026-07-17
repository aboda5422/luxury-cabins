import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RentalCategoryDetailClient } from "@/components/RentalCategoryDetailClient";
import { readCms } from "@/lib/cms/store";
import { breadcrumbSchema } from "@/lib/seo/schema";
import {
  getRentalBySlug,
  rentalH1,
  rentalPath,
  rentalSeoDescription,
  rentalSeoTitle,
  rentalSlug,
} from "@/lib/seo/rentals";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const cms = await readCms();
  return cms.rentalCategories.map((c) => ({ slug: rentalSlug(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cms = await readCms();
  const category = getRentalBySlug(cms.rentalCategories, slug);
  if (!category) return { title: "الفئة غير موجودة" };

  const title = rentalSeoTitle(category);
  const description = rentalSeoDescription(category);
  const path = rentalPath(category);

  return {
    title,
    description,
    keywords: category.seoKeywords?.length ? category.seoKeywords : undefined,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      images: category.images?.[0] ? [{ url: category.images[0] }] : undefined,
    },
  };
}

export default async function RentalCategoryPage({ params }: Props) {
  const { slug } = await params;
  const cms = await readCms();
  const category = getRentalBySlug(cms.rentalCategories, slug);
  if (!category) notFound();

  const path = rentalPath(category);
  const heading = rentalH1(category);
  const schemas = [
    breadcrumbSchema([
      { name: "الرئيسية", path: "/" },
      { name: "التأجير", path: "/rental" },
      { name: heading, path },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <RentalCategoryDetailClient categoryId={category.id} />
    </>
  );
}
