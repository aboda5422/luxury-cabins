import type { Metadata } from "next";
import { RentalPageClient } from "@/components/RentalPageClient";
import { readCms } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await readCms();
  const title =
    cms.rentalPage.seoTitle?.trim() ||
    cms.rentalPage.h1?.trim() ||
    "التأجير";
  const description =
    cms.rentalPage.seoDescription?.trim() ||
    cms.rentalPage.heroDescription;
  return {
    title,
    description,
    keywords: cms.rentalPage.seoKeywords?.length
      ? cms.rentalPage.seoKeywords
      : undefined,
    alternates: { canonical: "/rental" },
    openGraph: {
      title,
      description,
      url: "/rental",
    },
  };
}

export default function RentalPage() {
  return <RentalPageClient />;
}
