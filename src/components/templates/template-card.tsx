import { Link } from "@tanstack/react-router";
import { useRef, type PointerEvent } from "react";
import type { InvitationTemplate } from "@/lib/types";
import { CATEGORIES } from "@/lib/templates";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";

export function TemplateCard({ template }: { template: InvitationTemplate }) {
  const ref = useRef<HTMLElement>(null);
  const cat = CATEGORIES.find((c) => c.id === template.category);

  const onMove = (e: PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * 7}deg) rotateX(${-py * 6}deg) scale(1.015)`;
    const img = el.querySelector("img");
    if (img) img.style.transform = `translate(${px * -8}px, ${py * -8}px) scale(1.06)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    const img = el.querySelector("img");
    if (img) img.style.transform = "";
  };

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group relative overflow-hidden rounded-[28px] bg-cream shadow-[0_18px_50px_-24px_rgba(44,31,26,0.32)] transition-transform duration-300"
      style={{ transformStyle: "preserve-3d", perspective: "900px" }}
    >
      <div className="relative aspect-[9/16] overflow-hidden">
        <img
          src={template.previewImage}
          alt={template.title}
          className="size-full object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <div className="absolute top-4 left-4 rounded-full bg-ivory/90 px-3 py-1 text-[11px] tracking-wide text-ink">
          {cat?.title}
        </div>
        <div className="absolute right-4 bottom-24 left-4 translate-y-3 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <Button asChild size="sm" variant="ivory">
              <Link to="/create/$templateId" params={{ templateId: template.id }}>
                Ko'rish
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/create/$templateId" params={{ templateId: template.id }}>
                Tayyorlash
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between gap-3 p-5">
        <div>
          <h3 className="font-display text-2xl">{template.title}</h3>
          <p className="text-sm text-muted">{template.tagline}</p>
        </div>
        <p className="text-sm tabular-nums text-burgundy">{formatPrice(template.price)}</p>
      </div>
    </article>
  );
}
