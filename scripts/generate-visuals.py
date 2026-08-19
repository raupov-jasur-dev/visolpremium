#!/usr/bin/env python3
"""VisolPremium — numpy + Pillow bilan premium wedding visual generator."""
from __future__ import annotations

import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageFont

ROOT = Path("/workspace/public")
IMG = ROOT / "images"

IVORY = np.array([247, 241, 232], dtype=np.float32)
CREAM = np.array([243, 230, 216], dtype=np.float32)
BLUSH = np.array([232, 196, 196], dtype=np.float32)
ROSE = np.array([201, 154, 154], dtype=np.float32)
BURGUNDY = np.array([107, 45, 60], dtype=np.float32)
CHAMPAGNE = np.array([212, 196, 168], dtype=np.float32)
GOLD = np.array([184, 149, 106], dtype=np.float32)
INK = np.array([44, 31, 26], dtype=np.float32)


def mix(a, b, t):
    t = np.clip(t, 0, 1)
    if np.ndim(t):
        t = t[..., None]
    return a + (b - a) * t


def value_noise(h, w, scale, rng):
    gy = max(2, int(h / scale) + 2)
    gx = max(2, int(w / scale) + 2)
    grid = rng.random((gy, gx)).astype(np.float32)
    ys = np.linspace(0, gy - 2, h, dtype=np.float32)
    xs = np.linspace(0, gx - 2, w, dtype=np.float32)
    y0 = np.floor(ys).astype(np.int32)
    x0 = np.floor(xs).astype(np.int32)
    fy = ys - y0
    fx = xs - x0
    fy = fy * fy * (3 - 2 * fy)
    fx = fx * fx * (3 - 2 * fx)
    n00 = grid[y0[:, None], x0[None, :]]
    n10 = grid[y0[:, None], x0[None, :] + 1]
    n01 = grid[y0[:, None] + 1, x0[None, :]]
    n11 = grid[y0[:, None] + 1, x0[None, :] + 1]
    return (n00 * (1 - fx) + n10 * fx) * (1 - fy[:, None]) + (n01 * (1 - fx) + n11 * fx) * fy[:, None]


def fbm(h, w, seed, octaves=5, base=80.0):
    rng = np.random.default_rng(seed)
    acc = np.zeros((h, w), dtype=np.float32)
    amp = 1.0
    total = 0.0
    scale = float(base)
    for _ in range(octaves):
        acc += value_noise(h, w, scale, rng) * amp
        total += amp
        amp *= 0.5
        scale *= 0.5
    return acc / total


def vignette(rgb, strength=0.4, color=INK):
    h, w = rgb.shape[:2]
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    d = np.hypot(x - w / 2, y - h / 2) / math.hypot(w / 2, h / 2)
    t = np.clip((d - 0.32) / 0.68, 0, 1) ** 1.55 * strength
    return mix(rgb, color, t)


def grain(rgb, seed, amount=8):
    rng = np.random.default_rng(seed)
    g = rng.integers(-amount, amount + 1, size=rgb.shape[:2]).astype(np.float32)
    return np.clip(rgb + g[..., None], 0, 255)


def to_img(rgb):
    return Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8), "RGB")


def silk(w, h, seed, pal):
    n1 = fbm(h, w, seed, 5, max(40, w / 8))
    n2 = fbm(h, w, seed + 9, 3, max(16, w / 18))
    x = np.linspace(0, w, w, dtype=np.float32)
    fold = np.sin(x[None, :] / (w * 0.18) + n1 * 4.2) * 0.5 + 0.5
    fold = fold * 0.7 + n2 * 0.3
    drape = 0.55 + 0.45 * np.sin((x[None, :] / w) * math.pi)
    t = fold * 0.75 + drape * 0.25
    rgb = np.where(t[..., None] < 0.5, mix(pal[0], pal[1], t * 2), mix(pal[1], pal[2], (t - 0.5) * 2))
    hi = np.abs(np.sin(x[None, :] / 22 + n1 * 6)) ** 8
    rgb = mix(rgb, np.array([255, 248, 240], dtype=np.float32), hi * 0.32)
    return grain(vignette(rgb, 0.28, mix(pal[0], INK, 0.5)), seed, 7)


