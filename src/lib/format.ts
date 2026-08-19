const MONTHS_UZ = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktabr",
  "Noyabr",
  "Dekabr",
] as const;

const WEEKDAYS_UZ = [
  "Yakshanba",
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
] as const;

/** 19999 → "19 999 so'm" */
export function formatPrice(n: number): string {
  const body = Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${body} so'm`;
}

/** ISO sana yoki YYYY-MM-DD ni o'zbekcha chiroyli formatga o'tkazadi. */
export function formatUzDate(value: string | undefined): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return `${d.getDate()} ${MONTHS_UZ[d.getMonth()]}, ${d.getFullYear()}`;
}

export function formatUzWeekday(value: string | undefined): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return WEEKDAYS_UZ[d.getDay()];
}

export function formatUzDateLong(value: string | undefined): string {
  const date = formatUzDate(value);
  const day = formatUzWeekday(value);
  return day ? `${day} · ${date}` : date;
}
