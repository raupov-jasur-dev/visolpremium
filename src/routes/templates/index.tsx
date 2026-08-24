import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { TemplateCard } from "@/components/templates/template-card";
import { CATEGORIES, TEMPLATES } from "@/lib/templates";

export const Route = createFileRoute("/templates/")({
  component: TemplatesPage,
  head: () => ({ meta: [{ title: "Dizaynlar — VisolPremium" }] }),
});

function TemplatesPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Katalog</p>
        <h1 className="mt-2 font-display text-5xl">Dizaynlar</h1>
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to="/templates/$category"
              params={{ category: c.slug }}
              className="rounded-full bg-cream px-4 py-2 text-sm hover:bg-blush/40"
            >
              {c.title}
            </Link>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      </main>
    </PageShell>
  );
}
