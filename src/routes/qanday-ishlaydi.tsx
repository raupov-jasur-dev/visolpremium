import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { HowItWorks } from "@/components/landing/sections";

export const Route = createFileRoute("/qanday-ishlaydi")({
  component: () => (
    <PageShell>
      <HowItWorks />
    </PageShell>
  ),
  head: () => ({ meta: [{ title: "Qanday ishlaydi? — VisolPremium" }] }),
});
