import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/$")({
  component: NotFound,
});

function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-6 text-center">
      <img src="/images/textures/ornament.jpg" alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-ink/55" />
      <div className="relative max-w-md text-ivory">
        <p className="font-script text-6xl text-gold">404</p>
        <h1 className="mt-4 font-display text-4xl">Sahifa topilmadi</h1>
        <p className="mt-3 text-champagne">Bu manzilda sahifa yo'q. Bosh sahifadan davom eting.</p>
        <Button asChild variant="ivory" className="mt-8">
          <Link to="/">Bosh sahifa</Link>
        </Button>
      </div>
    </main>
  );
}
