import re
import shutil
import urllib.request
from pathlib import Path

ASSETS = Path(r"C:\Users\aboda5422\.cursor\projects\c-Users-aboda5422-Documents-croooser-luxury-cabins\assets")
BASE = Path(r"C:\Users\aboda5422\Documents\croooser\luxury cabins\public\images\rental")
UNITS = BASE / "units"
TENTS = BASE / "tents"
UNITS.mkdir(parents=True, exist_ok=True)
TENTS.mkdir(parents=True, exist_ok=True)

# Copy newest user-attached PNGs into units (exclude old ones by matching recent filenames if possible)
# Prefer files that look like the attached cabin/container images from this message
candidates = sorted(ASSETS.glob("*.png"), key=lambda p: p.stat().st_mtime, reverse=True)
print("Recent assets:")
for p in candidates[:15]:
    print(p.name, p.stat().st_size, p.stat().st_mtime)

# Copy the 8 images from the message - typically the most recent ones matching the attachment names
wanted_parts = [
    "87f0d1fe",
    "fd3604e0-a3a9",  # first sunset row
    "fd3604e0",  # may match both - handle carefully
    "ff4daf77",
    "0fdef56a",
    "0453e484",
    "1231x500",
    "65aa7611",
]

picked = []
for part in wanted_parts:
    for p in candidates:
        if part in p.name and p not in picked:
            # skip duplicate fd3604e0 if we already have two
            picked.append(p)
            break

# If not enough, take latest 8 unique by size
if len(picked) < 6:
    picked = []
    seen_sizes = set()
    for p in candidates:
        sz = p.stat().st_size
        if sz in seen_sizes or sz < 50_000:
            continue
        seen_sizes.add(sz)
        picked.append(p)
        if len(picked) >= 8:
            break

print("Picked units:", len(picked))
for i, p in enumerate(picked[:8], 1):
    dest = UNITS / f"unit-{i}.jpg"
    # convert via pillow if available
    try:
        from PIL import Image
        im = Image.open(p).convert("RGB")
        im.save(dest, "JPEG", quality=90, optimize=True)
        print("saved", dest.name, "from", p.name)
    except Exception as e:
        shutil.copyfile(p, UNITS / f"unit-{i}{p.suffix}")
        print("copied", p.name, e)

# Scrape tents
url = "https://ncc-project.com/services/european-tents/"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
html = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "ignore")
Path(r"C:\Users\aboda5422\Documents\croooser\luxury cabins\scripts\ncc-tents.html").write_text(html, encoding="utf-8")

texts = re.findall(r"<(?:h[1-3]|p)[^>]*>(.*?)</(?:h[1-3]|p)>", html, re.I | re.S)
clean = []
for t in texts:
    t = re.sub("<[^>]+>", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    if len(t) > 35:
        clean.append(t)
print("\n---TEXT---")
for t in clean[:30]:
    print(t[:250])
    print("---")

img_re = re.compile(r"(?:src|data-src|content)=[\"']([^\"']+\.(?:jpg|jpeg|png|webp))", re.I)
imgs = []
for m in img_re.findall(html):
    src = m
    if src.startswith("//"):
        src = "https:" + src
    elif src.startswith("/"):
        src = "https://ncc-project.com" + src
    if "logo" in src.lower() or "icon" in src.lower() or "favicon" in src.lower():
        continue
    if src not in imgs:
        imgs.append(src)
print("\nIMGS", len(imgs))
for i in imgs[:40]:
    print(i)

UA = "Mozilla/5.0"
saved = 0
for i, src in enumerate(imgs, 1):
    if saved >= 8:
        break
    try:
        # encode path
        from urllib.parse import urlsplit, urlunsplit, quote, unquote
        parts = urlsplit(src)
        path = quote(unquote(parts.path), safe="/")
        encoded = urlunsplit((parts.scheme, parts.netloc, path, parts.query, ""))
        req = urllib.request.Request(encoded, headers={"User-Agent": UA})
        data = urllib.request.urlopen(req, timeout=45).read()
        if len(data) < 15000:
            continue
        ext = Path(parts.path).suffix.lower() or ".jpg"
        if ext not in {".jpg", ".jpeg", ".png", ".webp"}:
            ext = ".jpg"
        dest = TENTS / f"tent-{saved+1}{ext}"
        dest.write_bytes(data)
        # convert to jpg
        try:
            from PIL import Image
            import io
            im = Image.open(io.BytesIO(data)).convert("RGB")
            jpg = TENTS / f"tent-{saved+1}.jpg"
            im.save(jpg, "JPEG", quality=90)
            if dest != jpg and dest.exists():
                dest.unlink(missing_ok=True)
            print("tent OK", jpg.name, len(data))
        except Exception:
            print("tent raw OK", dest.name, len(data))
        saved += 1
    except Exception as e:
        print("tent fail", src[:80], e)

print("done units", list(UNITS.glob('*')))
print("done tents", list(TENTS.glob('*.jpg')))
