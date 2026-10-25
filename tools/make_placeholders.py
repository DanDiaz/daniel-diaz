#!/usr/bin/env python3
"""Generate the astrophotography placeholder plates.

These are *stand-ins*. Drop your own photos in ../public/assets/img/astro/ as
`photo-1.jpg` ... `photo-6.jpg` (or change the src in index.html) and the
"placeholder" tag on the tile disappears on its own - index.html only shows
that tag for files whose name starts with `placeholder-`.

Re-run:  python tools/make_placeholders.py
Needs:  nothing but the standard library (the plates are hand-built SVG).
"""

import os
import random

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "assets", "img", "astro")
W, H = 1200, 800


def stars(rng, count, max_r=1.7, bright_every=23):
    """A field of dots, with a few bright ones that get a glow."""
    out = []
    for i in range(count):
        x, y = round(rng.uniform(0, W), 1), round(rng.uniform(0, H), 1)
        r = round(rng.uniform(0.25, max_r), 2)
        o = round(rng.uniform(0.25, 0.95), 2)
        out.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#fff" opacity="{o}"/>')
        if i % bright_every == 0:
            gr = round(r * 7, 1)
            out.append(
                f'<circle cx="{x}" cy="{y}" r="{gr}" fill="url(#glow)" opacity="{round(o * 0.5, 2)}"/>'
            )
    return "\n  ".join(out)


def nebula(rng, seed, freq, color, octaves=5, opacity=0.75, alpha_shape="0.9 0.5 0.2 0 -0.22"):
    """A coloured turbulence cloud - the classic emission-nebula look."""
    fid = f"n{seed}"
    r, g, b = color
    filt = (
        f'<filter id="{fid}" x="-25%" y="-25%" width="150%" height="150%">'
        f'<feTurbulence type="fractalNoise" baseFrequency="{freq}" numOctaves="{octaves}" '
        f'seed="{seed}" result="t"/>'
        f'<feColorMatrix in="t" type="matrix" values="'
        f"0 0 0 0 {r}  0 0 0 0 {g}  0 0 0 0 {b}  {alpha_shape}"
        f'"/><feGaussianBlur stdDeviation="4"/></filter>'
    )
    body = f'<rect class="cloud" x="-100" y="-100" width="{W + 200}" height="{H + 200}" filter="url(#{fid})" opacity="{opacity}"/>'
    return filt, body


def plate(name, title, layers, extra="", bg=("#05070f", "#0a1020"), star_count=520, seed=1):
    rng = random.Random(seed)
    defs = [
        f'<radialGradient id="bg" cx="50%" cy="45%" r="75%">'
        f'<stop offset="0%" stop-color="{bg[1]}"/><stop offset="100%" stop-color="{bg[0]}"/>'
        f"</radialGradient>",
        '<radialGradient id="glow"><stop offset="0%" stop-color="#fff" stop-opacity="0.9"/>'
        '<stop offset="35%" stop-color="#9fd8ff" stop-opacity="0.35"/>'
        '<stop offset="100%" stop-color="#9fd8ff" stop-opacity="0"/></radialGradient>',
    ]
    body = [f'<rect width="{W}" height="{H}" fill="url(#bg)"/>']
    for filt, block in layers:
        defs.append(filt)
        body.append(block)
    body.append(f'<g>{stars(rng, star_count)}</g>')
    if extra:
        body.append(extra)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
        f'width="{W}" height="{H}" role="img" aria-label="{title} (placeholder plate)">\n'
        f"  <title>{title} - placeholder</title>\n"
        f"  <defs>{''.join(defs)}</defs>\n  "
        + "\n  ".join(body)
        + "\n</svg>\n"
    )
    path = os.path.join(OUT, name)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(svg)
    return name, len(svg) // 1024


