import re
import urllib.parse
import urllib.request
from pathlib import Path

BASE = Path(r"C:\Users\aboda5422\Documents\croooser\luxury cabins")
OUT = BASE / "public" / "images" / "products"
OUT.mkdir(parents=True, exist_ok=True)

PAGES = {
    "houses": "https://beyootjahiza.com/beyoot-jahiza-proud/",
    "rooms": "https://beyootjahiza.com/ready-ghuraf-in-saudia/",
    "barracks": "https://beyootjahiza.com/bruksat-proud-in-beyoot-factory/",
    "caravans": "https://beyootjahiza.com/caravans-ready-in-saudia/",
    "home": "https://beyootjahiza.com/",
}

IMG_RE = re.compile(
    r"https://beyootjahiza\.com/wp-content/uploads/[^\s\"'<>]+",
    re.I,
)


def encode_url(url: str) -> str:
    parts = urllib.parse.urlsplit(url)
    # Encode path segments that may contain Arabic
    path = "/".join(urllib.parse.quote(seg, safe="") if seg else "" for seg in parts.path.split("/"))
    # Keep already-encoded sequences
    path = urllib.parse.quote(urllib.parse.unquote(parts.path), safe="/")
    return urllib.parse.urlunsplit((parts.scheme, parts.netloc, path, parts.query, parts.fragment))


def fetch(url: str) -> str:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"},
    )
    with urllib.request.urlopen(req, timeout=45) as resp:
        return resp.read().decode("utf-8", "ignore")


def download(url: str, dest: Path) -> bool:
    try:
        encoded = encode_url(url)
        req = urllib.request.Request(
            encoded,
            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"},
        )
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = resp.read()
        if len(data) < 8000:
            print("skip tiny", dest.name, len(data))
            return False
        dest.write_bytes(data)
        print("saved", dest.name, len(data))
        return True
    except Exception as e:
        print("fail", dest.name, e)
        return False


def normalize_list(urls: list[str]) -> list[str]:
    out = []
    seen = set()
    for u in urls:
        low = u.lower()
        if not any(low.endswith(ext) for ext in (".jpg", ".jpeg", ".png", ".webp")):
            continue
        if any(x in low for x in ("logo", "favicon", "icon-", "emoji", "avatar", "whatsapp")):
            continue
        # Prefer full-size over thumbnails
        if any(x in low for x in ("-150x", "-300x", "-768x")):
            continue
        key = re.sub(r"-\d+x\d+(?=\.(?:jpg|jpeg|png|webp)$)", "", low)
        if key in seen:
            continue
        seen.add(key)
        out.append(u)
    return out


all_imgs: dict[str, list[str]] = {}
for key, url in PAGES.items():
    html = fetch(url)
    imgs = normalize_list(IMG_RE.findall(html))
    all_imgs[key] = imgs
    print(f"\n=== {key}: {len(imgs)}")
    for i in imgs[:12]:
        print(" ", i)

# Explicit known good ASCII / percent-encoded URLs from homepage markdown fetch
EXTRA = [
    "https://beyootjahiza.com/wp-content/uploads/2026/07/ChatGPT-Image-6-%D9%8A%D9%88%D9%84%D9%8A%D9%88-2026%D8%8C-12_22_57-%D9%85.png",
    "https://beyootjahiza.com/wp-content/uploads/2026/02/%D8%A8%D8%B1%D8%AA%D8%A8%D9%84%D8%A7%D8%AA-%D8%AC%D8%A7%D9%87%D8%B2%D8%A9.webp",
    "https://beyootjahiza.com/wp-content/uploads/2026/07/new1.4.png",
    "https://beyootjahiza.com/wp-content/uploads/2026/07/ChatGPT-Image-6-%D9%8A%D9%88%D9%84%D9%8A%D9%88-2026%D8%8C-02_13_14-%D9%85.png",
    "https://beyootjahiza.com/wp-content/uploads/2026/07/bacc0502-2395-4752-898d-886b54fa7d80.png",
    "https://beyootjahiza.com/wp-content/uploads/2026/07/ChatGPT-Image-6-%D9%8A%D9%88%D9%84%D9%8A%D9%88-2026%D8%8C-12_15_11-%D9%85.png",
    "https://beyootjahiza.com/wp-content/uploads/2023/12/%D9%83%D8%B1%D9%81%D8%A7%D9%86%D8%A7%D8%AA-%D8%AC%D8%A7%D9%87%D8%B2%D8%A9-%D9%85%D8%B5%D9%86%D8%B9-%D8%A7%D9%84%D8%A8%D9%8A%D9%88%D8%AA-%D8%A7%D9%84%D8%AC%D8%A7%D9%87%D8%B2%D8%A9-%D9%81%D9%8A-%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6-_1_.jpg",
]

assignments = {
    "houses": (all_imgs.get("houses", []) + all_imgs.get("home", [])[:10] + EXTRA)[:8],
    "rooms": (all_imgs.get("rooms", []) + all_imgs.get("home", [])[5:20] + EXTRA)[:8],
    "barracks": (all_imgs.get("barracks", []) + EXTRA)[:8],
    "caravans": (all_imgs.get("caravans", []) + EXTRA)[:8],
    "offices": (all_imgs.get("home", [])[8:25] + EXTRA)[:8],
}

manifest: dict[str, list[str]] = {}
for slug, urls in assignments.items():
    urls = normalize_list(urls)
    saved = []
    idx = 1
    for url in urls:
        if idx > 4:
            break
        ext = Path(urllib.parse.urlparse(url).path).suffix.lower() or ".jpg"
        if ext not in {".jpg", ".jpeg", ".png", ".webp"}:
            ext = ".jpg"
        dest = OUT / f"{slug}-{idx}{ext}"
        if download(url, dest):
            saved.append(f"/images/products/{dest.name}")
            idx += 1
    manifest[slug] = saved

print("\nMANIFEST")
for k, v in manifest.items():
    print(k, len(v), v)
