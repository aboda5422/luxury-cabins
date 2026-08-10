import type { MetadataRoute } from "next";
import { readCms } from "@/lib/cms/store";
import { cityPath } from "@/lib/seo/cities";
import { productPath } from "@/lib/seo/products";
import { rentalPath } from "@/lib/seo/rentals";
import {
  SITE_ORIGIN,
  absoluteUrl,
  isLegacySitemapPath,
  normalizeInternalHref,
} from "@/lib/seo/urls";

function absImage(url: string | undefined): string | null {
  if (!url?.trim()) return null;
  if (url.startsWith("https://")) return url;
  if (url.startsWith("http://")) return url.replace(/^http:\/\//i, "https://");
  return absoluteUrl(url);
}

function images(...urls: Array<string | undefined | null>): string[] {
  return urls.map((u) => absImage(u || undefined)).filter((u): u is string => Boolean(u));
}

function pageEntry(
  path: string,
  opts: Omit<MetadataRoute.Sitemap[number], "url">,
): MetadataRoute.Sitemap[number] | null {
  const normalized = normalizeInternalHref(path);
  if (isLegacySitemapPath(normalized)) return null;
  return {
    url: absoluteUrl(normalized),
    ...opts,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const cms = await readCms();

  const staticRoutes = [
    pageEntry("/", {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: images(
        cms.home.heroImage,
        cms.home.visionImage,
        ...cms.services.map((s) => s.image),
        ...cms.sampleClients.map((c) => c.logo),
      ),
    }),
    pageEntry("/about", {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      images: images(cms.pageHeroImages.about, cms.about.sideImage),
    }),
    pageEntry("/services", {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      images: images(cms.pageHeroImages.services, ...cms.services.map((s) => s.image)),
    }),
    pageEntry("/rental", {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      images: images(
        cms.pageHeroImages.rental,
        ...cms.rentalCategories.flatMap((c) => c.images || []),
      ),
    }),
    pageEntry("/manufacturing", {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      images: images(
        cms.pageHeroImages.manufacturing,
        cms.manufacturingPage.introImage,
        ...cms.catalogProducts.flatMap((p) => (p.images || []).slice(0, 1)),
      ),
    }),
    pageEntry("/projects", {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      images: images(cms.pageHeroImages.projects, ...cms.projects.map((p) => p.image)),
    }),
    pageEntry("/locations", {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      images: images(cms.pageHeroImages.locations),
    }),
    pageEntry("/faq", {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      images: images(cms.pageHeroImages.faq),
    }),
    pageEntry("/contact", {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      images: images(cms.pageHeroImages.contact),
    }),
  ].filter(Boolean) as MetadataRoute.Sitemap;

  const cityRoutes = cms.site.cities
    .map((city) =>
      pageEntry(cityPath(city.slug), {
        lastModified: now,
        changeFrequency: "weekly",
        priority: city.priority === "primary" ? 0.85 : 0.7,
        images: images(city.heroImage || cms.pageHeroImages.locations),
      }),
    )
    .filter(Boolean) as MetadataRoute.Sitemap;

  const productRoutes = cms.catalogProducts
    .map((product) =>
      pageEntry(productPath(product), {
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
        images: images(...(product.images || [])),
      }),
    )
    .filter(Boolean) as MetadataRoute.Sitemap;

  const rentalRoutes = cms.rentalCategories
    .map((category) =>
      pageEntry(rentalPath(category), {
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.75,
        images: images(...(category.images || [])),
      }),
    )
    .filter(Boolean) as MetadataRoute.Sitemap;

  // Dedupe by final HTTPS URL
  const seen = new Set<string>();
  const all = [...staticRoutes, ...cityRoutes, ...productRoutes, ...rentalRoutes].filter(
    (entry) => {
      if (!entry.url.startsWith(SITE_ORIGIN)) return false;
      if (seen.has(entry.url)) return false;
      seen.add(entry.url);
      return true;
    },
  );

  return all;
}
