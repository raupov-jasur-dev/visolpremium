import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { n as cn, t as Button } from "./button-CvoGUxaL.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PRICE, r as TEMPLATES, t as CATEGORIES } from "./templates-BbIr5AV_.mjs";
import { _ as MapPinned, b as Image, c as Sparkles, h as Music2, i as Users, l as Smartphone, n as WandSparkles, r as Video, s as Timer, u as QrCode, y as Link2 } from "../_libs/lucide-react.mjs";
import { t as formatPrice } from "./format-DLLI47D1.mjs";
import { t as TemplateCard } from "./template-card-MdBHSfBO.mjs";
import { r as VideoSequence, t as InvitationRenderer } from "./renderer-Mtzyrdmu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sections-CnXMrdex.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Reveal({ children, className, delay = 0 }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			el.dataset.visible = "true";
			return;
		}
		const io = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				window.setTimeout(() => {
					el.dataset.visible = "true";
				}, delay);
				io.disconnect();
			}
		}, {
			threshold: .14,
			rootMargin: "0px 0px -8% 0px"
		});
		io.observe(el);
		return () => io.disconnect();
	}, [delay]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn("reveal", className),
		children
	});
}
function InvitationTypes() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative bg-cream py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.32em] text-gold uppercase",
				children: "Janrlar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-4xl md:text-5xl",
				children: "Qaysi hikoyani aytamiz?"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: CATEGORIES.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 70,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/templates/$category",
						params: { category: c.slug },
						className: "group relative block overflow-hidden rounded-[28px] p-6 text-ivory",
						style: {
							backgroundImage: `linear-gradient(180deg, rgba(44,31,26,0.15), rgba(44,31,26,0.72)), url(${TEMPLATES.find((t) => t.category === c.id)?.background ?? "/images/hero/roses.jpg"})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							minHeight: 220
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl",
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xs text-sm text-champagne/90",
								children: c.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-6 inline-flex text-sm tracking-wide text-gold",
								children: "Ochish →"
							})
						]
					})
				}, c.id))
			})]
		})
	});
}
function HowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "qanday",
		className: "relative overflow-hidden bg-ivory py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-40",
			style: {
				backgroundImage: "url(/images/textures/silk.jpg)",
				backgroundSize: "cover"
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-6xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.32em] text-gold uppercase",
				children: "Jarayon"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-4xl md:text-5xl",
				children: "Qanday ishlaydi?"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid gap-6 md:grid-cols-3",
				children: [
					{
						n: "01",
						t: "Dizayn tanlang",
						d: "Karusel yoki katalogdan o'zingizga yaqin naqshni tanlaysiz."
					},
					{
						n: "02",
						t: "Ma'lumotlaringizni kiriting",
						d: "Ismlar, sana, foto, musiqa — preview darhol yangilanadi."
					},
					{
						n: "03",
						t: "Tayyor taklifnomangizni ulashing",
						d: "Unikal havola yaratiladi. Mehmonlar telefonida ochadi."
					}
				].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 90,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "group rounded-[28px] bg-cream/80 p-7 shadow-[0_18px_50px_-24px_rgba(44,31,26,0.3)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-1.2deg]",
						style: { transformStyle: "preserve-3d" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-5xl text-gold",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-display text-2xl",
								children: s.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: s.d
							})
						]
					})
				}, s.n))
			})]
		})]
	});
}
var FEATURES = [
	{
		icon: Sparkles,
		t: "Premium dizaynlar",
		d: "Har shablon — alohida visual identity."
	},
	{
		icon: WandSparkles,
		t: "Real-time preview",
		d: "Yozganingiz zahoti taklifnomada ko'rinadi."
	},
	{
		icon: Image,
		t: "Foto va video",
		d: "Galereya, muqova va kino kadrlar."
	},
	{
		icon: Music2,
		t: "Fon musiqasi",
		d: "Ichki ambient yoki o'z trekingiz."
	},
	{
		icon: MapPinned,
		t: "Google Maps",
		d: "Mehmonlar maskanni bir bosishda topadi."
	},
	{
		icon: Users,
		t: "RSVP",
		d: "Kelish-kelmaslikni yig'ib borasiz."
	},
	{
		icon: Timer,
		t: "Countdown",
		d: "To'ygacha qolgan kunlar jonli hisoblanadi."
	},
	{
		icon: Image,
		t: "Photo gallery",
		d: "Eng nozik kadrlaringiz — nafis panjara."
	},
	{
		icon: QrCode,
		t: "QR / havola",
		d: "Unikal URL. Ulashing va oching."
	},
	{
		icon: Smartphone,
		t: "Mobil moslashuv",
		d: "Telefon va planshetda ham cinematic."
	},
	{
		icon: Video,
		t: "Animatsiyalar",
		d: "Ken Burns, ipak, mask reveal."
	},
	{
		icon: Link2,
		t: "Unique invitation URL",
		d: "sardor-madina kabi shaxsiy manzil."
	}
];
function Features() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-burgundy-deep py-24 text-ivory",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.32em] text-gold uppercase",
				children: "Imkoniyatlar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-4xl md:text-5xl",
				children: "Studio ichida nima bor?"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: FEATURES.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i % 3 * 60,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-[24px] bg-ivory/8 p-6 shadow-[0_0_0_1px_rgba(212,196,168,0.16)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, {
								className: "size-6 text-gold",
								strokeWidth: 1.5
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-display text-xl",
								children: f.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-champagne/85",
								children: f.d
							})
						]
					})
				}, f.t))
			})]
		})
	});
}
function VideoDemo() {
	const t = TEMPLATES.find((x) => x.id === "video-nikoh");
	const [play, setPlay] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative overflow-hidden bg-ink py-24 text-ivory",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.32em] text-gold uppercase",
					children: "Kino"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-4xl md:text-5xl",
					children: "Videolik taklifnoma"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-champagne/85",
					children: "Kadrlar sekin ochiladi, matnlar ritm bilan chiqadi, oxirida taklifnoma namoyon bo'ladi. Play bosing — demo jonlanadi."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 120,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative overflow-hidden rounded-[28px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)]",
					children: play ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoSequence, {
						template: t,
						data: t.demo,
						playingDefault: true
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "relative block w-full",
						onClick: () => setPlay(true),
						"aria-label": "Videoni ijro etish",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/hero/venue.jpg",
							alt: "",
							className: "aspect-[16/11] w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute inset-0 grid place-items-center bg-ink/25",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-20 place-items-center rounded-full bg-ivory text-burgundy",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 font-display text-lg",
									children: "Play"
								})
							})
						})]
					})
				})
			})]
		})
	});
}
function LiveInvitation() {
	const t = TEMPLATES[1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.32em] text-gold uppercase",
					children: "Jonli namuna"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-4xl md:text-5xl",
					children: "Haqiqiy taklifnoma ko'rinishi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted",
					children: "Sardor va Madina — 22 Avgust, 2026. Bu demo kontent. Siz o'z ismlaringizni yozganingizda xuddi shu sahifa shaxsiy havolaga aylanadi."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/create/$templateId",
						params: { templateId: t.id },
						children: "Shu dizaynni tayyorlash"
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 100,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto w-[min(360px,100%)] overflow-hidden rounded-[24px] shadow-[0_30px_80px_-28px_rgba(44,31,26,0.45)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvitationRenderer, {
						template: t,
						data: t.demo,
						compact: true
					})
				})
			})]
		})
	});
}
function Catalog() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "dizaynlar",
		className: "bg-ivory py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.32em] text-gold uppercase",
				children: "Katalog"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-4xl md:text-5xl",
				children: "Dizaynlar"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: TEMPLATES.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i % 3 * 70,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateCard, { template: t })
				}, t.id))
			})]
		})
	});
}
function Why() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-burgundy py-24 text-ivory",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 opacity-25",
			style: {
				backgroundImage: "url(/images/textures/cinematic.jpg)",
				backgroundSize: "cover"
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-6xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-4xl md:text-5xl",
				children: "Nega VisolPremium?"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-6 md:grid-cols-2",
				children: [
					{
						t: "Mustaqil brend",
						d: "Nusxa emas — VisolPremium o'z sahnasiga ega."
					},
					{
						t: "Cinematic scroll",
						d: "Sahifalar kesilmaydi, sahnaga kirib keladi."
					},
					{
						t: "Shablon tizimi",
						d: "Yangi dizayn qo'shish — yangi obyekt yozish demak."
					},
					{
						t: "Shaxsiy havola",
						d: "Har taklifnoma — o'z manzili va RSVP daftari."
					}
				].map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 80,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-[24px] bg-ivory/8 p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl",
							children: it.t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-champagne/85",
							children: it.d
						})]
					})
				}, it.t))
			})]
		})]
	});
}
function Pricing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "narx",
		className: "bg-ivory py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-xl px-6 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.32em] text-gold uppercase",
					children: "Narx"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-4xl",
					children: "Bir studio. Bir narx."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 rounded-[32px] bg-cream p-10 shadow-[0_24px_70px_-28px_rgba(44,31,26,0.35)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-6xl text-burgundy tabular-nums",
							children: formatPrice(PRICE)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: "Barcha asosiy shablonlar uchun. To'lov tizimi tez orada ulanadi — hozir yaratish bepul ishlaydi."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/templates",
								children: "Taklifnoma yaratish"
							})
						})
					]
				})
			] })
		})
	});
}
var QUOTES = [
	{
		name: "Dilnoza",
		text: "Taklifnoma ochilganda mehmonlar jim qolishdi. Bu oddiy kartochka emas edi."
	},
	{
		name: "Jasur",
		text: "Ismlarni yozdim — preview darhol o'zgardi. Shu oqshom havolani yubordik."
	},
	{
		name: "Malika",
		text: "Videolik tabrik onamni yig'latdi. Musiqa va kadrlar o'zimizniki edi."
	}
];
function Testimonials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "overflow-hidden bg-cream py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-4xl md:text-5xl",
				children: "Mehmonlarning taassuroti"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none]",
				children: QUOTES.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "min-w-[min(86vw,340px)] rounded-[28px] bg-ivory p-8 shadow-[0_18px_50px_-24px_rgba(44,31,26,0.3)]",
					style: { transform: `rotate(${i === 1 ? -1.5 : i === 2 ? 1.8 : .6}deg)` },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-xl leading-relaxed",
						children: [
							"“",
							q.text,
							"”"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm tracking-[0.18em] text-gold uppercase",
						children: q.name
					})]
				}, q.name))
			})]
		})
	});
}
var FAQS = [
	{
		q: "Taklifnoma qanday ulashiladi?",
		a: "Tayyorlash tugmasidan so'ng unikal havola yaratiladi. Uni Telegram, SMS yoki QR orqali yuborasiz."
	},
	{
		q: "Rasm va musiqa saqlanadimi?",
		a: "Ha. Yuklagan rasmlaringiz va musiqa taklifnoma bilan birga saqlanadi."
	},
	{
		q: "To'lov hozir ishlaydimi?",
		a: "Narx 19 999 so'm. To'lov shlyuzi hali ulanmagan — yaratish va ulashish hozir ishlaydi."
	},
	{
		q: "Mobil telefonda ochiladimi?",
		a: "Ha. Taklifnoma vertikal formatda, telefon uchun maxsus moslashtirilgan."
	},
	{
		q: "RSVP nima qiladi?",
		a: "Mehmonlar ismini yozib, kelishini bildiradi. Siz o'z sahifangizda ro'yxatni ko'rasiz."
	}
];
function FaqSection() {
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "faq",
		className: "bg-ivory py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-4xl",
				children: "Savollar"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 divide-y divide-gold/25",
				children: FAQS.map((item, i) => {
					const on = open === i;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex w-full items-center justify-between gap-4 py-5 text-left",
						onClick: () => setOpen(on ? -1 : i),
						"aria-expanded": on,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl",
							children: item.q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("grid size-8 place-items-center rounded-full text-gold transition-transform duration-300", on && "rotate-45"),
							children: "+"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("grid transition-[grid-template-rows,opacity] duration-300 ease-out", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "overflow-hidden pb-5 text-sm leading-relaxed text-muted",
							children: item.a
						})
					})] }, item.q);
				})
			})]
		})
	});
}
function FinalCta() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden py-28 text-ivory",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/hero/cta.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-burgundy-deep/55" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto max-w-3xl px-6 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl md:text-6xl",
					children: "Sizning hikoyangizni boshlash vaqti keldi."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					variant: "ivory",
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/templates",
						children: "Taklifnomangizni yaratish →"
					})
				})] })
			})
		]
	});
}
function Showcase() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-cream py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.32em] text-gold uppercase",
				children: "Interaktiv"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-4xl md:text-5xl",
				children: "Har shablon — o'z dunyosi"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-6 md:grid-cols-2",
				children: TEMPLATES.slice(0, 4).map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 80,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/create/$templateId",
						params: { templateId: t.id },
						className: "group relative block overflow-hidden rounded-[28px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: t.background,
								alt: "",
								className: "aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute right-5 bottom-5 left-5 text-ivory",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-3xl",
									children: t.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-champagne",
									children: t.tagline
								})]
							})
						]
					})
				}, t.id))
			})]
		})
	});
}
//#endregion
export { HowItWorks as a, Pricing as c, VideoDemo as d, Why as f, FinalCta as i, Showcase as l, FaqSection as n, InvitationTypes as o, Features as r, LiveInvitation as s, Catalog as t, Testimonials as u };
