import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { InvitationRenderer } from "@/components/invitation/renderer";
import { Button } from "@/components/ui/button";
import { getInvitationPublic } from "@/lib/invitations";
import { getTemplate } from "@/lib/templates";
import { playMusic, stopMusic } from "@/lib/music";
import { asString } from "@/lib/media";
import { useDraft } from "@/store/draft";
import type { InvitationData } from "@/lib/types";

export const Route = createFileRoute("/preview/$id")({
  component: PreviewPage,
  head: () => ({ meta: [{ title: "Ko'rish — VisolPremium" }] }),
});

function PreviewPage() {
  const { id } = Route.useParams();
  const draft = useDraft();
  const [remote, setRemote] = useState<{ templateId: string; data: InvitationData } | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (id === "draft") return;
    let alive = true;
    void getInvitationPublic({ data: id }).then((row) => {
      if (!alive) return;
      if (!row) setMissing(true);
      else setRemote({ templateId: row.templateId, data: row.data });
    });
    return () => {
      alive = false;
    };
  }, [id]);

  const templateId = id === "draft" ? draft.templateId : remote?.templateId;
  const data = id === "draft" ? draft.values : remote?.data;
  const template = templateId ? getTemplate(templateId) : undefined;

  useEffect(() => {
    if (!data) return;
    playMusic(asString(data.music));
    return () => stopMusic();
  }, [data]);

  if (id !== "draft" && !remote && !missing) {
    return <div className="grid min-h-screen place-items-center bg-ink text-champagne">Yuklanmoqda…</div>;
  }

  if (!template || !data || missing) {
    return (
      <main className="grid min-h-screen place-items-center bg-ivory px-6 text-center">
        <div>
          <h1 className="font-display text-4xl">Ko'rish topilmadi</h1>
          <Button asChild className="mt-6">
            <Link to="/templates">Dizaynlar</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink">
      <div className="mx-auto max-w-md">
        <InvitationRenderer template={template} data={data} />
      </div>
    </main>
  );
}
