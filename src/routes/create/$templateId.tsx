import { createFileRoute } from "@tanstack/react-router";
import { EditorShell } from "@/components/editor/editor-shell";
import { getTemplate } from "@/lib/templates";

export const Route = createFileRoute("/create/$templateId")({
  component: CreatePage,
  head: ({ params }) => {
    const t = getTemplate(params.templateId);
    return { meta: [{ title: `${t?.title ?? "Yaratish"} — VisolPremium` }] };
  },
});

function CreatePage() {
  const { templateId } = Route.useParams();
  return <EditorShell templateId={templateId} />;
}
