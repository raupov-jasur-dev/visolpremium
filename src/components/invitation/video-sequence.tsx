import { Pause, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { InvitationData, InvitationTemplate } from "@/lib/types";
import { asString, asStringList } from "@/lib/media";
import { playMusic, stopMusic } from "@/lib/music";
import { cn } from "@/lib/cn";

const SLIDE_MS = 4200;

export function VideoSequence({
  template,
  data,
  compact = false,
  playingDefault = true,
}: {
  template: InvitationTemplate;
  data: InvitationData;
  compact?: boolean;
  playingDefault?: boolean;
}) {
  const slides = useMemo(() => {
    const fromData = asStringList(data.slides);
    return fromData.length ? fromData : template.gallery;
  }, [data.slides, template.gallery]);
  const captions = useMemo(() => {
    const raw = asString(data.captions);
    const lines = raw.split("\n").map((s) => s.trim()).filter(Boolean);
    return lines.length ? lines : [asString(data.title) || template.title];
  }, [data.captions, data.title, template.title]);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(playingDefault && !compact);

  useEffect(() => {
    if (!playing || slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [playing, slides.length]);

  useEffect(() => {
    if (playing) playMusic(asString(data.music));
    else stopMusic();
    return () => stopMusic();
  }, [playing, data.music]);

  const src = slides[index] ?? template.previewImage;
  const caption = captions[index % captions.length];

  return (
    <section className="relative isolate overflow-hidden">
      <div className={cn("relative", compact ? "aspect-[9/16]" : "aspect-[9/16] min-h-[28rem]")}>
        {slides.map((s, i) => (
          <img
            key={s + i}
            src={s}
            alt=""
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-700",
              playing && i === index ? "scale-110" : "scale-100",
              i === index ? "opacity-100" : "opacity-0",
            )}
            style={{
              transitionProperty: "opacity, transform",
              transitionDuration: playing ? "4200ms, 4200ms" : "700ms, 700ms",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 text-center text-ivory">
          <p className="text-[11px] tracking-[0.32em] text-champagne uppercase">
            {asString(data.subtitle) || template.tagline}
          </p>
          <h2
            className="mt-2 font-script text-4xl sm:text-5xl"
            style={{ fontFamily: template.fonts.script }}
          >
            {caption}
          </h2>
        </div>
        {!compact && (
          <button
            type="button"
            className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory/90 text-burgundy shadow-[0_10px_40px_-10px_rgba(0,0,0,0.45)]"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "To'xtatish" : "Ijro etish"}
          >
            {playing ? (
              <Pause className="size-6" />
            ) : (
              <Play className="size-6 translate-x-px" />
            )}
          </button>
        )}
      </div>
    </section>
  );
}
