#!/usr/bin/env python3
"""Import astrophotography frames into the site.

    python tools/import_astro.py <folder-with-photos>

For each source file it writes, into public/assets/img/astro/:

    <slug>-1400.webp / .jpg    the lightbox size
    <slug>-800.webp  / .jpg    the gallery tile size

A .gif is copied through untouched (resizing would kill the animation).

EXIF is deliberately NOT copied: the site is public and camera metadata often
carries GPS coordinates. Re-running is safe - it overwrites the same names.

Then edit src/app/data/photos.data.ts: point `src` at <slug>-800.<ext>,
`full` at <slug>-1400.<ext>, and set label / caption / alt.
"""

import os
import re
import sys

from PIL import Image

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "assets", "img", "astro")
SIZES = ((1400, 80), (800, 82))  # (width, quality)
EXCLUDE = {"thumbs.db", "desktop.ini"}

# Fractions of the frame to cut off before resizing, keyed by slug: (left, top, right, bottom).
# "bode-old" is a scan of an early print and carries a white border down its right edge.
TRIM = {
    "bode-old": (0.0, 0.0, 0.025, 0.0),
}


def slug(name: str) -> str:
    base = os.path.splitext(os.path.basename(name))[0].lower()
    base = re.sub(r"[^a-z0-9]+", "-", base).strip("-")
    # collapse the vendor noise left in exported names (repeat until stable,
    # so "m101-sharpened-standard-2" ends up as "m101")
    junk = ["-denoiseai", "-noisexterm", "-dbe2", "-dbe", "-low-light", "-severe-noise",
            "-clear", "-standard", "-sharpened", "-step-1", "-v4", "-2", "-10", "-1"]
    changed = True
    while changed:
        changed = False
        for token in junk:
            shortened = re.sub(re.escape(token) + r"(?=(-|$))", "", base)
            if shortened != base:
                base = shortened
                changed = True
    base = re.sub(r"-{2,}", "-", base).strip("-")
    return base or "photo"


def main(folder: str) -> None:
    os.makedirs(OUT, exist_ok=True)
    rows = []
    for name in sorted(os.listdir(folder)):
        src = os.path.join(folder, name)
        if not os.path.isfile(src) or name.lower() in EXCLUDE:
            continue
        ext = os.path.splitext(name)[1].lower()
        key = slug(name)
        if ext == ".gif":
            target = os.path.join(OUT, f"{key}.gif")
            with open(src, "rb") as fh, open(target, "wb") as wh:
                wh.write(fh.read())
            rows.append((name, f"{key}.gif", "copied"))
            continue
        if ext not in {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp", ".bmp"}:
            rows.append((name, "-", "skipped (not an image)"))
            continue

        im = Image.open(src)
        im.load()
        if im.mode != "RGB":
            im = im.convert("RGB")
        if key in TRIM:
            l, t, r, bt = TRIM[key]
            w0, h0 = im.size
            im = im.crop((round(l * w0), round(t * h0), w0 - round(r * w0), h0 - round(bt * h0)))
        w, h = im.size
        made = []
        for width, quality in SIZES:
            img = im if w <= width else im.resize((width, round(h * width / w)), Image.LANCZOS)
            for fmt, suffix, opts in (
                ("WEBP", ".webp", {"quality": quality, "method": 6}),
                ("JPEG", ".jpg", {"quality": quality, "optimize": True, "progressive": True}),
            ):
                path = os.path.join(OUT, f"{key}-{width}{suffix}")
                img.save(path, fmt, **opts)
                made.append(f"{key}-{width}{suffix} {os.path.getsize(path) // 1024}KB")
        rows.append((name, f"{key} ({w}x{h})", "; ".join(made)))

    print(f"{'source':52s} {'slug':34s} output")
    for name, key, out in rows:
        print(f"{name[:52]:52s} {key[:34]:34s} {out}")
    print(f"\n-> {os.path.relpath(OUT, os.path.join(os.path.dirname(__file__), '..'))}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)
    main(sys.argv[1])
