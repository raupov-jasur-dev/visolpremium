import { X } from "lucide-react";
import { FieldInput } from "./field-input";
import type { InvitationTemplate } from "@/lib/types";
import { useDraft } from "@/store/draft";

/** Yon panel — taklifnoma preview orqada ko'rinib turadi. */
export function EditModal({
  open,
  onOpenChange,
  template,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  template: InvitationTemplate;
}) {
  const values = useDraft((s) => s.values);
  const setField = useDraft((s) => s.setField);

  if (!open) return null;

  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-40 flex max-h-[72vh] flex-col rounded-t-[28px] bg-ivory text-ink shadow-[0_-20px_60px_-20px_rgba(20,8,10,0.45)] md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[min(420px,46vw)] md:rounded-none md:rounded-l-[28px]"
      role="dialog"
      aria-labelledby="edit-title"
    >
      <div className="flex items-center justify-between border-b border-gold/25 px-5 py-4">
        <div>
          <h2 id="edit-title" className="font-display text-2xl">Tahrirlash</h2>
          <p className="text-sm text-muted">Yozganingiz zahoti preview yangilanadi.</p>
        </div>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full hover:bg-burgundy/10"
          onClick={() => onOpenChange(false)}
          aria-label="Yopish"
        >
          <X className="size-5" />
        </button>
      </div>
      <form className="space-y-5 overflow-y-auto px-5 py-5" onSubmit={(e) => e.preventDefault()}>
        {template.fields.map((field) => (
          <FieldInput
            key={field.key}
            field={field}
            value={values[field.key]}
            onChange={(v) => setField(field.key, v)}
          />
        ))}
      </form>
    </aside>
  );
}
