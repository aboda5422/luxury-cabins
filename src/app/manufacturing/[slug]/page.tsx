import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { readCms } from "@/lib/cms/store";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const cms = await readCms();
  return cms.catalogProducts.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cms = await readCms();
  const product = cms.catalogProducts.find((p) => p.id === slug);
  if (!product) return { title: "المنتج غير موجود" };
  return {
    title: product.title,
    description: product.shortDescription,
    alternates: { canonical: `/manufacturing/${product.id}` },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const cms = await readCms();
  const product = cms.catalogProducts.find((p) => p.id === slug);
  if (!product) notFound();

  return <ProductDetailClient productId={slug} />;
}