def watercolor(w, h, seed, colors):
    n = fbm(h, w, seed, 5, max(50, w / 6))
    n2 = fbm(h, w, seed + 3, 4, max(24, w / 12))
    t = n
    idx = np.clip((t * (len(colors) - 1)).astype(np.int32), 0, len(colors) - 2)
    frac = t * (len(colors) - 1) - idx
    stacked = np.stack(colors).astype(np.float32)
    local = stacked[idx] + (stacked[idx + 1] - stacked[idx]) * frac[..., None]
    paper = mix(IVORY, CREAM, n2)
    edge = np.abs(n2 - 0.5) * 2
    rgb = mix(paper, local, 0.45 + edge * 0.25)
    return grain(vignette(rgb, 0.22, ROSE), seed, 8)


def cinematic(w, h, seed):
    n = fbm(h, w, seed, 5, max(60, w / 7))
    x = np.linspace(0, 1, w, dtype=np.float32)
    y = np.linspace(0, 1, h, dtype=np.float32)
    col_wave = np.abs(np.sin(x[None, :] * math.pi * 6)) ** 1.8
    warm = mix(BURGUNDY, np.array([48, 28, 32], dtype=np.float32), n)
    gold_wash = mix(warm, GOLD, col_wave * 0.18 * (1 - y[:, None]))
    lx, ly = w * 0.5, h * 0.18
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    d = np.hypot(xx - lx, yy - ly) / (w * 0.7)
    light = np.clip(1 - d, 0, 1) ** 2
    gold_wash = mix(gold_wash, CHAMPAGNE, light * 0.35)
    return grain(vignette(gold_wash, 0.55, np.array([20, 10, 12], dtype=np.float32)), seed, 9)


def garden(w, h, seed):
    n = fbm(h, w, seed, 4, max(40, w / 8))
    y = np.linspace(0, 1, h, dtype=np.float32)
    sky = mix(np.array([232, 214, 196], dtype=np.float32), np.array([246, 236, 226], dtype=np.float32), y[:, None])
    foliage = mix(np.array([90, 110, 78], dtype=np.float32), np.array([140, 92, 92], dtype=np.float32), n)
    t = np.clip(0.15 + n * 0.55 + np.clip((y[:, None] - 0.55) * 0.8, 0, 0.25), 0, 1)
    rgb = mix(sky, foliage, t)
    img = to_img(rgb).convert("RGBA")
    rng = np.random.default_rng(seed)
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for i in range(16):
        cx = int(rng.integers(int(w * 0.05), int(w * 0.95)))
        cy = int(rng.integers(int(h * 0.28), int(h * 0.95)))
        radius = int(rng.integers(int(min(w, h) * 0.07), int(min(w, h) * 0.16)))
        col = mix(ROSE, BURGUNDY, float(rng.random()))
        petals = int(rng.integers(7, 12))
        for p in range(petals):
            a = p * (math.tau / petals) + float(rng.random()) * 0.3
            dist = radius * (0.35 + float(rng.random()) * 0.25)
            px = cx + math.cos(a) * dist
            py = cy + math.sin(a) * dist
            rx = radius * (0.32 + float(rng.random()) * 0.22)
            ry = radius * (0.5 + float(rng.random()) * 0.2)
            alpha = int(rng.integers(80, 150))
            fill = (int(col[0]), int(col[1]), int(col[2]), alpha)
            d.ellipse([px - rx, py - ry, px + rx, py + ry], fill=fill)
        core = mix(col, BURGUNDY, 0.4)
        d.ellipse([cx - radius * 0.16, cy - radius * 0.16, cx + radius * 0.16, cy + radius * 0.16],
                  fill=(int(core[0]), int(core[1]), int(core[2]), 170))
    img = Image.alpha_composite(img, overlay)
    rgb = np.asarray(img.convert("RGB"), dtype=np.float32)
    return grain(vignette(rgb, 0.3, np.array([60, 40, 36], dtype=np.float32)), seed, 7)


