# VisolPremium

Premium raqamli taklifnoma va tabriknoma platformasi.

Har bir lahza o'z hikoyasiga loyiq.

Bu loyiha **TanStack Start** (React) + **Postgres** (Neon yoki lokal PGLite) ustida qurilgan.
Interfeys **faqat o'zbek tilida**.

---

## 1. Loyihani qanday ishga tushirish

Kompyuterda Node.js 22 bo'lishi kerak.

```bash
npm install
npm run dev
```

Brauzerda ochiladi: `http://localhost:8080`

Ishlab chiqarish (production) build:

```bash
npm run build
npm run preview
```

---

## 2. Dependency o'rnatish

```bash
npm install
```

Asosiy kutubxonalar:

- React 19, TanStack Router / Start
- Tailwind CSS
- Three.js + React Three Fiber (ipak parda)
- Lenis + GSAP (yumshoq scroll)
- Framer Motion o'rniga CSS + Intersection Observer
- Better Auth (Google va X orqali kirish)

---

## 3. Muhit o'zgaruvchilari (env)

**Maxfiy kalitlarni kodga yozmang.**

Lokal ko'rishda hech narsa sozlash shart emas:

- ma'lumotlar bazasi avtomatik **PGLite** (xotiradagi Postgres) ga tushadi
- kirish preview rejimida ishlaydi

Deploy qilinganda platforma o'zi qo'yadi:

| Nom | Nima uchun |
| --- | --- |
| `DATABASE_URL` | Haqiqiy Postgres (Neon) |
| `BETTER_AUTH_SECRET` | Sessiya imzosi |
| `GROK_AUTH_CLIENT_ID` / `GROK_AUTH_CLIENT_SECRET` | Kirish brokeri |

Hech qachon `VITE_` prefiksisiz server kalitini brauzerga chiqarmang.

---

## 4. Ma'lumotlar bazasini ulash

Kod `@/lib/db` orqali ishlaydi:

- `DATABASE_URL` bo'lsa → Neon Postgres
- bo'lmasa → lokal PGLite

Supabase o'rniga shu Postgres qatlami ishlatiladi. Jadval va so'rovlar oddiy SQL.

---

## 5. Database yaratish

Jadvallar `migrations/` papkasida.

1. `0001_auth.sql` — foydalanuvchi / sessiya (o'zgartirmang)
2. `0002_invitations.sql` — taklifnomalar va RSVP

Lokalda migratsiya `npm run dev` paytida o'zi qo'llanadi.
Deployda `npm run build` ichida `db:migrate` ishlaydi.

---

## 6. Storage sozlash

Hozir rasmlar va musiqa taklifnoma JSON ichida (siqilgan data URL) saqlanadi.
Katta fayllar uchun keyinroq object storage (S3 / Supabase Storage) ulash mumkin —
`src/lib/media.ts` shu joy.

Cheklovlar:

- rasm: 2.4 MB gacha, avtomatik JPEG siqish
- audio: 6 MB gacha

---

## 7. Yangi template qo'shish

1. `src/lib/templates.ts` faylini oching.
2. `TEMPLATES` ro'yxatiga yangi obyekt qo'shing.

Kerakli maydonlar:

- `id` — unikal nom (`guldasta` kabi)
- `category` — `toy`, `taklifnoma`, `tabriknoma`, `uchrashuv`, `video-tabrik`, `video-taklif`, `tugilgan-kun`
- `title`, `tagline`, `price`
- `previewImage`, `background`, `gallery` — `/images/templates/...` yo'llari
- `fields` — editor formasi
- `sections` — taklifnoma bo'limlari
- `theme` — ranglar
- `isVideo` — video shablon bo'lsa `true`
- `demo` — namuna matnlar

Editor avtomatik `fields` dan forma yasaydi. Frontendni qayta yozish shart emas.

---

## 8. Template field qo'shish

`fields` ichiga:

```ts
{ key: "venue", label: "Maskan", type: "text", required: true }
```

Mavjud `type` lar:

`text`, `textarea`, `date`, `time`, `image`, `images`, `music`, `map`, `phone`, `url`, `number`, `select`, `boolean`, `video`

Keyin `sections` ga mos bo'limni qo'shing (`cover`, `names`, `datetime`...).
Renderer: `src/components/invitation/renderer.tsx`.

---

## 9. Image almashtirish

Rasmlar:

```
public/images/templates/<id>/cover.jpg
public/images/templates/<id>/background.jpg
public/images/templates/<id>/gallery-1.jpg
```

`src/lib/templates.ts` dagi yo'lni yangilang.
Qayta generate qilish:

```bash
python3 scripts/generate-visuals.py
```

---

## 10. Video almashtirish

Videolik shablonlar (`video-yoruglik`, `video-nikoh`) kadrlar ketma-ketligidan iborat.

- `slides` — rasmlar ro'yxati
- `captions` — har qator = bitta kadr matni
- `music` — treklar `src/lib/music.ts` da

Bu cinematic slideshow. Haqiqiy MP4 encoder yo'q — lekin mehmon uchun video kabi ochiladi.

---

## 11. Production build

```bash
npm run build
npm run typecheck
```

Build muvaffaqiyatli bo'lishi kerak. Vercel `nitro` preset orqali deploy qilinadi.

---

## 12. Deploy

1. `npm run build` o'tishini tekshiring.
2. `DATABASE_URL` ni production Postgres ga ulang.
3. Auth client id/secret ni platforma qo'yadi.
4. `public/og.jpg` va `public/favicon.svg` ulash kartochkasi.

---

## Sahifalar

| Yo'l | Vazifa |
| --- | --- |
| `/` | Landing |
| `/templates` | Katalog |
| `/templates/$category` | Kategoriya |
| `/create/$templateId` | Editor |
| `/preview/$id` | To'liq ekran ko'rish |
| `/invitation/$id` | Mehmon uchun havola |
| `/dizayn/$slug` | Qisqa alias |
| `/mening-taklifnomalarim` | Mening ishlarim |
| `/login` | Kirish |

---

## Kod tuzilishi

```
src/lib/templates.ts          shablon reyestri
src/lib/invitations.ts        saqlash / o'qish
src/components/invitation/    renderer + video + RSVP
src/components/editor/        modal forma
src/components/landing/       hero, karusel, sectionlar
src/components/three/         ipak parda (WebGL)
migrations/0002_invitations.sql
```

Muhim joylarda o'zbekcha izohlar bor — lekin har qatorga emas.

---

## Muammolarni tuzatish

- **Shablon topilmadi** — `id` ni `TEMPLATES` da tekshiring.
- **Taklifnoma topilmadi** — havola `slug` yoki `id` bo'lishi kerak, `published = true`.
- **Rasm yuklanmadi** — hajm 2.4 MB dan oshmasin, faqat image MIME.
- **Unauthorized** — avval `/login` orqali kiring, keyin «Tayyorlash».
- **WebGL parda ko'rinmasa** — static ipak rasm fallback ishlaydi.
