import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { readCms } from "@/lib/cms/store";
import { breadcrumbSchema, productSchema } from "@/lib/seo/schema";
import {
  getProductBySlug,
  productH1,
  productPath,
  productSeoDescription,
  productSeoTitle,
  productSlug,
} from "@/lib/seo/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const cms = await readCms();
  return cms.catalogProducts.map((p) => ({ slug: productSlug(p) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cms = await readCms();
  const product = getProductBySlug(cms.catalogProducts, slug);
  if (!product) return { title: "المنتج غير موجود" };

  const title = productSeoTitle(product);
  const description = productSeoDescription(product);
  const path = productPath(product);

  return {
    title,
    description,
    keywords: product.seoKeywords?.length ? product.seoKeywords : undefined,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      images: product.images?.[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const cms = await readCms();
  const product = getProductBySlug(cms.catalogProducts, slug);
  if (!product) notFound();

  const path = productPath(product);
  const heading = productH1(product);

  const schemas = [
    breadcrumbSchema([
      { name: "الرئيسية", path: "/" },
      { name: "البيع والتصنيع", path: "/manufacturing" },
      { name: heading },
    ]),
    productSchema({
      name: heading,
      description: productSeoDescription(product),
      path,
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
      <ProductDetailClient productId={product.id} />
    </>
  );
}
