import { s as require_jsx_runtime } from "./_libs/@react-three/fiber+[...].mjs";
import { t as Button } from "./_ssr/button-CvoGUxaL.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_-DKqQPLUu.js
var import_jsx_runtime = require_jsx_runtime();
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative grid min-h-screen place-items-center overflow-hidden px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/textures/ornament.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-ink/55" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative max-w-md text-ivory",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-script text-6xl text-gold",
						children: "404"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-4xl",
						children: "Sahifa topilmadi"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-champagne",
						children: "Bu manzilda sahifa yo'q. Bosh sahifadan davom eting."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ivory",
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Bosh sahifa"
						})
					})
				]
			})
		]
	});
}
//#endregion
export { NotFound as component };
