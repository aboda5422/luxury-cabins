import urllib.request
from pathlib import Path

OUT = Path(r"C:\Users\aboda5422\Documents\croooser\luxury cabins\public\images\products")
OUT.mkdir(parents=True, exist_ok=True)

# High-quality Unsplash photos — modern EU/US cabin, modular, office aesthetics
DOWNLOADS = {
    # Biyoot / prefab houses
    "houses-1.jpg": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=85",
    "houses-2.jpg": "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1400&q=85",
    "houses-3.jpg": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    "houses-4.jpg": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
    # Rooms / modular units
    "rooms-1.jpg": "https://images.unsplash.com/photo-1600607687939-ce8a79db47d1?auto=format&fit=crop&w=1400&q=85",
    "rooms-2.jpg": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
    "rooms-3.jpg": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    "rooms-4.jpg": "https://images.unsplash.com/photo-1600047509807-ba8b95e7e1b7?auto=format&fit=crop&w=1400&q=85",
    # Barracks / portable site buildings
    "barracks-1.jpg": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
    "barracks-2.jpg": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85",
    "barracks-3.jpg": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    "barracks-4.jpg": "https://images.unsplash.com/photo-1497215728101-856f4ea352bd?auto=format&fit=crop&w=1400&q=85",
    # Caravans / campers
    "caravans-1.jpg": "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1400&q=85",
    "caravans-2.jpg": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=85",
    "caravans-3.jpg": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1400&q=85",
    "caravans-4.jpg": "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1400&q=85",
    # Offices
    "offices-1.jpg": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    "offices-2.jpg": "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1400&q=85",
    "offices-3.jpg": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=85",
    "offices-4.jpg": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=85",
}

# Better cabin/modular-focused set (override some that are too generic office towers)
DOWNLOADS.update({
    "barracks-1.jpg": "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1400&q=85",
    "barracks-2.jpg": "https://images.unsplash.com/photo-1605276374104-dee2afc211c6?auto=format&fit=crop&w=1400&q=85",
    "barracks-3.jpg": "https://images.unsplash.com/photo-1605146768851-eda79da39897?auto=format&fit=crop&w=1400&q=85",
    "barracks-4.jpg": "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=1400&q=85",
    "caravans-1.jpg": "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1400&q=85",
    "caravans-2.jpg": "https://images.unsplash.com/photo-1533591380347-2110b60c9bd4?auto=format&fit=crop&w=1400&q=85",
    "caravans-3.jpg": "https://images.unsplash.com/photo-1595267990638-f6f4c0a0c3e4?auto=format&fit=crop&w=1400&q=85",
    "caravans-4.jpg": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1400&q=85",
    "offices-1.jpg": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85",
    "offices-2.jpg": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    "offices-3.jpg": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=85",
    "offices-4.jpg": "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1400&q=85",
})

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

for name, url in DOWNLOADS.items():
    dest = OUT / name
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = resp.read()
        if len(data) < 20000:
            print("SKIP tiny", name, len(data))
            continue
        dest.write_bytes(data)
        print("OK", name, len(data))
    except Exception as e:
        print("FAIL", name, e)

print("done")
