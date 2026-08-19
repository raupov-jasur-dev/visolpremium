import { c as getTemplate } from "./templates-BLAaodcN.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/draft-DwFVDMSP.js
var STORAGE_KEY = "visolpremium.draft";
function persist(state) {
	try {
		sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch {}
}
function readPersistedDraft() {
	if (typeof window === "undefined") return null;
	try {
		const raw = sessionStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
var useDraft = create((set, get) => ({
	templateId: "guldasta",
	values: { ...getTemplate("guldasta")?.demo ?? {} },
	savedId: null,
	savedSlug: null,
	setTemplate: (templateId) => {
		const next = {
			templateId,
			values: { ...getTemplate(templateId)?.demo ?? {} },
			savedId: null,
			savedSlug: null
		};
		set(next);
		persist(next);
	},
	setField: (key, value) => {
		const next = {
			templateId: get().templateId,
			values: {
				...get().values,
				[key]: value
			},
			savedId: get().savedId,
			savedSlug: get().savedSlug
		};
		set({ values: next.values });
		persist(next);
	},
	setValues: (values) => {
		const next = {
			templateId: get().templateId,
			values,
			savedId: get().savedId,
			savedSlug: get().savedSlug
		};
		set({ values });
		persist(next);
	},
	setSaved: (id, slug) => {
		const next = {
			templateId: get().templateId,
			values: get().values,
			savedId: id,
			savedSlug: slug
		};
		set({
			savedId: id,
			savedSlug: slug
		});
		persist(next);
	},
	hydrate: (templateId, existing) => {
		const t = getTemplate(templateId);
		const persisted = readPersistedDraft();
		const next = {
			templateId,
			values: existing ?? (persisted && persisted.templateId === templateId ? persisted.values : { ...t?.demo ?? {} }),
			savedId: persisted?.templateId === templateId ? persisted.savedId : null,
			savedSlug: persisted?.templateId === templateId ? persisted.savedSlug : null
		};
		set(next);
		persist(next);
	}
}));
//#endregion
export { useDraft as t };
