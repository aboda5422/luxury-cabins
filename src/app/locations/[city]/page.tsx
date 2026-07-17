import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { readCms } from "@/lib/cms/store";
import {
  cityDescriptionAr,
  cityTitleAr,
  cityPath,
  getCityBySlug,
} from "@/lib/seo/cities";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";
import { productPath } from "@/lib/seo/products";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ city: string }>;
};

export async function generateStaticParams() {
  const cms = await readCms();
  return cms.site.cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const cms = await readCms();
  const city = getCityBySlug(slug, cms.site.cities);
  if (!city) return { title: "المدينة غير موجودة" };

  const title = cityTitleAr(city);
  const description = cityDescriptionAr(city, cms.site.nameAr || siteConfig.nameAr);

  return {
    title,
    description,
    alternates: { canonical: cityPath(city.slug) },
    keywords: [
      `كبائن ${city.nameAr}`,
      `تأجير كبائن ${city.nameAr}`,
      `تصنيع كبائن ${city.nameAr}`,
      `وحدات متنقلة ${city.nameAr}`,
      `بركسات ${city.nameAr}`,
      city.nameEn,
    ],
    openGraph: {
      title,
      description,
      url: cityPath(city.slug),
      locale: "ar_SA",
    },
  };
}

export default async function CityLocationPage({ params }: Props) {
  const { city: slug } = await params;
  const cms = await readCms();
  const cities = cms.site.cities;
  const city = getCityBySlug(slug, cities);
  if (!city) notFound();

  const brand = cms.site.nameAr || siteConfig.nameAr;
  const title = cityTitleAr(city);
  const description = cityDescriptionAr(city, brand);

  const productLinks = [
    { label: "كبائن متنقلة", matchIds: ["portable-cabins"] },
    { label: "غرف حراسة", matchIds: ["guard-rooms"] },
    { label: "كرفانات", matchIds: ["caravans"] },
    { label: "بركسات", matchIds: ["barracks"] },
    { label: "مكاتب جاهزة", matchIds: ["offices"] },
  ]
    .map((item) => {
      const product = cms.catalogProducts.find((p) => item.matchIds.includes(p.id));
      return product ? { label: item.label, href: productPath(product) } : null;
    })
    .filter(Boolean) as { label: string; href: string }[];

  const schemas = [
    breadcrumbSchema([
      { name: "الرئيسية", path: "/" },
      { name: "المدن", path: "/locations" },
      { name: city.nameAr },
    ]),
    serviceSchema({
      name: title,
      description,
      path: cityPath(city.slug),
      serviceType: "Cabin rental, sales, and manufacturing",
      areaServed: [city.nameAr, city.nameEn].filter(Boolean),
    }),
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `https://luxurycabins.com.sa${cityPath(city.slug)}#localbusiness`,
      name: brand,
      url: `https://luxurycabins.com.sa${cityPath(city.slug)}`,
      parentOrganization: { "@id": "https://luxurycabins.com.sa/#organization" },
      telephone: cms.site.phone || siteConfig.phone,
      email: cms.site.email || siteConfig.email,
      areaServed: {
        "@type": "City",
        name: city.nameAr,
        ...(city.regionAr
          ? {
              containedInPlace: {
                "@type": "AdministrativeArea",
                name: city.regionAr,
              },
            }
          : {}),
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: city.nameAr,
        ...(city.regionAr ? { addressRegion: city.regionAr } : {}),
        addressCountry: "SA",
      },
    },
  ];

  const services = [
    ...productLinks.slice(0, 2).map((link) => ({
      href: link.href,
      title: `${link.label} في ${city.nameAr}`,
      body: `حلول ${link.label} للمشاريع والمواقع مع توريد وتركيب في ${city.nameAr}.`,
    })),
    {
      href: "/rental",
      title: `تأجير كبائن في ${city.nameAr}`,
      body: `وحدات متنقلة وخيام أوروبية جاهزة للتشغيل للمشاريع والفعاليات في ${city.nameAr}.`,
    },
    {
      href: "/manufacturing",
      title: `بيع وتصنيع كبائن في ${city.nameAr}`,
      body: `تصنيع وبيع وحدات حسب المواصفات مع توريد وتركيب${city.regionAr ? ` يخدم ${city.regionAr}` : ""}.`,
    },
    {
      href: "/services",
      title: `حلول متكاملة لـ ${city.nameAr}`,
      body: "من الاستشارة والتصميم حتى التسليم والدعم الميداني.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <PageHero
        eyebrow={city.regionAr || undefined}
        title={title}
        description={description}
        backgroundImage={city.heroImage || cms.pageHeroImages.locations}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المدن", href: "/locations" },
          { label: city.nameAr },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl">
          <h2 className="heading-display text-2xl md:text-3xl">
            لماذا {brand} في {city.nameAr}؟
          </h2>
          <p className="mt-4 leading-8 text-[#555]">
            نقدّم تغطية لوجستية وتشغيلية لمشاريعكم في {city.nameAr}
            {city.regionAr ? ` و${city.regionAr}` : ""}، مع حلول مرنة للتأجير أو التمليك أو
            التصنيع حسب الحاجة. سواء كان المشروع مؤقتاً لفعالية، أو دائماً لموقع تشغيلي، نصمّم
            العرض بما يناسب الجدول الزمني والميزانية ومتطلبات الموقع.
          </p>
          {productLinks.length ? (
            <p className="mt-5 leading-8 text-[#555]">
              نوفر أفضل{" "}
              {productLinks.map((link, index) => (
                <span key={link.href}>
                  {index > 0 ? (index === productLinks.length - 1 ? " و" : "، ") : null}
                  <Link
                    href={link.href}
                    className="font-bold text-[#1a1a1a] underline decoration-[var(--gold)] underline-offset-4 transition hover:text-[var(--gold)]"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}{" "}
              في مدينة {city.nameAr} مع توريد وتركيب ودعم ميداني.
            </p>
          ) : null}
          <ul className="mt-6 space-y-3 text-[#444]">
            <li className="flex gap-2">
              <span className="text-[var(--gold)]">•</span>
              استجابة سريعة لطلبات التأجير والتوريد داخل {city.nameAr}
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--gold)]">•</span>
              وحدات مكتبية، سكنية، وصالات وخيام للفعاليات والمشاريع
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--gold)]">•</span>
              دعم التركيب والتشغيل مع فريق يفهم متطلبات السوق السعودي
            </li>
          </ul>
        </div>
      </section>

      <section className="section-pad bg-[#F8F8F8]">
        <div className="container-site">
          <h2 className="heading-display mb-8 text-2xl md:text-3xl">خدماتنا في {city.nameAr}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white px-6 py-7 transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
              >
                <h3 className="text-lg font-extrabold text-[#1a1a1a]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#666]">{item.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-site">
          <h2 className="heading-display mb-6 text-2xl md:text-3xl">مدن أخرى نخدمها</h2>
          <div className="flex flex-wrap gap-3">
            {cities
              .filter((c) => c.slug !== city.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={cityPath(c.slug)}
                  className="border border-[#e8e4de] px-4 py-2 text-sm font-semibold text-[#444] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                >
                  {c.nameAr}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`اطلب عرض سعر لمشروعك في ${city.nameAr}`}
        primaryLabel="تواصل الآن"
        primaryHref="/contact"
      />
    </>
  );
}
