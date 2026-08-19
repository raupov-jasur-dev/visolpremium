import { o as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { s as require_jsx_runtime } from "./_libs/@react-three/fiber+[...].mjs";
import { n as cn, t as Button } from "./_ssr/button-CvoGUxaL.mjs";
import { b as useNavigate, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as getTemplate } from "./_ssr/templates-BLAaodcN.mjs";
import { r as saveInvitation } from "./_ssr/invitations-F3zlG6S1.mjs";
import { S as Check, a as Upload, h as Music2, p as Pencil, t as X, x as Eye } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { o as Route$6 } from "./_ssr/router-CVdbLN9V.mjs";
import { n as useCurrentUserState } from "./_ssr/use-current-user-Bv49uA59.mjs";
import { a as asString, c as playMusic, i as asBool, l as readAudio, n as MUSIC_TRACKS, o as asStringList, s as compressImage, t as InvitationRenderer, u as stopMusic } from "./_ssr/renderer-CTmHW4pb.mjs";
import { n as Label, r as Textarea, t as Input } from "./_ssr/input-DIpVotSN.mjs";
import { t as useDraft } from "./_ssr/draft-DwFVDMSP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_templateId-CfTt4eRB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FieldInput({ field, value, onChange }) {
	const [err, setErr] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
				htmlFor: field.key,
				children: [field.label, field.required ? " *" : ""]
			}),
			render(),
			field.help ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: field.help
			}) : null,
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-burgundy",
				children: err
			}) : null
		]
	});
	function render() {
		switch (field.type) {
			case "textarea": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				id: field.key,
				value: asString(value),
				placeholder: field.placeholder,
				onChange: (e) => onChange(e.target.value)
			});
			case "date":
			case "time":
			case "number":
			case "phone":
			case "url":
			case "map":
			case "text": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: field.key,
				type: field.type === "number" ? "number" : field.type === "date" ? "date" : field.type === "time" ? "time" : field.type === "url" || field.type === "map" ? "url" : field.type === "phone" ? "tel" : "text",
				value: asString(value),
				placeholder: field.placeholder,
				onChange: (e) => onChange(e.target.value)
			});
			case "boolean": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "switch",
				"aria-checked": asBool(value),
				id: field.key,
				onClick: () => onChange(!asBool(value)),
				className: cn("flex h-12 w-full items-center justify-between rounded-xl px-4 text-sm shadow-[0_0_0_1px_rgba(184,149,106,0.28)]", asBool(value) ? "bg-burgundy text-ivory" : "bg-ivory text-ink"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: asBool(value) ? "Yoqilgan" : "O'chiq" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("h-5 w-9 rounded-full p-0.5", asBool(value) ? "bg-gold" : "bg-muted/40"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block size-4 rounded-full bg-ivory transition-transform duration-200", asBool(value) ? "translate-x-4" : "translate-x-0") })
				})]
			});
			case "select": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				id: field.key,
				className: "h-12 w-full rounded-xl bg-ivory px-3 shadow-[0_0_0_1px_rgba(184,149,106,0.28)]",
				value: asString(value),
				onChange: (e) => onChange(e.target.value),
				children: (field.options ?? []).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: o.value,
					children: o.label
				}, o.value))
			});
			case "music": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2",
						children: MUSIC_TRACKS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onChange(t.id),
							className: cn("flex h-11 items-center gap-2 rounded-xl px-3 text-sm", asString(value) === t.id ? "bg-burgundy text-ivory" : "bg-ivory shadow-[0_0_0_1px_rgba(184,149,106,0.28)]"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, { className: "size-4" }), t.title]
						}, t.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-cream text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }),
							"O'z musiqangizni yuklang",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "audio/*",
								className: "sr-only",
								onChange: async (e) => {
									const file = e.target.files?.[0];
									if (!file) return;
									setBusy(true);
									setErr(null);
									try {
										onChange(await readAudio(file));
									} catch (ex) {
										setErr(ex instanceof Error ? ex.message : "Musiqa yuklanmadi.");
									} finally {
										setBusy(false);
									}
								}
							})
						]
					}),
					busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Yuklanmoqda…"
					}) : null
				]
			});
			case "image": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl bg-cream text-sm",
				children: [asString(value) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: asString(value),
					alt: "",
					className: "max-h-40 rounded-lg object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-5" }), "Rasm yuklash"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					accept: "image/*",
					className: "sr-only",
					onChange: async (e) => {
						const file = e.target.files?.[0];
						if (!file) return;
						setBusy(true);
						setErr(null);
						try {
							onChange(await compressImage(file));
						} catch (ex) {
							setErr(ex instanceof Error ? ex.message : "Rasm yuklanmadi.");
						} finally {
							setBusy(false);
						}
					}
				})]
			});
			case "images": {
				const list = asStringList(value);
				const max = field.max ?? 8;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-2",
						children: [list.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "relative overflow-hidden rounded-lg",
							onClick: () => onChange(list.filter((_, j) => j !== i)),
							"aria-label": "Rasmni olib tashlash",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src,
								alt: "",
								className: "aspect-square w-full object-cover"
							})
						}, src + i)), list.length < max && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid aspect-square cursor-pointer place-items-center rounded-lg bg-cream",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/*",
								className: "sr-only",
								onChange: async (e) => {
									const file = e.target.files?.[0];
									if (!file) return;
									setBusy(true);
									setErr(null);
									try {
										const url = await compressImage(file);
										onChange([...list, url]);
									} catch (ex) {
										setErr(ex instanceof Error ? ex.message : "Rasm yuklanmadi.");
									} finally {
										setBusy(false);
									}
								}
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							"Rasmni bosib olib tashlaysiz. Maksimal ",
							max,
							" ta."
						]
					})]
				});
			}
			case "video": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Videolik shablonlarda kadrlar (rasmlar) ketma-ketligi ishlatiladi. Yuqoridagi «Kadrlar» maydoniga yuklang."
			});
			default: return null;
		}
	}
}
/** Yon panel — taklifnoma preview orqada ko'rinib turadi. */
function EditModal({ open, onOpenChange, template }) {
	const values = useDraft((s) => s.values);
	const setField = useDraft((s) => s.setField);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "fixed inset-x-0 bottom-0 z-40 flex max-h-[72vh] flex-col rounded-t-[28px] bg-ivory text-ink shadow-[0_-20px_60px_-20px_rgba(20,8,10,0.45)] md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[min(420px,46vw)] md:rounded-none md:rounded-l-[28px]",
		role: "dialog",
		"aria-labelledby": "edit-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-gold/25 px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "edit-title",
				className: "font-display text-2xl",
				children: "Tahrirlash"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Yozganingiz zahoti preview yangilanadi."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "grid size-11 place-items-center rounded-full hover:bg-burgundy/10",
				onClick: () => onOpenChange(false),
				"aria-label": "Yopish",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
			className: "space-y-5 overflow-y-auto px-5 py-5",
			onSubmit: (e) => e.preventDefault(),
			children: template.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
				field,
				value: values[field.key],
				onChange: (v) => setField(field.key, v)
			}, field.key))
		})]
	});
}
function EditorShell({ templateId }) {
	const template = getTemplate(templateId);
	const hydrate = useDraft((s) => s.hydrate);
	const values = useDraft((s) => s.values);
	const savedId = useDraft((s) => s.savedId);
	const setSaved = useDraft((s) => s.setSaved);
	const { user, isPending } = useCurrentUserState();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		hydrate(templateId);
	}, [hydrate, templateId]);
	(0, import_react.useEffect)(() => {
		playMusic(asString(values.music));
		return () => stopMusic();
	}, [values.music]);
	const missing = (0, import_react.useMemo)(() => {
		if (!template) return [];
		return template.fields.filter((f) => f.required).filter((f) => {
			const v = values[f.key];
			if (Array.isArray(v)) return v.length === 0;
			if (typeof v === "boolean") return false;
			return !String(v ?? "").trim();
		}).map((f) => f.label);
	}, [template, values]);
	if (!template) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-ivory px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl",
			children: "Shablon topilmadi"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/templates",
				children: "Katalogga qaytish"
			})
		})] })
	});
	async function onPublish() {
		if (missing.length) {
			toast.error(`To'ldiring: ${missing.join(", ")}`);
			setOpen(true);
			return;
		}
		if (isPending) return;
		if (!user) {
			toast.message("Saqlash uchun kiring");
			navigate({
				to: "/login",
				search: { next: `/create/${templateId}` }
			});
			return;
		}
		setSaving(true);
		try {
			const saved = await saveInvitation({ data: {
				id: savedId ?? void 0,
				templateId,
				data: values
			} });
			setSaved(saved.id, saved.slug);
			toast.success("Taklifnoma tayyor");
			navigate({
				to: "/invitation/$id",
				params: { id: saved.slug }
			});
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Saqlab bo'lmadi";
			if (msg === "Unauthorized") {
				toast.message("Saqlash uchun kiring");
				navigate({
					to: "/login",
					search: { next: `/create/${templateId}` }
				});
			} else toast.error(msg);
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-ink",
		style: {
			backgroundImage: `linear-gradient(180deg, rgba(20,10,12,0.35), rgba(20,10,12,0.55)), url(${template.background})`,
			backgroundSize: "cover",
			backgroundPosition: "center"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between px-4 py-4 text-ivory md:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm tracking-wide text-champagne hover:text-ivory",
					children: "← Bosh sahifa"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg",
					children: template.title
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: open ? "md:pr-[min(420px,46vw)] transition-[padding] duration-300" : "transition-[padding] duration-300",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex justify-center px-4 pb-36",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-[min(420px,100%)] overflow-hidden rounded-[24px] shadow-[0_40px_90px_-24px_rgba(0,0,0,0.55)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-[78vh] overflow-y-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvitationRenderer, {
								template,
								data: values
							})
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-30 flex justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full max-w-xl gap-2 rounded-full bg-ivory/95 p-2 shadow-[0_16px_50px_-16px_rgba(20,8,10,0.5)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "flex-1",
							variant: "line",
							onClick: () => setOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "Tahrirlash"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "flex-1 bg-cream text-ink",
							variant: "ivory",
							onClick: () => navigate({
								to: "/preview/$id",
								params: { id: savedId ?? "draft" }
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), "Ko'rish"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "flex-1",
							onClick: () => void onPublish(),
							disabled: saving,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), saving ? "Saqlanmoqda…" : "Tayyorlash"]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditModal, {
				open,
				onOpenChange: setOpen,
				template
			})
		]
	});
}
function CreatePage() {
	const { templateId } = Route$6.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorShell, { templateId });
}
//#endregion
export { CreatePage as component };
