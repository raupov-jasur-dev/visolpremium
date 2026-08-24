import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { t as Button } from "./button-CvoGUxaL.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as CATEGORIES } from "./templates-BbIr5AV_.mjs";
import { t as formatPrice } from "./format-DLLI47D1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/template-card-MdBHSfBO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TemplateCard({ template }) {
	const ref = (0, import_react.useRef)(null);
	const cat = CATEGORIES.find((c) => c.id === template.category);
	const onMove = (e) => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const r = el.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width - .5;
		const py = (e.clientY - r.top) / r.height - .5;
		el.style.transform = `rotateY(${px * 7}deg) rotateX(${-py * 6}deg) scale(1.015)`;
		const img = el.querySelector("img");
		if (img) img.style.transform = `translate(${px * -8}px, ${py * -8}px) scale(1.06)`;
	};
	const onLeave = () => {
		const el = ref.current;
		if (!el) return;
		el.style.transform = "";
		const img = el.querySelector("img");
		if (img) img.style.transform = "";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		ref,
		onPointerMove: onMove,
		onPointerLeave: onLeave,
		className: "group relative overflow-hidden rounded-[28px] bg-cream shadow-[0_18px_50px_-24px_rgba(44,31,26,0.32)] transition-transform duration-300",
		style: {
			transformStyle: "preserve-3d",
			perspective: "900px"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[9/16] overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: template.previewImage,
					alt: template.title,
					className: "size-full object-cover transition-transform duration-500"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-4 left-4 rounded-full bg-ivory/90 px-3 py-1 text-[11px] tracking-wide text-ink",
					children: cat?.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute right-4 bottom-24 left-4 translate-y-3 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "ivory",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/create/$templateId",
								params: { templateId: template.id },
								children: "Ko'rish"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/create/$templateId",
								params: { templateId: template.id },
								children: "Tayyorlash"
							})
						})]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-3 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl",
				children: template.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: template.tagline
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm tabular-nums text-burgundy",
				children: formatPrice(template.price)
			})]
		})]
	});
}
//#endregion
export { TemplateCard as t };
