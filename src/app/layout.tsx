import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Cairo, Noto_Sans_Arabic } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { CmsProvider } from "@/components/CmsProvider";
import { LocaleProvider } from "@/components/LocaleProvider";
import { readCms } from "@/lib/cms/store";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isLocale,
  localeDir,
  type Locale,
} from "@/lib/i18n/config";
import "./globals.css";

export const revalidate = 120;

const noto = Noto_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-noto",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

const siteUrl = "https://luxurycabins.com.sa";

export async function generateMetadata(): Promise<Metadata> {
  let cms;
  try {
    cms = await readCms();
  } catch {
    const { getDefaultCms } = await import("@/lib/cms/defaults");
    cms = getDefaultCms();
  }

  const title = `${cms.site.nameAr} | ${cms.site.nameEn} — تأجير وبيع وتصنيع الوحدات المتنقلة`;
  const description = cms.site.description;
  const ogImage = "/og-luxury-cabins-saudi.webp";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${cms.site.nameAr}`,
    },
    description,
    applicationName: cms.site.nameAr,
    keywords: [
      "كبائن",
      "وحدات متنقلة",
      "تأجير كبائن",
      "تصنيع كبائن",
      "بركسات",
      "كرفانات",
      "Luxury Cabins",
      "السعودية",
      "كبائن الرياض",
      "تأجير كبائن جدة",
      "وحدات متنقلة الدمام",
      "كبائن مكة",
      "كبائن المدينة المنورة",
    ],
    authors: [{ name: cms.site.legalName || cms.site.nameAr }],
    creator: cms.site.nameAr,
    publisher: cms.site.nameAr,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/logo/favicon.ico", sizes: "any" },
        { url: "/logo/favicon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: ["/favicon.ico", "/logo/favicon.ico"],
    },
    openGraph: {
      type: "website",
      locale: "ar_SA",
      url: siteUrl,
      siteName: `${cms.site.nameAr} | ${cms.site.nameEn}`,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${cms.site.nameAr} — ${cms.site.tagline}`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

async function readLocale(): Promise<Locale> {
  const jar = await cookies();
  const value = jar.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let cms;
  try {
    cms = await readCms();
  } catch (err) {
    console.error("[layout] CMS load failed:", err);
    const { getDefaultCms } = await import("@/lib/cms/defaults");
    cms = getDefaultCms();
  }

  const locale = await readLocale();

  const gbpUrl = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL?.trim();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: cms.site.nameAr,
    alternateName: [cms.site.nameEn, cms.site.legalName].filter(Boolean),
    url: siteUrl,
    logo: `${siteUrl}/logo/logo.png`,
    description: cms.site.description,
    telephone: cms.site.phone,
    email: cms.site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "الرياض",
      addressCountry: "SA",
    },
    areaServed: "SA",
    sameAs: [
      ...Object.values(cms.site.social || {}).filter(Boolean),
      ...(gbpUrl ? [gbpUrl] : []),
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: cms.site.nameAr,
    alternateName: cms.site.nameEn,
    url: siteUrl,
    image: `${siteUrl}/og-luxury-cabins-saudi.webp`,
    logo: `${siteUrl}/logo/logo.png`,
    description: cms.site.description,
    telephone: cms.site.phone,
    email: cms.site.email,
    parentOrganization: { "@id": `${siteUrl}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: cms.site.addressDetail || cms.site.address,
      addressLocality: "الرياض",
      addressCountry: "SA",
    },
    areaServed: (cms.site.cities || []).map((city) => ({
      "@type": "City",
      name: city.nameAr,
    })),
    priceRange: "$$",
    ...(gbpUrl ? { hasMap: gbpUrl } : {}),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: cms.site.nameAr,
    alternateName: cms.site.nameEn,
    url: siteUrl,
    inLanguage: ["ar", "en"],
    publisher: { "@id": `${siteUrl}/#organization` },
    about: { "@id": `${siteUrl}/#localbusiness` },
  };

  const schemas = [organizationSchema, localBusinessSchema, websiteSchema];

  return (
    <html lang={locale} dir={localeDir(locale)} className={`${noto.variable} ${cairo.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
        <LocaleProvider initialLocale={locale}>
          <CmsProvider value={cms}>
            <SiteShell>{children}</SiteShell>
          </CmsProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
