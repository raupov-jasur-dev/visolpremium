import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

type LoginSearch = { next?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): LoginSearch => ({
    next: typeof s.next === "string" ? s.next : "/",
  }),
  component: Login,
  head: () => ({ meta: [{ title: "Kirish — VisolPremium" }] }),
});

function Login() {
  const { next } = Route.useSearch();
  const callbackURL = next && next.startsWith("/") ? next : "/";

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-6">
      <img src="/images/hero/silk-pink.jpg" alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-ink/35" />
      <div className="relative w-full max-w-sm rounded-[28px] bg-ivory/95 p-8 text-ink shadow-[0_30px_80px_-24px_rgba(44,31,26,0.45)]">
        <p className="font-display text-3xl">VisolPremium</p>
        <h1 className="mt-2 font-display text-2xl">Hisobingizga kiring</h1>
        <p className="mt-2 text-sm text-muted">
          Taklifnomani saqlash va shaxsiy havola olish uchun kiring.
        </p>
        <div className="mt-6 space-y-3">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="line"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL })}
              >
                {p.label} orqali kirish
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted">Kirish hozir o'chirilgan.</p>
          )}
        </div>
        <Link to="/" className="mt-6 inline-block text-sm text-muted underline-offset-4 hover:underline">
          ← Bosh sahifa
        </Link>
      </div>
    </main>
  );
}
