import { Component, useEffect, useState, type ComponentType, type ReactNode } from "react";

class CurtainGuard extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function StaticSilk({ className = "" }: { className?: string }) {
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
    void import("./silk-curtain-canvas")
      .then((m) => {
        if (alive) setScene(() => m.SilkCurtainCanvas);
      })
      .catch(() => {
        /* static fallback remains */
      });
    return () => {
      alive = false;
    };
  }, []);

  const fallback = <StaticSilk className={className} />;
  if (!Scene || reduce) return fallback;

  return (
    <CurtainGuard fallback={fallback}>
      <Scene className={className} />
    </CurtainGuard>
  );
}
