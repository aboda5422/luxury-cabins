import type { Metadata } from "next";
import { ProjectsPageClient } from "@/components/ProjectsPageClient";

export const metadata: Metadata = {
  title: "المشاريع والعملاء",
  description:
    "استعرض أبرز أعمال الكبائن الفاخرة في التأجير والبيع والتصنيع عبر مدن المملكة، وشعارات العملاء الذين وثقوا بنا.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
