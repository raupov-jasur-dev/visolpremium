import "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
/** Tailwind classlarni xavfsiz birlashtirish. */
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:pointer-events-none disabled:opacity-50 transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			gold: "bg-burgundy text-ivory shadow-[0_1px_0_rgba(255,248,240,0.18)_inset,0_10px_30px_-12px_rgba(107,45,60,0.55)] hover:bg-burgundy-deep gold-sweep",
			ivory: "bg-ivory text-ink shadow-[0_0_0_1px_rgba(184,149,106,0.35),0_8px_24px_-12px_rgba(44,31,26,0.35)] hover:bg-cream",
			ghost: "bg-transparent text-ivory hover:bg-ivory/10",
			line: "bg-transparent text-ink shadow-[0_0_0_1px_rgba(184,149,106,0.45)] hover:bg-gold/10"
		},
		size: {
			sm: "h-10 px-4 text-sm rounded-full",
			md: "h-12 px-6 text-sm rounded-full",
			lg: "h-14 px-8 text-base rounded-full",
			icon: "size-11 rounded-full"
		}
	},
	defaultVariants: {
		variant: "gold",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
export { cn as n, Button as t };
