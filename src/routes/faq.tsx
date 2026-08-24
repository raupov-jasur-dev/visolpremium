import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { FaqSection } from "@/components/landing/sections";

export const Route = createFileRoute("/faq")({
  component: () => (
    <PageShell>
      <FaqSection />
    </PageShell>
  ),
  head: () => ({ meta: [{ title: "FAQ — VisolPremium" }] }),
});
