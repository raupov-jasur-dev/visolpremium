import { Link } from "@tanstack/react-router";
import { useRef, type PointerEvent } from "react";
import { Button } from "@/components/ui/button";
import { SilkCurtain } from "@/components/three/silk-curtain";
import { InvitationRenderer } from "@/components/invitation/renderer";
import { TEMPLATES } from "@/lib/templates";

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const template = TEMPLATES[0];

  const onMove = (e: PointerEvent) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 8}deg) translateZ(12px)`;
  };
  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "rotateY(-8deg) rotateX(4deg)";
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-burgundy-deep">
      <SilkCurtain className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-transparent to-ivory" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-6 pt-28 pb-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-ivory">
          <p className="text-[11px] tracking-[0.38em] text-champagne uppercase">VisolPremium</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Har bir lahza
            <br />
            o'z hikoyasiga loyiq.
          </h1>
          <p className="mt-6 max-w-md text-base text-champagne/90 sm:text-lg">
            To'y, tabrik va uchrashuv uchun cinematic raqamli taklifnomalar.
            Ipak, oltin yorug'lik va sizning ismingiz.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="ivory">
              <Link to="/templates">Taklifnoma yaratish</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href="#dizaynlar">Dizaynlarni ko'rish</a>
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end" style={{ perspective: "1400px" }}>
          <div
            ref={cardRef}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            className="relative w-[min(320px,86vw)] origin-center transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: "rotateY(-8deg) rotateX(4deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute -inset-6 rounded-[28px] bg-gold/25 blur-2xl" />
            <div className="relative max-h-[520px] overflow-hidden rounded-[22px] shadow-[0_40px_80px_-20px_rgba(20,8,10,0.55)]">
              <InvitationRenderer template={template} data={template.demo} compact autoScroll />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
