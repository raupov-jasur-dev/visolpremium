import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-4 overflow-hidden bg-ivory px-6 text-center text-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: "url(/images/hero/silk-ivory.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10 max-w-md rounded-3xl bg-ivory/85 p-8 shadow-[0_20px_60px_-24px_rgba(44,31,26,0.4)]">
        <span className="text-burgundy" aria-hidden>
          <TriangleAlert className="mx-auto size-10" strokeWidth={1.6} />
        </span>
        <h1 className="mt-3 font-display text-3xl">Nimadir noto'g'ri ketdi</h1>
        <p className="mt-2 text-sm break-words text-muted">
          {error.message || "Kutilmagan xatolik yuz berdi. Sahifani yangilab ko'ring."}
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex h-12 items-center rounded-full bg-burgundy px-6 text-sm text-ivory"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </main>
  );
}
