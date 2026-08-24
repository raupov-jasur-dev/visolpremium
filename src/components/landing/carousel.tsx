import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { InvitationRenderer } from "@/components/invitation/renderer";
import { TEMPLATES } from "@/lib/templates";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function DesignCarousel() {
  const n = TEMPLATES.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pauseUntil = useRef(0);
  const drag = useRef<{ x: number } | null>(null);

  const go = useCallback(
    (dir: number) => {
      setActive((i) => (i + dir + n) % n);
      pauseUntil.current = Date.now() + 8000;
    },
    [n],
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() < pauseUntil.current) return;
      setActive((i) => (i + 1) % n);
    }, 5200);
    return () => window.clearInterval(id);
  }, [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const offsets = [-1, 0, 1] as const;
  const t = TEMPLATES[active];

  return (
    <section id="karusel" className="relative overflow-hidden bg-ivory py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{ backgroundImage: "url(/images/hero/silk-ivory.jpg)", backgroundSize: "cover" }}
      />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Dizayn sahna</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">Taklifnoma karuseli</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted">
          Markazdagi dizayn jonli ko'rinadi. Chap-o'ngga suring yoki o'q tugmalarini bosing.
        </p>
      </div>

      <div
        className="relative mx-auto mt-12 max-w-6xl px-4"
        style={{ perspective: "1400px" }}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX };
        }}
        onPointerUp={(e) => {
          if (!drag.current) return;
          const dx = e.clientX - drag.current.x;
          if (dx < -48) go(1);
          else if (dx > 48) go(-1);
          drag.current = null;
        }}
      >
        <div className="flex items-center justify-center gap-3 sm:gap-8">
          {offsets.map((offset) => {
            const item = TEMPLATES[(active + offset + n) % n];
            const isCenter = offset === 0;
            return (
              <div
                key={item.id + String(offset)}
                className={cn(!isCenter && "hidden sm:block")}
                style={{
                  transform: `rotateY(${offset * -18}deg) scale(${isCenter ? 1 : 0.78})`,
                  opacity: isCenter ? 1 : 0.42,
                  filter: isCenter ? "none" : "blur(2.5px)",
                  zIndex: isCenter ? 4 : 1,
                  transitionProperty: "transform, opacity, filter",
                  transitionDuration: "550ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <button
                  type="button"
                  className={cn(
                    "block overflow-hidden rounded-[22px] text-left shadow-[0_28px_70px_-24px_rgba(44,31,26,0.48)]",
                    isCenter ? "h-[500px] w-[280px]" : "h-[380px] w-[214px]",
                  )}
                  onClick={() => {
                    if (!isCenter) go(offset);
                  }}
                  onPointerEnter={() => isCenter && setPaused(true)}
                  onPointerLeave={() => setPaused(false)}
                  aria-label={item.title}
                >
                  <InvitationRenderer
                    template={item}
                    data={item.demo}
                    compact
                    autoScroll={false}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <p className="relative mt-6 text-center font-display text-2xl">{t.title}</p>
      <p className="relative text-center text-sm text-muted">{t.tagline}</p>

      <div className="relative mt-4 flex justify-center gap-2">
        {TEMPLATES.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={item.title}
            className={cn(
              "h-2 rounded-full transition-[width,background-color] duration-300",
              i === active ? "w-8 bg-burgundy" : "w-2 bg-gold/50",
            )}
            onClick={() => {
              setActive(i);
              pauseUntil.current = Date.now() + 8000;
            }}
          />
        ))}
      </div>

      <div className="relative mt-6 flex justify-center gap-2">
        <Button asChild size="sm" variant="line">
          <Link to="/create/$templateId" params={{ templateId: t.id }}>
            Ko'rish
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link to="/create/$templateId" params={{ templateId: t.id }}>
            Tayyorlash
          </Link>
        </Button>
      </div>
    </section>
  );
}
