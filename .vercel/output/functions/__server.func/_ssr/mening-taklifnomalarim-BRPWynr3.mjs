import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { n as cn, t as Button } from "./button-CvoGUxaL.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as getTemplate } from "./templates-BLAaodcN.mjs";
import { n as listMyInvitations } from "./invitations-F3zlG6S1.mjs";
import { n as useCurrentUserState } from "./use-current-user-Bv49uA59.mjs";
import { r as RedirectToSignIn } from "./navbar-IXaCQXmB.mjs";
import { t as PageShell } from "./page-shell-COm7Q6Yf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mening-taklifnomalarim-BRPWynr3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Skeleton({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-xl bg-burgundy/10", className),
		"aria-hidden": true
	});
}
function Mine() {
	const { user, isPending } = useCurrentUserState();
	const [rows, setRows] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		listMyInvitations().then(setRows).catch(() => setRows([]));
	}, [user]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-6 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-64" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-6 h-32 w-full" })]
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-6 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl",
			children: "Mening taklifnomalarim"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 space-y-4",
			children: rows === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 w-full" }) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[28px] bg-cream p-10 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: "Hali taklifnoma yo'q"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/templates",
						children: "Yaratish"
					})
				})]
			}) : rows.map((r) => {
				const t = getTemplate(r.templateId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex items-center gap-4 rounded-[24px] bg-cream p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: t?.previewImage ?? "/images/hero/roses.jpg",
							alt: "",
							className: "size-20 rounded-2xl object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl",
								children: r.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm text-muted",
								children: ["/invitation/", r.slug]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/invitation/$id",
								params: { id: r.slug },
								children: "Ochish"
							})
						})
					]
				}, r.id);
			})
		})]
	}) });
}
//#endregion
export { Mine as component };
