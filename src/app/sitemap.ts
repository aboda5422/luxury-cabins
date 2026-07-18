import type { MetadataRoute } from "next";
import { readCms } from "@/lib/cms/store";
import { cityPath } from "@/lib/seo/cities";
import { productPath } from "@/lib/seo/products";
import { rentalPath } from "@/lib/seo/rentals";

const BASE = "https://luxurycabins.com.sa";

function abs(url: string | undefined): string | null {
  if (!url?.trim()) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${BASE}${url.startsWith("/") ? url : `/${url}`}`;
}

function images(...urls: Array<string | undefined | null>): string[] {
  return urls.map((u) => abs(u || undefined)).filter((u): u is string => Boolean(u));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const cms = await readCms();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: images(
        cms.home.heroImage,
        cms.home.visionImage,
        ...cms.services.map((s) => s.image),
        ...cms.sampleClients.map((c) => c.logo),
      ),
    },
    {
      url: `${BASE}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      images: images(cms.pageHeroImages.about, cms.about.sideImage),
    },
    {
      url: `${BASE}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      images: images(cms.pageHeroImages.services, ...cms.services.map((s) => s.image)),
    },
    {
      url: `${BASE}/rental`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      images: images(
        cms.pageHeroImages.rental,
        ...cms.rentalCategories.flatMap((c) => c.images || []),
      ),
    },
    {
      url: `${BASE}/manufacturing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      images: images(
        cms.pageHeroImages.manufacturing,
        cms.manufacturingPage.introImage,
        ...cms.catalogProducts.flatMap((p) => (p.images || []).slice(0, 1)),
      ),
    },
    {
      url: `${BASE}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      images: images(cms.pageHeroImages.projects, ...cms.projects.map((p) => p.image)),
    },
    {
      url: `${BASE}/locations`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      images: images(cms.pageHeroImages.locations),
    },
    {
      url: `${BASE}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      images: images(cms.pageHeroImages.faq),
    },
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      images: images(cms.pageHeroImages.contact),
    },
  ];

  const cityRoutes: MetadataRoute.Sitemap = cms.site.cities.map((city) => ({
    url: `${BASE}${cityPath(city.slug)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: city.priority === "primary" ? 0.85 : 0.7,
    images: images(city.heroImage || cms.pageHeroImages.locations),
  }));

  const productRoutes: MetadataRoute.Sitemap = cms.catalogProducts.map((product) => ({
    url: `${BASE}${productPath(product)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
    images: images(...(product.images || [])),
  }));

  const rentalRoutes: MetadataRoute.Sitemap = cms.rentalCategories.map((category) => ({
    url: `${BASE}${rentalPath(category)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
    images: images(...(category.images || [])),
  }));

  return [...staticRoutes, ...cityRoutes, ...productRoutes, ...rentalRoutes];
}
