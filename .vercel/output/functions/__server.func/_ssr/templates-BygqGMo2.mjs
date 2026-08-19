import { s as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as TEMPLATES, t as CATEGORIES } from "./templates-DNtH5Uvn.mjs";
import { t as PageShell } from "./page-shell-B68uMWf-.mjs";
import { t as TemplateCard } from "./template-card-BNEqrWoe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/templates-BygqGMo2.js
var import_jsx_runtime = require_jsx_runtime();
function TemplatesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-6 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.32em] text-gold uppercase",
				children: "Katalog"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl",
				children: "Dizaynlar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/templates/$category",
					params: { category: c.slug },
					className: "rounded-full bg-cream px-4 py-2 text-sm hover:bg-blush/40",
					children: c.title
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: TEMPLATES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateCard, { template: t }, t.id))
			})
		]
	}) });
}
//#endregion
export { TemplatesPage as component };
