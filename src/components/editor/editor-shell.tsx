import { Link, useNavigate } from "@tanstack/react-router";
import { Check, Eye, Pencil } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { InvitationRenderer } from "@/components/invitation/renderer";
import { Button } from "@/components/ui/button";
import { EditModal } from "./edit-modal";
import { saveInvitation } from "@/lib/invitations";
import { getTemplate } from "@/lib/templates";
import { asString } from "@/lib/media";
import { useDraft } from "@/store/draft";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { playMusic, stopMusic } from "@/lib/music";

export function EditorShell({ templateId }: { templateId: string }) {
  const template = getTemplate(templateId);
  const hydrate = useDraft((s) => s.hydrate);
  const values = useDraft((s) => s.values);
  const savedId = useDraft((s) => s.savedId);
  const setSaved = useDraft((s) => s.setSaved);
  const { user, isPending } = useCurrentUserState();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    hydrate(templateId);
  }, [hydrate, templateId]);

  useEffect(() => {
    playMusic(asString(values.music));
    return () => stopMusic();
  }, [values.music]);

  const missing = useMemo(() => {
    if (!template) return [];
    return template.fields
      .filter((f) => f.required)
      .filter((f) => {
        const v = values[f.key];
        if (Array.isArray(v)) return v.length === 0;
        if (typeof v === "boolean") return false;
        return !String(v ?? "").trim();
      })
      .map((f) => f.label);
  }, [template, values]);

  if (!template) {
    return (
      <main className="grid min-h-screen place-items-center bg-ivory px-6 text-center">
        <div>
          <h1 className="font-display text-4xl">Shablon topilmadi</h1>
          <Button asChild className="mt-6">
            <Link to="/templates">Katalogga qaytish</Link>
          </Button>
        </div>
      </main>
    );
  }

  async function onPublish() {
    if (missing.length) {
      toast.error(`To'ldiring: ${missing.join(", ")}`);
      setOpen(true);
      return;
    }
    if (isPending) return;
    if (!user) {
      toast.message("Saqlash uchun kiring");
      void navigate({ to: "/login", search: { next: `/create/${templateId}` } as { next: string } });
      return;
    }
    setSaving(true);
    try {
      const saved = await saveInvitation({
        data: {
          id: savedId ?? undefined,
          templateId,
          data: values,
        },
      });
      setSaved(saved.id, saved.slug);
      toast.success("Taklifnoma tayyor");
      void navigate({ to: "/invitation/$id", params: { id: saved.slug } });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Saqlab bo'lmadi";
      if (msg === "Unauthorized") {
        toast.message("Saqlash uchun kiring");
        void navigate({ to: "/login", search: { next: `/create/${templateId}` } as { next: string } });
      } else {
        toast.error(msg);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="relative min-h-screen bg-ink"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(20,10,12,0.35), rgba(20,10,12,0.55)), url(${template.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="flex items-center justify-between px-4 py-4 text-ivory md:px-8">
        <Link to="/" className="text-sm tracking-wide text-champagne hover:text-ivory">
          ← Bosh sahifa
        </Link>
        <p className="font-display text-lg">{template.title}</p>
      </header>

      <div className={open ? "md:pr-[min(420px,46vw)] transition-[padding] duration-300" : "transition-[padding] duration-300"}>
        <div className="mx-auto flex justify-center px-4 pb-36">
          <div className="w-[min(420px,100%)] overflow-hidden rounded-[24px] shadow-[0_40px_90px_-24px_rgba(0,0,0,0.55)]">
            <div className="max-h-[78vh] overflow-y-auto">
              <InvitationRenderer template={template} data={values} />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center p-4">
        <div className="flex w-full max-w-xl gap-2 rounded-full bg-ivory/95 p-2 shadow-[0_16px_50px_-16px_rgba(20,8,10,0.5)]">
          <Button className="flex-1" variant="line" onClick={() => setOpen(true)}>
            <Pencil className="size-4" />
            Tahrirlash
          </Button>
          <Button
            className="flex-1 bg-cream text-ink"
            variant="ivory"
            onClick={() => navigate({ to: "/preview/$id", params: { id: savedId ?? "draft" } })}
          >
            <Eye className="size-4" />
            Ko'rish
          </Button>
          <Button className="flex-1" onClick={() => void onPublish()} disabled={saving}>
            <Check className="size-4" />
            {saving ? "Saqlanmoqda…" : "Tayyorlash"}
          </Button>
        </div>
      </div>

      <EditModal open={open} onOpenChange={setOpen} template={template} />
    </div>
  );
}
