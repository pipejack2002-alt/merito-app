import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Circle,
  ClipboardCheck,
  Compass,
  Eye,
  HelpCircle,
  Layers,
  Lightbulb,
  ListChecks,
  Play,
  RotateCcw,
  Scale,
  Sparkles,
  Square,
  StickyNote,
  Trash2,
  Trophy,
  Volume2,
  XCircle,
} from "lucide-react";
import { TRACKS } from "@/data/types";
import { topicForModule } from "@/data/topics";
import { useProgress } from "@/lib/progress-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCargo } from "@/lib/use-cargo";
import { getCargoModule, isModuleInCargoPlan } from "@/lib/cargo-content";
import { indicatorsForCargo } from "@/data/areandina-indicadores";
import { articlesForModule } from "@/data/normas";
import { ArticleCard } from "@/components/study/article-card";
import { FLASHCARDS } from "@/data/flashcards";
import { QUESTIONS } from "@/data/questions";
import { QUESTIONS_CARGOS } from "@/data/questions-cargos";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/estudio/$slug")({
  head: ({ params }) => {
    if (!params?.slug || params.slug === "`$slug") {
      return {
        meta: [{ name: "robots", content: "noindex, nofollow" }],
      };
    }
    return {
      links: [
        {
          rel: "canonical",
          href: `https://merito.tributoapp.me/estudio/${params.slug}`,
        },
      ],
    };
  },
  component: ModulePage,
});

type LessonStep = "teoria" | "normas" | "fichas" | "casos";

