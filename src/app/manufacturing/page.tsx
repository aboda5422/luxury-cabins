import type { Metadata } from "next";
import { ManufacturingPageClient } from "@/components/ManufacturingPageClient";
import { readCms } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await readCms();
  return {
    title: "البيع والتصنيع",
    description: cms.manufacturingPage.heroDescription,
    alternates: { canonical: "/manufacturing" },
  };
}

export default function ManufacturingPage() {
  return <ManufacturingPageClient />;
}
