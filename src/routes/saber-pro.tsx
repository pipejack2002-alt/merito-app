import { useState, useMemo, useEffect, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Copy,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  HelpCircle,
  Info,
  Languages,
  Layers,
  Play,
  RotateCcw,
  Search,
  Shield,
  ShieldAlert,
  Sparkles,
  Volume2,
  VolumeX,
  XCircle,
  Zap,
} from "lucide-react";
import {
  SABER_PRO_CAREERS,
  GENERIC_AREAS,
  SABER_PRO_QUESTIONS,
  SABER_PRO_CHEATSHEET,
  type SaberProQuestion,
} from "@/data/saber-pro-data";
import {
  SABER_PRO_GLOSSARY,
  getTermsForQuestion,
  type GlossaryTerm,
} from "@/data/saber-pro-glossary";
import { useSaberProStore, getSelectedCareer } from "@/lib/saber-pro-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export type SaberProTab =
  | "resumen"
  | "practica"
  | "simulacro"
  | "chuleta"
  | "estructura"
  | "diagnostico"
  | "glosario";

export interface SaberProSearch {
  tab?: SaberProTab;
}

export const Route = createFileRoute("/saber-pro")({
  validateSearch: (s: Record<string, unknown>): SaberProSearch => {
    const validTabs: SaberProTab[] = [
      "resumen",
      "practica",
      "simulacro",
      "chuleta",
      "estructura",
      "diagnostico",
      "glosario",
    ];
    const tab =
      typeof s.tab === "string" && validTabs.includes(s.tab as SaberProTab)
        ? (s.tab as SaberProTab)
        : undefined;
    return { tab };
  },
  component: SaberProPage,
});

