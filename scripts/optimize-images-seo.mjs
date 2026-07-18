/**
 * Image SEO optimizer:
 * - Renames local assets to English kebab-case keyword names
 * - Converts PNG/JPG/JPEG to WebP
 * - Downloads missing product/rental/cabin images from the live site when possible
 * - Writes path-map.json for code/CMS upgrades
 *
 * Usage: node scripts/optimize-images-seo.mjs
 */
import fs from "fs/promises";
import path from "path";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { Readable } from "stream";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const LIVE = "https://luxurycabins.com.sa";
const MAP_OUT = path.join(ROOT, "scripts", "image-path-map.json");

const partnerMap = {
  "partner-01.png": "partner-saudi-aramco.webp",
  "partner-02.png": "partner-qiddiya.webp",
  "partner-03.png": "partner-ministry-of-transport.webp",
  "partner-04.png": "partner-ministry-of-sport.webp",
  "partner-05.png": "partner-sela.webp",
  "partner-06.png": "partner-misk-foundation.webp",
  "partner-07.png": "partner-ministry-of-culture.webp",
  "partner-08.png": "partner-mufeed.webp",
  "partner-09.png": "partner-kfupm.webp",
  "partner-10.png": "partner-tamimi.webp",
  "partner-11.png": "partner-dirab-golf.webp",
  "partner-12.png": "partner-dhahran-expo.webp",
  "partner-13.png": "partner-riyadh-front.webp",
  "partner-14.png": "partner-saudi-equestrian-federation.webp",
  "partner-15.png": "partner-prince-majed-park.webp",
  "partner-16.png": "partner-ajwaa-alsaudia.webp",
  "partner-17.png": "partner-the-gathering.webp",
  "partner-18.png": "partner-code.webp",
  "partner-19.png": "partner-hwadi.webp",
  "partner-20.png": "partner-event-clever.webp",
  "partner-21.png": "partner-wave-event.webp",
  "partner-22.png": "partner-macc-modern-arch.webp",
  "partner-23.png": "partner-blink-experience.webp",
  "partner-24.png": "partner-kidana.webp",
};

const projectMap = {
  "project-01.png": "riyadh-decorative-white-office-unit.webp",
  "project-02.png": "riyadh-modern-geometric-container.webp",
  "project-03.png": "riyadh-mashrabiya-portable-office.webp",
  "project-04.png": "riyadh-decorative-container-cabins.webp",
  "project-05.png": "riyadh-industrial-mashrabiya-cabins.webp",
  "project-06.png": "riyadh-luxury-portable-bathroom-interior.webp",
  "project-07.png": "riyadh-modern-washbasins-toilets.webp",
  "project-08.png": "riyadh-commercial-luxury-toilets.webp",
  "project-09.png": "riyadh-wood-gray-portable-cabins.webp",
  "project-10.png": "riyadh-portable-office-interior.webp",
  "project-11.png": "riyadh-modern-wood-office-unit.webp",
  "project-12.png": "riyadh-luxury-cabins-showcase.webp",
  "project-13.png": "riyadh-luxury-lit-decorative-container.webp",
  "project-14.png": "riyadh-container-to-luxury-office.webp",
  "project-15.png": "riyadh-mobile-toilet-units-truck.webp",
  "project-16.png": "riyadh-luxury-event-portable-cabins.webp",
  "project-17.png": "riyadh-luxury-cabins-event-truck.webp",
  "project-18.png": "riyadh-luxury-mashrabiya-caravan.webp",
};

const cmsLocalMap = {
  "images/cms/hero-home.webp": "images/cms/luxury-cabins-home-hero.webp",
  "images/cms/vision-side.webp": "images/cms/luxury-cabins-field-services.webp",
  "images/cms/service-sales.webp": "images/cms/portable-cabin-sales-manufacturing.webp",
  "images/cms/service-units.webp": "images/cms/portable-cabin-rental-units.webp",
  "images/cover-hero.webp": "images/luxury-portable-cabins-page-hero.webp",
  "images/vision-side.webp": "images/cms/luxury-cabins-field-services.webp",
  "og.jpg": "og-luxury-cabins-saudi.webp",
};

/** Remote/live downloads → SEO webp destinations */
const downloadJobs = [
  // products
  ...[1, 2, 3, 4].flatMap((n) => [
    {
      from: `/images/products/houses-${n}.jpg`,
      to: `images/products/ready-luxury-house-cabin-0${n}.webp`,
    },
    {
      from: `/images/products/rooms-${n}.jpg`,
      to: `images/products/portable-ready-room-0${n}.webp`,
    },
    {
      from: `/images/products/barracks-${n}.jpg`,
      to: `images/products/insulated-worker-barracks-0${n}.webp`,
    },
    {
      from: `/images/products/caravans-${n}.jpg`,
      to: `images/products/towable-caravan-cabin-0${n}.webp`,
    },
    {
      from: `/images/products/offices-${n}.jpg`,
      to: `images/products/portable-site-office-0${n}.webp`,
    },
  ]),
  // rental units
  ...[1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14].map((n) => ({
    from: `/images/rental/units/unit-${n}.jpg`,
    to: `images/rental/units/rental-luxury-portable-unit-${String(n).padStart(2, "0")}.webp`,
  })),
  // tents
  { from: "/images/rental/tents/tent-1.jpg", to: "images/rental/tents/european-event-tent-01.webp" },
  { from: "/images/rental/tents/tent-4.jpg", to: "images/rental/tents/european-event-tent-02.webp" },
  { from: "/images/rental/tents/tent-9.jpg", to: "images/rental/tents/european-event-tent-03.webp" },
  { from: "/images/rental/tents/tent-10.jpg", to: "images/rental/tents/european-wedding-event-tent.webp" },
  // misc
  { from: "/images/cabin-1.jpg", to: "images/custom-portable-cabin-manufacturing.webp" },
  { from: "/images/cabin-2.jpg", to: "images/luxury-cabins-about-company.webp" },
  { from: "/images/cms/service-tents.jpg", to: "images/cms/european-event-tent-rental.webp" },
  { from: "/images/ar-bg.png", to: "images/arabic-pattern-overlay.webp" },
];

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  await ensureDir(dest);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
  return buf;
}

