import type { Metadata } from "next";
import { AboutPageClient } from "@/components/AboutPageClient";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "من نحن",
  description: `تعرّف على ${siteConfig.legalName} — رؤيتنا ورسالتنا وقيمنا في تأجير وبيع وتصنيع الوحدات المتنقلة بالمملكة.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
