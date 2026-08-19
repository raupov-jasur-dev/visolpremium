import { s as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { n as Navbar, t as Footer } from "./navbar-jR3SZLhB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-shell-B68uMWf-.js
var import_jsx_runtime = require_jsx_runtime();
function PageShell({ children, overlayNav = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-ivory text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, { variant: overlayNav ? "overlay" : "solid" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: overlayNav ? "" : "pt-24",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { PageShell as t };
