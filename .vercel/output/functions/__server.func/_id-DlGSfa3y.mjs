import { o as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { s as require_jsx_runtime } from "./_libs/@react-three/fiber+[...].mjs";
import { t as Button } from "./_ssr/button-CvoGUxaL.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { l as getTemplate } from "./_ssr/templates-BbIr5AV_.mjs";
import { c as getInvitationPublic, r as Route$3 } from "./_ssr/router-BgGKuGxY.mjs";
import { a as asString, c as playMusic, t as InvitationRenderer, u as stopMusic } from "./_ssr/renderer-Mtzyrdmu.mjs";
import { t as useDraft } from "./_ssr/draft-DIgdz9gA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-DlGSfa3y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PreviewPage() {
	const { id } = Route$3.useParams();
	const draft = useDraft();
	const [remote, setRemote] = (0, import_react.useState)(null);
	const [missing, setMissing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (id === "draft") return;
		let alive = true;
		getInvitationPublic({ data: id }).then((row) => {
			if (!alive) return;
			if (!row) setMissing(true);
			else setRemote({
				templateId: row.templateId,
				data: row.data
			});
		});
		return () => {
			alive = false;
		};
	}, [id]);
	const templateId = id === "draft" ? draft.templateId : remote?.templateId;
	const data = id === "draft" ? draft.values : remote?.data;
	const template = templateId ? getTemplate(templateId) : void 0;
	(0, import_react.useEffect)(() => {
		if (!data) return;
		playMusic(asString(data.music));
		return () => stopMusic();
	}, [data]);
	if (id !== "draft" && !remote && !missing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-ink text-champagne",
		children: "Yuklanmoqda…"
	});
	if (!template || !data || missing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-ivory px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl",
			children: "Ko'rish topilmadi"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/templates",
				children: "Dizaynlar"
			})
		})] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvitationRenderer, {
				template,
				data
			})
		})
	});
}
//#endregion
export { PreviewPage as component };
