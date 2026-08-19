import { nanoid } from "nanoid";

/** Taklifnoma uchun qisqa, URL-ga mos unikal id. */
export function newInvitationId(): string {
  return nanoid(10);
}

/**
 * O'zbekcha ismlarni URL slugiga aylantiradi.
 * Masalan: "Sardor Madina" → "sardor-madina"
 */
export function toSlug(input: string): string {
  const latin = input
    .toLowerCase()
    .replace(/[ʻʼ''`‘’]/g, "")
    .replace(/o['ʻ]/g, "o")
    .replace(/g['ʻ]/g, "g")
    .replace(/sh/g, "sh")
    .replace(/ch/g, "ch")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return latin || "taklifnoma";
}

export function uniqueSlug(base: string): string {
  return `${toSlug(base)}-${nanoid(4).toLowerCase()}`;
}
