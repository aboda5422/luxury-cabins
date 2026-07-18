import fs from "fs";
import path from "path";

const map = JSON.parse(fs.readFileSync("scripts/image-path-map.json", "utf8"));
const files = [
  "src/lib/content.ts",
  "src/lib/cms/defaults.ts",
  "data/cms.json",
  "src/components/HeroSection.tsx",
  "src/app/layout.tsx",
  "src/components/admin/AdminApp.tsx",
  "src/components/PageHero.tsx",
  "src/components/AboutPageClient.tsx",
  "src/components/ManufacturingPageClient.tsx",
  "src/components/ServicesPageClient.tsx",
];

const keys = Object.keys(map).sort((a, b) => b.length - a.length);

for (const file of files) {
  const full = path.join(process.cwd(), file);
  if (!fs.existsSync(full)) {
    console.log("missing", file);
    continue;
  }
  let text = fs.readFileSync(full, "utf8");
  let hits = 0;
  for (const key of keys) {
    if (!text.includes(key)) continue;
    const parts = text.split(key);
    hits += parts.length - 1;
    text = parts.join(map[key]);
  }
  fs.writeFileSync(full, text);
  console.log(`${file}: ${hits} replacements`);
}
