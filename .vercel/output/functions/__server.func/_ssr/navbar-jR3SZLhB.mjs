import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { n as cn, t as Button } from "./button-CvoGUxaL.mjs";
import { v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as Menu, t as X } from "../_libs/lucide-react.mjs";
import { i as signOut } from "./client-sGid3STf.mjs";
import { n as useCurrentUserState, t as useCurrentUser } from "./use-current-user-DZ7NZd4-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/navbar-jR3SZLhB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLS = [
	{
		title: "Studio",
		links: [
			{
				to: "/",
				label: "Bosh sahifa"
			},
			{
				to: "/templates",
				label: "Dizaynlar"
			},
			{
				to: "/qanday-ishlaydi",
				label: "Qanday ishlaydi?"
			},
			{
				to: "/narxlar",
				label: "Narxlar"
			}
		]
	},
	{
		title: "Taklifnomalar",
		links: [
			{
				to: "/templates/$category",
				params: { category: "toy" },
				label: "To'y taklifnomasi"
			},
			{
				to: "/templates/$category",
				params: { category: "tabriknoma" },
				label: "Tabriknomalar"
			},
			{
				to: "/templates/$category",
				params: { category: "video-taklif" },
				label: "Videolik taklifnomalar"
			},
			{
				to: "/templates/$category",
				params: { category: "tugilgan-kun" },
				label: "Tug'ilgan kun"
			}
		]
	},
	{
		title: "Ma'lumot",
		links: [
			{
				to: "/faq",
				label: "FAQ"
			},
			{
				to: "/boglanish",
				label: "Bog'lanish"
			},
			{
				to: "/maxfiylik",
				label: "Maxfiylik"
			},
			{
				to: "/shartlar",
				label: "Shartlar"
			}
		]
	}
];
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative overflow-hidden bg-burgundy-deep text-ivory",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 opacity-30",
				style: {
					backgroundImage: "url(/images/textures/ornament.jpg)",
					backgroundSize: "cover"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: "VisolPremium"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xs text-sm text-champagne/85",
					children: "Luxury digital invitation studio. Har bir lahza — o'z hikoyasiga loyiq."
				})] }), COLS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.22em] text-gold uppercase",
					children: col.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2 text-sm",
					children: col.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "params" in l ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						params: l.params,
						className: "text-ivory/80 underline-offset-4 hover:text-ivory hover:underline",
						children: l.label
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "text-ivory/80 underline-offset-4 hover:text-ivory hover:underline",
						children: l.label
					}) }, l.label))
				})] }, col.title))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "relative border-t border-ivory/10 px-6 py-6 text-center text-xs text-champagne/70",
				children: "VisolPremium · Premium taklifnomalar"
			})
		]
	});
}
var SIGN_IN_PATH = "/login";
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
function UserButton() {
	const user = useCurrentUser();
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Profil";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "size-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-8 place-items-center rounded-full bg-burgundy/15 font-display text-sm text-burgundy",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden max-w-28 truncate text-sm font-medium sm:inline",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void signOut(),
				className: "cursor-pointer text-sm text-muted underline-offset-4 hover:text-ink hover:underline",
				children: "Chiqish"
			})
		]
	});
}
function AuthSlot({ light = false }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-8 animate-pulse rounded-full bg-burgundy/15" });
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/mening-taklifnomalarim",
			className: light ? "hidden text-sm text-ivory/85 underline-offset-4 hover:underline md:inline" : "hidden text-sm text-ink/80 underline-offset-4 hover:text-ink hover:underline md:inline",
			children: "Meninglarim"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		className: light ? "text-sm text-ivory/85 underline-offset-4 hover:underline" : "text-sm text-ink/80 underline-offset-4 hover:text-ink hover:underline",
		children: "Kirish"
	});
}
var LINKS = [
	{
		to: "/",
		hash: void 0,
		label: "Bosh sahifa"
	},
	{
		to: "/templates",
		hash: void 0,
		label: "Dizaynlar"
	},
	{
		to: "/qanday-ishlaydi",
		hash: void 0,
		label: "Qanday ishlaydi?"
	},
	{
		to: "/narxlar",
		hash: void 0,
		label: "Narxlar"
	},
	{
		to: "/faq",
		hash: void 0,
		label: "FAQ"
	}
];
function Navbar({ variant = "overlay" }) {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const floating = variant === "solid" || scrolled;
	const light = variant === "overlay" && !scrolled;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-3 md:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: cn("pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-full px-4 py-2 transition-[background-color,box-shadow,backdrop-filter] duration-300", floating ? "bg-ivory/88 shadow-[0_10px_40px_-18px_rgba(44,31,26,0.35)] backdrop-blur-md" : "bg-transparent"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: cn("font-display text-xl tracking-tight md:text-2xl", light ? "text-ivory" : "text-ink"),
					children: "VisolPremium"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden items-center gap-6 lg:flex",
					children: LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: cn("relative text-sm after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100", light ? "text-ivory/90" : "text-ink/80 hover:text-ink"),
						children: l.label
					}, l.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn(light ? "text-ivory" : "text-ink"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, { light })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: light ? "ivory" : "gold",
							className: "hidden sm:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/templates",
								children: ["Yaratish", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "→"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: cn("grid size-11 place-items-center rounded-full lg:hidden", light ? "text-ivory" : "text-ink"),
							"aria-label": open ? "Menyuni yopish" : "Menyuni ochish",
							onClick: () => setOpen((v) => !v),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-auto absolute top-16 right-3 left-3 rounded-3xl bg-ivory p-5 text-ink shadow-[0_20px_60px_-20px_rgba(44,31,26,0.4)] lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: l.to,
					className: "rounded-xl px-3 py-3 text-base hover:bg-blush/30",
					onClick: () => setOpen(false),
					children: l.label
				}, l.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/templates",
						onClick: () => setOpen(false),
						children: "Yaratish →"
					})
				})]
			})
		})]
	});
}
//#endregion
export { Navbar as n, RedirectToSignIn as r, Footer as t };