def main():
    os.makedirs(OUT, exist_ok=True)
    made = []

    # 1 - emission nebula
    made.append(plate(
        "placeholder-1.svg", "Emission nebula",
        [nebula(random.Random(4), 11, "0.0042 0.0075", (0.62, 0.16, 0.42), 6, 0.85),
         nebula(random.Random(5), 12, "0.009 0.006", (0.10, 0.45, 0.62), 5, 0.7, "0.8 0.3 0.1 0 -0.18"),
         nebula(random.Random(6), 13, "0.02 0.02", (0.9, 0.85, 0.95), 4, 0.25, "0.7 0.6 0.4 0 -0.45")],
        star_count=650, seed=11,
    ))

    # 2 - galactic core with dust lanes
    made.append(plate(
        "placeholder-2.svg", "Galactic core",
        [nebula(random.Random(7), 21, "0.0035 0.012", (0.85, 0.62, 0.30), 6, 0.75, "0.9 0.6 0.2 0 -0.25"),
         nebula(random.Random(8), 22, "0.008 0.02", (0.35, 0.18, 0.10), 5, 0.9, "0.9 0.5 0.2 0 -0.30")],
        bg=("#04060c", "#141019"), star_count=780, seed=21,
    ))

    # 3 - the Moon at the terminator
    rng = random.Random(31)
    craters = "\n  ".join(
        f'<circle cx="{round(rng.uniform(360, 900), 1)}" cy="{round(rng.uniform(140, 660), 1)}" '
        f'r="{round(rng.uniform(4, 34), 1)}" fill="#0b0d12" opacity="{round(rng.uniform(0.25, 0.6), 2)}"/>'
        for _ in range(150)
    )
    moon = (
        '<filter id="moonTex"><feTurbulence type="fractalNoise" baseFrequency="0.02" '
        'numOctaves="5" seed="31" result="t"/><feColorMatrix in="t" type="matrix" values="'
        '0 0 0 0 0.75  0 0 0 0 0.76  0 0 0 0 0.80  0.7 0.5 0.2 0 -0.35"/></filter>'
        f'<g><circle cx="640" cy="400" r="250" fill="#c9cdd6"/>'
        f'<rect x="380" y="140" width="520" height="520" filter="url(#moonTex)" opacity="0.5"/>'
        f'<g clip-path="url(#moonClip)">{craters}</g>'
        '<clipPath id="moonClip"><circle cx="640" cy="400" r="250"/></clipPath>'
        '<circle cx="470" cy="400" r="250" fill="#04060c" opacity="0.93"/>'
        '<circle cx="640" cy="400" r="250" fill="none" stroke="#dfe6f2" stroke-opacity="0.25" stroke-width="2"/>'
        "</g>"
    )
    made.append(plate("placeholder-3.svg", "The Moon at the terminator", [], extra=moon,
                      bg=("#03040a", "#080c16"), star_count=320, seed=31))

    # 4 - planetary nebula ring
    ring = (
        '<filter id="ringBlur"><feGaussianBlur stdDeviation="10"/></filter>'
        '<g filter="url(#ringBlur)">'
        '<ellipse cx="620" cy="390" rx="185" ry="120" fill="none" stroke="#54e0d0" stroke-width="34" opacity="0.55"/>'
        '<ellipse cx="620" cy="390" rx="150" ry="95" fill="none" stroke="#7fb6ff" stroke-width="18" opacity="0.45"/>'
        '<ellipse cx="620" cy="390" rx="112" ry="66" fill="#c9a2ff" opacity="0.18"/>'
        "</g>"
        '<circle cx="620" cy="390" r="7" fill="#eaf6ff"/>'
        '<circle cx="620" cy="390" r="46" fill="url(#glow)" opacity="0.8"/>'
    )
    made.append(plate("placeholder-4.svg", "Planetary nebula",
                      [nebula(random.Random(9), 41, "0.006 0.009", (0.12, 0.35, 0.42), 5, 0.55)],
                      extra=ring, bg=("#03060e", "#081426"), star_count=560, seed=41))

    # 5 - star trails
    rng = random.Random(51)
    arcs = []
    for _ in range(90):
        r = round(rng.uniform(40, 620), 1)
        a0 = rng.uniform(0, 6.28)
        sweep = rng.uniform(0.35, 1.9)
        x0 = 600 + r * __import__("math").cos(a0)
        y0 = 330 + r * __import__("math").sin(a0)
        x1 = 600 + r * __import__("math").cos(a0 + sweep)
        y1 = 330 + r * __import__("math").sin(a0 + sweep)
        hue = rng.choice(["#fff", "#ffe9c4", "#cfe3ff", "#ffd7c9"])
        arcs.append(
            f'<path d="M{x0:.1f} {y0:.1f} A{r} {r} 0 0 1 {x1:.1f} {y1:.1f}" fill="none" '
            f'stroke="{hue}" stroke-width="{round(rng.uniform(0.6, 2.0), 2)}" '
            f'opacity="{round(rng.uniform(0.3, 0.85), 2)}" stroke-linecap="round"/>'
        )
    trails = (
        '<g filter="url(#trailBlur)">' + "".join(arcs) + "</g>"
        '<filter id="trailBlur"><feGaussianBlur stdDeviation="0.6"/></filter>'
        '<circle cx="600" cy="330" r="5" fill="#fff"/><circle cx="600" cy="330" r="40" fill="url(#glow)" opacity="0.7"/>'
    )
    made.append(plate("placeholder-5.svg", "Star trails",
                      [nebula(random.Random(10), 52, "0.004 0.008", (0.16, 0.13, 0.30), 4, 0.5)],
                      extra=trails, bg=("#04050c", "#0b0f1c"), star_count=260, seed=51))

    # 6 - galaxy
    rng = random.Random(61)
    arms = []
    for k in range(1300):
        t = rng.uniform(0, 5.2)
        rr = 18 + t * 42 + rng.gauss(0, 16)
        ang = t * 0.85 + (0 if k % 2 else 3.14159) + rng.gauss(0, 0.12)
        x = 600 + rr * __import__("math").cos(ang) * 1.35
        y = 400 + rr * __import__("math").sin(ang) * 0.52
        if not (0 <= x <= W and 0 <= y <= H):
            continue
        arms.append(
            f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{round(rng.uniform(0.3, 1.5), 2)}" '
            f'fill="{rng.choice(["#fff", "#ffe7bd", "#bcd8ff"])}" '
            f'opacity="{round(max(0.12, 0.9 - rr / 320), 2)}"/>'
        )
    galaxy = (
        '<g transform="rotate(-18 600 400)">'
        '<ellipse cx="600" cy="400" rx="330" ry="120" fill="#8fa9d8" opacity="0.10"/>'
        '<ellipse cx="600" cy="400" rx="150" ry="52" fill="#ffe0b0" opacity="0.16"/>'
        '<circle cx="600" cy="400" r="34" fill="#fff4dd" opacity="0.5"/>'
        '<circle cx="600" cy="400" r="120" fill="url(#glow)" opacity="0.5"/>'
        + "".join(arms) + "</g>"
    )
    made.append(plate("placeholder-6.svg", "Spiral galaxy", [], extra=galaxy,
                      bg=("#03040b", "#070b18"), star_count=430, seed=61))

    for name, kb in made:
        print(f"  {name:22s} {kb} KB")


if __name__ == "__main__":
    main()
