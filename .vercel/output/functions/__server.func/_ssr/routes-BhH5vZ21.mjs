import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { n as cn, t as Button } from "./button-CvoGUxaL.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as TEMPLATES } from "./templates-DNtH5Uvn.mjs";
import { n as Navbar, t as Footer } from "./navbar-jR3SZLhB.mjs";
import { t as InvitationRenderer } from "./renderer-CTmHW4pb.mjs";
import { a as HowItWorks, c as Pricing, d as VideoDemo, f as Why, i as FinalCta, l as Showcase, n as FaqSection, o as InvitationTypes, r as Features, s as LiveInvitation, t as Catalog, u as Testimonials } from "./sections-8CucuDQi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BhH5vZ21.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Ipak parda: WebGL faqat brauzerda yuklanadi.
* SSR va reduced-motion da statik rasm ko'rinadi.
*/
function SilkCurtain({ className = "" }) {
	const [Scene, setScene] = (0, import_react.useState)(null);
	const [reduce, setReduce] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduce(mq.matches);
		if (mq.matches) return;
		let alive = true;
		import("./silk-curtain-canvas-DQgsK3PN.mjs").then((m) => {
			if (alive) setScene(() => m.SilkCurtainCanvas);
		});
		return () => {
			alive = false;
		};
	}, []);
	if (!Scene || reduce) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className,
		style: {
			backgroundImage: "url(/images/hero/silk-pink.jpg)",
			backgroundSize: "cover",
			backgroundPosition: "center"
		},
		"aria-hidden": true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, { className });
}
function Hero() {
	const cardRef = (0, import_react.useRef)(null);
	const template = TEMPLATES[0];
	const onMove = (e) => {
		const el = cardRef.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const r = el.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width - .5;
		const py = (e.clientY - r.top) / r.height - .5;
		el.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 8}deg) translateZ(12px)`;
	};
	const onLeave = () => {
		const el = cardRef.current;
		if (!el) return;
		el.style.transform = "rotateY(-8deg) rotateX(4deg)";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-[100svh] overflow-hidden bg-burgundy-deep",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SilkCurtain, { className: "absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/25 via-transparent to-ivory" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-6 pt-28 pb-16 lg:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-ivory",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-[0.38em] text-champagne uppercase",
							children: "VisolPremium"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-5 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl",
							children: [
								"Har bir lahza",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"o'z hikoyasiga loyiq."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-md text-base text-champagne/90 sm:text-lg",
							children: "To'y, tabrik va uchrashuv uchun cinematic raqamli taklifnomalar. Ipak, oltin yorug'lik va sizning ismingiz."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "ivory",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/templates",
									children: "Taklifnoma yaratish"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "ghost",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#dizaynlar",
									children: "Dizaynlarni ko'rish"
								})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center lg:justify-end",
					style: { perspective: "1400px" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: cardRef,
						onPointerMove: onMove,
						onPointerLeave: onLeave,
						className: "relative w-[min(320px,86vw)] origin-center transition-transform duration-300 ease-out will-change-transform",
						style: {
							transform: "rotateY(-8deg) rotateX(4deg)",
							transformStyle: "preserve-3d"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-6 rounded-[28px] bg-gold/25 blur-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative max-h-[520px] overflow-hidden rounded-[22px] shadow-[0_40px_80px_-20px_rgba(20,8,10,0.55)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvitationRenderer, {
								template,
								data: template.demo,
								compact: true,
								autoScroll: true
							})
						})]
					})
				})]
			})
		]
	});
}
function DesignCarousel() {
	const n = TEMPLATES.length;
	const [active, setActive] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const pauseUntil = (0, import_react.useRef)(0);
	const drag = (0, import_react.useRef)(null);
	const go = (0, import_react.useCallback)((dir) => {
		setActive((i) => (i + dir + n) % n);
		pauseUntil.current = Date.now() + 8e3;
	}, [n]);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			if (Date.now() < pauseUntil.current) return;
			setActive((i) => (i + 1) % n);
		}, 5200);
		return () => window.clearInterval(id);
	}, [n]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "ArrowRight") go(1);
			if (e.key === "ArrowLeft") go(-1);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [go]);
	const offsets = [
		-1,
		0,
		1
	];
	const t = TEMPLATES[active];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "karusel",
		className: "relative overflow-hidden bg-ivory py-20 md:py-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 opacity-35",
				style: {
					backgroundImage: "url(/images/hero/silk-ivory.jpg)",
					backgroundSize: "cover"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-6xl px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.32em] text-gold uppercase",
						children: "Dizayn sahna"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-4xl md:text-5xl",
						children: "Taklifnoma karuseli"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-3 max-w-lg text-muted",
						children: "Markazdagi dizayn jonli ko'rinadi. Chap-o'ngga suring yoki o'q tugmalarini bosing."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto mt-12 max-w-6xl px-4",
				style: { perspective: "1400px" },
				onPointerDown: (e) => {
					drag.current = { x: e.clientX };
				},
				onPointerUp: (e) => {
					if (!drag.current) return;
					const dx = e.clientX - drag.current.x;
					if (dx < -48) go(1);
					else if (dx > 48) go(-1);
					drag.current = null;
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center gap-3 sm:gap-8",
					children: offsets.map((offset) => {
						const item = TEMPLATES[(active + offset + n) % n];
						const isCenter = offset === 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn(!isCenter && "hidden sm:block"),
							style: {
								transform: `rotateY(${offset * -18}deg) scale(${isCenter ? 1 : .78})`,
								opacity: isCenter ? 1 : .42,
								filter: isCenter ? "none" : "blur(2.5px)",
								zIndex: isCenter ? 4 : 1,
								transitionProperty: "transform, opacity, filter",
								transitionDuration: "550ms",
								transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("block overflow-hidden rounded-[22px] text-left shadow-[0_28px_70px_-24px_rgba(44,31,26,0.48)]", isCenter ? "h-[480px] w-[280px]" : "h-[380px] w-[210px]"),
								onClick: () => {
									if (!isCenter) go(offset);
								},
								onPointerEnter: () => isCenter && setPaused(true),
								onPointerLeave: () => setPaused(false),
								"aria-label": item.title,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvitationRenderer, {
									template: item,
									data: item.demo,
									compact: true,
									autoScroll: isCenter && !paused
								})
							})
						}, item.id + String(offset));
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "relative mt-6 text-center font-display text-2xl",
				children: t.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "relative text-center text-sm text-muted",
				children: t.tagline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mt-4 flex justify-center gap-2",
				children: TEMPLATES.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": item.title,
					className: cn("h-2 rounded-full transition-[width,background-color] duration-300", i === active ? "w-8 bg-burgundy" : "w-2 bg-gold/50"),
					onClick: () => {
						setActive(i);
						pauseUntil.current = Date.now() + 8e3;
					}
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-6 flex justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					variant: "line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/create/$templateId",
						params: { templateId: t.id },
						children: "Ko'rish"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/create/$templateId",
						params: { templateId: t.id },
						children: "Tayyorlash"
					})
				})]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-ivory",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, { variant: "overlay" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesignCarousel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvitationTypes, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Showcase, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Features, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoDemo, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveInvitation, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalog, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Why, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCta, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { Home as component };
