import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";

export const Route = createFileRoute("/maxfiylik")({
  component: () => (
    <PageShell>
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="font-display text-5xl">Maxfiylik</h1>
        <p className="mt-6 leading-relaxed text-muted">
          VisolPremium sizning ism, rasm va musiqa kabi ma'lumotlaringizni faqat taklifnomani
          ko'rsatish uchun saqlaydi. Uchinchi tomonga reklama maqsadida sotilmaydi. Kirish
          Google yoki X orqali amalga oshadi.
        </p>
      </main>
    </PageShell>
  ),
  head: () => ({ meta: [{ title: "Maxfiylik — VisolPremium" }] }),
});
