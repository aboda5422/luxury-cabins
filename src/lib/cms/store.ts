import { promises as fs } from "fs";
import path from "path";
import { getDefaultCms } from "./defaults";
import type { AnalyticsData, CmsData, NavLink } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const CMS_FILE = path.join(DATA_DIR, "cms.json");
const ANALYTICS_FILE = path.join(DATA_DIR, "analytics.json");

function ensureServicesNav(links: NavLink[]): NavLink[] {
  if (links.some((l) => l.href === "/services")) return links;
  const next = links.map((l) => ({ ...l }));
  const aboutIdx = next.findIndex((l) => l.href === "/about");
  const item = { href: "/services", label: "الخدمات" };
  if (aboutIdx >= 0) next.splice(aboutIdx + 1, 0, item);
  else next.splice(1, 0, item);
  return next;
}

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readCms(): Promise<CmsData> {
  await ensureDir();
  const defaults = getDefaultCms();
  try {
    const raw = await fs.readFile(CMS_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<CmsData>;
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
        cities: parsed.site?.cities?.length
          ? parsed.site.cities
          : defaults.site.cities,
      },
      home: { ...defaults.home, ...(parsed.home || {}) },
      about: { ...defaults.about, ...(parsed.about || {}) },
      rentalPage: { ...defaults.rentalPage, ...(parsed.rentalPage || {}) },
      manufacturingPage: {
        ...defaults.manufacturingPage,
        ...(parsed.manufacturingPage || {}),
      },
      footer: { ...defaults.footer, ...(parsed.footer || {}) },
      navLinks: ensureServicesNav(
        parsed.navLinks?.length ? parsed.navLinks : defaults.navLinks,
      ),
      services: parsed.services?.length ? parsed.services : defaults.services,
      processSteps: parsed.processSteps?.length
        ? parsed.processSteps
        : defaults.processSteps,
      catalogProducts: parsed.catalogProducts?.length
        ? parsed.catalogProducts
        : defaults.catalogProducts,
      rentalCategories: parsed.rentalCategories?.length
        ? parsed.rentalCategories
        : defaults.rentalCategories,
      manufacturingExtras: parsed.manufacturingExtras?.length
        ? parsed.manufacturingExtras
        : defaults.manufacturingExtras,
      projects: parsed.projects?.length ? parsed.projects : defaults.projects,
      sampleClients: parsed.sampleClients?.length
        ? parsed.sampleClients
        : defaults.sampleClients,
      faqs: parsed.faqs?.length ? parsed.faqs : defaults.faqs,
      aboutStats: parsed.aboutStats?.length
        ? parsed.aboutStats
        : defaults.aboutStats,
      updatedAt: parsed.updatedAt || defaults.updatedAt,
    };
  } catch (err) {
    console.error("[cms] readCms failed, using defaults:", err);
    try {
      await writeCms(defaults);
    } catch {
      /* ignore write failure */
    }
    return defaults;
  }
}

export async function writeCms(data: CmsData): Promise<CmsData> {
  await ensureDir();
  const next = { ...data, updatedAt: new Date().toISOString() };
  await fs.writeFile(CMS_FILE, JSON.stringify(next, null, 2), "utf8");
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
  await ensureDir();
  try {
    const raw = await fs.readFile(ANALYTICS_FILE, "utf8");
    return { ...emptyAnalytics(), ...JSON.parse(raw) };
  } catch {
    const empty = emptyAnalytics();
    await writeAnalytics(empty);
    return empty;
  }
}

export async function writeAnalytics(data: AnalyticsData): Promise<void> {
  await ensureDir();
  await fs.writeFile(ANALYTICS_FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function trackPageView(pathName: string, visitorId: string) {
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
}
