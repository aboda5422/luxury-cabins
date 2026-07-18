import { readCms } from "@/lib/cms/store";
import { cityPath } from "@/lib/seo/cities";
import { productPath } from "@/lib/seo/products";
import { rentalPath } from "@/lib/seo/rentals";

export const runtime = "nodejs";

const BASE = "https://luxurycabins.com.sa";

function abs(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${BASE}${url.startsWith("/") ? url : `/${url}`}`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function imageBlock(loc: string, title?: string, caption?: string): string {
  const absolute = abs(loc);
  if (!absolute) return "";
  const parts = [`<image:image>`, `<image:loc>${escapeXml(absolute)}</image:loc>`];
  if (title?.trim()) parts.push(`<image:title>${escapeXml(title.trim())}</image:title>`);
  if (caption?.trim()) parts.push(`<image:caption>${escapeXml(caption.trim())}</image:caption>`);
  parts.push(`</image:image>`);
  return parts.join("");
}

function urlEntry(pageUrl: string, images: string[]): string {
  if (!images.length) {
    return `<url><loc>${escapeXml(pageUrl)}</loc></url>`;
  }
  return `<url><loc>${escapeXml(pageUrl)}</loc>${images.join("")}</url>`;
}

export async function GET() {
  const cms = await readCms();
  const entries: string[] = [];

  entries.push(
    urlEntry(`${BASE}/`, [
      imageBlock(cms.home.heroImage, cms.home.heroTitle, cms.home.heroSubtitle),
      imageBlock(cms.home.visionImage, cms.home.visionTitle, cms.home.visionBody),
      ...cms.services.map((s) => imageBlock(s.image, s.title, s.short)),
      ...cms.sampleClients
        .filter((c) => c.logo)
        .map((c) => imageBlock(c.logo!, `شعار شريك النجاح ${c.name}`, c.sector)),
    ].filter(Boolean)),
  );

  entries.push(
    urlEntry(`${BASE}/about`, [
      imageBlock(cms.about.sideImage, cms.about.whoTitle, cms.about.heroDescription),
      imageBlock(cms.pageHeroImages.about, cms.about.heroTitle),
    ].filter(Boolean)),
  );

  entries.push(
    urlEntry(`${BASE}/services`, [
      imageBlock(cms.pageHeroImages.services, "الخدمات"),
      ...cms.services.map((s) => imageBlock(s.image, s.title, s.short)),
      imageBlock(cms.home.visionImage, cms.home.visionTitle),
    ].filter(Boolean)),
  );

  entries.push(
    urlEntry(`${BASE}/rental`, [
      imageBlock(cms.pageHeroImages.rental, "التأجير", cms.rentalPage.heroDescription),
      ...cms.rentalCategories.flatMap((c) =>
        (c.images || []).map((img) => imageBlock(img, c.title, c.shortDescription)),
      ),
    ].filter(Boolean)),
  );

  for (const category of cms.rentalCategories) {
    entries.push(
      urlEntry(`${BASE}${rentalPath(category)}`, [
        ...(category.images || []).map((img) =>
          imageBlock(img, category.seoTitle || category.title, category.seoDescription || category.shortDescription),
        ),
      ].filter(Boolean)),
    );
  }

  entries.push(
    urlEntry(`${BASE}/manufacturing`, [
      imageBlock(cms.pageHeroImages.manufacturing, cms.manufacturingPage.heroTitle),
      imageBlock(cms.manufacturingPage.introImage, cms.manufacturingPage.introTitle),
      ...cms.catalogProducts.flatMap((p) =>
        (p.images || []).slice(0, 1).map((img) => imageBlock(img, p.title, p.shortDescription)),
      ),
    ].filter(Boolean)),
  );

  for (const product of cms.catalogProducts) {
    entries.push(
      urlEntry(`${BASE}${productPath(product)}`, [
        ...(product.images || []).map((img) =>
          imageBlock(img, product.seoTitle || product.title, product.seoDescription || product.shortDescription),
        ),
      ].filter(Boolean)),
    );
  }

  entries.push(
    urlEntry(`${BASE}/projects`, [
      imageBlock(cms.pageHeroImages.projects, "المشاريع"),
      ...cms.projects.map((p) => imageBlock(p.image, `${p.title} — ${p.location}`, p.category)),
    ].filter(Boolean)),
  );

  entries.push(
    urlEntry(`${BASE}/locations`, [
      imageBlock(cms.pageHeroImages.locations, "مناطق الخدمة"),
    ].filter(Boolean)),
  );

  for (const city of cms.site.cities) {
    const hero = city.heroImage || cms.pageHeroImages.locations;
    entries.push(
      urlEntry(`${BASE}${cityPath(city.slug)}`, [
        imageBlock(hero, `خدمات الوحدات المتنقلة في ${city.nameAr}`, city.regionAr),
      ].filter(Boolean)),
    );
  }

  entries.push(
    urlEntry(`${BASE}/contact`, [
      imageBlock(cms.pageHeroImages.contact, cms.contactPage.heroTitle),
    ].filter(Boolean)),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
