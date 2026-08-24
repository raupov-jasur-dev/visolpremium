import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

export function PageShell({
  children,
  overlayNav = false,
}: {
  children: ReactNode;
  overlayNav?: boolean;
}) {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <Navbar variant={overlayNav ? "overlay" : "solid"} />
      <div className={overlayNav ? "" : "pt-24"}>{children}</div>
      <Footer />
    </div>
  );
}
