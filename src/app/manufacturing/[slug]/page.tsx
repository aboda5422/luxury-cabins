import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { readCms } from "@/lib/cms/store";
import { breadcrumbSchema, productSchema } from "@/lib/seo/schema";

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
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      url: `/manufacturing/${product.id}`,
      images: product.images?.[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const cms = await readCms();
  const product = cms.catalogProducts.find((p) => p.id === slug);
  if (!product) notFound();

  const schemas = [
    breadcrumbSchema([
      { name: "الرئيسية", path: "/" },
      { name: "البيع والتصنيع", path: "/manufacturing" },
      { name: product.title },
    ]),
    productSchema({
      name: product.title,
      description: product.shortDescription || product.description,
      path: `/manufacturing/${product.id}`,
      image: product.images?.[0],
      brand: cms.site.nameAr,
    }),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <ProductDetailClient productId={slug} />
    </>
  );
}
