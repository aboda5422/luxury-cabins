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

const siteUrl = "https://luxurycabins.sa";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await readCms();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${cms.site.nameAr} | ${cms.site.nameEn} — تأجير وبيع وتصنيع الوحدات المتنقلة`,
      template: `%s | ${cms.site.nameAr}`,
    },
    description: cms.site.description,
    icons: {
      icon: "/logo/favicon.png",
      apple: "/logo/logo-icon.png",
    },
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: cms.site.nameAr,
    alternateName: [cms.site.nameEn, cms.site.legalName],
    url: siteUrl,
    logo: `${siteUrl}/logo/logo.png`,
    description: cms.site.description,
    telephone: cms.site.phone,
    email: cms.site.email,
  };

  return (
    <html lang={locale} dir={localeDir(locale)} className={`${noto.variable} ${cairo.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
