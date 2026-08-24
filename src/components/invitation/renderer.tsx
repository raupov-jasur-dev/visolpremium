import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { MapPin, Phone } from "lucide-react";
import type { InvitationData, InvitationTemplate } from "@/lib/types";
import { asBool, asString, asStringList } from "@/lib/media";
import { formatUzDateLong } from "@/lib/format";
import { VideoSequence } from "./video-sequence";
import { cn } from "@/lib/cn";

function isDarkPaper(paper: string): boolean {
  const hex = paper.replace("#", "").trim();
  if (hex.length < 6) return false;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 150;
}

function frameLayout(template: InvitationTemplate): {
  place: "center" | "lower";
  panel: boolean;
} {
  if (template.id === "naqsh") return { place: "center", panel: true };
  if (template.theme.style === "cinematic") return { place: "lower", panel: false };
  return { place: "center", panel: false };
}

export function InvitationRenderer({
  template,
  data,
  compact = false,
}: {
  template: InvitationTemplate;
  data: InvitationData;
  compact?: boolean;
  autoScroll?: boolean;
}) {
  const dark = isDarkPaper(template.theme.paper);
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
        compact ? "w-full rounded-[18px]" : "rounded-[22px]",
      )}
      style={{
        ...style,
        backgroundColor: template.theme.paper,
        fontFamily: template.fonts.body,
      }}
    >
      {template.isVideo ? (
        <VideoSequence template={template} data={data} compact={compact} />
      ) : (
        <FramedCard template={template} data={data} compact={compact} dark={dark} />
      )}
      {!compact ? <BelowCard template={template} data={data} dark={dark} /> : null}
    </article>
  );
}

function FramedCard({
  template,
  data,
  compact,
  dark,
}: {
  template: InvitationTemplate;
  data: InvitationData;
  compact: boolean;
  dark: boolean;
}) {
  const names = coupleNames(data, template);
  const cover = asString(data.coverPhoto);
  const showPhoto =
    Boolean(cover) &&
    cover !== template.previewImage &&
    cover !== template.background &&
    !cover.startsWith("/images/templates/");
  const greeting = asString(data.greeting) || asString(data.message);
  const { place, panel } = frameLayout(template);
  const age = asString(data.age);
  const host = asString(data.host);
  const sender = asString(data.sender);
  const byline = host || sender;
  const venue = asString(data.venue);
  const title = asString(data.title);

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden">
      <img
        src={template.background}
        alt=""
        className="absolute inset-0 size-full object-cover outline-none"
      />

      <div
        className="pointer-events-none absolute inset-[9%] rounded-[16px]"
        style={{
          background:
            place === "lower"
              ? "linear-gradient(to top, rgba(8,2,4,0.55) 0%, rgba(8,2,4,0.18) 42%, transparent 72%)"
              : dark
                ? "radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.12) 58%, transparent 80%)"
                : "radial-gradient(ellipse at 50% 46%, rgba(255,252,245,0.62) 0%, rgba(255,252,245,0.20) 54%, transparent 78%)",
        }}
      />

      {panel ? (
        <div className="pointer-events-none absolute inset-[15%] rounded-[22px] bg-[#071018]/62 shadow-[inset_0_0_48px_rgba(0,0,0,0.28)] backdrop-blur-[3px]" />
      ) : null}

      <div
        className={cn(
          "relative z-10 flex h-full flex-col items-center px-[14%] text-center",
          place === "lower" ? "justify-end pb-[15%] pt-[42%]" : "justify-center py-[19%]",
        )}
        style={{
          textShadow: dark ? "0 2px 18px rgba(0,0,0,0.5)" : "0 1px 12px rgba(255,255,255,0.55)",
        }}
      >
        <p
          className="text-[10px] tracking-[0.34em] uppercase sm:text-[11px]"
          style={{ color: template.theme.gold }}
        >
          {categoryLabel(template)}
        </p>
        {age ? (
          <p
            className="mt-2 font-script leading-none"
            style={{
              fontFamily: template.fonts.script,
              color: template.theme.gold,
              fontSize: compact ? "2.6rem" : "3.1rem",
            }}
          >
            {age}
          </p>
        ) : null}
        <h1
          className={cn(
            "mt-2 leading-[1.08]",
            compact ? "text-[1.95rem]" : "text-[2.35rem] sm:text-[2.75rem]",
          )}
          style={{ fontFamily: template.fonts.script, color: template.theme.gold }}
        >
          {names}
        </h1>
        {byline && !asString(data.groom) && names !== byline ? (
          <p className="mt-1 text-[12px] opacity-80">{byline}</p>
        ) : null}
        <div className="gold-line mx-auto mt-3 mb-3" />
        {greeting ? (
          <p
            className={cn(
              "mx-auto max-w-[17.5rem] leading-relaxed opacity-90",
              compact ? "line-clamp-3 text-[12px]" : "text-sm sm:text-[15px]",
            )}
            style={{ fontFamily: template.fonts.display }}
          >
            {greeting}
          </p>
        ) : null}
        {asString(data.date) ? (
          <p
            className={cn("mt-4 tracking-wide", compact ? "text-sm" : "text-base")}
            style={{ fontFamily: template.fonts.display }}
          >
            {formatUzDateLong(asString(data.date))}
            {asString(data.time) ? ` · ${asString(data.time)}` : ""}
          </p>
        ) : null}
        {venue || (title && title !== names) ? (
          <p className={cn("mt-2 opacity-85", compact ? "text-[12px]" : "text-sm")}>
            {venue || title}
          </p>
        ) : null}
        {showPhoto ? (
          <img
            src={cover}
            alt=""
            className="mt-5 size-20 rounded-full object-cover outline-none ring-2 ring-[color:var(--inv-gold)]/70"
          />
        ) : null}
      </div>
    </div>
  );
}