export function SaberProPage() {
  const { tab: searchTab } = Route.useSearch();
  const activeTab: SaberProTab = searchTab || "resumen";
  const navigate = Route.useNavigate();

  const selectedCareerId = useSaberProStore((s) => s.selectedCareerId);
  const selectCareer = useSaberProStore((s) => s.selectCareer);

  const [trainerJumpIndex, setTrainerJumpIndex] = useState<number | null>(null);

  // Countdown to Saber Pro: 18 de Octubre de 2026
  const targetDate = useMemo(() => new Date(2026, 9, 18, 7, 0, 0), []);
  const [daysRemaining, setDaysRemaining] = useState<number>(4);

  useEffect(() => {
    const now = new Date();
    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(Math.max(0, diffDays));
  }, [targetDate]);

  const selectedCareer = useMemo(() => getSelectedCareer(selectedCareerId), [selectedCareerId]);

  const setActiveTab = (newTab: SaberProTab) => {
    void navigate({ search: { tab: newTab } });
  };

  const handleReviewInTrainer = (questionId: string) => {
    const qIndex = SABER_PRO_QUESTIONS.findIndex((q) => q.id === questionId);
    if (qIndex >= 0) {
      setTrainerJumpIndex(qIndex);
      setActiveTab("practica");
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* ── Banner Superior de Cabecera Oficial ── */}
      <section className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-surface p-6 sm:p-8 shadow-xs">
        <div className="absolute inset-y-0 left-0 w-2 bg-emerald-600" />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-emerald-600 text-white font-bold tracking-wider text-[11px] uppercase px-2.5 py-0.5 shadow-2xs font-mono">
                Módulo Oficial · ICFES Saber Pro 2026
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-bad/30 bg-bad/10 px-2.5 py-0.5 text-xs font-bold text-bad">
                <Calendar className="size-3.5" />
                Examen: Domingo 18 de Octubre ({daysRemaining} {daysRemaining === 1 ? "día" : "días"})
              </span>
              <span className="text-xs text-muted">Sesión 1 Genéricas + Sesión 2 Específicas</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink">
              Entrenador Intensivo Saber Pro 2026
            </h1>

            <p className="text-sm leading-relaxed text-muted">
              Plataforma complementaria para aspirantes y profesionales. Domina las competencias
              genéricas obligatorias del Estado (Lectura Crítica, Razonamiento Cuantitativo,
              Ciudadanas e Inglés) y las pruebas específicas de tu carrera, con especial énfasis en{" "}
              <strong className="text-ink">
                Contaduría Pública (Gestión Financiera y Aseguramiento NIAs)
              </strong>
              .
            </p>

            {/* Selector de Carrera Profesional */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-muted flex items-center gap-1">
                <GraduationCap className="size-4 text-emerald-600" />
                Tu Carrera:
              </span>
              {SABER_PRO_CAREERS.map((career) => (
                <button
                  key={career.id}
                  type="button"
                  onClick={() => selectCareer(career.id)}
                  className={cn(
                    "rounded-xl border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer",
                    selectedCareerId === career.id
                      ? "border-emerald-600 bg-emerald-600 text-white shadow-xs font-semibold"
                      : "border-border/80 bg-paper/60 text-muted hover:border-emerald-500/60 hover:text-ink",
                  )}
                >
                  {career.name}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 sm:p-5 flex flex-col gap-3 shrink-0 lg:max-w-xs w-full">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-mono">
                Sprint 4 Días
              </span>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-black text-emerald-900 dark:text-emerald-200">
                ICFES 0-300 pts
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-ink flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-emerald-600" />
                Objetivo Nivel 4 (Avanzado)
              </p>
              <p className="text-[11px] text-muted leading-relaxed">
                Prioriza las 4 fórmulas de Gestión Financiera y los 3 criterios de dictamen NIA
                700/705 que más puntúan.
              </p>
            </div>
            <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-xs">
              <span className="text-muted">Carrera activa:</span>
              <span className="font-semibold text-ink truncate max-w-36">
                {selectedCareer.name}
              </span>
            </div>
          </div>
        </div>

        {/* ── Tabs de Navegación del Módulo (Sincronizados con la Ruta) ── */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <Button
            variant={activeTab === "resumen" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("resumen")}
            className={cn(
              "gap-2 cursor-pointer",
              activeTab === "resumen" && "bg-emerald-600 hover:bg-emerald-700 text-white font-bold",
            )}
          >
            <Award className="size-4" />
            Panel Principal
          </Button>

          <Button
            variant={activeTab === "practica" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("practica")}
            className={cn(
              "gap-2 cursor-pointer",
              activeTab === "practica" && "bg-emerald-600 hover:bg-emerald-700 text-white font-bold",
            )}
          >
            <BookOpen className="size-4" />
            Paso 1 · Entrenador de Preguntas
          </Button>

          <Button
            variant={activeTab === "simulacro" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("simulacro")}
            className={cn(
              "gap-2 cursor-pointer",
              activeTab === "simulacro" && "bg-emerald-600 hover:bg-emerald-700 text-white font-bold",
            )}
          >
            <Clock className="size-4" />
            Paso 2 · Simulador Cronometrado (0-300)
          </Button>

          <Button
            variant={activeTab === "chuleta" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("chuleta")}
            className={cn(
              "gap-2 cursor-pointer",
              activeTab === "chuleta" && "bg-emerald-600 hover:bg-emerald-700 text-white font-bold",
            )}
          >
            <Zap className="size-4 text-emerald-600" />
            Paso 3 · Chuleta de Fórmulas
          </Button>

          <Button
            variant={activeTab === "estructura" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("estructura")}
            className={cn(
              "gap-2 cursor-pointer",
              activeTab === "estructura" && "bg-emerald-600 hover:bg-emerald-700 text-white font-bold",
            )}
          >
            <Layers className="size-4" />
            Paso 4 · Estructura ICFES
          </Button>

          <Button
            variant={activeTab === "diagnostico" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("diagnostico")}
            className={cn(
              "gap-2 cursor-pointer",
              activeTab === "diagnostico" && "bg-emerald-600 hover:bg-emerald-700 text-white font-bold",
            )}
          >
            <Shield className="size-4" />
            Paso 5 · Diagnóstico y Fallos
          </Button>

          <Button
            variant={activeTab === "glosario" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("glosario")}
            className={cn(
              "gap-2 cursor-pointer",
              activeTab === "glosario" && "bg-emerald-600 hover:bg-emerald-700 text-white font-bold",
            )}
          >
            <Languages className="size-4" />
            Paso 6 · Traductor de Jerga ICFES
          </Button>
        </div>
      </section>

      {/* ── Contenido Según Tab Activo ── */}
      {activeTab === "resumen" && (
        <SaberProOverviewTab
          selectedCareer={selectedCareer}
          daysRemaining={daysRemaining}
          onNavigateTab={setActiveTab}
        />
      )}

      {activeTab === "practica" && (
        <SaberProTrainerTab
          careerId={selectedCareerId}
          careerName={selectedCareer.name}
          initialQuestionIndex={trainerJumpIndex}
          onResetJumpIndex={() => setTrainerJumpIndex(null)}
          onNavigateTab={setActiveTab}
        />
      )}

      {activeTab === "simulacro" && (
        <SaberProSimulatorTab careerId={selectedCareerId} careerName={selectedCareer.name} />
      )}

      {activeTab === "chuleta" && <SaberProCheatsheetTab />}

      {activeTab === "estructura" && <SaberProStructureTab selectedCareer={selectedCareer} />}

      {activeTab === "diagnostico" && (
        <SaberProDiagnosticTab
          selectedCareer={selectedCareer}
          onReviewQuestion={handleReviewInTrainer}
          onStartSimulator={() => setActiveTab("simulacro")}
        />
      )}

      {activeTab === "glosario" && (
        <SaberProGlossaryTab onReviewQuestion={handleReviewInTrainer} />
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 0. TAB: PANEL PRINCIPAL (RESUMEN Y RUTA DE PREPARACIÓN SABER PRO)
// ────────────────────────────────────────────────────────────────────────────

function SaberProOverviewTab({
  selectedCareer,
  daysRemaining,
  onNavigateTab,
}: {
  selectedCareer: (typeof SABER_PRO_CAREERS)[0];
  daysRemaining: number;
  onNavigateTab: (tab: SaberProTab) => void;
}) {
  const userAnswers = useSaberProStore((s) => s.userAnswers);

  // Estadísticas globales de respuestas
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).filter(
    ([id, ans]) => SABER_PRO_QUESTIONS.find((q) => q.id === id)?.correct === ans,
  ).length;
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  // Puntaje estimado en escala ICFES 0 - 300
  const estimatedScore =
    answeredCount > 0 ? Math.min(300, Math.max(0, Math.round(100 + (accuracy / 100) * 190))) : 0;

  return (
    <div className="space-y-8">
      {/* ── Tarjetas Métricas Principales del Candidato ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border/80 bg-surface p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted font-mono">
              Tiempo al Examen
            </span>
            <span className="rounded bg-bad/10 px-2 py-0.5 text-[10px] font-bold text-bad font-mono">
              18 Octubre
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-ink">{daysRemaining}</span>
            <span className="text-xs text-muted">días restantes</span>
          </div>
          <p className="text-[11px] text-muted">
            Sprint intensivo de repaso antes de la citación oficial.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/40 bg-surface p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-mono">
              Puntaje Estimado
            </span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-black text-emerald-900 dark:text-emerald-200 font-mono">
              Escala 0-300
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-ink">
              {estimatedScore > 0 ? estimatedScore : "---"}
            </span>
            <span className="text-xs text-muted">/ 300 pts</span>
          </div>
          <p className="text-[11px] text-muted">
            {estimatedScore >= 180
              ? "¡Nivel 4 Avanzado! Superas la media nacional."
              : estimatedScore > 0
                ? "Nivel en progreso. Resuelve más simulacros."
                : "Responde preguntas en el entrenador para calcular."}
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-surface p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted font-mono">
              Preguntas Entrenadas
            </span>
            <span className="rounded bg-paper px-2 py-0.5 text-[10px] font-bold text-muted font-mono border border-border">
              Banco Oficial
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-ink">{answeredCount}</span>
            <span className="text-xs text-muted">/ {SABER_PRO_QUESTIONS.length} respondidas</span>
          </div>
          <Progress
            value={(answeredCount / SABER_PRO_QUESTIONS.length) * 100}
            className="h-1.5 bg-paper"
          />
        </div>

        <div className="rounded-2xl border border-border/80 bg-surface p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted font-mono">
              Precisión Técnica
            </span>
            <span className="rounded bg-ok/10 px-2 py-0.5 text-[10px] font-bold text-ok font-mono">
              {correctCount} Aciertos
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-ink">
              {answeredCount > 0 ? `${accuracy}%` : "---"}
            </span>
            <span className="text-xs text-muted">efectividad</span>
          </div>
          <p className="text-[11px] text-muted">
            {accuracy >= 70
              ? "Excelente porcentaje de aciertos en clave ICFES."
              : "Revisa el descarte de distractores y trampas."}
          </p>
        </div>
      </div>

      {/* ── Ruta de Preparación Saber Pro en 5 Pasos ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              Ruta Oficial de Preparación Saber Pro (5 Pasos)
            </h2>
            <p className="text-xs text-muted">
              Sigue la secuencia metodológica diseñada para alcanzar Nivel 4 en la prueba de Estado.
            </p>
          </div>
          <Badge className="bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/40 font-bold font-mono">
            Ruta Guiada
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Tarjeta Paso 1 */}
          <div className="rounded-2xl border border-border/80 bg-surface p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:border-emerald-500/60 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                  Paso 1 · Entrenamiento
                </span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 font-mono">
                  26 Preguntas
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-ink">
                Entrenador de Preguntas y Casos
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Preguntas tipo ICFES con retroalimentación inmediata, justificación técnica, técnica
                de resolución y descarte de trampas.
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => onNavigateTab("practica")}
              className="w-full gap-1.5 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
            >
              <span>Abrir Entrenador</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>

          {/* Tarjeta Paso 2 */}
          <div className="rounded-2xl border border-border/80 bg-surface p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:border-emerald-500/60 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                  Paso 2 · Simulación
                </span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 font-mono">
                  Escala 0-300
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-ink">
                Simulador de Examen Cronometrado
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Prueba oficial con cronómetro en tiempo real, medición de ritmo por pregunta y cálculo
                del puntaje final en la escala oficial de 0 a 300.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigateTab("simulacro")}
              className="w-full gap-1.5 cursor-pointer hover:border-emerald-600 hover:text-emerald-700"
            >
              <span>Iniciar Simulacro</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>

          {/* Tarjeta Paso 3 */}
          <div className="rounded-2xl border border-border/80 bg-surface p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:border-emerald-500/60 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                  Paso 3 · Retención Rápida
                </span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 font-mono">
                  Sprint 4 Días
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-ink">
                Chuleta de Fórmulas y Atajos
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Memoriza los ratios contables determinantes (ROA, ROE, WACC, VPN, TIR, NIA 705) y las
                reglas cuantitativas de alta frecuencia.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigateTab("chuleta")}
              className="w-full gap-1.5 cursor-pointer hover:border-emerald-600 hover:text-emerald-700"
            >
              <span>Consultar Fórmulas</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>

          {/* Tarjeta Paso 4 */}
          <div className="rounded-2xl border border-border/80 bg-surface p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:border-emerald-500/60 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                  Paso 4 · Marco Normativo
                </span>
                <span className="rounded bg-paper px-2 py-0.5 text-[10px] font-bold text-muted font-mono border border-border">
                  Guía Oficial
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-ink">
                Estructura Oficial ICFES
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Duración por sesión, número de preguntas por competencia y recomendaciones oficiales
                para la presentación del domingo 18 de octubre.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigateTab("estructura")}
              className="w-full gap-1.5 cursor-pointer hover:border-emerald-600 hover:text-emerald-700"
            >
              <span>Ver Estructura</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>

          {/* Tarjeta Paso 5 */}
          <div className="rounded-2xl border border-border/80 bg-surface p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:border-emerald-500/60 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                  Paso 5 · Métricas y Refuerzo
                </span>
                <span className="rounded bg-ok/10 px-2 py-0.5 text-[10px] font-bold text-ok font-mono">
                  Reporte
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-ink">
                Diagnóstico de Desempeño y Fallos
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Revisa exactamente las preguntas donde tuviste error, comprende la justificación
                oficial y refuerza los conceptos antes de la prueba dominical.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigateTab("diagnostico")}
              className="w-full gap-1.5 cursor-pointer hover:border-emerald-600 hover:text-emerald-700"
            >
              <Shield className="size-3.5" />
              <span>Ver Diagnóstico</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>

          {/* Tarjeta Paso 6 */}
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:border-emerald-500/80 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-mono">
                  Paso 6 · Diccionario & Traductor
                </span>
                <span className="rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white font-mono shadow-2xs">
                  Traductor
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-ink flex items-center gap-1.5">
                <Languages className="size-4 text-emerald-600" />
                <span>Traductor de Jerga ICFES</span>
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Traduce falacias en latín (ad hominem, ad misericordiam), figuras de la Constitución y
                ratios financieros a lenguaje cotidiano con enlaces a Google.
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => onNavigateTab("glosario")}
              className="w-full gap-1.5 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
            >
              <Languages className="size-3.5" />
              <span>Abrir Traductor</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* ── Módulos de la Carrera Activa ── */}
      <div className="rounded-2xl border border-border/80 bg-surface p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-5 text-emerald-600" />
            <h3 className="font-display text-base font-bold text-ink">
              Módulos Evaluados para {selectedCareer.name}
            </h3>
          </div>
          <Badge variant="outline" className="text-xs font-mono">
            {selectedCareer.faculty}
          </Badge>
        </div>
        <p className="text-xs text-muted">
          Además de las 5 competencias genéricas comunes a todas las profesiones, tu prueba específica
          incluye:
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {selectedCareer.specificModules.map((mod) => (
            <div
              key={mod.id}
              className="rounded-xl border border-border bg-paper/60 p-4 space-y-1.5 border-l-4 border-l-emerald-600"
            >
              <h4 className="font-bold text-xs text-ink">{mod.name}</h4>
              <p className="text-[11px] text-muted leading-relaxed">{mod.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// COMPONENTE PEDAGÓGICO DE RETROALIMENTACIÓN INTERACTIVA
// ────────────────────────────────────────────────────────────────────────────

function SaberProPedagogicalFeedback({
  question,
  selectedAnswer,
}: {
  question: SaberProQuestion;
  selectedAnswer?: string;
}) {
  const isCorrect = selectedAnswer === question.correct;

  const resolvedMethodTip =
    question.methodTip ||
    (question.areaId === "razonamiento-cuantitativo"
      ? "Técnica para el examen: Identifica primero la unidad final y la base de cálculo. En aumentos o descuentos sucesivos nunca sumes porcentajes: multiplica factores (+20% es ×1.20; -10% es ×0.90). En probabilidad sin reemplazo, descuenta siempre 1 unidad al numerador y al denominador en cada extracción."
      : question.areaId === "lectura-critica"
        ? "Técnica para el examen: Separa la tesis central de los argumentos accesorios. Descarta opciones con afirmaciones absolutistas ('siempre', 'jamás', 'todos') o que agreguen información ajena al texto. La clave del ICFES siempre responde estrictamente a lo afirmado por el autor."
        : question.areaId === "competencias-ciudadanas"
          ? "Técnica para el examen: Reconoce la jerarquía de derechos. Para derechos fundamentales individuales (vida, salud, debido proceso) el recurso inmediato es la Acción de Tutela. Para derechos colectivos (ambiente, espacio público) aplica la Acción Popular. Frente a decretos presidenciales en estados de excepción opera el control automático de la Corte Constitucional."
          : question.areaId === "gestion-financiera"
            ? "Técnica para el examen: En evaluación de proyectos, el VPN prevalece jerárquicamente sobre la TIR y el Payback. En razones de liquidez, recuerda excluir inventarios de la prueba ácida. En el WACC, aplica el escudo fiscal (1 - T) únicamente al costo de la deuda financiera."
            : question.areaId === "aseguramiento-informacion"
              ? "Técnica para el examen: Aplica la matriz de la NIA 705: si la incorrección es material pero no generalizada, emite opinión con salvedades («excepto por»); si es material Y generalizada, emite opinión desfavorable (adversa). Si falta evidencia y es generalizada, abstención de opinión."
              : "Técnica para el examen: Lee atentamente la tarea evaluada en el enunciado, descarta los dos distractores más evidentes y verifica la coherencia con los principios normativos y técnicos oficiales.");

  const resolvedDistractors =
    question.distractorAnalysis ||
    "Trampas comunes del ICFES: Las opciones incorrectas emplean distractores de cálculo directo sin considerar variaciones sucesivas, confusión entre tipos de opinión de auditoría, o generalizaciones no respaldadas textualmente por el enunciado normativo.";

  // Detección pedagógica de términos o falacias en las opciones y el enunciado
  const matchedTerms = useMemo(() => {
    return getTermsForQuestion(
      question.stem,
      question.contextText,
      question.choices.map((c) => c.text).join(" "),
    );
  }, [question]);

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 sm:p-6 space-y-4 transition-all shadow-xs animate-in fade-in-50",
        isCorrect ? "border-ok/40 bg-ok/5 text-ink" : "border-bad/40 bg-bad/5 text-ink",
      )}
    >
      {/* Banner de Estado */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          {isCorrect ? (
            <CheckCircle2 className="size-5 text-ok" />
          ) : (
            <XCircle className="size-5 text-bad" />
          )}
          <span className="font-display font-bold text-sm sm:text-base">
            {isCorrect
              ? "¡Respuesta Correcta! Excelente criterio técnico"
              : `Incorrecto · La clave oficial es la opción ${question.correct}`}
          </span>
        </div>
        <Badge variant="outline" className="font-mono text-[11px] font-semibold bg-surface">
          Clave Oficial: Opción {question.correct}
        </Badge>
      </div>

      {/* Bloque 1: Fundamento y Justificación Técnica */}
      <div className="rounded-xl border border-border/70 bg-surface/80 p-4 space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
          <Sparkles className="size-4 text-emerald-600" />
          <span>¿Por qué es la opción correcta? (Fundamento Técnico)</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-ink/90">{question.explanation}</p>
      </div>

      {/* Bloque 2: Método para Preguntas Similares en el Examen */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
          <Compass className="size-4 text-emerald-600" />
          <span>Método de Resolución (¿Cómo resolverla si sale una parecida el domingo?)</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-ink/90">{resolvedMethodTip}</p>
      </div>

      {/* Bloque 3: Análisis de Trampas y Distractores */}
      <div className="rounded-xl border border-bad/30 bg-bad/5 p-4 space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs font-bold text-bad">
          <ShieldAlert className="size-4 text-bad" />
          <span>Trampas del ICFES y Descarte de las Demás Opciones</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-ink/90">{resolvedDistractors}</p>
      </div>

      {/* Bloque 4: Desglose y Traductor de Opciones (Conceptos en Sencillo) */}
      {matchedTerms.length > 0 && (
        <div className="rounded-xl border border-emerald-500/40 bg-surface p-4 space-y-3 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
              <Languages className="size-4 text-emerald-600" />
              <span>Traductor de Jerga ICFES: ¿Qué significa cada concepto de las opciones?</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded">
              {matchedTerms.length} {matchedTerms.length === 1 ? "concepto explicado" : "conceptos explicados"}
            </span>
          </div>

          <p className="text-[11px] text-muted leading-relaxed">
            Para que no vuelvas a dudar con términos en latín o tecnicismos, aquí tienes la traducción en lenguaje sencillo y cómo identificarlos:
          </p>

          <div className="grid gap-2.5 sm:grid-cols-2 pt-1">
            {matchedTerms.map((term) => (
              <div
                key={term.id}
                className="rounded-lg border border-border/80 bg-paper/50 p-3 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-bold text-xs text-ink">{term.term}</h4>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      term.term + " definicion icfes saber pro concepto",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
                    title="Buscar explicación y ejemplos en Google"
                  >
                    <Globe className="size-2.5" />
                    <span>Buscar en Google</span>
                    <ExternalLink className="size-2" />
                  </a>
                </div>
                <p className="text-[11px] text-ink leading-relaxed">
                  <strong className="text-emerald-800 dark:text-emerald-300">En palabras sencillas:</strong>{" "}
                  {term.plainMeaning}
                </p>
                <p className="text-[10px] text-muted italic bg-surface/60 p-1.5 rounded border border-border/40">
                  <strong>Ejemplo:</strong> {term.example}
                </p>
                <p className="text-[10px] text-muted">
                  <strong className="text-ink">Pista ICFES:</strong> {term.examTip}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pie con Competencia y Fuente Oficial */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-muted font-mono border-t border-border/50">
        <span className="truncate">Competencia: {question.competency}</span>
        <span className="shrink-0">Fuente: {question.source}</span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 1. TAB: ENTRENADOR DE PREGUNTAS (MODO PRÁCTICA)
// ────────────────────────────────────────────────────────────────────────────

function SaberProTrainerTab({
  careerId,
  careerName,
  initialQuestionIndex,
  onResetJumpIndex,
  onNavigateTab,
}: {
  careerId: string;
  careerName: string;
  initialQuestionIndex?: number | null;
  onResetJumpIndex?: () => void;
  onNavigateTab?: (tab: SaberProTab) => void;
}) {
  const [filterSession, setFilterSession] = useState<"all" | "generica" | "especifica">("all");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [showTranslator, setShowTranslator] = useState(false);

  const userAnswers = useSaberProStore((s) => s.userAnswers);
  const setUserAnswer = useSaberProStore((s) => s.setUserAnswer);
  const resetUserAnswers = useSaberProStore((s) => s.resetUserAnswers);

  // Filtrar preguntas según sesión y carrera
  const filteredQuestions = useMemo(() => {
    return SABER_PRO_QUESTIONS.filter((q) => {
      if (q.session === "especifica") {
        if (q.careerId && q.careerId !== careerId && q.careerId !== "todas") {
          return false;
        }
      }
      if (filterSession !== "all" && q.session !== filterSession) {
        return false;
      }
      if (selectedArea !== "all" && q.areaId !== selectedArea) {
        return false;
      }
      return true;
    });
  }, [careerId, filterSession, selectedArea]);

  // Si se solicita salto a pregunta específica desde el diagnóstico
  useEffect(() => {
    if (initialQuestionIndex !== null && initialQuestionIndex !== undefined) {
      if (initialQuestionIndex >= 0 && initialQuestionIndex < filteredQuestions.length) {
        setCurrentIndex(initialQuestionIndex);
      }
      onResetJumpIndex?.();
    }
  }, [initialQuestionIndex, filteredQuestions.length, onResetJumpIndex]);

  // Text-To-Speech
  const currentQ: SaberProQuestion | undefined = filteredQuestions[currentIndex];

  const toggleSpeech = useCallback(() => {
    if (!("speechSynthesis" in window)) {
      alert("Tu navegador no soporta síntesis de voz.");
      return;
    }
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    if (!currentQ) return;

    const parts = [
      `Competencia: ${currentQ.areaLabel}.`,
      currentQ.contextText ? `Contexto: ${currentQ.contextText}` : "",
      `Pregunta: ${currentQ.stem}`,
      `Opciones: `,
      ...currentQ.choices.map((c) => `Opción ${c.id}: ${c.text}`),
    ];

    const utterance = new SpeechSynthesisUtterance(parts.join(" "));
    utterance.lang = "es-CO";
    utterance.rate = 1.0;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, [speaking, currentQ]);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
    setShowTranslator(false);
  }, [currentIndex]);

  const detectedTerms = useMemo(() => {
    if (!currentQ) return [];
    return getTermsForQuestion(
      currentQ.stem,
      currentQ.contextText,
      currentQ.choices.map((c) => c.text).join(" "),
    );
  }, [currentQ]);

  const handleSelectChoice = (choiceId: string) => {
    if (!currentQ) return;
    setUserAnswer(currentQ.id, choiceId);
  };

  const handleResetTrainer = () => {
    resetUserAnswers();
    setCurrentIndex(0);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  };

  const currentSelection = currentQ ? userAnswers[currentQ.id] : undefined;
  const isAnswered = currentSelection !== undefined;

  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).filter(
    ([id, ans]) => SABER_PRO_QUESTIONS.find((q) => q.id === id)?.correct === ans,
  ).length;

  return (
    <div className="space-y-6">
      {/* ── Barra de Filtros ── */}
      <div className="rounded-xl border border-border bg-surface p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-muted">Filtrar por Sesión:</span>
          <Button
            size="sm"
            variant={filterSession === "all" ? "default" : "outline"}
            onClick={() => {
              setFilterSession("all");
              setSelectedArea("all");
            }}
            className={cn(
              "text-xs h-8 cursor-pointer",
              filterSession === "all" && "bg-emerald-600 hover:bg-emerald-700 text-white font-bold",
            )}
          >
            Todas ({filteredQuestions.length})
          </Button>
          <Button
            size="sm"
            variant={filterSession === "generica" ? "default" : "outline"}
            onClick={() => {
              setFilterSession("generica");
              setSelectedArea("all");
            }}
            className={cn(
              "text-xs h-8 cursor-pointer",
              filterSession === "generica" && "bg-emerald-600 hover:bg-emerald-700 text-white font-bold",
            )}
          >
            Sesión 1: Genéricas
          </Button>
          <Button
            size="sm"
            variant={filterSession === "especifica" ? "default" : "outline"}
            onClick={() => {
              setFilterSession("especifica");
              setSelectedArea("all");
            }}
            className={cn(
              "text-xs h-8 cursor-pointer",
              filterSession === "especifica" &&
                "bg-emerald-600 hover:bg-emerald-700 text-white font-bold",
            )}
          >
            Sesión 2: {careerName}
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-ok font-semibold flex items-center gap-1">
              <CheckCircle2 className="size-3.5" />
              Aciertos: {correctCount}
            </span>
            <span className="text-muted">|</span>
            <span className="text-muted">Respondidas: {answeredCount}</span>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleResetTrainer}
            className="text-xs text-muted hover:text-bad h-8 gap-1 cursor-pointer"
          >
            <RotateCcw className="size-3.5" />
            Reiniciar
          </Button>
        </div>
      </div>

      {/* ── Contenido de la Pregunta Activa ── */}
      {currentQ ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/80 pb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    Pregunta {currentIndex + 1} de {filteredQuestions.length}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] uppercase font-bold",
                      currentQ.session === "generica"
                        ? "bg-accent/10 border-accent/30 text-accent"
                        : "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300",
                    )}
                  >
                    {currentQ.session === "generica" ? "Sesión 1 Genérica" : "Sesión 2 Específica"}
                  </Badge>
                  <span className="text-xs font-semibold text-muted">{currentQ.areaLabel}</span>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={toggleSpeech}
                  className="gap-1.5 text-xs h-7 cursor-pointer"
                >
                  {speaking ? (
                    <>
                      <VolumeX className="size-3.5 text-bad animate-pulse" />
                      <span>Detener</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="size-3.5" />
                      <span>Escuchar</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Contexto o Lectura si existe - Diseño destacado y legible ("que se vea de verdad") */}
              {currentQ.contextText && (
                <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 p-5 sm:p-6 space-y-3 shadow-xs border-l-6 border-l-emerald-600">
                  <div className="flex items-center justify-between gap-2 border-b border-emerald-500/20 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex size-6 items-center justify-center rounded-md bg-emerald-600 text-white shadow-2xs">
                        <FileText className="size-3.5" />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-mono">
                        Texto del Caso Oficial Evaluado
                      </span>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono bg-surface">
                      Lectura Obligatoria
                    </Badge>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-ink font-serif italic pl-1">
                    {currentQ.contextText}
                  </p>
                </div>
              )}

              {/* Enunciado Oficial de la Pregunta */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted font-mono">
                  <HelpCircle className="size-3.5 text-emerald-600" />
                  <span>Pregunta Oficial del ICFES:</span>
                </div>
                <p className="text-base sm:text-lg font-display font-bold text-ink leading-snug">
                  {currentQ.stem}
                </p>
              </div>

              {/* Traductor de Jerga / Conceptos Clave en Línea */}
              {detectedTerms.length > 0 && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 space-y-3 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
                        <Languages className="size-4" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                            Traductor de Jerga ICFES
                          </p>
                          <span className="rounded bg-emerald-600/20 text-emerald-900 dark:text-emerald-200 px-1.5 py-0.2 text-[10px] font-mono font-bold">
                            {detectedTerms.length} {detectedTerms.length === 1 ? "término detectado" : "términos detectados"}
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-800/90 dark:text-emerald-300/90 font-medium">
                          {detectedTerms.map((t) => t.term.split("(")[0].trim()).join(" · ")}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowTranslator((prev) => !prev)}
                      className="text-xs h-8 border-emerald-600 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-600 hover:text-white cursor-pointer gap-1.5 font-bold"
                    >
                      <Languages className="size-3.5" />
                      <span>{showTranslator ? "Ocultar Traductor" : "📖 Ver Traducción en Sencillo"}</span>
                    </Button>
                  </div>

                  {showTranslator && (
                    <div className="space-y-3 pt-3 border-t border-emerald-500/20 animate-in fade-in-50">
                      <div className="flex items-center justify-between text-[11px] text-muted">
                        <span>Traducción a palabras cotidianas con ejemplos reales y enlaces a Google:</span>
                        {onNavigateTab && (
                          <button
                            type="button"
                            onClick={() => onNavigateTab("glosario")}
                            className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>Ver todo el Glosario Oficial</span>
                            <ArrowRight className="size-3" />
                          </button>
                        )}
                      </div>

                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {detectedTerms.map((t) => (
                          <div
                            key={t.id}
                            className="rounded-xl border border-border bg-surface p-3.5 space-y-2 shadow-2xs"
                          >
                            <div className="flex items-start justify-between gap-1">
                              <div>
                                <h4 className="font-bold text-xs text-ink leading-tight">{t.term}</h4>
                                <span className="text-[10px] text-muted font-mono">{t.categoryLabel}</span>
                              </div>
                              <a
                                href={`https://www.google.com/search?q=${encodeURIComponent(
                                  t.term + " definicion falacia icfes saber pro ejemplos",
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 hover:underline font-semibold shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30"
                              >
                                <Globe className="size-2.5" />
                                <span>Google</span>
                                <ExternalLink className="size-2" />
                              </a>
                            </div>

                            <p className="text-xs text-ink leading-relaxed">
                              <strong className="text-emerald-800 dark:text-emerald-300">En palabras sencillas:</strong>{" "}
                              {t.plainMeaning}
                            </p>

                            <p className="text-[11px] text-muted italic bg-paper/60 p-2 rounded-lg border border-border/60">
                              <strong>Ejemplo real:</strong> {t.example}
                            </p>

                            <p className="text-[10px] text-ink/80 pt-0.5">
                              <strong className="text-emerald-700 dark:text-emerald-400">Pista para el examen:</strong>{" "}
                              {t.examTip}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Opciones de Respuesta */}
              <div className="space-y-3 pt-2">
                {currentQ.choices.map((choice) => {
                  const isSelected = currentSelection === choice.id;
                  const isRight = choice.id === currentQ.correct;

                  let optionStyle =
                    "border-border/80 bg-paper/40 hover:bg-paper hover:border-emerald-500/50 text-ink";
                  if (isAnswered) {
                    if (isRight) {
                      optionStyle =
                        "border-ok bg-ok/10 text-ink ring-1 ring-ok font-medium shadow-xs";
                    } else if (isSelected) {
                      optionStyle = "border-bad bg-bad/10 text-ink ring-1 ring-bad";
                    } else {
                      optionStyle = "border-border/50 bg-paper/20 text-muted opacity-60";
                    }
                  } else if (isSelected) {
                    optionStyle = "border-emerald-600 bg-emerald-500/10 ring-1 ring-emerald-600 text-ink";
                  }

                  return (
                    <button
                      key={choice.id}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectChoice(choice.id)}
                      className={cn(
                        "w-full rounded-xl border p-4 text-left transition-all flex items-start gap-3.5 cursor-pointer",
                        optionStyle,
                      )}
                    >
                      <span
                        className={cn(
                          "size-7 rounded-lg border font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5",
                          isAnswered && isRight
                            ? "bg-ok text-white border-ok"
                            : isAnswered && isSelected
                              ? "bg-bad text-white border-bad"
                              : isSelected
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "border-border/80 bg-surface text-ink",
                        )}
                      >
                        {choice.id}
                      </span>
                      <span className="text-sm sm:text-base leading-relaxed flex-1">
                        {choice.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explicación Pedagógica Integral */}
              {isAnswered && (
                <SaberProPedagogicalFeedback
                  question={currentQ}
                  selectedAnswer={currentSelection}
                />
              )}

              {/* Botones de Navegación Anterior / Siguiente */}
              <div className="flex items-center justify-between border-t border-border/80 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((i) => i - 1)}
                  className="gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="size-4" />
                  Anterior
                </Button>

                <span className="text-xs font-mono text-muted">
                  {currentIndex + 1} / {filteredQuestions.length}
                </span>

                <Button
                  variant="default"
                  size="sm"
                  disabled={currentIndex === filteredQuestions.length - 1}
                  onClick={() => setCurrentIndex((i) => i + 1)}
                  className="gap-1.5 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  Siguiente
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Paleta Lateral de Preguntas */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-surface p-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-muted font-mono">
                Mapa de Preguntas ({filteredQuestions.length})
              </p>
              <div className="grid grid-cols-5 gap-2 max-h-96 overflow-y-auto pr-1">
                {filteredQuestions.map((q, idx) => {
                  const ans = userAnswers[q.id];
                  const isCurrent = idx === currentIndex;
                  const isRight = ans === q.correct;

                  let btnStyle = "border-border/80 bg-paper/60 text-muted";
                  if (ans !== undefined) {
                    btnStyle = isRight
                      ? "border-ok bg-ok/20 text-ok font-bold"
                      : "border-bad bg-bad/20 text-bad font-bold";
                  }
                  if (isCurrent) {
                    btnStyle += " ring-2 ring-emerald-600 border-emerald-600 text-ink";
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={cn(
                        "h-8 rounded-lg border text-xs font-mono font-medium transition-all hover:scale-105 cursor-pointer",
                        btnStyle,
                      )}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tarjeta de Recomendación Rápida */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-2">
              <p className="text-xs font-bold text-ink flex items-center gap-1.5">
                <Sparkles className="size-4 text-emerald-600" />
                Estrategia ICFES Saber Pro
              </p>
              <p className="text-xs text-muted leading-relaxed">
                En el examen oficial dispones de aproximadamente <strong>2 minutos</strong> por
                pregunta. Descarta primero los 2 distractores evidentes para concentrarte en las 2
                opciones de alta similitud.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 2. TAB: SIMULACRO OFICIAL CRONOMETRADO (ESCALA 0 A 300)
// ────────────────────────────────────────────────────────────────────────────

function SaberProSimulatorTab({
  careerId,
  careerName,
}: {
  careerId: string;
  careerName: string;
}) {
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [batchSize, setBatchSize] = useState<number>(15);
  const [reviewFilter, setReviewFilter] = useState<"all" | "errors" | "correct">("all");
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);

  const setUserAnswer = useSaberProStore((s) => s.setUserAnswer);
  const saveExamResult = useSaberProStore((s) => s.saveExamResult);

  const examQuestions = useMemo(() => {
    const list = SABER_PRO_QUESTIONS.filter((q) => {
      if (q.session === "especifica") {
        return q.careerId === careerId || q.careerId === "todas";
      }
      return true;
    });
    return list.slice(0, batchSize);
  }, [careerId, batchSize]);

  useEffect(() => {
    if (!examStarted || examFinished) return;
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setExamFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examStarted, examFinished]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleStartExam = () => {
    setAnswers({});
    setCurrentIndex(0);
    setTimeRemaining(batchSize === 15 ? 25 * 60 : 40 * 60);
    setExamFinished(false);
    setExamStarted(true);
  };

  const handleSelectAnswer = (qId: string, choiceId: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: choiceId }));
    setUserAnswer(qId, choiceId);
  };

  const handleFinishExam = () => {
    setExamFinished(true);

    // Calcular estadísticas y guardar resultado en store
    let correct = 0;
    const areaBreakdown: Record<string, { correct: number; total: number; label: string }> = {};

    examQuestions.forEach((q) => {
      const isRight = answers[q.id] === q.correct;
      if (isRight) correct += 1;
      if (!areaBreakdown[q.areaId]) {
        areaBreakdown[q.areaId] = { correct: 0, total: 0, label: q.areaLabel };
      }
      areaBreakdown[q.areaId].total += 1;
      if (isRight) areaBreakdown[q.areaId].correct += 1;
    });

    const percent = Math.round((correct / examQuestions.length) * 100);
    const scaledScore = Math.min(300, Math.max(0, Math.round(100 + (percent / 100) * 190)));

    saveExamResult({
      score: scaledScore,
      rawCorrect: correct,
      totalQuestions: examQuestions.length,
      percent,
      careerId,
      careerName,
      areaBreakdown,
    });
  };

  // Cálculo de resultados
  const correctCount = useMemo(() => {
    return Object.entries(answers).filter(
      ([id, ans]) => examQuestions.find((q) => q.id === id)?.correct === ans,
    ).length;
  }, [answers, examQuestions]);

  const scorePercentage = Math.round((correctCount / examQuestions.length) * 100);
  const scaledScore = Math.min(
    300,
    Math.max(0, Math.round(100 + (scorePercentage / 100) * 190)),
  );

  const currentQ: SaberProQuestion | undefined = examQuestions[currentIndex];

  if (!examStarted) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-2xl border border-emerald-500/40 bg-surface p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-emerald-600 text-white font-bold text-xs uppercase px-2.5 py-0.5 font-mono">
              Simulacro Oficial
            </span>
            <span className="text-xs text-muted font-mono">Calibrado ICFES 2026</span>
          </div>

          <h2 className="font-display text-2xl font-bold text-ink">
            Simulador Cronometrado Saber Pro (Escala 0 a 300)
          </h2>

          <p className="text-sm text-muted leading-relaxed">
            Experimenta la presión real del examen. La prueba combina preguntas de las competencias
            genéricas (Lectura Crítica, Razonamiento, Ciudadanas e Inglés) y módulos específicos de{" "}
            <strong className="text-ink">{careerName}</strong>.
          </p>

          <div className="rounded-xl border border-border bg-paper/60 p-4 space-y-2 text-xs text-muted">
            <p className="font-bold text-ink flex items-center gap-1.5">
              <Clock className="size-4 text-emerald-600" />
              Condiciones de la Simulación:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>El cronómetro corre de forma continua sin pausas automáticas.</li>
              <li>Aproximadamente 1.7 minutos por pregunta (estándar ICFES).</li>
              <li>Al finalizar, obtendrás tu puntaje global en escala de 0 a 300.</li>
              <li>Podrás revisar el descarte de cada pregunta fallada con su técnica.</li>
            </ul>
          </div>

          {/* Selector de número de preguntas */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-muted">Selecciona la longitud de la prueba:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBatchSize(15)}
                className={cn(
                  "rounded-xl border p-3 text-left transition-all cursor-pointer",
                  batchSize === 15
                    ? "border-emerald-600 bg-emerald-500/10 text-ink font-semibold ring-1 ring-emerald-600"
                    : "border-border/80 bg-surface text-muted hover:border-emerald-500/50",
                )}
              >
                <div className="font-bold text-sm">15 Preguntas (Sprint)</div>
                <div className="text-[11px] text-muted">Tiempo estimado: 25 Minutos</div>
              </button>

              <button
                type="button"
                onClick={() => setBatchSize(26)}
                className={cn(
                  "rounded-xl border p-3 text-left transition-all cursor-pointer",
                  batchSize === 26
                    ? "border-emerald-600 bg-emerald-500/10 text-ink font-semibold ring-1 ring-emerald-600"
                    : "border-border/80 bg-surface text-muted hover:border-emerald-500/50",
                )}
              >
                <div className="font-bold text-sm">26 Preguntas (Completo)</div>
                <div className="text-[11px] text-muted">Tiempo estimado: 40 Minutos</div>
              </button>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleStartExam}
            className="w-full gap-2 font-bold cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Play className="size-4 fill-current" />
            Comenzar Simulacro Cronometrado
          </Button>
        </div>
      </div>
    );
  }

  if (examFinished) {
    const isLevel4 = scaledScore >= 180;
    const isLevel3 = scaledScore >= 156 && scaledScore < 180;

    const filteredReviewQuestions = examQuestions.filter((q) => {
      const userChoice = answers[q.id];
      const isRight = userChoice === q.correct;
      if (reviewFilter === "errors") return !isRight;
      if (reviewFilter === "correct") return isRight;
      return true;
    });

    return (
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="rounded-2xl border border-emerald-500/40 bg-surface p-6 sm:p-8 space-y-6 shadow-xs text-center">
          <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 mx-auto">
            <Award className="size-8" />
          </div>

          <div className="space-y-1">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Simulacro Finalizado
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              Resultados calculados con base en la escala oficial de calificación del ICFES (0 - 300).
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 rounded-xl border border-border bg-paper/60 p-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-muted">Puntaje Oficial</span>
              <p className="font-display text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                {scaledScore}
              </p>
              <span className="text-[10px] text-muted font-mono">Escala 0-300</span>
            </div>
            <div className="space-y-1 border-x border-border/80">
              <span className="text-[10px] font-mono uppercase text-muted">Aciertos</span>
              <p className="font-display text-2xl sm:text-3xl font-bold text-ok">
                {correctCount} / {examQuestions.length}
              </p>
              <span className="text-[10px] text-muted font-mono">{scorePercentage}% precisión</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-muted">Nivel de Logro</span>
              <p
                className={cn(
                  "font-display text-lg sm:text-2xl font-bold truncate",
                  isLevel4 ? "text-ok" : isLevel3 ? "text-accent" : "text-bad",
                )}
              >
                {isLevel4 ? "Nivel 4" : isLevel3 ? "Nivel 3" : "Nivel 2"}
              </p>
              <span className="text-[10px] text-muted font-mono">
                {isLevel4 ? "Avanzado" : isLevel3 ? "Satisfactorio" : "Por Mejorar"}
              </span>
            </div>
          </div>

          <div className="text-left rounded-xl border border-border bg-paper/40 p-4 text-xs text-muted space-y-1">
            <p className="font-bold text-ink flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-emerald-600" />
              Diagnóstico ICFES Saber Pro:
            </p>
            <p className="leading-relaxed">
              {isLevel4
                ? "¡Excelente desempeño! Tu puntaje proyectado te ubicaría en el decil superior nacional y te hace elegible para exoneraciones de grado y reconocimientos del Ministerio de Educación."
                : isLevel3
                  ? "Buen resultado. Superas el promedio nacional (>150 pts), pero reforzar las fórmulas financieras y el criterio de auditoría te impulsará al Nivel 4 definitivo."
                  : "Estás por debajo del rango de suficiencia deseado. Aprovecha la chuleta de fórmulas y revisa el descarte de las preguntas erradas a continuación para evitar las trampas del ICFES."}
            </p>
          </div>
        </div>

        {/* ── Revisión Detallada de Preguntas del Simulacro ── */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
            <div>
              <h3 className="font-display text-lg font-bold text-ink">Revisión Pregunta a Pregunta</h3>
              <p className="text-xs text-muted">
                Analiza las trampas del examen y aprende la justificación técnica de cada opción.
              </p>
            </div>

            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant={reviewFilter === "all" ? "default" : "outline"}
                onClick={() => setReviewFilter("all")}
                className="text-xs h-7 cursor-pointer"
              >
                Todas ({examQuestions.length})
              </Button>
              <Button
                size="sm"
                variant={reviewFilter === "errors" ? "default" : "outline"}
                onClick={() => setReviewFilter("errors")}
                className="text-xs h-7 cursor-pointer text-bad hover:text-bad"
              >
                Fallos ({examQuestions.length - correctCount})
              </Button>
              <Button
                size="sm"
                variant={reviewFilter === "correct" ? "default" : "outline"}
                onClick={() => setReviewFilter("correct")}
                className="text-xs h-7 cursor-pointer text-ok hover:text-ok"
              >
                Correctas ({correctCount})
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredReviewQuestions.map((q) => {
              const userChoice = answers[q.id];
              const isRight = userChoice === q.correct;
              const isExpanded = expandedReviewId === q.id;

              return (
                <div
                  key={q.id}
                  className={cn(
                    "rounded-2xl border p-5 space-y-4 transition-all shadow-2xs",
                    isRight ? "border-ok/30 bg-surface" : "border-bad/30 bg-surface",
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {isRight ? (
                        <CheckCircle2 className="size-4 text-ok shrink-0" />
                      ) : (
                        <XCircle className="size-4 text-bad shrink-0" />
                      )}
                      <span className="font-bold text-xs text-ink">{q.areaLabel}</span>
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {q.session === "generica" ? "Genérica" : "Específica"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-muted">Tu respuesta: <strong>{userChoice || "Sin responder"}</strong></span>
                      <span className="text-muted">|</span>
                      <span className="text-ok font-bold">Clave: {q.correct}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-ink leading-relaxed">
                    {q.stem}
                  </p>

                  <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setExpandedReviewId(isExpanded ? null : q.id)}
                      className="text-xs text-emerald-700 hover:text-emerald-800 h-7 p-0 cursor-pointer"
                    >
                      {isExpanded ? "Ocultar Explicación Pedagógica ▲" : "Ver Explicación y Técnica Oficial ▼"}
                    </Button>
                  </div>

                  {isExpanded && (
                    <SaberProPedagogicalFeedback question={q} selectedAnswer={userChoice} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button variant="outline" size="sm" onClick={handleStartExam} className="gap-1.5 cursor-pointer">
            <RotateCcw className="size-3.5" />
            Reintentar Simulacro
          </Button>
          <Button size="sm" onClick={() => setExamStarted(false)} className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
            Volver al Menú
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Barra de Estado del Simulacro */}
      <div className="rounded-xl border border-border bg-surface p-4 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <Badge className="bg-emerald-600 text-white font-mono text-xs font-bold">
            Pregunta {currentIndex + 1} de {examQuestions.length}
          </Badge>
          <span className="text-xs text-muted hidden sm:inline">{currentQ?.areaLabel}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg">
            <Clock className="size-4" />
            <span>{formatTimer(timeRemaining)}</span>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={handleFinishExam}
            className="text-xs h-8 cursor-pointer"
          >
            Finalizar
          </Button>
        </div>
      </div>

      {currentQ && (
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-xs">
          {currentQ.contextText && (
            <div className="rounded-xl border border-border/80 bg-paper/60 p-4 sm:p-5 text-sm sm:text-base leading-relaxed text-ink font-serif italic border-l-4 border-l-emerald-600">
              {currentQ.contextText}
            </div>
          )}

          <div className="space-y-2">
            <p className="text-base sm:text-lg font-display font-semibold text-ink leading-snug">
              {currentQ.stem}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {currentQ.choices.map((choice) => {
              const isSelected = answers[currentQ.id] === choice.id;
              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => handleSelectAnswer(currentQ.id, choice.id)}
                  className={cn(
                    "w-full rounded-xl border p-4 text-left transition-all flex items-start gap-3.5 cursor-pointer",
                    isSelected
                      ? "border-emerald-600 bg-emerald-500/10 ring-1 ring-emerald-600 text-ink"
                      : "border-border/80 bg-paper/40 hover:bg-paper hover:border-emerald-500/50 text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "size-7 rounded-lg border font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5",
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "border-border/80 bg-surface text-ink",
                    )}
                  >
                    {choice.id}
                  </span>
                  <span className="text-sm sm:text-base leading-relaxed flex-1">{choice.text}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-border/80 pt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
              className="gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="size-4" />
              Anterior
            </Button>

            <span className="text-xs font-mono text-muted">
              Respondidas: {Object.keys(answers).length} / {examQuestions.length}
            </span>

            {currentIndex === examQuestions.length - 1 ? (
              <Button size="sm" onClick={handleFinishExam} className="gap-1.5 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                Entregar Simulacro
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => setCurrentIndex((i) => i + 1)}
                className="gap-1.5 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              >
                Siguiente
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 3. TAB: CHULETA DE FÓRMULAS Y ATAJOS (4 DÍAS RESTANTES)
// ────────────────────────────────────────────────────────────────────────────

function SaberProCheatsheetTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filteredCheatsheet = useMemo(() => {
    if (!searchTerm.trim()) return SABER_PRO_CHEATSHEET;
    const term = searchTerm.toLowerCase();
    return SABER_PRO_CHEATSHEET.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        c.category.toLowerCase().includes(term) ||
        c.formula.toLowerCase().includes(term) ||
        c.keyTip.toLowerCase().includes(term),
    );
  }, [searchTerm]);

  const handleCopy = (formula: string, idx: number) => {
    void navigator.clipboard.writeText(formula);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Cabecera de la Chuleta */}
      <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-500/15 via-surface to-emerald-500/5 p-6 space-y-3">
        <div className="flex items-center gap-2">
          <span className="rounded bg-emerald-600 text-white font-bold text-xs uppercase px-2.5 py-0.5 font-mono">
            Sprint 4 Días · 18 Octubre 2026
          </span>
          <span className="text-xs text-muted font-mono">Alta Frecuencia ICFES</span>
        </div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
          Chuleta de Fórmulas, Ratios y Criterios Clave
        </h2>
        <p className="text-xs sm:text-sm text-muted max-w-3xl leading-relaxed">
          Los conceptos determinantes para la Sesión 1 y 2. Memoriza estos ratios contables, reglas
          financieras y atajos de razonamiento cuantitativo que aparecen de forma recurrente en las
          pruebas del Estado.
        </p>

        {/* Buscador de fórmulas */}
        <div className="pt-2 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 size-4 text-muted" />
            <input
              type="text"
              placeholder="Buscar por ratio (ROA, VPN, Razón corriente, NIA 705)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface pl-9 pr-4 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Grid de Fórmulas y Ratios */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCheatsheet.map((item, idx) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border/80 bg-surface p-5 space-y-3 shadow-2xs hover:border-emerald-500/60 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-mono">
                {item.category}
              </span>
              <h3 className="font-display text-base font-bold text-ink leading-tight">
                {item.title}
              </h3>
              <div className="relative rounded-xl border border-border bg-paper/80 p-3 font-mono text-xs text-ink whitespace-pre-wrap leading-relaxed">
                {item.formula}
                <button
                  type="button"
                  onClick={() => handleCopy(item.formula, idx)}
                  className="absolute top-2 right-2 p-1 rounded-md text-muted hover:text-ink hover:bg-surface transition-all cursor-pointer"
                  title="Copiar fórmula"
                >
                  {copiedIndex === idx ? (
                    <CheckCircle2 className="size-3.5 text-ok" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs leading-relaxed text-ink/90 flex items-start gap-2">
              <Zap className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block text-[11px] uppercase tracking-wider">
                  Clave ICFES:
                </span>
                <p>{item.keyTip}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 4. TAB: ESTRUCTURA OFICIAL ICFES Y REGLAS
// ────────────────────────────────────────────────────────────────────────────

function SaberProStructureTab({
  selectedCareer,
}: {
  selectedCareer: (typeof SABER_PRO_CAREERS)[0];
}) {
  return (
    <div className="space-y-8">
      {/* Sesión 1: Genéricas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              Sesión 1: Módulos Genéricos (Obligatorios Nacionales)
            </h2>
            <p className="text-xs text-muted">
              Evaluación obligatoria para todos los estudiantes de carreras universitarias en Colombia.
            </p>
          </div>
          <Badge className="bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/40 font-bold">
            4h 40min
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GENERIC_AREAS.map((area) => (
            <div
              key={area.id}
              className="rounded-2xl border border-border/80 bg-surface p-5 space-y-2.5 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-base text-ink">{area.name}</span>
                <Badge variant="outline" className="font-mono text-xs font-bold">
                  {area.questionsCount} {area.questionsCount === 1 ? "tarea" : "preguntas"}
                </Badge>
              </div>
              <p className="text-xs leading-relaxed text-muted">{area.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sesión 2: Específicas de la Carrera */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              Sesión 2: Módulos Específicos · {selectedCareer.name}
            </h2>
            <p className="text-xs text-muted">
              Facultad: {selectedCareer.faculty} · Módulos especializados fijados por el Ministerio de Educación.
            </p>
          </div>
          <Badge className="bg-ok/15 text-ok border-ok/30 font-bold">~2 Horas</Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {selectedCareer.specificModules.map((mod) => (
            <div
              key={mod.id}
              className="rounded-2xl border border-border/80 bg-surface p-5 space-y-3 shadow-2xs border-l-4 border-l-ok"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-ok font-mono">
                Módulo Específico Obligatorio
              </span>
              <h3 className="font-display text-lg font-bold text-ink">{mod.name}</h3>
              <p className="text-xs leading-relaxed text-muted">{mod.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendaciones Tácticas para el 18 de Octubre */}
      <div className="rounded-2xl border border-border bg-paper/60 p-6 space-y-3">
        <h3 className="font-display text-base font-bold text-ink flex items-center gap-2">
          <Info className="size-4 text-emerald-600" />
          Recomendaciones Oficiales para el Domingo 18 de Octubre
        </h3>
        <ul className="text-xs text-muted space-y-2 list-disc list-inside leading-relaxed">
          <li>
            Lleva cédula de ciudadanía original física o cédula digital en la app oficial de la
            Registraduría.
          </li>
          <li>
            Lápiz Mirado No. 2, borrador de nata y tajalápiz (para pruebas impresas) o puntualidad
            estricta con citación de sala electrónica.
          </li>
          <li>
            No se permite calculadora programable ni celular en la sala; en Razonamiento
            Cuantitativo las operaciones están calibradas para cálculo mental o papel auxiliar.
          </li>
          <li>
            En Comunicación Escrita, define tu tesis en el primer párrafo y dedica un párrafo
            exclusivo a refutar el contraargumento más común.
          </li>
        </ul>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 5. TAB: DIAGNÓSTICO DE DESEMPEÑO Y MAPA DE FALLOS (PASO 5)
// ────────────────────────────────────────────────────────────────────────────

function SaberProDiagnosticTab({
  selectedCareer,
  onReviewQuestion,
  onStartSimulator,
}: {
  selectedCareer: (typeof SABER_PRO_CAREERS)[0];
  onReviewQuestion: (questionId: string) => void;
  onStartSimulator: () => void;
}) {
  const userAnswers = useSaberProStore((s) => s.userAnswers);
  const resetUserAnswers = useSaberProStore((s) => s.resetUserAnswers);
  const examHistory = useSaberProStore((s) => s.examHistory);

  // Identificar preguntas respondidas
  const answeredEntries = Object.entries(userAnswers);
  const totalAnswered = answeredEntries.length;

  const failedQuestions: { question: SaberProQuestion; userAns: string }[] = [];
  const correctQuestions: SaberProQuestion[] = [];

  // Desglose por áreas
  const areaStats: Record<string, { label: string; total: number; correct: number }> = {};

  answeredEntries.forEach(([qId, ans]) => {
    const q = SABER_PRO_QUESTIONS.find((item) => item.id === qId);
    if (!q) return;

    if (!areaStats[q.areaId]) {
      areaStats[q.areaId] = { label: q.areaLabel, total: 0, correct: 0 };
    }
    areaStats[q.areaId].total += 1;

    if (ans === q.correct) {
      correctQuestions.push(q);
      areaStats[q.areaId].correct += 1;
    } else {
      failedQuestions.push({ question: q, userAns: ans });
    }
  });

  const accuracy = totalAnswered > 0 ? Math.round((correctQuestions.length / totalAnswered) * 100) : 0;
  const estimatedScore =
    totalAnswered > 0 ? Math.min(300, Math.max(0, Math.round(100 + (accuracy / 100) * 190))) : 0;

  const isLevel4 = estimatedScore >= 180;
  const isLevel3 = estimatedScore >= 156 && estimatedScore < 180;

  if (totalAnswered === 0 && examHistory.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center space-y-4">
        <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 mx-auto">
          <Layers className="size-8" />
        </div>
        <div className="space-y-1">
          <h3 className="font-display text-lg font-bold text-ink">
            Aún no has generado datos de diagnóstico
          </h3>
          <p className="text-xs text-muted max-w-md mx-auto">
            Comienza a responder preguntas en el <strong>Entrenador de Preguntas</strong> o realiza un{" "}
            <strong>Simulacro Cronometrado</strong> para que el sistema calcule tu puntaje proyectado en
            la escala 0 a 300 y mapee tus fallos por competencia.
          </p>
        </div>
        <Button
          onClick={onStartSimulator}
          className="gap-2 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
        >
          <Play className="size-4 fill-current" />
          Iniciar Simulacro Oficial
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ── Resumen Cuantitativo del Diagnóstico ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-emerald-500/40 bg-surface p-5 space-y-2 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-mono">
            Puntaje Estimado ICFES
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-ink">{estimatedScore}</span>
            <span className="text-xs text-muted">/ 300</span>
          </div>
          <p className="text-[11px] text-muted">
            {isLevel4
              ? "Nivel 4 (Avanzado): Sobresaliente nacional."
              : isLevel3
                ? "Nivel 3 (Satisfactorio): Cerca de Nivel 4."
                : "Nivel 2: Refuerza las preguntas falladas."}
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-surface p-5 space-y-2 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted font-mono">
            Tasa de Aciertos
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-ink">{accuracy}%</span>
            <span className="text-xs text-muted">
              ({correctQuestions.length} de {totalAnswered})
            </span>
          </div>
          <Progress value={accuracy} className="h-1.5 bg-paper" />
        </div>

        <div className="rounded-2xl border border-bad/30 bg-bad/5 p-5 space-y-2 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-bad font-mono">
            Preguntas con Fallo
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-bad">
              {failedQuestions.length}
            </span>
            <span className="text-xs text-muted">para corregir</span>
          </div>
          <p className="text-[11px] text-bad/80">
            Conceptos críticos que debes repasar antes del domingo 18.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-surface p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted font-mono">
              Simulacros Guardados
            </span>
            <span className="text-[10px] text-muted font-mono">Historial</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-ink">{examHistory.length}</span>
            <span className="text-xs text-muted">sesiones tomadas</span>
          </div>
          <p className="text-[11px] text-muted">
            {examHistory.length > 0
              ? `Último puntaje: ${examHistory[0].score} pts`
              : "Sin simulacros registrados aún."}
          </p>
        </div>
      </div>

      {/* ── Desempeño por Competencias Evaluadas ── */}
      <div className="rounded-2xl border border-border/80 bg-surface p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div>
            <h3 className="font-display text-base font-bold text-ink">
              Rendimiento por Competencia y Área
            </h3>
            <p className="text-xs text-muted">
              Identifica en qué módulos tienes mayor solidez para {selectedCareer.name} y dónde se concentran los distractores.
            </p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={resetUserAnswers}
            className="text-xs text-muted hover:text-bad h-8 gap-1 cursor-pointer"
          >
            <RotateCcw className="size-3.5" />
            Reiniciar Diagnóstico
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(areaStats).map(([areaId, stat]) => {
            const areaAcc = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
            return (
              <div
                key={areaId}
                className="rounded-xl border border-border/80 bg-paper/50 p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink">{stat.label}</span>
                  <span
                    className={cn(
                      "text-xs font-bold font-mono",
                      areaAcc >= 70 ? "text-ok" : areaAcc >= 50 ? "text-emerald-700" : "text-bad",
                    )}
                  >
                    {areaAcc}% ({stat.correct}/{stat.total})
                  </span>
                </div>
                <Progress value={areaAcc} className="h-1.5 bg-paper" />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Lista de Preguntas Falladas para Repaso Urgente ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h3 className="font-display text-lg font-bold text-ink flex items-center gap-2">
              <ShieldAlert className="size-5 text-bad" />
              Mapa de Fallos: Preguntas para Corregir ({failedQuestions.length})
            </h3>
            <p className="text-xs text-muted">
              Haz clic en &quot;Repasar en el Entrenador&quot; para abrir la pregunta con su método
              de resolución y descarte de trampas del ICFES.
            </p>
          </div>
        </div>

        {failedQuestions.length === 0 ? (
          <div className="rounded-xl border border-ok/30 bg-ok/5 p-6 text-center space-y-2">
            <CheckCircle2 className="size-8 text-ok mx-auto" />
            <p className="text-xs font-bold text-ok">¡No tienes preguntas falladas en este momento!</p>
            <p className="text-xs text-muted">
              Excelente precisión técnica en todas las preguntas que has resuelto.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {failedQuestions.map(({ question: q, userAns }) => (
              <div
                key={q.id}
                className="rounded-2xl border border-bad/30 bg-surface p-5 space-y-3 shadow-2xs hover:border-bad/60 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-bad" />
                    <span className="font-bold text-xs text-ink">{q.areaLabel}</span>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {q.session === "generica" ? "Sesión 1 Genérica" : "Sesión 2 Específica"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-bad">Tu elección: <strong>Opción {userAns}</strong></span>
                    <span className="text-muted">|</span>
                    <span className="text-ok font-bold">Clave Oficial: Opción {q.correct}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-ink leading-relaxed">
                  {q.stem}
                </p>

                <div className="rounded-xl border border-border bg-paper/60 p-3 text-xs text-muted leading-relaxed">
                  <p>
                    <strong className="text-ink">Por qué es la opción {q.correct}:</strong>{" "}
                    {q.explanation}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-muted font-mono truncate max-w-sm">
                    Competencia: {q.competency}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onReviewQuestion(q.id)}
                    className="text-xs gap-1 cursor-pointer border-emerald-500/50 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/10"
                  >
                    <span>Repasar en el Entrenador</span>
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Historial de Simulacros Anteriores ── */}
      {examHistory.length > 0 && (
        <div className="rounded-2xl border border-border/80 bg-surface p-6 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="font-display text-base font-bold text-ink">
              Historial de Simulacros Cronometrados
            </h3>
            <span className="text-xs text-muted font-mono">{examHistory.length} simulacros</span>
          </div>

          <div className="space-y-2">
            {examHistory.map((res, idx) => (
              <div
                key={res.date}
                className="flex items-center justify-between rounded-xl border border-border bg-paper/40 p-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-muted text-[11px]">#{idx + 1}</span>
                  <span className="font-bold text-ink">
                    {new Date(res.date).toLocaleDateString("es-CO", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {res.careerName}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 font-mono">
                  <span className="text-muted">
                    {res.rawCorrect}/{res.totalQuestions} aciertos ({res.percent}%)
                  </span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    {res.score} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// 6. TAB: TRADUCTOR DE JERGA Y GLOSARIO OFICIAL SABER PRO 2026
// ────────────────────────────────────────────────────────────────────────────

function SaberProGlossaryTab({
  onReviewQuestion,
}: {
  onReviewQuestion?: (questionId: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Todos los Conceptos" },
    { id: "falacias", label: "Falacias y Argumentación (Latín)" },
    { id: "ciudadanas", label: "Constitución y Leyes" },
    { id: "cuantitativo", label: "Razonamiento Cuantitativo" },
    { id: "financiero", label: "Gestión Financiera" },
    { id: "auditoria", label: "Auditoría NIA y Control" },
  ];

  const filteredTerms = useMemo(() => {
    return SABER_PRO_GLOSSARY.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return (
        item.term.toLowerCase().includes(q) ||
        item.plainMeaning.toLowerCase().includes(q) ||
        item.example.toLowerCase().includes(q) ||
        item.examTip.toLowerCase().includes(q) ||
        item.searchTerms.some((st) => st.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchTerm]);

  // Encuentra preguntas asociadas al término en el banco
  const getAssociatedQuestion = (term: GlossaryTerm) => {
    return SABER_PRO_QUESTIONS.find((q) => {
      const combined = `${q.contextText || ""} ${q.stem} ${q.choices.map((c) => c.text).join(" ")}`.toLowerCase();
      return term.searchTerms.some((st) => combined.includes(st.toLowerCase()));
    });
  };

  return (
    <div className="space-y-6">
      {/* ── Cabecera del Traductor ── */}
      <div className="rounded-2xl border border-emerald-500/40 bg-surface p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
                <Languages className="size-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-mono">
                Paso 6 · Traductor Oficial Saber Pro 2026
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              Traductor de Jerga y Términos en Latín
            </h2>
          </div>
          <Badge className="bg-emerald-600 text-white font-mono font-bold text-xs py-1 px-3 self-start sm:self-center shadow-2xs">
            {SABER_PRO_GLOSSARY.length} Conceptos Clave
          </Badge>
        </div>

        <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-3xl">
          El ICFES suele formular preguntas con términos en latín (<em>ad hominem</em>, <em>ad misericordiam</em>),
          figuras jurídicas o fórmulas financieras complejas. Este traductor convierte cada concepto a{" "}
          <strong className="text-ink">español sencillo y cotidiano</strong>, con ejemplos de la vida real,
          trucos de descarte y enlaces directos para investigar en la web.
        </p>

        {/* ── Barra de Búsqueda y Filtros ── */}
        <div className="space-y-3 pt-2">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar término, falacia o concepto (ej: ad hominem, tutela, wacc, nia 705, ebitda...)"
              className="w-full rounded-xl border border-border bg-paper/60 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-ink placeholder:text-subtle focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 shadow-2xs"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-ink cursor-pointer"
              >
                Limpiar
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-medium transition-all cursor-pointer",
                    active
                      ? "bg-emerald-600 text-white font-bold shadow-2xs"
                      : "border border-border/80 bg-paper/50 text-muted hover:text-ink hover:border-emerald-500/60",
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Lista de Tarjetas del Glosario ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-muted px-1">
          <span>
            Mostrando <strong>{filteredTerms.length}</strong> de {SABER_PRO_GLOSSARY.length} términos
          </span>
          {searchTerm && (
            <span>
              Filtro activo: &ldquo;{searchTerm}&rdquo;
            </span>
          )}
        </div>

        {filteredTerms.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center space-y-2">
            <p className="font-bold text-sm text-ink">No se encontraron términos para tu búsqueda.</p>
            <p className="text-xs text-muted">Intenta buscar con otra palabra clave o limpia el filtro.</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="mt-2 text-xs cursor-pointer"
            >
              Restablecer Filtros
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredTerms.map((item) => {
              const relatedQ = getAssociatedQuestion(item);
              const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
                item.term + " concepto definicion icfes saber pro ejemplos",
              )}`;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-border/80 bg-surface p-5 space-y-3.5 shadow-2xs hover:border-emerald-500/60 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <h3 className="font-display font-bold text-base text-ink leading-tight">
                          {item.term}
                        </h3>
                        <Badge variant="outline" className="text-[10px] font-mono">
                          {item.categoryLabel}
                        </Badge>
                      </div>

                      <a
                        href={googleSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30 shrink-0 cursor-pointer"
                        title="Buscar en Google"
                      >
                        <Globe className="size-3" />
                        <span>Google</span>
                        <ExternalLink className="size-2.5" />
                      </a>
                    </div>

                    {/* Explicación en lenguaje cotidiano */}
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 font-mono">
                        En palabras sencillas:
                      </span>
                      <p className="text-xs sm:text-sm text-ink leading-relaxed">
                        {item.plainMeaning}
                      </p>
                    </div>

                    {/* Ejemplo práctico de debate o caso real */}
                    <div className="rounded-xl border border-border/80 bg-paper/60 p-3 space-y-1 font-serif">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted font-sans font-mono">
                        Ejemplo real / Debate:
                      </span>
                      <p className="text-xs sm:text-sm text-ink/90 italic leading-relaxed">
                        {item.example}
                      </p>
                    </div>

                    {/* Cómo responder en el ICFES */}
                    <div className="text-xs space-y-1 pt-1">
                      <span className="font-bold text-[11px] text-ink flex items-center gap-1">
                        <Sparkles className="size-3 text-emerald-600" />
                        Pista para el examen del domingo:
                      </span>
                      <p className="text-xs text-muted leading-relaxed pl-4 border-l-2 border-emerald-600/40">
                        {item.examTip}
                      </p>
                    </div>
                  </div>

                  {/* Acciones del Término */}
                  <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2">
                    <a
                      href={googleSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-muted hover:text-ink inline-flex items-center gap-1 font-mono"
                    >
                      <span>Consultar fuentes web</span>
                      <ExternalLink className="size-3" />
                    </a>

                    {relatedQ && onReviewQuestion && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onReviewQuestion(relatedQ.id)}
                        className="text-xs h-7 gap-1 cursor-pointer border-emerald-600 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-600 hover:text-white font-semibold"
                      >
                        <span>Practicar Caso Real</span>
                        <ArrowRight className="size-3" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Consejo Metodológico Oficial ── */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-2">
        <h4 className="text-xs font-bold text-ink flex items-center gap-1.5">
          <HelpCircle className="size-4 text-emerald-600" />
          ¿Por qué el ICFES utiliza expresiones en latín y jerga técnica?
        </h4>
        <p className="text-xs text-muted leading-relaxed">
          En Lectura Crítica y Competencias Ciudadanas, el ICFES evalúa si el estudiante sabe identificar
          errores lógicos en discursos públicos sin dejarse deslumbrar por términos técnicos. Todas las
          falacias en latín (<em>ad hominem</em>, <em>ad misericordiam</em>, <em>ad verecundiam</em>, etc.)
          simplemente describen formas comunes en las que una persona evita argumentar con pruebas y busca ganar
          el debate mediante trampas retóricas. Al memorizar su significado sencillo, puedes responder en menos
          de 45 segundos.
        </p>
      </div>
    </div>
  );
}
