import type { Metadata } from "next";
import { FaqPageClient } from "@/components/FaqPageClient";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description: `إجابات على أكثر الأسئلة شيوعاً حول تأجير وبيع وتصنيع الوحدات المتنقلة من ${siteConfig.nameAr}.`,
  alternates: { canonical: "/faq" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "هل تغطون جميع مناطق المملكة؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "نعم، نخدم جميع مناطق المملكة العربية السعودية مع تركيز خاص على المدن الرئيسية.",
      },
    },
    {
      "@type": "Question",
      name: "ما الفرق بين التأجير والبيع والتصنيع؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "التأجير للاحتياجات المؤقتة، والبيع والتصنيع للاحتياجات الدائمة أو حسب المواصفات.",
      },
    },
  ],
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqPageClient />
    </>
  );
}
