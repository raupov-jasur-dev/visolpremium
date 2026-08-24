import { type ReactNode, useEffect } from "react";

/**
 * Lenis smooth scroll + GSAP ScrollTrigger sinxroni.
 * reduced-motion yoqilgan bo'lsa, oddiy brauzer scroll qoladi.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      const [{ default: Lenis }, gsapMod] = await Promise.all([
        import("lenis"),
        import("gsap"),
      ]);
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        autoRaf: false,
        smoothWheel: true,
        lerp: 0.085,
      });

      lenis.on("scroll", ScrollTrigger.update);
      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(onTick);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
