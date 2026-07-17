import type { Metadata } from "next";
import { FaqPageClient } from "@/components/FaqPageClient";
import { readCms } from "@/lib/cms/store";
import { breadcrumbSchema, faqPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description: `إجابات على أكثر الأسئلة شيوعاً حول تأجير وبيع وتصنيع الوحدات المتنقلة من ${siteConfig.nameAr}.`,
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  let faqs: { q: string; a: string }[] = [];
  try {
    const cms = await readCms();
    faqs = cms.faqs;
  } catch {
    faqs = [];
  }

  const schemas = [
    breadcrumbSchema([
      { name: "الرئيسية", path: "/" },
      { name: "الأسئلة الشائعة" },
    ]),
    ...(faqs.length ? [faqPageSchema(faqs)] : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <FaqPageClient />
    </>
  );
}
