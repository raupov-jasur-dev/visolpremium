import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";

export const Route = createFileRoute("/boglanish")({
  component: Contact,
  head: () => ({ meta: [{ title: "Bog'lanish — VisolPremium" }] }),
});

function Contact() {
  return (
    <PageShell>
      <main className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="font-display text-5xl">Bog'lanish</h1>
        <p className="mt-4 text-muted">
          Savol yoki maxsus buyurtma uchun yozing. Javobni odatda bir ish kuni ichida qaytaramiz.
        </p>
        <a
          href="mailto:salom@visolpremium.uz"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-burgundy px-6 text-ivory"
        >
          salom@visolpremium.uz
        </a>
      </main>
    </PageShell>
  );
}
