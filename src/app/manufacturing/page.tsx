import type { Metadata } from "next";
import { ManufacturingPageClient } from "@/components/ManufacturingPageClient";
import { readCms } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await readCms();
  return {
    title: "تصنيع وبيع كبائن ووحدات جاهزة في السعودية",
    description:
      cms.manufacturingPage.heroDescription ||
      "تصنيع وبيع كبائن متنقلة وغرف حراسة وبركسات وكرفانات ومكاتب جاهزة في السعودية.",
    keywords: [
      "تصنيع كبائن",
      "بيع كبائن",
      "كبائن متنقلة",
      "غرف حراسة",
      "بركسات",
      "كرفانات",
    ],
    alternates: { canonical: "/manufacturing" },
  };
}

export default function ManufacturingPage() {
  return <ManufacturingPageClient />;
}
