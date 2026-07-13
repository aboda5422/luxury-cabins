import type { Metadata } from "next";
import { ContactPageClient } from "@/components/ContactPageClient";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "اتصل بنا",
  description: `تواصل مع ${siteConfig.nameAr} في الرياض — بيانات التواصل ونموذج الاتصال لاستشارات التأجير والبيع والتصنيع.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
