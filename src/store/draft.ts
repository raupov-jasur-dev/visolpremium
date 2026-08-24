import { create } from "zustand";
import type { InvitationData, InvitationValue } from "@/lib/types";
import { getTemplate } from "@/lib/templates";

const STORAGE_KEY = "visolpremium.draft";

export type DraftState = {
  templateId: string;
  values: InvitationData;
  savedId: string | null;
  savedSlug: string | null;
  setTemplate: (templateId: string) => void;
  setField: (key: string, value: InvitationValue) => void;
  setValues: (values: InvitationData) => void;
  setSaved: (id: string, slug: string) => void;
  hydrate: (templateId: string, existing?: InvitationData) => void;
};

function persist(state: { templateId: string; values: InvitationData; savedId: string | null; savedSlug: string | null }) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota */
  }
}

export function readPersistedDraft(): {
  templateId: string;
  values: InvitationData;
  savedId: string | null;
  savedSlug: string | null;
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as {
      templateId: string;
      values: InvitationData;
      savedId: string | null;
      savedSlug: string | null;
    };
  } catch {
    return null;
  }
}

export const useDraft = create<DraftState>((set, get) => ({
  templateId: "guldasta",
  values: { ...(getTemplate("guldasta")?.demo ?? {}) },
  savedId: null,
  savedSlug: null,
  setTemplate: (templateId) => {
    const t = getTemplate(templateId);
    const next = {
      templateId,
      values: { ...(t?.demo ?? {}) },
      savedId: null,
      savedSlug: null,
    };
    set(next);
    persist(next);
  },
  setField: (key, value) => {
    const next = {
      templateId: get().templateId,
      values: { ...get().values, [key]: value },
      savedId: get().savedId,
      savedSlug: get().savedSlug,
    };
    set({ values: next.values });
    persist(next);
  },
  setValues: (values) => {
    const next = {
      templateId: get().templateId,
      values,
      savedId: get().savedId,
      savedSlug: get().savedSlug,
    };
    set({ values });
    persist(next);
  },
  setSaved: (id, slug) => {
    const next = {
      templateId: get().templateId,
      values: get().values,
      savedId: id,
      savedSlug: slug,
    };
    set({ savedId: id, savedSlug: slug });
    persist(next);
  },
  hydrate: (templateId, existing) => {
    const t = getTemplate(templateId);
    const persisted = readPersistedDraft();
    const values =
      existing ??
      (persisted && persisted.templateId === templateId ? persisted.values : { ...(t?.demo ?? {}) });
    const next = {
      templateId,
      values,
      savedId: persisted?.templateId === templateId ? persisted.savedId : null,
      savedSlug: persisted?.templateId === templateId ? persisted.savedSlug : null,
    };
    set(next);
    persist(next);
  },
}));
