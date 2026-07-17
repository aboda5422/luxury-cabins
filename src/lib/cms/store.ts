import { promises as fs } from "fs";
import path from "path";
import { getDefaultCms } from "./defaults";
import type { AnalyticsData, CmsData, NavLink } from "./types";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { normalizeCities } from "@/lib/seo/cities";
import { normalizeCatalogProducts } from "@/lib/seo/products";

const DATA_DIR = path.join(process.cwd(), "data");
const CMS_FILE = path.join(DATA_DIR, "cms.json");
const ANALYTICS_FILE = path.join(DATA_DIR, "analytics.json");
const CMS_ROW_ID = "main";
const ANALYTICS_ROW_ID = "main";

function ensureServicesNav(links: NavLink[]): NavLink[] {
  if (links.some((l) => l.href === "/services")) return links;
  const next = links.map((l) => ({ ...l }));
  const aboutIdx = next.findIndex((l) => l.href === "/about");
  const item = { href: "/services", label: "الخدمات" };
  if (aboutIdx >= 0) next.splice(aboutIdx + 1, 0, item);
  else next.splice(1, 0, item);
  return next;
}

function mergeCms(defaults: CmsData, parsed: Partial<CmsData>): CmsData {
  return {
    ...defaults,
    ...parsed,
    site: {
      ...defaults.site,
      ...(parsed.site || {}),
      social: {
        ...defaults.site.social,
        ...((parsed.site as CmsData["site"] | undefined)?.social || {}),
      },
      cities: normalizeCities(parsed.site?.cities, defaults.site.cities),
    },
    home: { ...defaults.home, ...(parsed.home || {}) },
    pageHeroImages: {
      ...defaults.pageHeroImages,
      ...(parsed.pageHeroImages || {}),
    },
    about: { ...defaults.about, ...(parsed.about || {}) },
    rentalPage: { ...defaults.rentalPage, ...(parsed.rentalPage || {}) },
    manufacturingPage: {
      ...defaults.manufacturingPage,
      ...(parsed.manufacturingPage || {}),
    },
    contactPage: {
      ...defaults.contactPage,
      ...(parsed.contactPage || {}),
      heroTitle:
        parsed.contactPage?.heroTitle ||
        parsed.home?.contactTitle ||
        defaults.contactPage.heroTitle,
      heroDescription:
        parsed.contactPage?.heroDescription ||
        parsed.home?.contactSubtitle ||
        defaults.contactPage.heroDescription,
    },
    footer: { ...defaults.footer, ...(parsed.footer || {}) },
    navLinks: ensureServicesNav(
      parsed.navLinks?.length ? parsed.navLinks : defaults.navLinks,
    ),
    services: parsed.services?.length ? parsed.services : defaults.services,
    processSteps: parsed.processSteps?.length
      ? parsed.processSteps
      : defaults.processSteps,
    catalogProducts: (() => {
      const REMOVED_PRODUCT_IDS = new Set(["portable-cabins", "guard-rooms"]);
      const incoming = parsed.catalogProducts?.length
        ? parsed.catalogProducts
        : defaults.catalogProducts;
      const normalized = normalizeCatalogProducts(incoming).filter(
        (p) => !REMOVED_PRODUCT_IDS.has(p.id) && !REMOVED_PRODUCT_IDS.has(p.slug || ""),
      );
      const byId = new Map(normalized.map((p) => [p.id, p]));
      // Fill empty SEO fields from defaults for products that still exist — never re-add deleted ones
      for (const def of defaults.catalogProducts) {
        if (REMOVED_PRODUCT_IDS.has(def.id)) continue;
        const existing = byId.get(def.id);
        if (!existing) continue;
        byId.set(def.id, {
          ...existing,
          slug: existing.slug || def.slug,
          seoTitle: existing.seoTitle || def.seoTitle,
          seoDescription: existing.seoDescription || def.seoDescription,
          h1: existing.h1 || def.h1,
          seoKeywords:
            existing.seoKeywords?.length ? existing.seoKeywords : def.seoKeywords || [],
        });
      }
      return normalizeCatalogProducts(Array.from(byId.values()));
    })(),
    rentalCategories: parsed.rentalCategories?.length
      ? parsed.rentalCategories
      : defaults.rentalCategories,
    manufacturingExtras: parsed.manufacturingExtras?.length
      ? parsed.manufacturingExtras
      : defaults.manufacturingExtras,
    projects: parsed.projects?.length ? parsed.projects : defaults.projects,
    sampleClients: (() => {
      const incoming = parsed.sampleClients?.map((c) => ({
        name: c.name || "",
        nameEn: c.nameEn || "",
        sector: c.sector || "",
        logo: c.logo || "",
      }));
      const defaultsHaveLogos = defaults.sampleClients.some((c) => c.logo);
      const incomingHasLogos = Boolean(incoming?.some((c) => c.logo));
      let clients =
        !incoming?.length || (defaultsHaveLogos && !incomingHasLogos)
          ? defaults.sampleClients
          : incoming;

      const hasKidana = clients.some(
        (c) =>
          c.name === "كدانة" ||
          c.nameEn?.toUpperCase() === "KIDANA" ||
          c.logo?.includes("partner-24"),
      );
      if (!hasKidana) {
        const kidana = defaults.sampleClients.find(
          (c) => c.name === "كدانة" || c.nameEn?.toUpperCase() === "KIDANA",
        ) || {
          name: "كدانة",
          nameEn: "KIDANA",
          sector: "عقارات وتطوير",
          logo: "/images/clients/partner-24.png",
        };
        const cultureIdx = clients.findIndex(
          (c) => c.name === "وزارة الثقافة" || c.nameEn === "Ministry of Culture",
        );
        clients = [...clients];
        if (cultureIdx >= 0) clients.splice(cultureIdx + 1, 0, { ...kidana });
        else clients.push({ ...kidana });
      }

      return clients;
    })(),
    faqs: parsed.faqs?.length ? parsed.faqs : defaults.faqs,
    aboutStats: parsed.aboutStats?.length
      ? parsed.aboutStats
      : defaults.aboutStats,
    updatedAt: parsed.updatedAt || defaults.updatedAt,
  };
}

