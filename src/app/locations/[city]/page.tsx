import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import {
  SEO_CITIES,
  cityDescriptionAr,
  cityTitleAr,
  cityPath,
  getCityBySlug,
} from "@/lib/seo/cities";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return SEO_CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return { title: "المدينة غير موجودة" };

  const title = cityTitleAr(city);
  const description = cityDescriptionAr(city, siteConfig.nameAr);

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
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const title = cityTitleAr(city);
  const description = cityDescriptionAr(city, siteConfig.nameAr);

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
      areaServed: [city.nameAr, city.nameEn],
    }),
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: siteConfig.nameAr,
      url: `https://luxurycabins.com.sa${cityPath(city.slug)}`,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      areaServed: {
        "@type": "City",
        name: city.nameAr,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: city.regionAr,
        },
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: city.nameAr,
        addressRegion: city.regionAr,
        addressCountry: "SA",
      },
    },
  ];

  const services = [
    {
      href: "/rental",
      title: `تأجير كبائن في ${city.nameAr}`,
      body: `وحدات متنقلة وخيام أوروبية جاهزة للتشغيل للمشاريع والفعاليات في ${city.nameAr}.`,
    },
    {
      href: "/manufacturing",
      title: `بيع وتصنيع كبائن في ${city.nameAr}`,
      body: `تصنيع وبيع وحدات حسب المواصفات مع توريد وتركيب يخدم ${city.regionAr}.`,
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
        eyebrow={city.regionAr}
        title={title}
        description={description}
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "المدن", href: "/locations" },
          { label: city.nameAr },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-site max-w-4xl">
          <h2 className="heading-display text-2xl md:text-3xl">
            لماذا {siteConfig.nameAr} في {city.nameAr}؟
          </h2>
          <p className="mt-4 leading-8 text-[#555]">
            نقدّم تغطية لوجستية وتشغيلية لمشاريعكم في {city.nameAr} و{city.regionAr}،
            مع حلول مرنة للتأجير أو التمليك أو التصنيع حسب الحاجة. سواء كان المشروع
            مؤقتاً لفعالية، أو دائماً لموقع تشغيلي، نصمّم العرض بما يناسب الجدول الزمني
            والميزانية ومتطلبات الموقع.
          </p>
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
          <div className="grid gap-5 md:grid-cols-3">
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
            {SEO_CITIES.filter((c) => c.slug !== city.slug).map((c) => (
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
