//#region node_modules/.nitro/vite/services/ssr/assets/format-DLLI47D1.js
var MONTHS_UZ = [
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
	"Dekabr"
];
var WEEKDAYS_UZ = [
	"Yakshanba",
	"Dushanba",
	"Seshanba",
	"Chorshanba",
	"Payshanba",
	"Juma",
	"Shanba"
];
/** 19999 → "19 999 so'm" */
function formatPrice(n) {
	return `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`;
}
/** ISO sana yoki YYYY-MM-DD ni o'zbekcha chiroyli formatga o'tkazadi. */
function formatUzDate(value) {
	if (!value) return "";
	const d = new Date(value);
	if (Number.isNaN(d.getTime())) return value;
	return `${d.getDate()} ${MONTHS_UZ[d.getMonth()]}, ${d.getFullYear()}`;
}
function formatUzWeekday(value) {
	if (!value) return "";
	const d = new Date(value);
	if (Number.isNaN(d.getTime())) return "";
	return WEEKDAYS_UZ[d.getDay()];
}
function formatUzDateLong(value) {
	const date = formatUzDate(value);
	const day = formatUzWeekday(value);
	return day ? `${day} · ${date}` : date;
}
//#endregion
export { formatUzDateLong as n, formatPrice as t };
