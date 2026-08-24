import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";

export const Route = createFileRoute("/shartlar")({
  component: () => (
    <PageShell>
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="font-display text-5xl">Foydalanish shartlari</h1>
        <p className="mt-6 leading-relaxed text-muted">
          Shablonlar VisolPremium mulki. Siz yaratgan matn va rasmlar sizniki. Xizmatni
          noqonuniy kontent uchun ishlatish taqiqlanadi. Narxlar o'zgarishi mumkin.
        </p>
      </main>
    </PageShell>
  ),
  head: () => ({ meta: [{ title: "Shartlar — VisolPremium" }] }),
});
