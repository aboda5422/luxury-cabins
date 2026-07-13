import type { Metadata } from "next";
import { RentalPageClient } from "@/components/RentalPageClient";
import { readCms } from "@/lib/cms/store";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await readCms();
  return {
    title: "التأجير",
    description: cms.rentalPage.heroDescription,
    alternates: { canonical: "/rental" },
  };
}

export default function RentalPage() {
  return <RentalPageClient />;
}
