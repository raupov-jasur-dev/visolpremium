import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { TemplateCard } from "@/components/templates/template-card";
import { Button } from "@/components/ui/button";
import { getCategory, templatesByCategory } from "@/lib/templates";

export const Route = createFileRoute("/templates/$category")({
  component: CategoryPage,
  head: ({ params }) => {
    const cat = getCategory(params.category);
    return { meta: [{ title: `${cat?.title ?? "Katalog"} — VisolPremium` }] };
  },
});

function CategoryPage() {
  const { category } = Route.useParams();
  const cat = getCategory(category);
  const list = cat ? templatesByCategory(cat.id) : [];

  if (!cat) {
    return (
      <PageShell>
        <main className="mx-auto max-w-xl px-6 py-24 text-center">
          <h1 className="font-display text-4xl">Kategoriya topilmadi</h1>
          <Button asChild className="mt-6">
            <Link to="/templates">Barcha dizaynlar</Link>
          </Button>
        </main>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <main className="relative">
        <div
          className="flex min-h-64 items-end px-6 py-12 text-ivory"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(44,31,26,0.2), rgba(44,31,26,0.72)), url(${list[0]?.background ?? "/images/hero/roses.jpg"})`,
            backgroundSize: "cover",
          }}
        >
          <div className="mx-auto w-full max-w-6xl">
            <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Kategoriya</p>
            <h1 className="mt-2 font-display text-5xl">{cat.title}</h1>
            <p className="mt-3 max-w-lg text-champagne">{cat.description}</p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.length ? (
            list.map((t) => <TemplateCard key={t.id} template={t} />)
          ) : (
            <p className="col-span-full py-16 text-center text-muted">
              Bu kategoriyada hozircha shablon yo'q.
            </p>
          )}
        </div>
      </main>
    </PageShell>
  );
}
