import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { MapPin, Phone } from "lucide-react";
import type { InvitationData, InvitationTemplate, SectionId } from "@/lib/types";
import { asBool, asString, asStringList } from "@/lib/media";
import { formatUzDate, formatUzDateLong } from "@/lib/format";
import { FloralCorner, GoldFrame, StarMedallion } from "./ornaments";
import { VideoSequence } from "./video-sequence";
import { cn } from "@/lib/cn";

export function InvitationRenderer({
  template,
  data,
  compact = false,
  autoScroll = false,
}: {
  template: InvitationTemplate;
  data: InvitationData;
  compact?: boolean;
  autoScroll?: boolean;
}) {
  const dark = ["cinematic", "ornament", "video"].includes(template.theme.style);
  const style = {
    "--inv-paper": template.theme.paper,
    "--inv-ink": template.theme.ink,
    "--inv-muted": template.theme.muted,
    "--inv-accent": template.theme.accent,
    "--inv-gold": template.theme.gold,
  } as CSSProperties;

  return (
    <article
      className={cn(
        "relative overflow-hidden text-[color:var(--inv-ink)]",
        compact ? "rounded-[18px]" : "rounded-[22px]",
      )}
      style={{
        ...style,
        backgroundColor: template.theme.paper,
        fontFamily: template.fonts.body,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage: `url(${template.background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: template.theme.overlay }}
      />
      <div
        className={cn(
          "relative",
          autoScroll && compact ? "invitation-autoscroll" : "",
        )}
      >
        {template.sections.map((section) => (
          <Section key={section} id={section} template={template} data={data} compact={compact} dark={dark} />
        ))}
      </div>
    </article>
  );
}

function Section({
  id,
  template,
  data,
  compact,
  dark,
}: {
  id: SectionId;
  template: InvitationTemplate;
  data: InvitationData;
  compact: boolean;
  dark: boolean;
}) {
  const pad = compact ? "px-5 py-7" : "px-7 py-12 sm:px-10";
  const names = coupleNames(data, template);
  const cover = asString(data.coverPhoto) || template.previewImage;

  switch (id) {
    case "cover":
      return (
        <header className="relative isolate min-h-[28rem] overflow-hidden sm:min-h-[34rem]">
          <img src={cover} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-ink/10" />
          <GoldFrame className="absolute inset-4 text-gold/80" />
          {template.theme.style === "floral" || template.theme.style === "garden" ? (
            <>
              <FloralCorner className="absolute top-6 left-6 w-16 text-gold/70" />
              <FloralCorner className="absolute right-6 bottom-6 w-16 rotate-180 text-gold/70" />
            </>
          ) : null}
          {template.theme.style === "ornament" ? (
            <StarMedallion className="absolute top-8 left-1/2 w-16 -translate-x-1/2 text-gold" />
          ) : null}
          <div className="relative flex min-h-[28rem] flex-col items-center justify-end px-6 pb-10 text-center sm:min-h-[34rem]">
            <p className="text-[11px] tracking-[0.32em] text-champagne uppercase">
              {categoryLabel(template)}
            </p>
            <h1
              className="mt-3 font-script text-5xl text-ivory sm:text-6xl"
              style={{ fontFamily: template.fonts.script }}
            >
              {names}
            </h1>
            {asString(data.date) ? (
              <p className="mt-3 font-display text-lg text-champagne">{formatUzDate(asString(data.date))}</p>
            ) : null}
          </div>
        </header>
      );
    case "names":
      return (
        <section className={cn(pad, "text-center")}>
          <div className="gold-line mx-auto mb-5" />
          <p className="text-[11px] tracking-[0.28em] uppercase opacity-70">
            {template.category === "tabriknoma" || template.category === "video-tabrik"
              ? "Tabrik"
              : template.category === "tugilgan-kun"
                ? "Qutlug' kun"
                : "Taklif etamiz"}
          </p>
          <h2
            className="mt-3 font-display text-4xl sm:text-5xl"
            style={{ fontFamily: template.fonts.display }}
          >
            {names}
          </h2>
        </section>
      );
    case "verse":
      return (
        <section className={cn(pad, "text-center")}>
          <p className="mx-auto max-w-sm font-display text-xl italic leading-relaxed opacity-90">
            «Ikki qalb — bir taqdir. Shu kunda yangi hikoya boshlanadi.»
          </p>
        </section>
      );
    case "photo": {
      if (!cover) return null;
      return (
        <section className={cn(pad, "flex justify-center")}>
          <figure className="w-full max-w-sm overflow-hidden rounded-[22px] shadow-[0_20px_50px_-20px_rgba(20,10,10,0.45)]">
            <img src={cover} alt="" className="aspect-[4/5] w-full object-cover" />
          </figure>
        </section>
      );
    }
    case "datetime":
      return (
        <section className={cn(pad, "text-center")}>
          <p className="text-[11px] tracking-[0.28em] uppercase opacity-70">Sana va vaqt</p>
          <p className="mt-2 font-display text-2xl">{formatUzDateLong(asString(data.date))}</p>
          {asString(data.time) ? (
            <p className="mt-1 text-lg opacity-80">{asString(data.time)}</p>
          ) : null}
        </section>
      );
    case "event":
      return (
        <section className={cn(pad, "text-center")}>
          <p className="text-[11px] tracking-[0.28em] uppercase opacity-70">Maskan</p>
          <p className="mt-2 font-display text-3xl">{asString(data.venue) || asString(data.title)}</p>
          {asString(data.address) ? (
            <p className="mt-2 text-sm opacity-75">{asString(data.address)}</p>
          ) : null}
        </section>
      );
    case "parents":
      if (!asString(data.parentsGroom) && !asString(data.parentsBride)) return null;
      return (
        <section className={cn(pad, "grid gap-6 text-center sm:grid-cols-2")}>
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase opacity-70">Kuyov taraf</p>
            <p className="mt-2 font-display text-xl">{asString(data.parentsGroom)}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase opacity-70">Kelin taraf</p>
            <p className="mt-2 font-display text-xl">{asString(data.parentsBride)}</p>
          </div>
        </section>
      );
    case "gallery": {
      const photos = asStringList(data.gallery);
      if (!photos.length) return null;
      return (
        <section className={cn(pad, "grid grid-cols-2 gap-3")}>
          {photos.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
          ))}
        </section>
      );
    }
    case "location": {
      const url = asString(data.mapUrl);
      if (!asString(data.address) && !url) return null;
      return (
        <section className={cn(pad, "text-center")}>
          <p className="inline-flex items-center gap-2 text-sm opacity-80">
            <MapPin className="size-4" />
            {asString(data.address) || "Manzil"}
          </p>
          {url ? (
            <p className="mt-3">
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center rounded-full bg-[color:var(--inv-gold)] px-5 text-sm text-ink"
              >
                Xaritada ochish
              </a>
            </p>
          ) : null}
          {asString(data.phone) ? (
            <p className="mt-4 inline-flex items-center gap-2 text-sm opacity-80">
              <Phone className="size-4" />
              {asString(data.phone)}
            </p>
          ) : null}
        </section>
      );
    }
    case "countdown":
      if (!asBool(data.countdownEnabled) || !asString(data.date)) return null;
      return (
        <section className={cn(pad, "text-center")}>
          <Countdown date={asString(data.date)} time={asString(data.time)} />
        </section>
      );
    case "rsvp":
      if (!asBool(data.rsvpEnabled)) return null;
      return (
        <section className={cn(pad, "text-center")}>
          <p className="font-display text-2xl">Ishtirokingizni bildiring</p>
          <p className="mt-2 text-sm opacity-75">Quyida RSVP formasini to'ldirasiz.</p>
        </section>
      );
    case "message":
      return (
        <section className={cn(pad, "text-center")}>
          <p className="mx-auto max-w-md font-display text-xl leading-relaxed">
            {asString(data.greeting) || asString(data.message)}
          </p>
        </section>
      );
    case "host":
      return (
        <section className={cn(pad, "text-center")}>
          <p className="text-[11px] tracking-[0.22em] uppercase opacity-70">Mezbon</p>
          <p className="mt-2 font-display text-2xl">{asString(data.host)}</p>
        </section>
      );
    case "age":
      return (
        <section className={cn(pad, "text-center")}>
          <p className="font-script text-7xl text-[color:var(--inv-gold)]">{asString(data.age)}</p>
          <p className="mt-1 text-sm tracking-[0.2em] uppercase opacity-70">yosh</p>
        </section>
      );
    case "video-sequence":
      return (
        <VideoSequence
          template={template}
          data={data}
          compact={compact}
        />
      );
    case "footer":
      return (
        <footer className={cn(pad, "text-center")}>
          <div className="gold-line mx-auto mb-4" />
          <p className="font-script text-3xl">{names}</p>
          {asString(data.greeting) ? (
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed opacity-80">
              {asString(data.greeting)}
            </p>
          ) : null}
          <p className="mt-6 text-[10px] tracking-[0.28em] uppercase opacity-50">VisolPremium</p>
        </footer>
      );
    default:
      return null;
  }
}

function coupleNames(data: InvitationData, template: InvitationTemplate): string {
  if (asString(data.groom) && asString(data.bride)) {
    return `${asString(data.groom)} & ${asString(data.bride)}`;
  }
  if (asString(data.honoree)) return asString(data.honoree);
  if (asString(data.recipient) && asString(data.sender)) {
    return `${asString(data.sender)} → ${asString(data.recipient)}`;
  }
  if (asString(data.title)) return asString(data.title);
  return template.title;
}

function categoryLabel(template: InvitationTemplate): string {
  if (template.category === "toy" || template.category === "video-taklif") return "Nikoh to'yi";
  if (template.category === "tugilgan-kun") return "Tug'ilgan kun";
  if (template.category === "uchrashuv") return "Uchrashuv";
  if (template.category === "tabriknoma" || template.category === "video-tabrik") return "Tabrik";
  return "Taklifnoma";
}

function Countdown({ date, time }: { date: string; time?: string }) {
  const target = useMemo(() => {
    const iso = time ? `${date}T${time}` : `${date}T00:00:00`;
    return new Date(iso).getTime();
  }, [date, time]);
  // SSR va client vaqt farq qilmasin — hisoblagich faqat mount dan keyin ishlaydi.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = Math.max(0, target - (now ?? target));
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  const cells = [
    { n: now == null ? "—" : days, l: "kun" },
    { n: now == null ? "—" : hours, l: "soat" },
    { n: now == null ? "—" : mins, l: "daq" },
    { n: now == null ? "—" : secs, l: "son" },
  ];

  return (
    <div className="flex justify-center gap-3">
      {cells.map((c) => (
        <div key={c.l} className="min-w-14 rounded-2xl bg-black/10 px-3 py-3">
          <div className="font-display text-2xl tabular-nums">{c.n}</div>
          <div className="text-[10px] tracking-widest uppercase opacity-70">{c.l}</div>
        </div>
      ))}
    </div>
  );
}

export { coupleNames };
