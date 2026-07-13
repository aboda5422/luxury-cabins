import json
import re
import urllib.request
from pathlib import Path
from urllib.parse import quote, unquote, urlsplit, urlunsplit

html_path = Path(r"C:\Users\aboda5422\Documents\croooser\luxury cabins\scripts\ncc-tents.html")
html = html_path.read_text(encoding="utf-8")
print("html len", len(html))

for m in re.findall(r"https://ncc-project.com/wp-content/uploads/[^\s\"'<>]+", html):
    print("html img", m[:160])

apis = [
    "https://ncc-project.com/wp-json/wp/v2/pages?slug=european-tents",
    "https://ncc-project.com/wp-json/wp/v2/media?search=tent&per_page=30",
    "https://ncc-project.com/wp-json/wp/v2/media?per_page=40",
]

UA = {"User-Agent": "Mozilla/5.0"}
media_urls = []

for api in apis:
    try:
        req = urllib.request.Request(api, headers=UA)
        raw = urllib.request.urlopen(req, timeout=40).read().decode("utf-8", "ignore")
        data = json.loads(raw)
        print("API ok", api, "items", len(data) if isinstance(data, list) else type(data))
        if isinstance(data, list) and data and "content" in data[0]:
            content = data[0].get("content", {}).get("rendered", "")
            title = data[0].get("title", {}).get("rendered", "")
            excerpt = data[0].get("excerpt", {}).get("rendered", "")
            print("PAGE TITLE", title)
            print("EXCERPT", re.sub("<[^>]+>", " ", excerpt)[:400])
            plain = re.sub("<[^>]+>", " ", content)
            plain = re.sub(r"\s+", " ", plain).strip()
            print("CONTENT", plain[:800])
            for src in re.findall(r'src=\"([^\"]+)\"', content):
                if src not in media_urls:
                    media_urls.append(src)
        if isinstance(data, list):
            for item in data:
                src = (
                    item.get("source_url")
                    or (item.get("media_details", {}).get("sizes", {}).get("large", {}) or {}).get("source_url")
                    or ""
                )
                if src and src not in media_urls:
                    media_urls.append(src)
    except Exception as e:
        print("API fail", api, e)

print("media count", len(media_urls))
for u in media_urls[:40]:
    print(u)

OUT = Path(r"C:\Users\aboda5422\Documents\croooser\luxury cabins\public\images\rental\tents")
OUT.mkdir(parents=True, exist_ok=True)

# Also download quality european event tent photos from Unsplash as fallback
fallback = [
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85",
]

candidates = [u for u in media_urls if any(u.lower().endswith(ext) for ext in (".jpg", ".jpeg", ".png", ".webp"))]
# skip logos/flags
candidates = [u for u in candidates if "logo" not in u.lower() and "flag" not in u.lower() and "cropped-ncc" not in u.lower()]
if len(candidates) < 4:
    candidates = candidates + fallback

from PIL import Image
import io

saved = 0
for src in candidates:
    if saved >= 8:
        break
    try:
        parts = urlsplit(src)
        path = quote(unquote(parts.path), safe="/")
        encoded = urlunsplit((parts.scheme, parts.netloc, path, parts.query, ""))
        req = urllib.request.Request(encoded, headers=UA)
        data = urllib.request.urlopen(req, timeout=45).read()
        if len(data) < 20000:
            continue
        im = Image.open(io.BytesIO(data)).convert("RGB")
        dest = OUT / f"tent-{saved + 1}.jpg"
        im.save(dest, "JPEG", quality=90)
        print("saved", dest.name, im.size, len(data))
        saved += 1
    except Exception as e:
        print("fail", src[:90], e)

print("final", list(OUT.glob("tent-*.jpg")))
