import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { Pricing } from "@/components/landing/sections";

export const Route = createFileRoute("/narxlar")({
  component: () => (
    <PageShell>
      <Pricing />
    </PageShell>
  ),
  head: () => ({ meta: [{ title: "Narxlar — VisolPremium" }] }),
});
