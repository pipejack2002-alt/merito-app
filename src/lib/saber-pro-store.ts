import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SABER_PRO_CAREERS, type SaberProCareer } from "@/data/saber-pro-data";

export interface SaberProExamResult {
  score: number; // 0 - 300 scale
  rawCorrect: number;
  totalQuestions: number;
  percent: number;
  date: string;
  careerId: string;
  careerName: string;
  areaBreakdown: Record<string, { correct: number; total: number; label: string }>;
}

interface SaberProState {
  selectedCareerId: string;
  selectCareer: (id: string) => void;
  userAnswers: Record<string, string>; // questionId -> selectedChoiceId
  setUserAnswer: (questionId: string, choiceId: string) => void;
  resetUserAnswers: () => void;
  examHistory: SaberProExamResult[];
  saveExamResult: (result: Omit<SaberProExamResult, "date">) => void;
}

export const useSaberProStore = create<SaberProState>()(
  persist(
    (set) => ({
      selectedCareerId: "contaduria",
      selectCareer: (id) => set({ selectedCareerId: id }),
      userAnswers: {},
      setUserAnswer: (questionId, choiceId) =>
        set((state) => ({
          userAnswers: { ...state.userAnswers, [questionId]: choiceId },
        })),
      resetUserAnswers: () => set({ userAnswers: {} }),
      examHistory: [],
      saveExamResult: (result) =>
        set((state) => ({
          examHistory: [
            { ...result, date: new Date().toISOString() },
            ...state.examHistory,
          ].slice(0, 10),
        })),
    }),
    { name: "merito-saber-pro-store", skipHydration: true },
  ),
);

export function getSelectedCareer(id: string): SaberProCareer {
  return SABER_PRO_CAREERS.find((c) => c.id === id) ?? SABER_PRO_CAREERS[0];
}
