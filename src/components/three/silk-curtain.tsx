import { useEffect, useState, type ComponentType } from "react";

/**
 * Ipak parda: WebGL faqat brauzerda yuklanadi.
 * SSR va reduced-motion da statik rasm ko'rinadi.
 */
export function SilkCurtain({ className = "" }: { className?: string }) {
  const [Scene, setScene] = useState<ComponentType<{ className?: string }> | null>(null);
  const [reduce, setReduce] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    if (mq.matches) return;
    let alive = true;
    void import("./silk-curtain-canvas").then((m) => {
      if (alive) setScene(() => m.SilkCurtainCanvas);
    });
    return () => {
      alive = false;
    };
  }, []);

  if (!Scene || reduce) {
    return (
      <div
        className={className}
        style={{
          backgroundImage: "url(/images/hero/silk-pink.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
    );
  }

  return <Scene className={className} />;
}
