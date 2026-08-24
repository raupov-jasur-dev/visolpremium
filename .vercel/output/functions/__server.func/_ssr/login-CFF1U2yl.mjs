import { s as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { t as Button } from "./button-CvoGUxaL.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as GROK_PROVIDERS } from "./server-C0Kj8paz.mjs";
import { s as Route$12 } from "./router-BgGKuGxY.mjs";
import { r as signIn } from "./client-B40BzJxt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CFF1U2yl.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { next } = Route$12.useSearch();
	const callbackURL = next && next.startsWith("/") ? next : "/";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative grid min-h-screen place-items-center overflow-hidden px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/hero/silk-pink.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-ink/35" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full max-w-sm rounded-[28px] bg-ivory/95 p-8 text-ink shadow-[0_30px_80px_-24px_rgba(44,31,26,0.45)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl",
						children: "VisolPremium"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-2xl",
						children: "Hisobingizga kiring"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Taklifnomani saqlash va shaxsiy havola olish uchun kiring."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-3",
						children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "line",
							className: "w-full",
							onClick: () => signIn(p.providerId, { callbackURL }),
							children: [p.label, " orqali kirish"]
						}, p.providerId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mt-6 inline-block text-sm text-muted underline-offset-4 hover:underline",
						children: "← Bosh sahifa"
					})
				]
			})
		]
	});
}
//#endregion
export { Login as component };