function ModulePage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { cargo, modules, questions } = useCargo();

  const mod = useMemo(
    () => modules.find((m) => m.id === slug) ?? getCargoModule(cargo, slug),
    [modules, cargo, slug],
  );
  const inCargoPlan = useMemo(() => isModuleInCargoPlan(cargo, slug), [cargo, slug]);

  const isRead = useProgress((s) => (mod ? Boolean(s.readModules[mod.id]) : false));
  const markRead = useProgress((s) => s.markRead);
  const unmarkRead = useProgress((s) => s.unmarkRead);
  const toggleRead = useProgress((s) => s.toggleRead);
  const setLastLesson = useProgress((s) => s.setLastLesson);
  const note = useProgress((s) => (mod ? (s.lessonNotes[mod.id] ?? "") : ""));
  const setNote = useProgress((s) => s.setNote);
  const globalAnswers = useProgress((s) => s.answers);
  const recordAnswer = useProgress((s) => s.recordAnswer);

  // Modo guiado por pasos (por defecto) vs ver todo corrido
  const [viewMode, setViewMode] = useState<"guiado" | "completo">("guiado");
  const [activeStep, setActiveStep] = useState<LessonStep>("teoria");

  // Estado de puntos entendidos dentro de la lección
  const [checkedPoints, setCheckedPoints] = useState<Record<number, boolean>>({});
  const [expandAllArticles, setExpandAllArticles] = useState<boolean | null>(null);

  // Estado interactivo de Fichas (Flashcards)
  const [cardIndex, setCardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});
  const [showAllCardsGrid, setShowAllCardsGrid] = useState(false);

  // Estado interactivo del Validador de Casos Prácticos
  const [caseIndex, setCaseIndex] = useState(0);
  const [draftChoices, setDraftChoices] = useState<Record<string, string>>({});
  const [validatedCases, setValidatedCases] = useState<Record<string, string>>({});
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // Al cambiar de módulo (slug), reiniciar vista guiada al Paso 1 y guardar última lección
  useEffect(() => {
    if (slug) {
      setLastLesson(slug);
    }
    setActiveStep("teoria");
    setCheckedPoints({});
    setExpandAllArticles(null);
    setCardIndex(0);
    setCardFlipped(false);
    setCaseIndex(0);
    setDraftChoices({});
    setValidatedCases({});
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug, setLastLesson]);

  const modQuestions = useMemo(() => {
    if (!mod) return [];
    const fromCargo = questions.filter((q) => q.moduleId === mod.id);
    if (fromCargo.length > 0) return fromCargo;
    return [...QUESTIONS, ...QUESTIONS_CARGOS].filter((q) => q.moduleId === mod.id);
  }, [questions, mod]);

  const modFlashcards = useMemo(
    () => (mod ? FLASHCARDS.filter((f) => f.moduleId === mod.id) : []),
    [mod],
  );
  const modArticles = useMemo(() => (mod ? articlesForModule(mod.id) : []), [mod]);
  const coveredIndicators = useMemo(
    () => (mod ? indicatorsForCargo(cargo).filter((ind) => ind.moduleId === mod.id) : []),
    [cargo, mod],
  );

  const toggleSpeech = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        return;
      }
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "es-CO";
      u.rate = 1.0;
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(u);
    },
    [speaking],
  );

  if (!mod) {
    return (
      <div className="space-y-3 rounded-2xl border border-border bg-surface p-6">
        <h1 className="font-display text-2xl font-semibold">Módulo no encontrado</h1>
        <p className="text-sm text-muted">
          No encontramos la lección solicitada. Vuelve al centro de estudio para elegir un módulo.
        </p>
        <Button asChild variant="outline" size="sm">
          <Link to="/estudio">Volver al Material de Estudio</Link>
        </Button>
      </div>
    );
  }

  const idx = modules.findIndex((m) => m.id === mod.id);
  const prev = idx > 0 ? modules[idx - 1] : undefined;
  const next = idx >= 0 && idx < modules.length - 1 ? modules[idx + 1] : undefined;

  const topic = topicForModule(mod.id);
  const guide = cargo.functionGuides.find((g) => g.relatedModuleIds.includes(mod.id));
  const steps = guide?.steps ?? topic?.steps ?? [];
  const typicalFail = guide?.typicalFail ?? topic?.trap;
  const correctMove = guide?.correctMove ?? topic?.correctMove;

  // Estadísticas de casos prácticos en este módulo
  const nQ = modQuestions.length;
  const currentCase = modQuestions[caseIndex];
  const currentDraft = currentCase ? draftChoices[currentCase.id] : undefined;
  const currentValidated = currentCase
    ? (validatedCases[currentCase.id] ?? globalAnswers[currentCase.id]?.choice)
    : undefined;
  const isCurrentValidated = Boolean(currentValidated);
  const isCurrentCorrect = currentCase ? currentValidated === currentCase.correct : false;

  const validatedCount = modQuestions.filter(
    (q) => Boolean(validatedCases[q.id] ?? globalAnswers[q.id]?.choice),
  ).length;
  const correctCount = modQuestions.filter((q) => {
    const chosen = validatedCases[q.id] ?? globalAnswers[q.id]?.choice;
    return chosen === q.correct;
  }).length;
  const scorePct = validatedCount > 0 ? Math.round((correctCount / validatedCount) * 100) : 0;

  const handleValidateCase = (qId: string, correctId: string) => {
    const picked = draftChoices[qId];
    if (!picked) return;
    setValidatedCases((prevMap) => ({ ...prevMap, [qId]: picked }));
    recordAnswer(qId, picked, picked === correctId);
  };

  const handleRetryCase = (qId: string) => {
    setDraftChoices((prevMap) => {
      const nextMap = { ...prevMap };
      delete nextMap[qId];
      return nextMap;
    });
    setValidatedCases((prevMap) => {
      const nextMap = { ...prevMap };
      delete nextMap[qId];
      return nextMap;
    });
  };

  const handleFinishAndNext = () => {
    markRead(mod.id);
    if (next) {
      navigate({ to: "/estudio/$slug", params: { slug: next.id } });
    } else {
      navigate({ to: "/estudio" });
    }
  };

  const goToStep = (step: LessonStep) => {
    setActiveStep(step);
    window.scrollTo({ top: 140, behavior: "smooth" });
  };

  const showTeoria = viewMode === "completo" || activeStep === "teoria";
  const showNormas = viewMode === "completo" || activeStep === "normas";
  const showFichas = viewMode === "completo" || activeStep === "fichas";
  const showCasos = viewMode === "completo" || activeStep === "casos";

  const activeCard = modFlashcards[cardIndex];
  const checkedPointsCount = Object.values(checkedPoints).filter(Boolean).length;

  return (
    <article className="mx-auto max-w-4xl space-y-6">
      {/* ═══════════════════════════════════════════════════════════════════════
          1. CABECERA CLARA CON NAVEGACIÓN DE RUTA Y BOTÓN LEÍDO / NO LEÍDO
         ═══════════════════════════════════════════════════════════════════════ */}
      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-3.5">
          <div className="flex items-center gap-2">
            <Link
              to="/estudio"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-paper px-3 py-1.5 text-xs font-semibold text-ink hover:border-accent hover:text-accent transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Volver a la Ruta de Estudio
            </Link>
            <span className="text-xs font-mono text-muted">
              Lección {mod.number} de {String(modules.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Selector de modo de lectura */}
            <div className="inline-flex rounded-xl border border-border bg-paper p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setViewMode("guiado")}
                className={cn(
                  "rounded-lg px-2.5 py-1 font-semibold transition-all cursor-pointer",
                  viewMode === "guiado"
                    ? "bg-accent text-white shadow-2xs"
                    : "text-muted hover:text-ink",
                )}
              >
                Paso a Paso (Fácil)
              </button>
              <button
                type="button"
                onClick={() => setViewMode("completo")}
                className={cn(
                  "rounded-lg px-2.5 py-1 font-semibold transition-all cursor-pointer",
                  viewMode === "completo"
                    ? "bg-accent text-white shadow-2xs"
                    : "text-muted hover:text-ink",
                )}
              >
                Todo en 1 página
              </button>
            </div>

            {/* Botón de Apuntes */}
            <button
              type="button"
              onClick={() => setShowNotesDrawer((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer",
                note.trim()
                  ? "border-warn/50 bg-warn-soft text-warn"
                  : "border-border bg-paper text-muted hover:text-ink",
              )}
            >
              <StickyNote className="size-3.5" />
              {note.trim() ? "Mis apuntes (Con nota)" : "Apuntes"}
            </button>

            {/* Botón principal Leído / No leído */}
            <button
              type="button"
              onClick={() => toggleRead(mod.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer shadow-2xs",
                isRead
                  ? "border-ok/40 bg-ok-soft text-ok hover:border-warn/50 hover:bg-warn-soft hover:text-warn"
                  : "border-border bg-paper text-ink hover:border-ok/50 hover:bg-ok-soft hover:text-ok",
              )}
            >
              {isRead ? (
                <>
                  <CheckCircle2 className="size-4" />
                  <span>Leído ✓ (Clic para poner No leído)</span>
                </>
              ) : (
                <>
                  <Circle className="size-4 text-muted" />
                  <span>No leído (Marcar como Leído)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Título y Resumen claro */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-accent text-white font-mono text-[11px]">
              PASO {mod.number} DE TU RUTA · {cargo.shortLabel.toUpperCase()}
            </Badge>
            <Badge variant="paper">{TRACKS[mod.track].label}</Badge>
            <Badge variant="outline">{mod.minutes} min</Badge>
            {coveredIndicators.length > 0 && (
              <Badge variant="ok" className="gap-1">
                <Sparkles className="size-3" />
                Cubre {coveredIndicators.length} indicador
                {coveredIndicators.length > 1 ? "es" : ""} Areandina
              </Badge>
            )}
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-ink">
            {mod.title}
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-muted">{mod.summary}</p>
        </div>

        {/* Cajón desplegable de Apuntes Personales */}
        {showNotesDrawer && (
          <div className="rounded-xl border border-warn/40 bg-warn-soft/30 p-4 space-y-2.5 animate-in fade-in-0 duration-150">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                <StickyNote className="size-4 text-warn" />
                Tus apuntes personales de «{mod.title}» (se guardan solos)
              </span>
              {note.trim() && (
                <button
                  type="button"
                  onClick={() => setNote(mod.id, "")}
                  className="inline-flex items-center gap-1 text-[11px] text-bad hover:underline cursor-pointer"
                >
                  <Trash2 className="size-3" />
                  Borrar nota
                </button>
              )}
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(mod.id, e.target.value)}
              rows={3}
              placeholder="Escribe aquí tu resumen, plazos clave o recordatorios de esta lección…"
              className="w-full rounded-lg border border-border bg-surface p-3 text-sm text-ink placeholder:text-subtle focus:border-accent focus:outline-none"
            />
          </div>
        )}

        {/* ── BARRA DINÁMICA DE 4 PASOS DENTRO DE LA LECCIÓN ── */}
        {viewMode === "guiado" && (
          <div className="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-4">
            <button
              type="button"
              onClick={() => goToStep("teoria")}
              className={cn(
                "flex flex-col items-start rounded-xl border p-3 text-left transition-all cursor-pointer",
                activeStep === "teoria"
                  ? "border-accent bg-accent text-white shadow-xs"
                  : "border-border bg-paper/70 text-ink hover:border-accent/50",
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-mono uppercase tracking-wider font-bold",
                  activeStep === "teoria" ? "text-white/80" : "text-accent",
                )}
              >
                Paso 1 de 4
              </span>
              <span className="mt-0.5 font-display text-sm font-bold flex items-center gap-1.5">
                <BookOpen className="size-4 shrink-0" />
                1. Entiende el Tema
              </span>
              <span
                className={cn(
                  "mt-1 text-[11px]",
                  activeStep === "teoria" ? "text-white/90" : "text-muted",
                )}
              >
                {mod.points.length} conceptos + rol
              </span>
            </button>

            <button
              type="button"
              onClick={() => goToStep("normas")}
              className={cn(
                "flex flex-col items-start rounded-xl border p-3 text-left transition-all cursor-pointer",
                activeStep === "normas"
                  ? "border-accent bg-accent text-white shadow-xs"
                  : "border-border bg-paper/70 text-ink hover:border-accent/50",
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-mono uppercase tracking-wider font-bold",
                  activeStep === "normas" ? "text-white/80" : "text-accent",
                )}
              >
                Paso 2 de 4
              </span>
              <span className="mt-0.5 font-display text-sm font-bold flex items-center gap-1.5">
                <Scale className="size-4 shrink-0" />
                2. Leyes y Artículos
              </span>
              <span
                className={cn(
                  "mt-1 text-[11px]",
                  activeStep === "normas" ? "text-white/90" : "text-muted",
                )}
              >
                {modArticles.length} artículos clave
              </span>
            </button>

            <button
              type="button"
              onClick={() => goToStep("fichas")}
              className={cn(
                "flex flex-col items-start rounded-xl border p-3 text-left transition-all cursor-pointer",
                activeStep === "fichas"
                  ? "border-accent bg-accent text-white shadow-xs"
                  : "border-border bg-paper/70 text-ink hover:border-accent/50",
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-mono uppercase tracking-wider font-bold",
                  activeStep === "fichas" ? "text-white/80" : "text-accent",
                )}
              >
                Paso 3 de 4
              </span>
              <span className="mt-0.5 font-display text-sm font-bold flex items-center gap-1.5">
                <Layers className="size-4 shrink-0" />
                3. Memoriza Plazos
              </span>
              <span
                className={cn(
                  "mt-1 text-[11px]",
                  activeStep === "fichas" ? "text-white/90" : "text-muted",
                )}
              >
                {modFlashcards.length} fichas rápidas
              </span>
            </button>

            <button
              type="button"
              onClick={() => goToStep("casos")}
              className={cn(
                "flex flex-col items-start rounded-xl border p-3 text-left transition-all cursor-pointer",
                activeStep === "casos"
                  ? "border-accent bg-accent text-white shadow-xs"
                  : "border-border bg-paper/70 text-ink hover:border-accent/50",
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-mono uppercase tracking-wider font-bold",
                  activeStep === "casos" ? "text-white/80" : "text-ok",
                )}
              >
                Paso 4 de 4
              </span>
              <span className="mt-0.5 font-display text-sm font-bold flex items-center gap-1.5">
                <ClipboardCheck className="size-4 shrink-0" />
                4. Casos Prácticos
              </span>
              <span
                className={cn(
                  "mt-1 text-[11px]",
                  activeStep === "casos" ? "text-white/90" : "text-muted",
                )}
              >
                {validatedCount}/{nQ} validados
              </span>
            </button>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          PASO 1 DE 4: ENTIENDE EL TEMA Y TU ROL (TEORÍA + FLUJO VISUAL)
         ═══════════════════════════════════════════════════════════════════════ */}
      {showTeoria && (
        <div className="space-y-6 animate-in fade-in-0 duration-200">
          {/* Guía visual de tu rol en este tema */}
          {(guide || topic) && (
            <section className="rounded-2xl border-2 border-accent/35 bg-surface p-5 sm:p-6 shadow-xs space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-xl bg-accent text-white">
                    <Compass className="size-4" />
                  </span>
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-accent font-bold">
                      Aterrizado a tu cargo · {cargo.shortLabel} ({cargo.ficha.denominacion})
                    </p>
                    <h2 className="font-display text-lg sm:text-xl font-bold text-ink">
                      ¿Qué hace exactamente un {cargo.shortLabel} en este tema?
                    </h2>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    toggleSpeech(
                      `${mod.title}. Cómo se resuelve en ${cargo.shortLabel}: ${guide?.howToResolve ?? topic?.how ?? ""}. ${guide?.roleNote ?? ""}`,
                    )
                  }
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer",
                    speaking
                      ? "border-accent bg-accent text-white animate-pulse"
                      : "border-border bg-paper text-ink hover:border-accent",
                  )}
                >
                  {speaking ? <Square className="size-3.5" /> : <Volume2 className="size-3.5 text-accent" />}
                  {speaking ? "Detener audio" : "Escuchar explicación"}
                </button>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-ink bg-paper p-4 rounded-xl border border-border">
                {guide?.howToResolve ?? topic?.how}
              </p>

              {guide?.roleNote && (
                <div className="flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/5 p-3.5 text-sm text-ink">
                  <Sparkles className="size-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-accent">Regla de oro para tu nivel ({cargo.ficha.nivel}): </strong>
                    {guide.roleNote}
                  </div>
                </div>
              )}

              {/* Flujo visual paso a paso del procedimiento */}
              {steps.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted">
                    Orden exacto del procedimiento en la DIAN (Paso a paso):
                  </h3>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {steps.map((step, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-xl border border-border bg-paper/70 p-3.5 text-sm text-ink"
                      >
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-accent text-white font-mono text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comparativa visual: Error Trampa vs. Jugada Ganadora */}
              {(typicalFail || correctMove) && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {typicalFail && (
                    <div className="rounded-xl border-2 border-bad/30 bg-bad-soft/60 p-4 space-y-1.5">
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-bad">
                        <AlertTriangle className="size-4" />
                        ❌ Trampa típica que te hace perder el punto
                      </p>
                      <p className="text-xs sm:text-sm leading-relaxed text-ink font-medium">
                        {typicalFail}
                      </p>
                    </div>
                  )}
                  {correctMove && (
                    <div className="rounded-xl border-2 border-ok/30 bg-ok-soft/60 p-4 space-y-1.5">
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ok">
                        <CheckCircle2 className="size-4" />
                        ✅ Lo que SIEMPRE debes responder en el examen
                      </p>
                      <p className="text-xs sm:text-sm leading-relaxed text-ink font-medium">
                        {correctMove}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Conceptos explicados de forma sencilla e interactiva */}
          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-display text-xl font-bold text-ink">
                  Conceptos que debes dominar ({mod.points.length})
                </h2>
                <p className="text-xs text-muted">
                  Haz clic en «Entendido ✓» en cada tarjeta a medida que avances para llevar tu
                  control visual.
                </p>
              </div>
              <Badge variant="outline" className="font-mono text-xs">
                {checkedPointsCount}/{mod.points.length} leídos aquí
              </Badge>
            </div>

            <ol className="space-y-3">
              {mod.points.map((p, i) => {
                const isChecked = Boolean(checkedPoints[i]);
                return (
                  <li
                    key={p.title}
                    className={cn(
                      "rounded-2xl border p-5 transition-all",
                      isChecked
                        ? "border-ok/40 bg-ok-soft/20"
                        : "border-border bg-surface hover:border-accent/40",
                    )}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-3.5 flex-1">
                        <span
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold",
                            isChecked
                              ? "bg-ok text-white"
                              : "bg-accent/10 text-accent",
                          )}
                        >
                          {isChecked ? <Check className="size-4" /> : String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="space-y-1.5 flex-1">
                          <h3 className="font-display text-base sm:text-lg font-bold text-ink">
                            {p.title}
                          </h3>
                          <p className="text-sm sm:text-[15px] leading-relaxed text-ink">
                            {p.body}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setCheckedPoints((prevMap) => ({ ...prevMap, [i]: !prevMap[i] }))
                        }
                        className={cn(
                          "inline-flex shrink-0 items-center gap-1.5 self-end sm:self-start rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer",
                          isChecked
                            ? "border-ok bg-ok text-white"
                            : "border-border bg-paper text-muted hover:border-ok/50 hover:text-ok",
                        )}
                      >
                        <CheckCircle2 className="size-3.5" />
                        {isChecked ? "Entendido ✓" : "Marcar entendido"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* Resumen de Claves Fijas de Examen */}
          <section className="rounded-2xl border-2 border-warn/40 bg-warn-soft/50 p-5 space-y-3">
            <h2 className="font-display text-lg font-bold text-ink flex items-center gap-2">
              <Lightbulb className="size-5 text-warn" />
              Datos exactos que siempre preguntan en este tema (Chuleta de Examen)
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {mod.examTips.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-2.5 rounded-xl border border-warn/30 bg-surface p-3 text-xs sm:text-sm leading-relaxed text-ink"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-warn" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Indicadores Areandina cubiertos */}
          {coveredIndicators.length > 0 && (
            <section className="rounded-2xl border border-border bg-surface p-5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <Sparkles className="size-4 text-accent" />
                  Indicadores Oficiales Areandina que cubres con esta lección
                </h3>
                <Link to="/indicadores" className="text-xs font-semibold text-accent hover:underline">
                  Ver los 24 indicadores →
                </Link>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {coveredIndicators.map((ind) => (
                  <div
                    key={ind.id}
                    className="rounded-xl border border-border bg-paper/60 p-3.5 space-y-1"
                  >
                    <p className="font-display text-xs font-bold text-ink">{ind.nombre}</p>
                    <p className="text-xs text-muted leading-relaxed">{ind.descripcion}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {viewMode === "guiado" && (
            <div className="flex items-center justify-between rounded-2xl border border-accent/30 bg-accent/5 p-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-accent">
                  ¿Listo el Paso 1?
                </p>
                <p className="text-sm font-semibold text-ink">
                  Ahora revisa los artículos de ley exactos que respaldan este tema.
                </p>
              </div>
              <Button type="button" onClick={() => goToStep("normas")} className="cursor-pointer">
                Ir al Paso 2: Leyes y Artículos ({modArticles.length})
                <ArrowRight className="size-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PASO 2 DE 4: LEYES Y ARTÍCULOS EXACTOS DE ESTA LECCIÓN
         ═══════════════════════════════════════════════════════════════════════ */}
      {showNormas && (
        <section className="space-y-4 animate-in fade-in-0 duration-200">
          <div className="rounded-2xl border border-border bg-surface p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-accent font-bold">
                  Paso 2 de 4 · Sustento Legal en la misma página
                </p>
                <h2 className="font-display text-xl font-bold text-ink flex items-center gap-2 mt-0.5">
                  <Scale className="size-5 text-accent" />
                  Artículos de Ley que te evalúan en este tema ({modArticles.length})
                </h2>
                <p className="text-xs sm:text-sm text-muted mt-1">
                  Cada tarjeta tiene arriba la <strong>«Clave de examen»</strong> resumida en una
                  frase. Haz clic sobre cualquier artículo para leer el texto legal completo.
                </p>
              </div>

              {modArticles.length > 0 && (
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandAllArticles(true)}
                    className="text-xs cursor-pointer"
                  >
                    <ChevronDown className="size-3.5" />
                    Abrir todos
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandAllArticles(false)}
                    className="text-xs cursor-pointer"
                  >
                    <ChevronUp className="size-3.5" />
                    Cerrar todos
                  </Button>
                </div>
              )}
            </div>
          </div>

          {modArticles.length > 0 ? (
            <div className="space-y-3">
              {modArticles.map((art, i) => (
                <ArticleCard
                  key={art.id}
                  articulo={art}
                  defaultOpen={i < 2}
                  forceOpen={expandAllArticles}
                  showLibraryLink
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
              Esta lección se evalúa mediante principios generales y las fuentes citadas abajo.
            </div>
          )}

          <div className="rounded-xl border border-border bg-paper px-4 py-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted">
              Fuentes oficiales de esta lección
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {mod.sources.map((s) => (
                <li
                  key={s}
                  className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs text-ink"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {viewMode === "guiado" && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-accent/30 bg-accent/5 p-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => goToStep("teoria")}
                className="cursor-pointer"
              >
                <ArrowLeft className="size-4" />
                Volver al Paso 1
              </Button>
              <Button type="button" onClick={() => goToStep("fichas")} className="cursor-pointer">
                Ir al Paso 3: Memorizar con Fichas ({modFlashcards.length})
                <ArrowRight className="size-4" />
              </Button>
            </div>
          )}
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PASO 3 DE 4: MEMORIZA RÁPIDO (ENTRENADOR DE FICHAS INTERACTIVO)
         ═══════════════════════════════════════════════════════════════════════ */}
      {showFichas && (
        <section className="space-y-4 animate-in fade-in-0 duration-200">
          <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-accent font-bold">
                  Paso 3 de 4 · Memoria Activa
                </p>
                <h2 className="font-display text-xl font-bold text-ink flex items-center gap-2 mt-0.5">
                  <Layers className="size-5 text-accent" />
                  Fichas de Memorización Rápida ({modFlashcards.length})
                </h2>
                <p className="text-xs sm:text-sm text-muted">
                  Intenta responder mentalmente la pregunta antes de voltear la tarjeta.
                </p>
              </div>

              {modFlashcards.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAllCardsGrid((v) => !v)}
                  className="text-xs cursor-pointer"
                >
                  {showAllCardsGrid ? "Ver 1 por 1 (Modo interactivo)" : "Ver todas en cuadrícula"}
                </Button>
              )}
            </div>

            {modFlashcards.length === 0 ? (
              <p className="text-sm text-muted">
                Este módulo se entrena directamente en los casos prácticos del Paso 4.
              </p>
            ) : !showAllCardsGrid && activeCard ? (
              /* Modo Interactivo 1 por 1 */
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>
                    Ficha <strong className="text-ink">{cardIndex + 1}</strong> de{" "}
                    <strong className="text-ink">{modFlashcards.length}</strong>
                  </span>
                  <span>
                    Dominadas:{" "}
                    <strong className="text-ok">
                      {Object.values(masteredCards).filter(Boolean).length}
                    </strong>{" "}
                    / {modFlashcards.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setCardFlipped((f) => !f)}
                  className={cn(
                    "flex min-h-48 w-full flex-col justify-between rounded-2xl border-2 p-6 text-left transition-all cursor-pointer shadow-xs",
                    cardFlipped
                      ? "border-ok/50 bg-ok-soft/30"
                      : "border-accent/40 bg-paper hover:border-accent",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={cardFlipped ? "ok" : "rule"}>
                      {cardFlipped ? "RESPUESTA OFICIAL" : "PREGUNTA DE MEMORIA"}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent">
                      <Eye className="size-3.5" />
                      {cardFlipped
                        ? "Clic para volver a la pregunta"
                        : "Haz clic aquí para revelar la respuesta"}
                    </span>
                  </div>

                  <div className="my-4">
                    <p className="font-display text-lg sm:text-xl font-bold text-ink leading-snug">
                      {activeCard.front}
                    </p>
                    {cardFlipped && (
                      <div className="mt-4 border-t border-border pt-4 animate-in fade-in-0 duration-150">
                        <p className="text-sm sm:text-base leading-relaxed text-ink font-medium">
                          {activeCard.back}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] text-muted">
                    {cardFlipped
                      ? "¿Ya te la sabías? Márcala abajo y pasa a la siguiente."
                      : "Piensa tu respuesta y toca la tarjeta para comprobar."}
                  </div>
                </button>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={cardIndex === 0}
                    onClick={() => {
                      setCardIndex((i) => Math.max(0, i - 1));
                      setCardFlipped(false);
                    }}
                    className="cursor-pointer"
                  >
                    <ArrowLeft className="size-4" />
                    Ficha anterior
                  </Button>

                  <button
                    type="button"
                    onClick={() => {
                      setMasteredCards((prevMap) => ({
                        ...prevMap,
                        [activeCard.id]: !prevMap[activeCard.id],
                      }));
                    }}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer",
                      masteredCards[activeCard.id]
                        ? "border-ok bg-ok text-white"
                        : "border-border bg-paper text-ink hover:border-ok/50 hover:text-ok",
                    )}
                  >
                    <CheckCircle2 className="size-4" />
                    {masteredCards[activeCard.id] ? "¡Ya me la sé! ✓" : "Marcar como aprendida"}
                  </button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={cardIndex >= modFlashcards.length - 1}
                    onClick={() => {
                      setCardIndex((i) => Math.min(modFlashcards.length - 1, i + 1));
                      setCardFlipped(false);
                    }}
                    className="cursor-pointer"
                  >
                    Siguiente ficha
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            ) : (
              /* Vista en cuadrícula */
              <div className="grid gap-3 sm:grid-cols-2">
                {modFlashcards.map((fc) => (
                  <div
                    key={fc.id}
                    className="rounded-xl border border-border bg-paper p-4 space-y-2"
                  >
                    <p className="font-display text-sm font-bold text-ink">{fc.front}</p>
                    <p className="text-xs sm:text-sm text-muted border-t border-border/70 pt-2 leading-relaxed">
                      {fc.back}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {viewMode === "guiado" && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-accent/30 bg-accent/5 p-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => goToStep("normas")}
                className="cursor-pointer"
              >
                <ArrowLeft className="size-4" />
                Volver al Paso 2
              </Button>
              <Button type="button" onClick={() => goToStep("casos")} className="cursor-pointer">
                Ir al Paso 4: Validar con Casos Prácticos ({nQ})
                <ArrowRight className="size-4" />
              </Button>
            </div>
          )}
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PASO 4 DE 4: VALIDADOR INTERACTIVO DE CASOS PRÁCTICOS (1 POR 1)
         ═══════════════════════════════════════════════════════════════════════ */}
      {showCasos && (
        <section className="space-y-5 animate-in fade-in-0 duration-200">
          {/* Encabezado y Marcador en Tiempo Real de los Casos de la Lección */}
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-ok font-bold">
                  Paso 4 de 4 · Simulación y Validación Real
                </p>
                <h2 className="font-display text-xl font-bold text-ink flex items-center gap-2 mt-0.5">
                  <ClipboardCheck className="size-5 text-accent" />
                  Entrenador de Casos Prácticos de esta Lección ({nQ} casos)
                </h2>
                <p className="text-xs sm:text-sm text-muted">
                  <strong>1)</strong> Elige una opción (A, B, C o D) ·{" "}
                  <strong>2)</strong> Pulsa <strong>«Validar mi respuesta»</strong> para comprobar si
                  acertaste y ver la explicación jurídica detallada.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-border bg-paper px-4 py-2.5 shrink-0">
                <Trophy className={cn("size-5", scorePct >= 70 ? "text-ok" : "text-warn")} />
                <div>
                  <p className="text-[10px] font-mono uppercase text-muted">Tu nota en este tema</p>
                  <p className="font-display text-base font-bold text-ink tabular-nums">
                    {correctCount}/{validatedCount} bien{" "}
                    {validatedCount > 0 ? `(${scorePct}%)` : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Selector numérico de casos (1, 2, 3...) con semáforo de acierto/error */}
            {nQ > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {modQuestions.map((qItem, i) => {
                  const ans = validatedCases[qItem.id] ?? globalAnswers[qItem.id]?.choice;
                  const isCurrent = i === caseIndex;
                  const isOk = ans && ans === qItem.correct;
                  const isBad = ans && ans !== qItem.correct;
                  return (
                    <button
                      key={qItem.id}
                      type="button"
                      onClick={() => setCaseIndex(i)}
                      className={cn(
                        "flex h-9 min-w-9 items-center justify-center rounded-xl border px-2.5 font-mono text-xs font-bold transition-all cursor-pointer",
                        isCurrent && "ring-2 ring-accent ring-offset-1",
                        isOk && "border-ok bg-ok-soft text-ok",
                        isBad && "border-bad bg-bad-soft text-bad",
                        !ans &&
                          (isCurrent
                            ? "border-accent bg-accent text-white"
                            : "border-border bg-paper text-muted hover:text-ink"),
                      )}
                    >
                      Caso {i + 1}
                      {isOk ? " ✓" : isBad ? " ✕" : ""}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Tarjeta Interactiva del Caso Actual */}
            {currentCase ? (
              <div className="rounded-2xl border-2 border-border bg-paper/50 p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-accent text-white font-mono text-xs">
                      Caso práctico {caseIndex + 1} de {nQ}
                    </Badge>
                    {currentCase.source && (
                      <Badge variant="outline" className="text-[11px]">
                        {currentCase.source}
                      </Badge>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      toggleSpeech(
                        `${currentCase.caseText ? `Situación: ${currentCase.caseText}.` : ""} Pregunta: ${currentCase.stem}`,
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted hover:text-ink cursor-pointer"
                  >
                    <Volume2 className="size-3.5 text-accent" />
                    Escuchar caso
                  </button>
                </div>

                {/* Contexto situacional */}
                {currentCase.caseText && (
                  <div className="rounded-xl border-l-4 border-accent bg-surface p-4 text-sm sm:text-[15px] leading-relaxed text-ink shadow-2xs">
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-accent mb-1">
                      Situación en la DIAN:
                    </span>
                    {currentCase.caseText}
                  </div>
                )}

                {/* Enunciado / Pregunta */}
                <h3 className="font-display text-lg sm:text-xl font-bold text-ink leading-snug">
                  {currentCase.stem}
                </h3>

                {/* Opciones A, B, C, D */}
                <div className="space-y-2.5 pt-1">
                  {currentCase.choices.map((ch, optIdx) => {
                    const letter = String.fromCharCode(65 + optIdx);
                    const pickedId = isCurrentValidated ? currentValidated : currentDraft;
                    const isSelected = pickedId === ch.id;
                    const isRightChoice = ch.id === currentCase.correct;

                    return (
                      <button
                        key={ch.id}
                        type="button"
                        disabled={isCurrentValidated}
                        onClick={() =>
                          setDraftChoices((prevMap) => ({
                            ...prevMap,
                            [currentCase.id]: ch.id,
                          }))
                        }
                        className={cn(
                          "flex w-full items-start gap-3.5 rounded-xl border-2 p-4 text-left text-sm transition-all",
                          !isCurrentValidated &&
                            !isSelected &&
                            "border-border bg-surface hover:border-accent/50 cursor-pointer",
                          !isCurrentValidated &&
                            isSelected &&
                            "border-accent bg-accent/10 shadow-xs cursor-pointer",
                          isCurrentValidated &&
                            isRightChoice &&
                            "border-ok bg-ok-soft/80 text-ink font-medium",
                          isCurrentValidated &&
                            isSelected &&
                            !isRightChoice &&
                            "border-bad bg-bad-soft/80 text-ink",
                          isCurrentValidated &&
                            !isSelected &&
                            !isRightChoice &&
                            "border-border bg-surface opacity-60",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-bold",
                            !isCurrentValidated &&
                              isSelected &&
                              "border-accent bg-accent text-white",
                            !isCurrentValidated &&
                              !isSelected &&
                              "border-border bg-paper text-muted",
                            isCurrentValidated &&
                              isRightChoice &&
                              "border-ok bg-ok text-white",
                            isCurrentValidated &&
                              isSelected &&
                              !isRightChoice &&
                              "border-bad bg-bad text-white",
                          )}
                        >
                          {isCurrentValidated && isRightChoice ? (
                            <Check className="size-4" />
                          ) : isCurrentValidated && isSelected && !isRightChoice ? (
                            "✕"
                          ) : (
                            letter
                          )}
                        </span>
                        <div className="flex-1 space-y-1">
                          <span className="block leading-relaxed text-ink">{ch.text}</span>
                          {isCurrentValidated && isRightChoice && (
                            <span className="inline-block text-[11px] font-bold text-ok">
                              ✓ Opción correcta oficial
                            </span>
                          )}
                          {isCurrentValidated && isSelected && !isRightChoice && (
                            <span className="inline-block text-[11px] font-bold text-bad">
                              ✕ Elegiste esta opción (Distractor / Trampa)
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Barra de Acción: Botón VALIDAR RESPUESTA o Retroalimentación Detallada */}
                {!isCurrentValidated ? (
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border">
                    <span className="text-xs text-muted">
                      {currentDraft
                        ? `Seleccionaste la opción ${currentDraft.toUpperCase()}. Pulsa «Validar mi respuesta» para confirmar.`
                        : "Selecciona una de las opciones (A, B, C o D) para activar la validación."}
                    </span>
                    <Button
                      type="button"
                      disabled={!currentDraft}
                      onClick={() => handleValidateCase(currentCase.id, currentCase.correct)}
                      className="gap-2 cursor-pointer font-bold"
                    >
                      <CheckCircle2 className="size-4" />
                      Validar mi respuesta ✓
                    </Button>
                  </div>
                ) : (
                  /* Panel de Retroalimentación Jurídica al Validar */
                  <div
                    className={cn(
                      "rounded-2xl border-2 p-5 space-y-3 animate-in fade-in-0 duration-200",
                      isCurrentCorrect
                        ? "border-ok/50 bg-ok-soft/50"
                        : "border-bad/40 bg-bad-soft/40",
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {isCurrentCorrect ? (
                          <CheckCircle2 className="size-5 text-ok shrink-0" />
                        ) : (
                          <XCircle className="size-5 text-bad shrink-0" />
                        )}
                        <h4 className="font-display text-base font-bold text-ink">
                          {isCurrentCorrect
                            ? "¡Excelente! Acertaste el caso como " + cargo.shortLabel
                            : `Respuesta incorrecta · La opción correcta es la ${currentCase.correct.toUpperCase()}`}
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRetryCase(currentCase.id)}
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:border-accent cursor-pointer"
                      >
                        <RotateCcw className="size-3.5" />
                        Intentar este caso de nuevo
                      </button>
                    </div>

                    <div className="rounded-xl bg-surface p-4 border border-border space-y-2 text-sm">
                      <p className="font-bold text-accent text-xs uppercase tracking-wider">
                        ¿Por qué esta es la respuesta correcta en el examen DIAN?
                      </p>
                      <p className="leading-relaxed text-ink">{currentCase.explanation}</p>
                      {correctMove && (
                        <p className="text-xs text-muted border-t border-border pt-2">
                          <strong className="text-ink">Regla clave de tu rol:</strong> {correctMove}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={caseIndex === 0}
                        onClick={() => setCaseIndex((i) => Math.max(0, i - 1))}
                        className="cursor-pointer"
                      >
                        <ArrowLeft className="size-4" />
                        Caso anterior
                      </Button>

                      {caseIndex < nQ - 1 ? (
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => setCaseIndex((i) => i + 1)}
                          className="cursor-pointer font-bold"
                        >
                          Siguiente caso ({caseIndex + 2} de {nQ})
                          <ArrowRight className="size-4" />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleFinishAndNext}
                          className="bg-ok hover:bg-ok/90 text-white cursor-pointer font-bold"
                        >
                          <CheckCircle2 className="size-4" />
                          ¡Completar lección y pasar a la siguiente! →
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PIE DE LECCIÓN: MARCAR LEÍDO / NO LEÍDO Y AVANZAR EN ORDEN
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-xs space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-base font-bold text-ink">
              {isRead
                ? "✅ Esta lección figura como Leída en tu progreso"
                : "⭕ Esta lección aún figura como No leída (Pendiente)"}
            </p>
            <p className="text-xs text-muted">
              Puedes cambiar su estado entre <strong>Leído</strong> y <strong>No leído</strong> las
              veces que quieras.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => toggleRead(mod.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer",
                isRead
                  ? "border-warn/50 bg-warn-soft text-warn hover:bg-warn-soft/80"
                  : "border-ok/50 bg-ok-soft text-ok hover:bg-ok-soft/80",
              )}
            >
              {isRead ? (
                <>
                  <RotateCcw className="size-4" />
                  Pasar a NO leído
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4" />
                  Marcar como Leído ✓
                </>
              )}
            </button>

            {next && (
              <Button type="button" onClick={handleFinishAndNext} className="cursor-pointer font-bold">
                Marcar Leído y seguir a Lección {next.number} →
              </Button>
            )}
          </div>
        </div>

        <nav className="flex items-center justify-between gap-3 border-t border-border pt-4">
          {prev ? (
            <Link
              to="/estudio/$slug"
              params={{ slug: prev.id }}
              className="group max-w-[48%] rounded-xl border border-border bg-paper/60 px-3.5 py-2.5 text-xs hover:border-accent"
            >
              <span className="block font-mono text-[10px] uppercase text-muted">
                ← Lección anterior ({prev.number})
              </span>
              <span className="mt-0.5 block truncate font-display font-semibold text-ink group-hover:text-accent">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/estudio/$slug"
              params={{ slug: next.id }}
              className="group max-w-[48%] rounded-xl border border-border bg-paper/60 px-3.5 py-2.5 text-right text-xs hover:border-accent"
            >
              <span className="block font-mono text-[10px] uppercase text-muted">
                Siguiente lección ({next.number}) →
              </span>
              <span className="mt-0.5 block truncate font-display font-semibold text-ink group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          ) : null}
        </nav>
      </section>
    </article>
  );
}

