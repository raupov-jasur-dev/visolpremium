import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { InvitationRenderer } from "@/components/invitation/renderer";
import { RsvpForm } from "@/components/invitation/rsvp-form";
import { Button } from "@/components/ui/button";
import { getInvitationPublic } from "@/lib/invitations";
import { getTemplate } from "@/lib/templates";
import { playMusic, stopMusic } from "@/lib/music";
import { asBool, asString } from "@/lib/media";

export const Route = createFileRoute("/invitation/$id")({
  loader: async ({ params }) => {
    const row = await getInvitationPublic({ data: params.id });
    return { row };
  },
  component: InvitationPage,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.row
          ? `${loaderData.row.title} — VisolPremium`
          : "Taklifnoma topilmadi — VisolPremium",
      },
    ],
  }),
});

function InvitationPage() {
  const { row } = Route.useLoaderData();
  const template = row ? getTemplate(row.templateId) : undefined;

  useEffect(() => {
    if (!row) return;
    playMusic(asString(row.data.music));
    return () => stopMusic();
  }, [row]);

  if (!row || !template) {
    return (
      <main className="relative grid min-h-screen place-items-center overflow-hidden bg-ivory px-6 text-center">
        <img src="/images/hero/silk-ivory.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-70" />
        <div className="relative max-w-md rounded-[28px] bg-ivory/90 p-8">
          <h1 className="font-display text-4xl">Taklifnoma topilmadi</h1>
          <p className="mt-3 text-sm text-muted">
            Havola eskirgan yoki noto'g'ri bo'lishi mumkin.
          </p>
          <Button asChild className="mt-6">
            <Link to="/">Bosh sahifa</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink">
      <div className="mx-auto max-w-md pb-16">
        <InvitationRenderer template={template} data={row.data} />
        {asBool(row.data.rsvpEnabled) ? (
          <div className="px-4 py-8">
            <RsvpForm invitationId={row.id} />
          </div>
        ) : null}
      </div>
    </main>
  );
}
