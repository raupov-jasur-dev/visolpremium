import { Music2, Upload } from "lucide-react";
import { useState } from "react";
import type { InvitationValue, TemplateField } from "@/lib/types";
import { Input, Label, Textarea } from "@/components/ui/input";
import { MUSIC_TRACKS } from "@/lib/music";
import { asBool, asString, asStringList, compressImage, readAudio } from "@/lib/media";
import { cn } from "@/lib/cn";

export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: TemplateField;
  value: InvitationValue | undefined;
  onChange: (v: InvitationValue) => void;
}) {
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={field.key}>{field.label}{field.required ? " *" : ""}</Label>
      {render()}
      {field.help ? <p className="text-xs text-muted">{field.help}</p> : null}
      {err ? <p className="text-xs text-burgundy">{err}</p> : null}
    </div>
  );

  function render() {
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            id={field.key}
            value={asString(value)}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case "date":
      case "time":
      case "number":
      case "phone":
      case "url":
      case "map":
      case "text":
        return (
          <Input
            id={field.key}
            type={field.type === "number" ? "number" : field.type === "date" ? "date" : field.type === "time" ? "time" : field.type === "url" || field.type === "map" ? "url" : field.type === "phone" ? "tel" : "text"}
            value={asString(value)}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case "boolean":
        return (
          <button
            type="button"
            role="switch"
            aria-checked={asBool(value)}
            id={field.key}
            onClick={() => onChange(!asBool(value))}
            className={cn(
              "flex h-12 w-full items-center justify-between rounded-xl px-4 text-sm shadow-[0_0_0_1px_rgba(184,149,106,0.28)]",
              asBool(value) ? "bg-burgundy text-ivory" : "bg-ivory text-ink",
            )}
          >
            <span>{asBool(value) ? "Yoqilgan" : "O'chiq"}</span>
            <span className={cn("h-5 w-9 rounded-full p-0.5", asBool(value) ? "bg-gold" : "bg-muted/40")}>
              <span className={cn("block size-4 rounded-full bg-ivory transition-transform duration-200", asBool(value) ? "translate-x-4" : "translate-x-0")} />
            </span>
          </button>
        );
      case "select":
        return (
          <select
            id={field.key}
            className="h-12 w-full rounded-xl bg-ivory px-3 shadow-[0_0_0_1px_rgba(184,149,106,0.28)]"
            value={asString(value)}
            onChange={(e) => onChange(e.target.value)}
          >
            {(field.options ?? []).map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        );
      case "music":
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {MUSIC_TRACKS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onChange(t.id)}
                  className={cn(
                    "flex h-11 items-center gap-2 rounded-xl px-3 text-sm",
                    asString(value) === t.id ? "bg-burgundy text-ivory" : "bg-ivory shadow-[0_0_0_1px_rgba(184,149,106,0.28)]",
                  )}
                >
                  <Music2 className="size-4" />
                  {t.title}
                </button>
              ))}
            </div>
            <label className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-cream text-sm">
              <Upload className="size-4" />
              O'z musiqangizni yuklang
              <input
                type="file"
                accept="audio/*"
                className="sr-only"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setBusy(true);
                  setErr(null);
                  try {
                    onChange(await readAudio(file));
                  } catch (ex) {
                    setErr(ex instanceof Error ? ex.message : "Musiqa yuklanmadi.");
                  } finally {
                    setBusy(false);
                  }
                }}
              />
            </label>
            {busy ? <p className="text-xs text-muted">Yuklanmoqda…</p> : null}
          </div>
        );
      case "image":
        return (
          <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl bg-cream text-sm">
            {asString(value) ? (
              <img src={asString(value)} alt="" className="max-h-40 rounded-lg object-cover" />
            ) : (
              <>
                <Upload className="size-5" />
                Rasm yuklash
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setBusy(true);
                setErr(null);
                try {
                  onChange(await compressImage(file));
                } catch (ex) {
                  setErr(ex instanceof Error ? ex.message : "Rasm yuklanmadi.");
                } finally {
                  setBusy(false);
                }
              }}
            />
          </label>
        );
      case "images": {
        const list = asStringList(value);
        const max = field.max ?? 8;
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              {list.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  className="relative overflow-hidden rounded-lg"
                  onClick={() => onChange(list.filter((_, j) => j !== i))}
                  aria-label="Rasmni olib tashlash"
                >
                  <img src={src} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
              {list.length < max && (
                <label className="grid aspect-square cursor-pointer place-items-center rounded-lg bg-cream">
                  <Upload className="size-5" />
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setBusy(true);
                      setErr(null);
                      try {
                        const url = await compressImage(file);
                        onChange([...list, url]);
                      } catch (ex) {
                        setErr(ex instanceof Error ? ex.message : "Rasm yuklanmadi.");
                      } finally {
                        setBusy(false);
                      }
                    }}
                  />
                </label>
              )}
            </div>
            <p className="text-xs text-muted">Rasmni bosib olib tashlaysiz. Maksimal {max} ta.</p>
          </div>
        );
      }
      case "video":
        return (
          <p className="text-sm text-muted">
            Videolik shablonlarda kadrlar (rasmlar) ketma-ketligi ishlatiladi. Yuqoridagi «Kadrlar» maydoniga yuklang.
          </p>
        );
      default:
        return null;
    }
  }
}
