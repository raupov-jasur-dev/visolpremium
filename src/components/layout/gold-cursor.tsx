import { useEffect, useRef } from "react";

/** Desktop uchun nozik oltin nuqta. Mobile va reduced-motion da o'chadi. */
export function GoldCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) {
      el.style.display = "none";
      return;
    }
    const move = (e: PointerEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return <div ref={ref} className="custom-cursor" aria-hidden />;
}
