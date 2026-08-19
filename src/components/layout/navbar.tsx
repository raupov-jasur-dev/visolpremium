import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthSlot } from "./auth-slot";
import { cn } from "@/lib/cn";

const LINKS = [
  { to: "/", hash: undefined as string | undefined, label: "Bosh sahifa" },
  { to: "/templates", hash: undefined, label: "Dizaynlar" },
  { to: "/qanday-ishlaydi", hash: undefined, label: "Qanday ishlaydi?" },
  { to: "/narxlar", hash: undefined, label: "Narxlar" },
  { to: "/faq", hash: undefined, label: "FAQ" },
] as const;

export function Navbar({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const floating = variant === "solid" || scrolled;
  const light = variant === "overlay" && !scrolled;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-3 md:px-6">
      <nav
        className={cn(
          "pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-full px-4 py-2 transition-[background-color,box-shadow,backdrop-filter] duration-300",
          floating
            ? "bg-ivory/88 shadow-[0_10px_40px_-18px_rgba(44,31,26,0.35)] backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <Link
          to="/"
          className={cn(
            "font-display text-xl tracking-tight md:text-2xl",
            light ? "text-ivory" : "text-ink",
          )}
        >
          VisolPremium
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "relative text-sm after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100",
                light ? "text-ivory/90" : "text-ink/80 hover:text-ink",
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className={cn(light ? "text-ivory" : "text-ink")}>
            <AuthSlot light={light} />
          </div>
          <Button asChild size="sm" variant={light ? "ivory" : "gold"} className="hidden sm:inline-flex">
            <Link to="/templates">
              Yaratish
              <span aria-hidden>→</span>
            </Link>
          </Button>
          <button
            type="button"
            className={cn(
              "grid size-11 place-items-center rounded-full lg:hidden",
              light ? "text-ivory" : "text-ink",
            )}
            aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="pointer-events-auto absolute top-16 right-3 left-3 rounded-3xl bg-ivory p-5 text-ink shadow-[0_20px_60px_-20px_rgba(44,31,26,0.4)] lg:hidden">
          <div className="flex flex-col gap-3">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-xl px-3 py-3 text-base hover:bg-blush/30"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link to="/templates" onClick={() => setOpen(false)}>
                Yaratish →
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
