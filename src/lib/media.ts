/** Yuklangan rasmni kichraytirib, data URL qaytaradi. */

const MAX_DIM = 1400;
const JPEG_QUALITY = 0.82;
const MAX_BYTES = 2_400_000;

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Faylni o'qib bo'lmadi."));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

export async function compressImage(file: File): Promise<string> {
  if (file.size > MAX_BYTES) {
    throw new Error("Rasm hajmi 2.4 MB dan oshmasligi kerak.");
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("Faqat rasm fayllarini yuklash mumkin.");
  }
  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
    const w = Math.max(1, Math.round(img.width * scale));
    const h = Math.max(1, Math.round(img.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return fileToDataUrl(file);
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function readAudio(file: File): Promise<string> {
  if (file.size > 6_000_000) {
    throw new Error("Musiqa fayli 6 MB dan oshmasligi kerak.");
  }
  if (!file.type.startsWith("audio/")) {
    throw new Error("Faqat audio fayllarni yuklash mumkin.");
  }
  return fileToDataUrl(file);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Rasm ochilmadi."));
    img.src = src;
  });
}

export function asStringList(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string");
  if (typeof value === "string" && value.startsWith("[")) {
    try {
      const parsed = JSON.parse(value) as unknown;
      return asStringList(parsed);
    } catch {
      return value ? [value] : [];
    }
  }
  if (typeof value === "string" && value) return [value];
  return [];
}

export function asString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

export function asBool(value: unknown): boolean {
  return value === true || value === "true";
}
