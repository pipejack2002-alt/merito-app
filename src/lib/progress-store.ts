import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TrackId } from "@/data/types";

export interface AnswerRecord {
  choice: string;
  correct: boolean;
  at: number;
}

export interface SimulacroRecord {
  id: string;
  at: number;
  funcional: number;
  comportamental: number;
  integridad: number;
  total: number;
  passed: boolean;
}

interface ProgressState {
  answers: Record<string, AnswerRecord>;
  readModules: Record<string, number>;
  bookmarks: string[];
  simulacros: SimulacroRecord[];
  /** Apuntes personales por lección. */
  lessonNotes: Record<string, string>;
  /** Artículos de la biblioteca normativa guardados por el usuario. */
  savedArticles: string[];
  /** Última lección abierta, para «Continuar donde quedaste». */
  lastLesson: string | null;
  recordAnswer: (id: string, choice: string, correct: boolean) => void;
  markRead: (moduleId: string) => void;
  unmarkRead: (moduleId: string) => void;
  toggleRead: (moduleId: string) => void;
  unmarkMany: (moduleIds: string[]) => void;
  setNote: (moduleId: string, text: string) => void;
  toggleSavedArticle: (articleId: string) => void;
  setLastLesson: (moduleId: string) => void;
  toggleBookmark: (id: string) => void;
  addSimulacro: (row: Omit<SimulacroRecord, "id" | "at">) => void;
  reset: () => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      answers: {},
      readModules: {},
      bookmarks: [],
      simulacros: [],
      lessonNotes: {},
      savedArticles: [],
      lastLesson: null,
      recordAnswer: (id, choice, correct) =>
        set({
          answers: {
            ...get().answers,
            [id]: { choice, correct, at: Date.now() },
          },
        }),
      markRead: (moduleId) =>
        set({
          readModules: { ...get().readModules, [moduleId]: Date.now() },
        }),
      unmarkRead: (moduleId) => {
        const next = { ...get().readModules };
        delete next[moduleId];
        set({ readModules: next });
      },
      toggleRead: (moduleId) => {
        if (get().readModules[moduleId]) get().unmarkRead(moduleId);
        else get().markRead(moduleId);
      },
      unmarkMany: (moduleIds) => {
        const next = { ...get().readModules };
        for (const id of moduleIds) delete next[id];
        set({ readModules: next });
      },
      setNote: (moduleId, text) => {
        const next = { ...get().lessonNotes };
        if (text.trim()) next[moduleId] = text;
        else delete next[moduleId];
        set({ lessonNotes: next });
      },
      toggleSavedArticle: (articleId) => {
        const has = get().savedArticles.includes(articleId);
        set({
          savedArticles: has
            ? get().savedArticles.filter((a) => a !== articleId)
            : [...get().savedArticles, articleId],
        });
      },
      setLastLesson: (moduleId) => set({ lastLesson: moduleId }),
      toggleBookmark: (id) => {
        const has = get().bookmarks.includes(id);
        set({
          bookmarks: has ? get().bookmarks.filter((b) => b !== id) : [...get().bookmarks, id],
        });
      },
      addSimulacro: (row) =>
        set({
          simulacros: [
            {
              ...row,
              id: `sim-${Date.now()}`,
              at: Date.now(),
            },
            ...get().simulacros,
          ].slice(0, 12),
        }),
      reset: () =>
        set({
          answers: {},
          readModules: {},
          bookmarks: [],
          simulacros: [],
          lessonNotes: {},
          savedArticles: [],
          lastLesson: null,
        }),
    }),
    { name: "cuaderno-2676-progress", skipHydration: true },
  ),
);

export function trackAccuracy(answers: Record<string, AnswerRecord>, ids: string[]) {
  const subset = ids.filter((id) => answers[id]);
  if (subset.length === 0) return { answered: 0, correct: 0, pct: 0 };
  const correct = subset.filter((id) => answers[id].correct).length;
  return {
    answered: subset.length,
    correct,
    pct: Math.round((correct / subset.length) * 100),
  };
}

export function examCountdown() {
  const target = Date.UTC(2026, 10, 1, 13, 0, 0);
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  return { days, targetLabel: "noviembre 2026" };
}

export const TRACK_ORDER: TrackId[] = ["funcional", "comportamental", "integridad"];