async function tryMkdir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

async function readBundledCms(): Promise<Partial<CmsData> | null> {
  try {
    const mod = await import("../../../data/cms.json");
    return (mod.default ?? mod) as Partial<CmsData>;
  } catch {
    return null;
  }
}

async function readCmsFromSupabase(): Promise<CmsData | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("cms_state")
    .select("data")
    .eq("id", CMS_ROW_ID)
    .maybeSingle();

  if (error) {
    console.warn("[cms] supabase readCms:", error.message);
    return null;
  }

  if (data?.data) {
    return mergeCms(getDefaultCms(), data.data as Partial<CmsData>);
  }

  // First run: seed from bundled snapshot so Workers have content immediately.
  const bundled = (await readBundledCms()) || {};
  const seeded = mergeCms(getDefaultCms(), bundled);
  seeded.updatedAt = new Date().toISOString();
  await writeCmsToSupabase(seeded);
  return seeded;
}

async function writeCmsToSupabase(next: CmsData): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

  const { error } = await supabase.from("cms_state").upsert({
    id: CMS_ROW_ID,
    data: next,
    updated_at: next.updatedAt,
  });

  if (error) {
    console.warn("[cms] supabase writeCms:", error.message);
    return false;
  }
  return true;
}

async function readAnalyticsFromSupabase(): Promise<AnalyticsData | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("analytics_state")
    .select("data")
    .eq("id", ANALYTICS_ROW_ID)
    .maybeSingle();

  if (error) {
    console.warn("[cms] supabase readAnalytics:", error.message);
    return null;
  }
  if (!data?.data) return null;
  return { ...emptyAnalytics(), ...(data.data as AnalyticsData) };
}

async function writeAnalyticsToSupabase(data: AnalyticsData): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

  const { error } = await supabase.from("analytics_state").upsert({
    id: ANALYTICS_ROW_ID,
    data,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.warn("[cms] supabase writeAnalytics:", error.message);
    return false;
  }
  return true;
}

/** Prefer Supabase on Workers; fall back to local/bundled files. */
export async function readCms(): Promise<CmsData> {
  const defaults = getDefaultCms();

  if (isSupabaseConfigured()) {
    const remote = await readCmsFromSupabase();
    if (remote) return remote;
  }

  try {
    await tryMkdir();
    const raw = await fs.readFile(CMS_FILE, "utf8");
    return mergeCms(defaults, JSON.parse(raw) as Partial<CmsData>);
  } catch {
    const bundled = await readBundledCms();
    if (bundled) return mergeCms(defaults, bundled);
    return defaults;
  }
}

export async function writeCms(data: CmsData): Promise<CmsData> {
  const next = { ...data, updatedAt: new Date().toISOString() };

  if (isSupabaseConfigured()) {
    const ok = await writeCmsToSupabase(next);
    if (ok) return next;
  }

  try {
    if (!(await tryMkdir())) return next;
    await fs.writeFile(CMS_FILE, JSON.stringify(next, null, 2), "utf8");
  } catch (err) {
    console.warn("[cms] writeCms skipped (read-only runtime):", err);
  }
  return next;
}

export function emptyAnalytics(): AnalyticsData {
  return {
    totalViews: 0,
    totalVisitors: 0,
    pages: {},
    daily: [],
    recent: [],
  };
}

export async function readAnalytics(): Promise<AnalyticsData> {
  if (isSupabaseConfigured()) {
    const remote = await readAnalyticsFromSupabase();
    if (remote) return remote;
  }

  try {
    await tryMkdir();
    const raw = await fs.readFile(ANALYTICS_FILE, "utf8");
    return { ...emptyAnalytics(), ...JSON.parse(raw) };
  } catch {
    return emptyAnalytics();
  }
}

export async function writeAnalytics(data: AnalyticsData): Promise<void> {
  if (isSupabaseConfigured()) {
    const ok = await writeAnalyticsToSupabase(data);
    if (ok) return;
  }

  try {
    if (!(await tryMkdir())) return;
    await fs.writeFile(ANALYTICS_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.warn("[cms] writeAnalytics skipped (read-only runtime):", err);
  }
}

export async function trackPageView(pathName: string, visitorId: string) {
  try {
    const data = await readAnalytics();
    const today = new Date().toISOString().slice(0, 10);
    const pathKey = pathName || "/";

    data.totalViews += 1;
    data.pages[pathKey] = (data.pages[pathKey] || 0) + 1;

    let day = data.daily.find((d) => d.date === today);
    if (!day) {
      day = { date: today, views: 0, visitors: 0 };
      data.daily.push(day);
    }
    day.views += 1;

    const seenToday = data.recent.some(
      (r) => r.visitorId === visitorId && r.at.startsWith(today),
    );
    if (!seenToday) {
      data.totalVisitors += 1;
      day.visitors += 1;
    }

    data.recent.unshift({
      path: pathKey,
      at: new Date().toISOString(),
      visitorId,
    });
    data.recent = data.recent.slice(0, 200);
    data.daily = data.daily.slice(-60);

    await writeAnalytics(data);
    return data;
  } catch (err) {
    console.warn("[cms] trackPageView skipped:", err);
    return emptyAnalytics();
  }
}
