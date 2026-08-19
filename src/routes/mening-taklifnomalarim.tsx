import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { listMyInvitations } from "@/lib/invitations";
import { getTemplate } from "@/lib/templates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn } from "@/lib/auth/gates";
import type { SavedInvitation } from "@/lib/types";

export const Route = createFileRoute("/mening-taklifnomalarim")({
  component: Mine,
  head: () => ({ meta: [{ title: "Mening taklifnomalarim — VisolPremium" }] }),
});

function Mine() {
  const { user, isPending } = useCurrentUserState();
  const [rows, setRows] = useState<SavedInvitation[] | null>(null);

  useEffect(() => {
    if (!user) return;
    void listMyInvitations()
      .then(setRows)
      .catch(() => setRows([]));
  }, [user]);

  if (isPending) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="mt-6 h-32 w-full" />
        </div>
      </PageShell>
    );
  }
  if (!user) return <RedirectToSignIn />;

  return (
    <PageShell>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-display text-4xl">Mening taklifnomalarim</h1>
        <div className="mt-8 space-y-4">
          {rows === null ? (
            <Skeleton className="h-28 w-full" />
          ) : rows.length === 0 ? (
            <div className="rounded-[28px] bg-cream p-10 text-center">
              <p className="font-display text-2xl">Hali taklifnoma yo'q</p>
              <Button asChild className="mt-6">
                <Link to="/templates">Yaratish</Link>
              </Button>
            </div>
          ) : (
            rows.map((r) => {
              const t = getTemplate(r.templateId);
              return (
                <article key={r.id} className="flex items-center gap-4 rounded-[24px] bg-cream p-4">
                  <img
                    src={t?.previewImage ?? "/images/hero/roses.jpg"}
                    alt=""
                    className="size-20 rounded-2xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-xl">{r.title}</p>
                    <p className="truncate text-sm text-muted">/invitation/{r.slug}</p>
                  </div>
                  <Button asChild size="sm" variant="line">
                    <Link to="/invitation/$id" params={{ id: r.slug }}>
                      Ochish
                    </Link>
                  </Button>
                </article>
              );
            })
          )}
        </div>
      </main>
    </PageShell>
  );
}
