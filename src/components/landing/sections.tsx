import { Link } from "@tanstack/react-router";
import {
  ImageIcon,
  Link2,
  MapPinned,
  Music2,
  QrCode,
  Smartphone,
  Sparkles,
  Timer,
  Users,
  Video,
  Wand2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/layout/reveal";
import { InvitationRenderer } from "@/components/invitation/renderer";
import { VideoSequence } from "@/components/invitation/video-sequence";
import { CATEGORIES, PRICE, TEMPLATES } from "@/lib/templates";
import { formatPrice } from "@/lib/format";
import { TemplateCard } from "@/components/templates/template-card";
import { cn } from "@/lib/cn";

export function InvitationTypes() {
  return (
    <section className="relative bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Janrlar</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Qaysi hikoyani aytamiz?</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 70}>
              <Link
                to="/templates/$category"
                params={{ category: c.slug }}
                className="group relative block overflow-hidden rounded-[28px] p-6 text-ivory"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(44,31,26,0.15), rgba(44,31,26,0.72)), url(${TEMPLATES.find((t) => t.category === c.id)?.background ?? "/images/hero/roses.jpg"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: 220,
                }}
              >
                <p className="font-display text-2xl">{c.title}</p>
                <p className="mt-2 max-w-xs text-sm text-champagne/90">{c.description}</p>
                <span className="mt-6 inline-flex text-sm tracking-wide text-gold">Ochish →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { n: "01", t: "Dizayn tanlang", d: "Karusel yoki katalogdan o'zingizga yaqin naqshni tanlaysiz." },
    { n: "02", t: "Ma'lumotlaringizni kiriting", d: "Ismlar, sana, foto, musiqa — preview darhol yangilanadi." },
    { n: "03", t: "Tayyor taklifnomangizni ulashing", d: "Unikal havola yaratiladi. Mehmonlar telefonida ochadi." },
  ];
  return (
    <section id="qanday" className="relative overflow-hidden bg-ivory py-24">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-40"
        style={{ backgroundImage: "url(/images/textures/silk.jpg)", backgroundSize: "cover" }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Jarayon</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Qanday ishlaydi?</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <article
                className="group rounded-[28px] bg-cream/80 p-7 shadow-[0_18px_50px_-24px_rgba(44,31,26,0.3)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-1.2deg]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <p className="font-display text-5xl text-gold">{s.n}</p>
                <h3 className="mt-4 font-display text-2xl">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: Sparkles, t: "Premium dizaynlar", d: "Har shablon — alohida visual identity." },
  { icon: Wand2, t: "Real-time preview", d: "Yozganingiz zahoti taklifnomada ko'rinadi." },
  { icon: ImageIcon, t: "Foto va video", d: "Galereya, muqova va kino kadrlar." },
  { icon: Music2, t: "Fon musiqasi", d: "Ichki ambient yoki o'z trekingiz." },
  { icon: MapPinned, t: "Google Maps", d: "Mehmonlar maskanni bir bosishda topadi." },
  { icon: Users, t: "RSVP", d: "Kelish-kelmaslikni yig'ib borasiz." },
  { icon: Timer, t: "Countdown", d: "To'ygacha qolgan kunlar jonli hisoblanadi." },
  { icon: ImageIcon, t: "Photo gallery", d: "Eng nozik kadrlaringiz — nafis panjara." },
  { icon: QrCode, t: "QR / havola", d: "Unikal URL. Ulashing va oching." },
  { icon: Smartphone, t: "Mobil moslashuv", d: "Telefon va planshetda ham cinematic." },
  { icon: Video, t: "Animatsiyalar", d: "Ken Burns, ipak, mask reveal." },
  { icon: Link2, t: "Unique invitation URL", d: "sardor-madina kabi shaxsiy manzil." },
];

export function Features() {
  return (
    <section className="bg-burgundy-deep py-24 text-ivory">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Imkoniyatlar</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Studio ichida nima bor?</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.t} delay={(i % 3) * 60}>
              <article className="rounded-[24px] bg-ivory/8 p-6 shadow-[0_0_0_1px_rgba(212,196,168,0.16)]">
                <f.icon className="size-6 text-gold" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-xl">{f.t}</h3>
                <p className="mt-2 text-sm text-champagne/85">{f.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VideoDemo() {
  const t = TEMPLATES.find((x) => x.id === "video-nikoh")!;
  const [play, setPlay] = useState(false);
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-ivory">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Kino</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Videolik taklifnoma</h2>
          <p className="mt-4 max-w-md text-champagne/85">
            Kadrlar sekin ochiladi, matnlar ritm bilan chiqadi, oxirida taklifnoma namoyon bo'ladi.
            Play bosing — demo jonlanadi.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-[28px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)]">
            {play ? (
              <VideoSequence template={t} data={t.demo} playingDefault />
            ) : (
              <button
                type="button"
                className="relative block w-full"
                onClick={() => setPlay(true)}
                aria-label="Videoni ijro etish"
              >
                <img src="/images/hero/venue.jpg" alt="" className="aspect-[16/11] w-full object-cover" />
                <span className="absolute inset-0 grid place-items-center bg-ink/25">
                  <span className="grid size-20 place-items-center rounded-full bg-ivory text-burgundy">
                    <span className="ml-1 font-display text-lg">Play</span>
                  </span>
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function LiveInvitation() {
  const t = TEMPLATES[1];
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Jonli namuna</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Haqiqiy taklifnoma ko'rinishi</h2>
          <p className="mt-4 text-muted">
            Sardor va Madina — 22 Avgust, 2026. Bu demo kontent. Siz o'z ismlaringizni yozganingizda
            xuddi shu sahifa shaxsiy havolaga aylanadi.
          </p>
          <Button asChild className="mt-8">
            <Link to="/create/$templateId" params={{ templateId: t.id }}>
              Shu dizaynni tayyorlash
            </Link>
          </Button>
        </Reveal>
        <Reveal delay={100}>
          <div className="mx-auto w-[min(360px,100%)] overflow-hidden rounded-[24px] shadow-[0_30px_80px_-28px_rgba(44,31,26,0.45)]">
            <InvitationRenderer template={t} data={t.demo} compact />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Catalog() {
  return (
    <section id="dizaynlar" className="bg-ivory py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Katalog</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Dizaynlar</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 70}>
              <TemplateCard template={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Why() {
  const items = [
    { t: "Mustaqil brend", d: "Nusxa emas — VisolPremium o'z sahnasiga ega." },
    { t: "Cinematic scroll", d: "Sahifalar kesilmaydi, sahnaga kirib keladi." },
    { t: "Shablon tizimi", d: "Yangi dizayn qo'shish — yangi obyekt yozish demak." },
    { t: "Shaxsiy havola", d: "Har taklifnoma — o'z manzili va RSVP daftari." },
  ];
  return (
    <section className="relative overflow-hidden bg-burgundy py-24 text-ivory">
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{ backgroundImage: "url(/images/textures/cinematic.jpg)", backgroundSize: "cover" }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl">Nega VisolPremium?</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 80}>
              <article className="rounded-[24px] bg-ivory/8 p-7">
                <h3 className="font-display text-2xl">{it.t}</h3>
                <p className="mt-2 text-champagne/85">{it.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="narx" className="bg-ivory py-24">
      <div className="mx-auto max-w-xl px-6 text-center">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Narx</p>
          <h2 className="mt-3 font-display text-4xl">Bir studio. Bir narx.</h2>
          <div className="mt-10 rounded-[32px] bg-cream p-10 shadow-[0_24px_70px_-28px_rgba(44,31,26,0.35)]">
            <p className="font-display text-6xl text-burgundy tabular-nums">{formatPrice(PRICE)}</p>
            <p className="mt-3 text-sm text-muted">
              Barcha asosiy shablonlar uchun. To'lov tizimi tez orada ulanadi — hozir yaratish bepul ishlaydi.
            </p>
            <Button asChild className="mt-8">
              <Link to="/templates">Taklifnoma yaratish</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const QUOTES = [
  {
    name: "Dilnoza",
    text: "Taklifnoma ochilganda mehmonlar jim qolishdi. Bu oddiy kartochka emas edi.",
  },
  {
    name: "Jasur",
    text: "Ismlarni yozdim — preview darhol o'zgardi. Shu oqshom havolani yubordik.",
  },
  {
    name: "Malika",
    text: "Videolik tabrik onamni yig'latdi. Musiqa va kadrlar o'zimizniki edi.",
  },
];

export function Testimonials() {
  return (
    <section className="overflow-hidden bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl">Mehmonlarning taassuroti</h2>
        </Reveal>
        <div className="mt-12 flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none]">
          {QUOTES.map((q, i) => (
            <article
              key={q.name}
              className="min-w-[min(86vw,340px)] rounded-[28px] bg-ivory p-8 shadow-[0_18px_50px_-24px_rgba(44,31,26,0.3)]"
              style={{ transform: `rotate(${i === 1 ? -1.5 : i === 2 ? 1.8 : 0.6}deg)` }}
            >
              <p className="font-display text-xl leading-relaxed">“{q.text}”</p>
              <p className="mt-6 text-sm tracking-[0.18em] text-gold uppercase">{q.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "Taklifnoma qanday ulashiladi?",
    a: "Tayyorlash tugmasidan so'ng unikal havola yaratiladi. Uni Telegram, SMS yoki QR orqali yuborasiz.",
  },
  {
    q: "Rasm va musiqa saqlanadimi?",
    a: "Ha. Yuklagan rasmlaringiz va musiqa taklifnoma bilan birga saqlanadi.",
  },
  {
    q: "To'lov hozir ishlaydimi?",
    a: "Narx 19 999 so'm. To'lov shlyuzi hali ulanmagan — yaratish va ulashish hozir ishlaydi.",
  },
  {
    q: "Mobil telefonda ochiladimi?",
    a: "Ha. Taklifnoma vertikal formatda, telefon uchun maxsus moslashtirilgan.",
  },
  {
    q: "RSVP nima qiladi?",
    a: "Mehmonlar ismini yozib, kelishini bildiradi. Siz o'z sahifangizda ro'yxatni ko'rasiz.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-ivory py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <h2 className="font-display text-4xl">Savollar</h2>
        </Reveal>
        <div className="mt-10 divide-y divide-gold/25">
          {FAQS.map((item, i) => {
            const on = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(on ? -1 : i)}
                  aria-expanded={on}
                >
                  <span className="font-display text-xl">{item.q}</span>
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-full text-gold transition-transform duration-300",
                      on && "rotate-45",
                    )}
                  >
                    +
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                    on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <p className="overflow-hidden pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-28 text-ivory">
      <img src="/images/hero/cta.jpg" alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-burgundy-deep/55" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl">Sizning hikoyangizni boshlash vaqti keldi.</h2>
          <Button asChild size="lg" variant="ivory" className="mt-10">
            <Link to="/templates">Taklifnomangizni yaratish →</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export function Showcase() {
  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Interaktiv</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Har shablon — o'z dunyosi</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {TEMPLATES.slice(0, 4).map((t, i) => (
            <Reveal key={t.id} delay={i * 80}>
              <Link
                to="/create/$templateId"
                params={{ templateId: t.id }}
                className="group relative block overflow-hidden rounded-[28px]"
              >
                <img
                  src={t.background}
                  alt=""
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                <div className="absolute right-5 bottom-5 left-5 text-ivory">
                  <p className="font-display text-3xl">{t.title}</p>
                  <p className="text-sm text-champagne">{t.tagline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
