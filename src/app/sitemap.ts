import type { MetadataRoute } from "next";
import { readCms } from "@/lib/cms/store";
import { cityPath } from "@/lib/seo/cities";
import { productPath } from "@/lib/seo/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://luxurycabins.com.sa";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/rental`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/manufacturing`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/locations`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const cms = await readCms();

  const cityRoutes: MetadataRoute.Sitemap = cms.site.cities.map((city) => ({
    url: `${base}${cityPath(city.slug)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: city.priority === "primary" ? 0.85 : 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = cms.catalogProducts.map((product) => ({
    url: `${base}${productPath(product)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...cityRoutes, ...productRoutes];
}