def ornament(w, h, seed, fg=GOLD, bg=None):
    if bg is None:
        bg = mix(BURGUNDY, INK, 0.25)
    n = fbm(h, w, seed, 3, max(80, w / 4))
    rgb = mix(bg, mix(bg, CREAM, 0.4), n * 0.35)
    img = to_img(rgb)
    draw = ImageDraw.Draw(img)
    step = max(28, w // 12)
    gold = tuple(int(x) for x in mix(fg, GOLD, 0.4))
    gold2 = tuple(int(x) for x in GOLD)
    for y in range(-step, h + step, step):
        for x in range(-step, w + step, step):
            cx, cy = x + step // 2, y + step // 2
            r = step * 0.32
            pts = []
            for i in range(16):
                a = i * math.pi / 8 - math.pi / 2
                rad = r if i % 2 == 0 else r * 0.42
                pts.append((cx + math.cos(a) * rad, cy + math.sin(a) * rad))
            draw.polygon(pts, outline=gold)
            draw.ellipse([cx - r * 0.12, cy - r * 0.12, cx + r * 0.12, cy + r * 0.12], outline=gold2)
    cx, cy = w // 2, h // 2
    r = min(w, h) * 0.22
    pts = []
    for i in range(16):
        a = i * math.pi / 8
        rad = r if i % 2 == 0 else r * 0.55
        pts.append((cx + math.cos(a) * rad, cy + math.sin(a) * rad))
    draw.polygon(pts, outline=gold2)
    rgb = np.asarray(img, dtype=np.float32)
    return grain(vignette(rgb, 0.25, INK), seed, 6)


def damask(w, h, seed):
    n = fbm(h, w, seed, 4, max(50, w / 7))
    rgb = mix(np.array([236, 220, 198], dtype=np.float32), np.array([214, 186, 150], dtype=np.float32), n)
    img = to_img(rgb)
    d = ImageDraw.Draw(img)
    step = max(40, w // 8)
    gold = tuple(int(x) for x in mix(GOLD, np.array([90, 58, 52], dtype=np.float32), 0.2))
    gold2 = tuple(int(x) for x in GOLD)
    for y in range(0, h + step, step):
        ox = 0 if (y // step) % 2 == 0 else step // 2
        for x in range(-step, w + step, step):
            cx, cy = x + ox, y
            r = step * 0.28
            d.ellipse([cx - r, cy - r * 1.2, cx + r, cy + r * 0.6], outline=gold)
            d.arc([cx - r * 0.5, cy - r, cx + r * 0.9, cy + r * 0.4], 200, 40, fill=gold2)
    rgb = np.asarray(img, dtype=np.float32)
    return grain(vignette(rgb, 0.3, np.array([80, 55, 40], dtype=np.float32)), seed, 6)


def floral(w, h, seed):
    g = garden(w, h, seed)
    silk_rgb = silk(w, h, seed, [mix(IVORY, BLUSH, 0.3), BLUSH, ROSE])
    rgb = g * 0.72 + silk_rgb * 0.28
    return vignette(rgb, 0.35, BURGUNDY)


def save_jpg(rgb, path: Path, q=86):
    path.parent.mkdir(parents=True, exist_ok=True)
    img = to_img(rgb)
    img.save(path, "JPEG", quality=q, optimize=True)
    print(f"wrote {path} {img.size} {path.stat().st_size // 1024}KB")


def draw_og():
    w, h = 1200, 630
    base = floral(w, h, 7)
    s = silk(w, h, 3, [mix(IVORY, BLUSH, 0.4), ROSE, mix(BURGUNDY, ROSE, 0.3)])
    rgb = base * 0.55 + s * 0.45
    img = to_img(rgb)
    d = ImageDraw.Draw(img)
    m = 36
    d.rectangle([m, m, w - m, h - m], outline=tuple(int(x) for x in GOLD), width=2)
    d.rectangle([m + 8, m + 8, w - m - 8, h - m - 8], outline=tuple(int(x) for x in mix(GOLD, CREAM, 0.4)), width=1)
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rounded_rectangle([200, 200, 1000, 430], radius=8, fill=(44, 31, 26, 100))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    d = ImageDraw.Draw(img)
    try:
        font_lg = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 68)
        font_sm = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", 26)
    except Exception:
        font_lg = ImageFont.load_default()
        font_sm = font_lg
    title = "VisolPremium"
    bbox = d.textbbox((0, 0), title, font=font_lg)
    tw = bbox[2] - bbox[0]
    d.text(((w - tw) / 2, 235), title, font=font_lg, fill=(247, 241, 232))
    sub = "Premium taklifnomalar va tabriknomalar"
    bbox = d.textbbox((0, 0), sub, font=font_sm)
    tw = bbox[2] - bbox[0]
    d.text(((w - tw) / 2, 328), sub, font=font_sm, fill=tuple(int(x) for x in CHAMPAGNE))
    path = ROOT / "og.jpg"
    img.save(path, "JPEG", quality=84, optimize=True)
    print(f"wrote {path} {img.size} {path.stat().st_size // 1024}KB")


def draw_favicon():
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#6B2D3C"/>
  <rect x="4" y="4" width="56" height="56" rx="11" fill="none" stroke="#B8956A" stroke-width="1.4"/>
  <text x="32" y="42" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
        font-size="30" font-weight="600" fill="#F7F1E8">V</text>
</svg>
"""
    (ROOT / "favicon.svg").write_text(svg)
    print("wrote favicon.svg")


def kind_rgb(kind, w, h, seed):
    if kind == "floral":
        return floral(w, h, seed)
    if kind == "cinematic":
        return cinematic(w, h, seed)
    if kind == "silk":
        return silk(w, h, seed, [IVORY, BLUSH, ROSE])
    if kind == "watercolor":
        return watercolor(w, h, seed, [IVORY, BLUSH, ROSE, np.array([180, 140, 150], dtype=np.float32)])
    if kind == "garden":
        return garden(w, h, seed)
    if kind == "ornament":
        return ornament(w, h, seed)
    return damask(w, h, seed)


def main():
    draw_favicon()
    draw_og()

    save_jpg(silk(1600, 1000, 1, [mix(IVORY, BLUSH, 0.25), BLUSH, ROSE]), IMG / "hero/silk-pink.jpg")
    save_jpg(silk(1600, 1000, 2, [IVORY, mix(IVORY, BLUSH, 0.4), mix(BLUSH, CREAM, 0.5)]), IMG / "hero/silk-ivory.jpg")
    save_jpg(cinematic(1600, 900, 4), IMG / "hero/venue.jpg")
    save_jpg(garden(1600, 900, 5), IMG / "hero/garden.jpg")
    save_jpg(floral(1400, 900, 6), IMG / "hero/roses.jpg")
    save_jpg(cinematic(1600, 900, 40) * 0.6 + floral(1600, 900, 41) * 0.4, IMG / "hero/cta.jpg")

    save_jpg(silk(1200, 800, 11, [CREAM, CHAMPAGNE, mix(GOLD, CREAM, 0.5)]), IMG / "textures/silk.jpg")
    save_jpg(watercolor(1200, 800, 12, [IVORY, BLUSH, ROSE, CHAMPAGNE]), IMG / "textures/watercolor.jpg")
    save_jpg(damask(1200, 800, 13), IMG / "textures/damask.jpg")
    save_jpg(ornament(1200, 800, 14), IMG / "textures/ornament.jpg")
    save_jpg(cinematic(1200, 800, 15), IMG / "textures/cinematic.jpg")
    save_jpg(watercolor(1200, 800, 16, [IVORY, CREAM, CHAMPAGNE]), IMG / "textures/paper.jpg")

    specs = {
        "guldasta": ("floral", 21),
        "shohona": ("cinematic", 22),
        "ipak-xat": ("silk", 23),
        "yulduz-tabrik": ("watercolor", 24),
        "kechki-uchrashuv": ("garden", 25),
        "video-yoruglik": ("cinematic", 26),
        "video-nikoh": ("floral", 27),
        "qutlug-yosh": ("ornament", 28),
        "naqsh": ("ornament", 29),
        "marvarid": ("damask", 30),
    }
    for name, (kind, seed) in specs.items():
        folder = IMG / "templates" / name
        cover = kind_rgb(kind, 720, 1080, seed)
        bg = kind_rgb(kind, 1400, 900, seed + 1)
        save_jpg(cover, folder / "cover.jpg", 84)
        save_jpg(bg, folder / "background.jpg", 84)
        g1 = np.asarray(ImageEnhance.Color(to_img(cover)).enhance(0.88).resize((800, 600)), dtype=np.float32)
        g2 = np.asarray(ImageEnhance.Brightness(to_img(bg)).enhance(0.92).resize((800, 600)), dtype=np.float32)
        save_jpg(g1, folder / "gallery-1.jpg")
        save_jpg(g2, folder / "gallery-2.jpg")

    print("done")


if __name__ == "__main__":
    main()
