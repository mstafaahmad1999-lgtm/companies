# Makes the light on-screen copies of the profile images (profiles/web/*.webp).
# The originals in profiles/ stay untouched and are used for "Open full size" and "Download".
# Run again after adding or replacing a profile:  python make_web_images.py   (needs: pip install pillow)
from pathlib import Path
from PIL import Image

WIDTH, QUALITY = 1600, 82  # 1600px is sharper than any phone screen; ~15x smaller than the originals

out_dir = Path("profiles/web")
out_dir.mkdir(exist_ok=True)
for src in sorted(Path("profiles").glob("*.*")):
    if src.suffix.lower() not in (".jpg", ".jpeg", ".png", ".webp"):
        continue
    im = Image.open(src).convert("RGB")
    if im.width > WIDTH:
        im = im.resize((WIDTH, round(im.height * WIDTH / im.width)), Image.LANCZOS)
    dst = out_dir / (src.stem + ".webp")
    im.save(dst, "WEBP", quality=QUALITY, method=6)
    print(f"{src.name:28} {src.stat().st_size // 1024:>6} KB  ->  {dst.name:28} {dst.stat().st_size // 1024:>4} KB")