function BelowCard({
  template,
  data,
  dark,
}: {
  template: InvitationTemplate;
  data: InvitationData;
  dark: boolean;
}) {
  const photos = asStringList(data.gallery);
  const url = asString(data.mapUrl);
  const showLocation = Boolean(asString(data.address) || url || asString(data.phone));
  const showCountdown = asBool(data.countdownEnabled) && Boolean(asString(data.date));
  const showRsvp = asBool(data.rsvpEnabled);
  const showParents = Boolean(asString(data.parentsGroom) || asString(data.parentsBride));
  const showVerse = template.category === "toy" || template.category === "video-taklif";

  if (template.isVideo) {
    return (
      <div className="px-7 py-10 text-center sm:px-10">
        <p className="font-display text-3xl">{coupleNames(data, template)}</p>
        {asString(data.date) ? (
          <p className="mt-2 opacity-80">{formatUzDateLong(asString(data.date))}</p>
        ) : null}
        {asString(data.venue) ? <p className="mt-1 text-sm opacity-75">{asString(data.venue)}</p> : null}
      </div>
    );
  }

  return (
    <div className={cn("relative", dark ? "bg-black/20" : "bg-black/[0.03]")}>
      {showVerse ? (
        <section className="px-7 pt-10 text-center sm:px-10">
          <p className="mx-auto max-w-sm font-display text-xl italic leading-relaxed opacity-90">
            «Ikki qalb — bir taqdir. Shu kunda yangi hikoya boshlanadi.»
          </p>
        </section>
      ) : null}
      {showParents ? (
        <section className="grid gap-6 px-7 py-8 text-center sm:grid-cols-2 sm:px-10">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase opacity-70">Kuyov taraf</p>
            <p className="mt-2 font-display text-xl">{asString(data.parentsGroom)}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase opacity-70">Kelin taraf</p>
            <p className="mt-2 font-display text-xl">{asString(data.parentsBride)}</p>
          </div>
        </section>
      ) : null}
      {photos.length ? (
        <section className="grid grid-cols-2 gap-3 px-5 py-8 sm:px-8">
          {photos.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="aspect-[4/5] w-full rounded-2xl object-cover outline-none"
            />
          ))}
        </section>
      ) : null}
      {showLocation ? (
        <section className="px-7 py-8 text-center sm:px-10">
          {asString(data.address) ? (
            <p className="inline-flex items-center gap-2 text-sm opacity-80">
              <MapPin className="size-4" />
              {asString(data.address)}
            </p>
          ) : null}
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
      ) : null}
      {showCountdown ? (
        <section className="px-7 py-8 text-center">
          <Countdown date={asString(data.date)} time={asString(data.time)} />
        </section>
      ) : null}
      {showRsvp ? (
        <section className="px-7 py-8 text-center">
          <p className="font-display text-2xl">Ishtirokingizni bildiring</p>
          <p className="mt-2 text-sm opacity-75">Quyida RSVP formasini to'ldirasiz.</p>
        </section>
      ) : null}
      <footer className="px-7 py-8 text-center">
        <div className="gold-line mx-auto mb-4" />
        <p className="font-script text-3xl">{coupleNames(data, template)}</p>
        <p className="mt-6 text-[10px] tracking-[0.28em] uppercase opacity-50">VisolPremium</p>
      </footer>
    </div>
  );
}

function coupleNames(data: InvitationData, template: InvitationTemplate): string {
  if (asString(data.groom) && asString(data.bride)) {
    return `${asString(data.groom)} & ${asString(data.bride)}`;
  }
  if (asString(data.honoree)) return asString(data.honoree);
  if (asString(data.recipient)) return asString(data.recipient);
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
