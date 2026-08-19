import "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { n as cn } from "./button-CvoGUxaL.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-12 w-full rounded-xl bg-ivory/80 px-4 text-base text-ink shadow-[0_0_0_1px_rgba(184,149,106,0.28)] placeholder:text-muted outline-none focus-visible:shadow-[0_0_0_2px_rgba(184,149,106,0.55)]", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-28 w-full rounded-xl bg-ivory/80 px-4 py-3 text-base text-ink shadow-[0_0_0_1px_rgba(184,149,106,0.28)] placeholder:text-muted outline-none focus-visible:shadow-[0_0_0_2px_rgba(184,149,106,0.55)]", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-sm font-medium tracking-wide text-ink/80", className),
		...props
	});
}
//#endregion
export { Label as n, Textarea as r, Input as t };