async function toWebp(inputBufOrPath, dest, quality = 78) {
  await ensureDir(dest);
  const img = sharp(inputBufOrPath, { failOn: "none" });
  const meta = await img.metadata();
  let pipelineSharp = img;
  // Cap very large images for web
  if ((meta.width || 0) > 2000) {
    pipelineSharp = pipelineSharp.resize({ width: 2000, withoutEnlargement: true });
  }
  await pipelineSharp.webp({ quality, effort: 4 }).toFile(dest);
}

async function convertLocal(srcRel, destRel, quality = 78) {
  const src = path.join(PUBLIC, srcRel);
  const dest = path.join(PUBLIC, destRel);
  try {
    await fs.access(src);
  } catch {
    return false;
  }
  if (path.resolve(src) === path.resolve(dest) && dest.endsWith(".webp")) {
    // already named correctly; re-encode lightly if needed
    return true;
  }
  await toWebp(src, dest, quality);
  if (path.resolve(src) !== path.resolve(dest)) {
    // keep originals only if different extension/name — remove old after success
    try {
      await fs.unlink(src);
    } catch {
      /* ignore */
    }
  }
  return true;
}

function publicUrl(rel) {
  return "/" + rel.replace(/\\/g, "/");
}

async function main() {
  const pathMap = {};

  // 1) Partners
  for (const [oldName, newName] of Object.entries(partnerMap)) {
    const ok = await convertLocal(`images/clients/${oldName}`, `images/clients/${newName}`, 85);
    if (ok) {
      pathMap[`/images/clients/${oldName}`] = `/images/clients/${newName}`;
      console.log("partner", oldName, "->", newName);
    }
  }

  // 2) Projects (local copies) + map Supabase URLs to local SEO paths
  for (const [oldName, newName] of Object.entries(projectMap)) {
    const ok = await convertLocal(`images/projects/${oldName}`, `images/projects/${newName}`, 78);
    if (ok) {
      pathMap[`/images/projects/${oldName}`] = `/images/projects/${newName}`;
      const supabase =
        `https://lyxbpebabwiicobkaohi.supabase.co/storage/v1/object/public/uploads/projects/${oldName}`;
      pathMap[supabase] = `/images/projects/${newName}`;
      console.log("project", oldName, "->", newName);
    }
  }

  // 3) Existing CMS webp renames
  for (const [oldRel, newRel] of Object.entries(cmsLocalMap)) {
    const src = path.join(PUBLIC, oldRel);
    const dest = path.join(PUBLIC, newRel);
    try {
      await fs.access(src);
      await ensureDir(dest);
      if (oldRel.endsWith(".webp") && newRel.endsWith(".webp")) {
        await fs.copyFile(src, dest);
        if (path.resolve(src) !== path.resolve(dest)) await fs.unlink(src);
      } else {
        await toWebp(src, dest, oldRel.includes("og") ? 82 : 78);
        if (path.resolve(src) !== path.resolve(dest)) {
          try {
            await fs.unlink(src);
          } catch {
            /* ignore */
          }
        }
      }
      pathMap[publicUrl(oldRel)] = publicUrl(newRel);
      // also map old jpg variants
      if (oldRel.endsWith(".webp")) {
        pathMap[publicUrl(oldRel.replace(/\.webp$/, ".jpg"))] = publicUrl(newRel);
      }
      console.log("cms", oldRel, "->", newRel);
    } catch {
      console.warn("skip missing", oldRel);
    }
  }

  // 4) Download missing assets from live + convert
  for (const job of downloadJobs) {
    const dest = path.join(PUBLIC, job.to);
    let buf;
    try {
      await fs.access(dest);
      pathMap[job.from] = publicUrl(job.to);
      console.log("exists", job.to);
      continue;
    } catch {
      /* need download */
    }
    try {
      buf = await download(`${LIVE}${job.from}`, path.join(PUBLIC, "_tmp_dl"));
      await toWebp(buf, dest);
      pathMap[job.from] = publicUrl(job.to);
      console.log("downloaded", job.from, "->", job.to);
    } catch (err) {
      console.warn("download fail", job.from, String(err.message || err));
    }
  }

  // cleanup tmp
  try {
    await fs.unlink(path.join(PUBLIC, "_tmp_dl"));
  } catch {
    /* ignore */
  }

  // Extra legacy jpg aliases for products/rental already covered by downloadJobs pathMap
  await fs.writeFile(MAP_OUT, JSON.stringify(pathMap, null, 2), "utf8");
  console.log("\nWrote", MAP_OUT, "entries:", Object.keys(pathMap).length);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
