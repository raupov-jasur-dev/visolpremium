import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { n as cn } from "./button-CvoGUxaL.mjs";
import { d as Play, f as Phone, m as Pause, v as MapPin } from "../_libs/lucide-react.mjs";
import { n as formatUzDateLong } from "./format-DLLI47D1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/renderer-Mtzyrdmu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Yuklangan rasmni kichraytirib, data URL qaytaradi. */
var MAX_DIM = 1400;
var JPEG_QUALITY = .82;
var MAX_BYTES = 24e5;
async function fileToDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Faylni o'qib bo'lmadi."));
		reader.onload = () => resolve(String(reader.result));
		reader.readAsDataURL(file);
	});
}
async function compressImage(file) {
	if (file.size > MAX_BYTES) throw new Error("Rasm hajmi 2.4 MB dan oshmasligi kerak.");
	if (!file.type.startsWith("image/")) throw new Error("Faqat rasm fayllarini yuklash mumkin.");
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
async function readAudio(file) {
	if (file.size > 6e6) throw new Error("Musiqa fayli 6 MB dan oshmasligi kerak.");
	if (!file.type.startsWith("audio/")) throw new Error("Faqat audio fayllarni yuklash mumkin.");
	return fileToDataUrl(file);
}
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject(/* @__PURE__ */ new Error("Rasm ochilmadi."));
		img.src = src;
	});
}
function asStringList(value) {
	if (Array.isArray(value)) return value.filter((v) => typeof v === "string");
	if (typeof value === "string" && value.startsWith("[")) try {
		return asStringList(JSON.parse(value));
	} catch {
		return value ? [value] : [];
	}
	if (typeof value === "string" && value) return [value];
	return [];
}
function asString(value, fallback = "") {
	if (typeof value === "string") return value;
	if (typeof value === "number") return String(value);
	return fallback;
}
function asBool(value) {
	return value === true || value === "true";
}
/**
* Ichki ambient musiqa dvigateli.
* Haqiqiy MP3 o'rniga Web Audio API orqali nafis pad/arpeggio chaladi.
* Foydalanuvchi o'z faylini yuklasa, HTMLAudio ishlatiladi.
*/
var MUSIC_TRACKS = [
	{
		id: "none",
		title: "Musiqasiz"
	},
	{
		id: "ipak-tuni",
		title: "Ipak tuni"
	},
	{
		id: "guliston",
		title: "Guliston"
	},
	{
		id: "yulduzlar",
		title: "Yulduzlar ostida"
	},
	{
		id: "sokin-yurak",
		title: "Sokin yurak"
	}
];
var ctx = null;
var master = null;
var voices = [];
var interval = null;
var currentId = null;
var htmlAudio = null;
function ensureCtx() {
	if (!ctx) {
		ctx = new AudioContext();
		master = ctx.createGain();
		master.gain.value = .12;
		master.connect(ctx.destination);
	}
	return ctx;
}
function stopVoices() {
	if (interval != null) {
		window.clearInterval(interval);
		interval = null;
	}
	for (const v of voices) {
		try {
			v.osc.stop();
		} catch {}
		v.osc.disconnect();
		v.gain.disconnect();
		v.filter.disconnect();
	}
	voices = [];
	if (htmlAudio) {
		htmlAudio.pause();
		htmlAudio = null;
	}
	currentId = null;
}
function note(freq, type, filterFreq) {
	const c = ensureCtx();
	const osc = c.createOscillator();
	const gain = c.createGain();
	const filter = c.createBiquadFilter();
	osc.type = type;
	osc.frequency.value = freq;
	filter.type = "lowpass";
	filter.frequency.value = filterFreq;
	gain.gain.value = 0;
	osc.connect(filter);
	filter.connect(gain);
	gain.connect(master);
	osc.start();
	return {
		osc,
		gain,
		filter
	};
}
var SCALES = {
	"ipak-tuni": [
		220,
		261.63,
		329.63,
		392,
		440
	],
	guliston: [
		246.94,
		293.66,
		329.63,
		392,
		493.88
	],
	yulduzlar: [
		196,
		246.94,
		293.66,
		392,
		493.88
	],
	"sokin-yurak": [
		174.61,
		220,
		261.63,
		329.63,
		349.23
	]
};
function startPad(id) {
	const scale = SCALES[id];
	if (!scale) return;
	const c = ensureCtx();
	c.resume();
	const v1 = note(scale[0], "sine", 900);
	const v2 = note(scale[2], "triangle", 700);
	voices = [v1, v2];
	const now = c.currentTime;
	v1.gain.gain.setTargetAtTime(.35, now, 1.4);
	v2.gain.gain.setTargetAtTime(.18, now, 1.8);
	let i = 0;
	interval = window.setInterval(() => {
		const freq = scale[i % scale.length];
		const v = voices[0];
		if (!v || !ctx) return;
		v.osc.frequency.setTargetAtTime(freq, ctx.currentTime, .8);
		voices[1]?.osc.frequency.setTargetAtTime(scale[(i + 2) % scale.length] / 2, ctx.currentTime, 1.2);
		i += 1;
	}, 2400);
}
function playMusic(id) {
	if (typeof window === "undefined") return;
	if (!id || id === "none") {
		stopVoices();
		return;
	}
	if (id.startsWith("data:") || id.startsWith("blob:") || id.startsWith("http")) {
		stopVoices();
		htmlAudio = new Audio(id);
		htmlAudio.loop = true;
		htmlAudio.volume = .45;
		htmlAudio.play().catch(() => {});
		currentId = id;
		return;
	}
	if (currentId === id && voices.length) return;
	stopVoices();
	startPad(id);
	currentId = id;
}
function stopMusic() {
	if (typeof window === "undefined") return;
	stopVoices();
}
var SLIDE_MS = 4200;
function VideoSequence({ template, data, compact = false, playingDefault = true }) {
	const slides = (0, import_react.useMemo)(() => {
		const fromData = asStringList(data.slides);
		return fromData.length ? fromData : template.gallery;
	}, [data.slides, template.gallery]);
	const captions = (0, import_react.useMemo)(() => {
		const lines = asString(data.captions).split("\n").map((s) => s.trim()).filter(Boolean);
		return lines.length ? lines : [asString(data.title) || template.title];
	}, [
		data.captions,
		data.title,
		template.title
	]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [playing, setPlaying] = (0, import_react.useState)(playingDefault && !compact);
	(0, import_react.useEffect)(() => {
		if (!playing || slides.length < 2) return;
		const id = window.setInterval(() => {
			setIndex((i) => (i + 1) % slides.length);
		}, SLIDE_MS);
		return () => window.clearInterval(id);
	}, [playing, slides.length]);
	(0, import_react.useEffect)(() => {
		if (playing) playMusic(asString(data.music));
		else stopMusic();
		return () => stopMusic();
	}, [playing, data.music]);
	slides[index] ?? template.previewImage;
	const caption = captions[index % captions.length];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative isolate overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative", compact ? "aspect-[9/16]" : "aspect-[9/16] min-h-[28rem]"),
			children: [
				slides.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: s,
					alt: "",
					className: cn("absolute inset-0 size-full object-cover transition-opacity duration-700", playing && i === index ? "scale-110" : "scale-100", i === index ? "opacity-100" : "opacity-0"),
					style: {
						transitionProperty: "opacity, transform",
						transitionDuration: playing ? "4200ms, 4200ms" : "700ms, 700ms"
					}
				}, s + i)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 px-6 pb-10 text-center text-ivory",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.32em] text-champagne uppercase",
						children: asString(data.subtitle) || template.tagline
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-script text-4xl sm:text-5xl",
						style: { fontFamily: template.fonts.script },
						children: caption
					})]
				}),
				!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory/90 text-burgundy shadow-[0_10px_40px_-10px_rgba(0,0,0,0.45)]",
					onClick: () => setPlaying((p) => !p),
					"aria-label": playing ? "To'xtatish" : "Ijro etish",
					children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-6 translate-x-px" })
				})
			]
		})
	});
}
function isDarkPaper(paper) {
	const hex = paper.replace("#", "").trim();
	if (hex.length < 6) return false;
	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);
	return (r * 299 + g * 587 + b * 114) / 1e3 < 150;
}
function frameLayout(template) {
	if (template.id === "naqsh") return {
		place: "center",
		panel: true
	};
	if (template.theme.style === "cinematic") return {
		place: "lower",
		panel: false
	};
	return {
		place: "center",
		panel: false
	};
}
function InvitationRenderer({ template, data, compact = false }) {
	const dark = isDarkPaper(template.theme.paper);
	const style = {
		"--inv-paper": template.theme.paper,
		"--inv-ink": template.theme.ink,
		"--inv-muted": template.theme.muted,
		"--inv-accent": template.theme.accent,
		"--inv-gold": template.theme.gold
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("relative overflow-hidden text-[color:var(--inv-ink)]", compact ? "w-full rounded-[18px]" : "rounded-[22px]"),
		style: {
			...style,
			backgroundColor: template.theme.paper,
			fontFamily: template.fonts.body
		},
		children: [template.isVideo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoSequence, {
			template,
			data,
			compact
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FramedCard, {
			template,
			data,
			compact,
			dark
		}), !compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BelowCard, {
			template,
			data,
			dark
		}) : null]
	});
}
function FramedCard({ template, data, compact, dark }) {
	const names = coupleNames(data, template);
	const cover = asString(data.coverPhoto);
	const showPhoto = Boolean(cover) && cover !== template.previewImage && cover !== template.background && !cover.startsWith("/images/templates/");
	const greeting = asString(data.greeting) || asString(data.message);
	const { place, panel } = frameLayout(template);
	const age = asString(data.age);
	const host = asString(data.host);
	const sender = asString(data.sender);
	const byline = host || sender;
	const venue = asString(data.venue);
	const title = asString(data.title);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative aspect-[9/16] w-full overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: template.background,
				alt: "",
				className: "absolute inset-0 size-full object-cover outline-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-[9%] rounded-[16px]",
				style: { background: place === "lower" ? "linear-gradient(to top, rgba(8,2,4,0.55) 0%, rgba(8,2,4,0.18) 42%, transparent 72%)" : dark ? "radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.12) 58%, transparent 80%)" : "radial-gradient(ellipse at 50% 46%, rgba(255,252,245,0.62) 0%, rgba(255,252,245,0.20) 54%, transparent 78%)" }
			}),
			panel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-[15%] rounded-[22px] bg-[#071018]/62 shadow-[inset_0_0_48px_rgba(0,0,0,0.28)] backdrop-blur-[3px]" }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("relative z-10 flex h-full flex-col items-center px-[14%] text-center", place === "lower" ? "justify-end pb-[15%] pt-[42%]" : "justify-center py-[19%]"),
				style: { textShadow: dark ? "0 2px 18px rgba(0,0,0,0.5)" : "0 1px 12px rgba(255,255,255,0.55)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] tracking-[0.34em] uppercase sm:text-[11px]",
						style: { color: template.theme.gold },
						children: categoryLabel(template)
					}),
					age ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-script leading-none",
						style: {
							fontFamily: template.fonts.script,
							color: template.theme.gold,
							fontSize: compact ? "2.6rem" : "3.1rem"
						},
						children: age
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: cn("mt-2 leading-[1.08]", compact ? "text-[1.95rem]" : "text-[2.35rem] sm:text-[2.75rem]"),
						style: {
							fontFamily: template.fonts.script,
							color: template.theme.gold
						},
						children: names
					}),
					byline && !asString(data.groom) && names !== byline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[12px] opacity-80",
						children: byline
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-line mx-auto mt-3 mb-3" }),
					greeting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mx-auto max-w-[17.5rem] leading-relaxed opacity-90", compact ? "line-clamp-3 text-[12px]" : "text-sm sm:text-[15px]"),
						style: { fontFamily: template.fonts.display },
						children: greeting
					}) : null,
					asString(data.date) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("mt-4 tracking-wide", compact ? "text-sm" : "text-base"),
						style: { fontFamily: template.fonts.display },
						children: [formatUzDateLong(asString(data.date)), asString(data.time) ? ` · ${asString(data.time)}` : ""]
					}) : null,
					venue || title && title !== names ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-2 opacity-85", compact ? "text-[12px]" : "text-sm"),
						children: venue || title
					}) : null,
					showPhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cover,
						alt: "",
						className: "mt-5 size-20 rounded-full object-cover outline-none ring-2 ring-[color:var(--inv-gold)]/70"
					}) : null
				]
			})
		]
	});
}
function BelowCard({ template, data, dark }) {
	const photos = asStringList(data.gallery);
	const url = asString(data.mapUrl);
	const showLocation = Boolean(asString(data.address) || url || asString(data.phone));
	const showCountdown = asBool(data.countdownEnabled) && Boolean(asString(data.date));
	const showRsvp = asBool(data.rsvpEnabled);
	const showParents = Boolean(asString(data.parentsGroom) || asString(data.parentsBride));
	const showVerse = template.category === "toy" || template.category === "video-taklif";
	if (template.isVideo) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-7 py-10 text-center sm:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl",
				children: coupleNames(data, template)
			}),
			asString(data.date) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 opacity-80",
				children: formatUzDateLong(asString(data.date))
			}) : null,
			asString(data.venue) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm opacity-75",
				children: asString(data.venue)
			}) : null
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative", dark ? "bg-black/20" : "bg-black/[0.03]"),
		children: [
			showVerse ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-7 pt-10 text-center sm:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto max-w-sm font-display text-xl italic leading-relaxed opacity-90",
					children: "«Ikki qalb — bir taqdir. Shu kunda yangi hikoya boshlanadi.»"
				})
			}) : null,
			showParents ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-6 px-7 py-8 text-center sm:grid-cols-2 sm:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.22em] uppercase opacity-70",
					children: "Kuyov taraf"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-xl",
					children: asString(data.parentsGroom)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.22em] uppercase opacity-70",
					children: "Kelin taraf"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-xl",
					children: asString(data.parentsBride)
				})] })]
			}) : null,
			photos.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid grid-cols-2 gap-3 px-5 py-8 sm:px-8",
				children: photos.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: "",
					className: "aspect-[4/5] w-full rounded-2xl object-cover outline-none"
				}, src))
			}) : null,
			showLocation ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "px-7 py-8 text-center sm:px-10",
				children: [
					asString(data.address) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "inline-flex items-center gap-2 text-sm opacity-80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), asString(data.address)]
					}) : null,
					url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: url,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex h-11 items-center rounded-full bg-[color:var(--inv-gold)] px-5 text-sm text-ink",
							children: "Xaritada ochish"
						})
					}) : null,
					asString(data.phone) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 inline-flex items-center gap-2 text-sm opacity-80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), asString(data.phone)]
					}) : null
				]
			}) : null,
			showCountdown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-7 py-8 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, {
					date: asString(data.date),
					time: asString(data.time)
				})
			}) : null,
			showRsvp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "px-7 py-8 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: "Ishtirokingizni bildiring"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm opacity-75",
					children: "Quyida RSVP formasini to'ldirasiz."
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "px-7 py-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-line mx-auto mb-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-script text-3xl",
						children: coupleNames(data, template)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-[10px] tracking-[0.28em] uppercase opacity-50",
						children: "VisolPremium"
					})
				]
			})
		]
	});
}
function coupleNames(data, template) {
	if (asString(data.groom) && asString(data.bride)) return `${asString(data.groom)} & ${asString(data.bride)}`;
	if (asString(data.honoree)) return asString(data.honoree);
	if (asString(data.recipient)) return asString(data.recipient);
	if (asString(data.title)) return asString(data.title);
	return template.title;
}
function categoryLabel(template) {
	if (template.category === "toy" || template.category === "video-taklif") return "Nikoh to'yi";
	if (template.category === "tugilgan-kun") return "Tug'ilgan kun";
	if (template.category === "uchrashuv") return "Uchrashuv";
	if (template.category === "tabriknoma" || template.category === "video-tabrik") return "Tabrik";
	return "Taklifnoma";
}
function Countdown({ date, time }) {
	const target = (0, import_react.useMemo)(() => {
		const iso = time ? `${date}T${time}` : `${date}T00:00:00`;
		return new Date(iso).getTime();
	}, [date, time]);
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setNow(Date.now());
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	const diff = Math.max(0, target - (now ?? target));
	const days = Math.floor(diff / 864e5);
	const hours = Math.floor(diff % 864e5 / 36e5);
	const mins = Math.floor(diff % 36e5 / 6e4);
	const secs = Math.floor(diff % 6e4 / 1e3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center gap-3",
		children: [
			{
				n: now == null ? "—" : days,
				l: "kun"
			},
			{
				n: now == null ? "—" : hours,
				l: "soat"
			},
			{
				n: now == null ? "—" : mins,
				l: "daq"
			},
			{
				n: now == null ? "—" : secs,
				l: "son"
			}
		].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-14 rounded-2xl bg-black/10 px-3 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-2xl tabular-nums",
				children: c.n
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] tracking-widest uppercase opacity-70",
				children: c.l
			})]
		}, c.l))
	});
}
//#endregion
export { asString as a, playMusic as c, asBool as i, readAudio as l, MUSIC_TRACKS as n, asStringList as o, VideoSequence as r, compressImage as s, InvitationRenderer as t, stopMusic as u };
