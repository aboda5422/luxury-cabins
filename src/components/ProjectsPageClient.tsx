"use client";

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ClientsGrid } from "@/components/ClientsGrid";
import { useLocalizedCms } from "@/components/CmsProvider";
import { useLocale } from "@/components/LocaleProvider";
import { cityPath } from "@/lib/seo/cities";

export function ProjectsPageClient() {
  const { projects, navLinks, pageHeroImages, site } = useLocalizedCms();
  const { t, locale } = useLocale();
  const projectsLabel =
    navLinks.find((l) => l.href === "/projects")?.label || t.projectsEyebrow;
  const cities = site.cities || [];

  return (
    <>
      <PageHero
        eyebrow={t.projectsEyebrow}
        title={t.projectsTitle}
        description={t.projectsDesc}
        backgroundImage={pageHeroImages.projects}
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
                  {/* CMS images may be absolute Supabase URLs; native img avoids deploy-gated remotePatterns. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={`${project.title} في ${project.location} — مشروع وحدات متنقلة`}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
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

      {cities.length ? (
        <section className="section-pad bg-[#F8F8F8]">
          <div className="container-site">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">{t.projectsCitiesEyebrow}</p>
                <h2 className="heading-display mt-3 text-3xl md:text-4xl">
                  {t.projectsCitiesTitle}
                </h2>
                <p className="mt-4 leading-8 text-[#666]">{t.projectsCitiesDesc}</p>
              </div>
              <Link
                href="/locations"
                className="shrink-0 text-sm font-bold text-[var(--gold)] transition hover:underline"
              >
                {t.projectsCitiesAll}
              </Link>
            </div>

            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={cityPath(city.slug)}
                  className="group flex items-baseline justify-between gap-3 border-b border-[#e5e1db] py-3 transition hover:border-[var(--gold)]"
                >
                  <span className="font-bold text-[#1a1a1a] transition group-hover:text-[var(--gold)]">
                    {locale === "en" ? city.nameEn : city.nameAr}
                  </span>
                  <span className="text-xs text-[#999]">
                    {locale === "en" ? city.regionEn : city.regionAr}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ClientsGrid asSection />
    </>
  );
}
