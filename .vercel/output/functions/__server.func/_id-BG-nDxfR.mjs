import { o as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { s as require_jsx_runtime } from "./_libs/@react-three/fiber+[...].mjs";
import { t as Button } from "./_ssr/button-CvoGUxaL.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { l as getTemplate } from "./_ssr/templates-BbIr5AV_.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { d as submitRsvp, i as Route$4 } from "./_ssr/router-BgGKuGxY.mjs";
import { a as asString, c as playMusic, i as asBool, t as InvitationRenderer, u as stopMusic } from "./_ssr/renderer-Mtzyrdmu.mjs";
import { n as Label, r as Textarea, t as Input } from "./_ssr/input-DIpVotSN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-BG-nDxfR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RsvpForm({ invitationId }) {
	const [name, setName] = (0, import_react.useState)("");
	const [attending, setAttending] = (0, import_react.useState)(true);
	const [count, setCount] = (0, import_react.useState)(1);
	const [message, setMessage] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-2xl bg-ivory/80 px-5 py-6 text-center font-display text-xl text-ink",
		children: "Rahmat, javobingiz qabul qilindi."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4 rounded-[24px] bg-ivory/90 p-6 text-ink",
		onSubmit: async (e) => {
			e.preventDefault();
			setBusy(true);
			try {
				await submitRsvp({ data: {
					invitationId,
					guestName: name,
					attending,
					guestsCount: count,
					message
				} });
				setDone(true);
			} catch (err) {
				toast.error(err instanceof Error ? err.message : "Yuborib bo'lmadi");
			} finally {
				setBusy(false);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl",
				children: "Ishtirok"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "guest",
				children: "Ismingiz"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "guest",
				value: name,
				onChange: (e) => setName(e.target.value),
				required: true,
				className: "mt-1"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: attending ? "gold" : "line",
					className: "flex-1",
					onClick: () => setAttending(true),
					children: "Boraman"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: !attending ? "gold" : "line",
					className: "flex-1",
					onClick: () => setAttending(false),
					children: "Bora olmayman"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "count",
				children: "Mehmonlar soni"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "count",
				type: "number",
				min: 1,
				max: 20,
				value: count,
				onChange: (e) => setCount(Number(e.target.value)),
				className: "mt-1"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "note",
				children: "Izoh"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				id: "note",
				value: message,
				onChange: (e) => setMessage(e.target.value),
				className: "mt-1"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full",
				disabled: busy,
				children: busy ? "Yuborilmoqda…" : "Yuborish"
			})
		]
	});
}
function InvitationPage() {
	const { row } = Route$4.useLoaderData();
	const template = row ? getTemplate(row.templateId) : void 0;
	(0, import_react.useEffect)(() => {
		if (!row) return;
		playMusic(asString(row.data.music));
		return () => stopMusic();
	}, [row]);
	if (!row || !template) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative grid min-h-screen place-items-center overflow-hidden bg-ivory px-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/images/hero/silk-ivory.jpg",
			alt: "",
			className: "absolute inset-0 size-full object-cover opacity-70"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative max-w-md rounded-[28px] bg-ivory/90 p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl",
					children: "Taklifnoma topilmadi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Havola eskirgan yoki noto'g'ri bo'lishi mumkin."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Bosh sahifa"
					})
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvitationRenderer, {
				template,
				data: row.data
			}), asBool(row.data.rsvpEnabled) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RsvpForm, { invitationId: row.id })
			}) : null]
		})
	});
}
//#endregion
export { InvitationPage as component };
