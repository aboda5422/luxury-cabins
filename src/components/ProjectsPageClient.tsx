"use client";

import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { ClientsGrid } from "@/components/ClientsGrid";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";

export function ProjectsPageClient() {
  const { projects, navLinks } = useLocalizedCms();
  const { t } = useLocale();
  const projectsLabel =
    navLinks.find((l) => l.href === "/projects")?.label || t.projectsEyebrow;

  return (
    <>
      <PageHero
        eyebrow={t.projectsEyebrow}
        title={t.projectsTitle}
        description={t.projectsDesc}
        breadcrumbs={[{ label: t.home, href: "/" }, { label: projectsLabel }]}
      />

      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">{t.galleryEyebrow}</p>
            <h2 className="heading-display mt-3 text-3xl md:text-4xl">
              {t.projectsGalleryTitle}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group overflow-hidden border border-[#eee] bg-[#F8F8F8]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.location}`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <span className="absolute top-3 right-3 bg-[var(--gold)] px-3 py-1 text-xs font-bold text-[#0f0f0f]">
                    {project.category}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold text-[#888]">{project.location}</p>
                  <h3 className="mt-1 text-lg font-bold text-[#0f0f0f]">{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ClientsGrid asSection />
    </>
  );
}
