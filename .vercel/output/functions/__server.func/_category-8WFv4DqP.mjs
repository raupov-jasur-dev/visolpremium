import { s as require_jsx_runtime } from "./_libs/@react-three/fiber+[...].mjs";
import { t as Button } from "./_ssr/button-CvoGUxaL.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as getCategory, u as templatesByCategory } from "./_ssr/templates-BLAaodcN.mjs";
import { n as Route$1 } from "./_ssr/router-CVdbLN9V.mjs";
import { t as PageShell } from "./_ssr/page-shell-COm7Q6Yf.mjs";
import { t as TemplateCard } from "./_ssr/template-card-3DS8TtxJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_category-8WFv4DqP.js
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { category } = Route$1.useParams();
	const cat = getCategory(category);
	const list = cat ? templatesByCategory(cat.id) : [];
	if (!cat) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-6 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl",
			children: "Kategoriya topilmadi"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/templates",
				children: "Barcha dizaynlar"
			})
		})]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-64 items-end px-6 py-12 text-ivory",
			style: {
				backgroundImage: `linear-gradient(180deg, rgba(44,31,26,0.2), rgba(44,31,26,0.72)), url(${list[0]?.background ?? "/images/hero/roses.jpg"})`,
				backgroundSize: "cover"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-6xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.32em] text-gold uppercase",
						children: "Kategoriya"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-5xl",
						children: cat.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-lg text-champagne",
						children: cat.description
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid max-w-6xl gap-6 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3",
			children: list.length ? list.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateCard, { template: t }, t.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "col-span-full py-16 text-center text-muted",
				children: "Bu kategoriyada hozircha shablon yo'q."
			})
		})]
	}) });
}
//#endregion
export { CategoryPage as component };
