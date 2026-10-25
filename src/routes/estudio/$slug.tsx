import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  ClipboardCheck,
  Compass,
  Eye,
  Layers,
  Lightbulb,
  RotateCcw,
  Scale,
  Sparkles,
  StickyNote,
  Trash2,
} from "lucide-react";
import { TRACKS } from "@/data/types";
import { topicForModule } from "@/data/topics";
import { useProgress } from "@/lib/progress-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  component: ModulePage,
});

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

  const [expandAllArticles, setExpandAllArticles] = useState<boolean | null>(null);
  const [revealedCards, setRevealedCards] = useState<Record<string, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  // Registrar como última lección visitada SIN forzar "Leído" automáticamente
  useEffect(() => {
    if (mod) {
      setLastLesson(mod.id);
    }
    setExpandAllArticles(null);
    setRevealedCards({});
    setSelectedAnswers({});
  }, [mod, setLastLesson]);

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

  const modQuestions = useMemo(() => {
    const fromCargo = questions.filter((q) => q.moduleId === mod.id);
    if (fromCargo.length > 0) return fromCargo;
    return [...QUESTIONS, ...QUESTIONS_CARGOS].filter((q) => q.moduleId === mod.id);
  }, [questions, mod.id]);

  const nQ = modQuestions.length;
  const inlineQuestions = modQuestions.slice(0, 3);
  const modFlashcards = useMemo(
    () => FLASHCARDS.filter((f) => f.moduleId === mod.id),
    [mod.id],
  );
  const modArticles = useMemo(() => articlesForModule(mod.id), [mod.id]);
  const coveredIndicators = useMemo(
    () => indicatorsForCargo(cargo).filter((ind) => ind.moduleId === mod.id),
    [cargo, mod.id],
  );

  const topic = topicForModule(mod.id);
  const guide = cargo.functionGuides.find((g) => g.relatedModuleIds.includes(mod.id));
  const steps = guide?.steps ?? topic?.steps ?? [];
  const typicalFail = guide?.typicalFail ?? topic?.trap;
  const correctMove = guide?.correctMove ?? topic?.correctMove;

  const handleFinishAndNext = () => {
    markRead(mod.id);
    if (next) {
      navigate({ to: "/estudio/$slug", params: { slug: next.id } });
    } else {
      navigate({ to: "/estudio" });
    }
  };

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      {/* ── Barra Superior: Navegación y Estado Leído / No Leído ── */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/estudio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            Volver al Material de Estudio
          </Link>

          {/* Botón explícito para alternar entre Leído y No leído */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => toggleRead(mod.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer shadow-2xs",
                isRead
                  ? "border-ok/40 bg-ok-soft text-ok hover:border-warn/50 hover:bg-warn-soft hover:text-warn"
                  : "border-accent/40 bg-accent text-white hover:bg-accent/90",
              )}
            >
              {isRead ? (
                <>
                  <CheckCircle2 className="size-4" />
                  <span>Leído ✓ · Haz clic para pasar a NO leído</span>
                </>
              ) : (
                <>
                  <Circle className="size-4" />
                  <span>No leído · Marcar como Leído ✓</span>
                </>
              )}
            </button>

            {isRead && (
              <button
                type="button"
                onClick={() => unmarkRead(mod.id)}
                className="inline-flex items-center gap-1 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-medium text-muted hover:border-warn/40 hover:text-warn cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                Dejar como no leído
              </button>
            )}
          </div>
        </div>

        {!inCargoPlan && (
          <div className="rounded-xl border border-warn/30 bg-warn-soft/50 px-4 py-2.5 text-xs text-ink">
            <strong>Nota:</strong> Este módulo es complementario al plan base de{" "}
            <strong>{cargo.shortLabel}</strong>, pero puedes estudiarlo completo aquí mismo.
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="paper">{TRACKS[mod.track].short}</Badge>
          <Badge variant="outline">{mod.minutes} min de estudio</Badge>
          <Badge variant={isRead ? "ok" : "outline"}>
            {isRead ? "Estado: Leído ✓" : "Estado: No leído (Pendiente)"}
          </Badge>
          <span className="font-mono text-xs text-subtle">Módulo {mod.number}</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-balance text-ink">
          {mod.title}
        </h1>
        <p className="text-base leading-relaxed text-muted">{mod.summary}</p>

        {/* Índice rápido de secciones en esta misma página */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-surface p-2.5 text-xs">
          <span className="px-2 font-mono text-[11px] uppercase tracking-wider text-muted">
            En esta página:
          </span>
          {(guide || topic) && (
            <a
              href="#sec-resolucion"
              className="rounded-lg bg-paper px-2.5 py-1 font-medium text-ink hover:text-accent"
            >
              1. Cómo resolver en {cargo.shortLabel}
            </a>
          )}
          <a
            href="#sec-desarrollo"
            className="rounded-lg bg-paper px-2.5 py-1 font-medium text-ink hover:text-accent"
          >
            2. Desarrollo ({mod.points.length})
          </a>
          {modArticles.length > 0 && (
            <a
              href="#sec-normativa"
              className="rounded-lg bg-paper px-2.5 py-1 font-medium text-ink hover:text-accent"
            >
              3. Artículos de Ley ({modArticles.length})
            </a>
          )}
          {modFlashcards.length > 0 && (
            <a
              href="#sec-fichas"
              className="rounded-lg bg-paper px-2.5 py-1 font-medium text-ink hover:text-accent"
            >
              4. Fichas ({modFlashcards.length})
            </a>
          )}
          {nQ > 0 && (
            <a
              href="#sec-preguntas"
              className="rounded-lg bg-paper px-2.5 py-1 font-medium text-ink hover:text-accent"
            >
              5. Preguntas ({nQ})
            </a>
          )}
          <a
            href="#sec-apuntes"
            className="rounded-lg bg-paper px-2.5 py-1 font-medium text-ink hover:text-accent"
          >
            6. Mis apuntes
          </a>
        </div>
      </div>

      {/* ── Indicadores Oficiales Areandina que cubre esta lección ── */}
      {coveredIndicators.length > 0 && (
        <section className="rounded-2xl border border-accent/30 bg-accent/5 p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-accent" />
              <h2 className="font-display text-base font-bold text-ink">
                Indicadores Oficiales Areandina que apruebas con esta lección (
                {coveredIndicators.length})
              </h2>
            </div>
            <Link to="/indicadores" className="text-xs font-semibold text-accent hover:underline">
              Ver los 24 indicadores de {cargo.shortLabel} →
            </Link>
          </div>
          <div className="grid gap-2.5">
            {coveredIndicators.map((ind) => (
              <div
                key={ind.id}
                className="rounded-xl border border-border bg-surface p-3.5 space-y-1.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-display text-xs sm:text-sm font-bold text-ink">
                    {ind.nombre}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {ind.nivel && (
                      <Badge variant="outline" className="text-[10px]">
                        {ind.nivel}
                      </Badge>
                    )}
                    <Badge variant="rule" className="text-[10px] uppercase">
                      {ind.tipo}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted leading-relaxed">{ind.descripcion}</p>
                <p className="text-xs text-ink font-medium pt-0.5">
                  <strong className="text-accent">Tip Areandina:</strong> {ind.tips}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── SECCIÓN 1: Cómo se resuelve en tu cargo (Paso a paso, trampa y jugada correcta) ── */}
      {(guide || topic) && (
        <section
          id="sec-resolucion"
          className="scroll-mt-20 rounded-2xl border-l-4 border-accent border border-border bg-surface p-5 sm:p-6 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-xl font-semibold text-ink flex items-center gap-2">
              <Compass className="size-5 text-accent" />
              Cómo se resuelve en {cargo.shortLabel} ({cargo.ficha.denominacion})
            </h2>
            <Badge variant="paper">Metodología del cargo</Badge>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-ink">
            {guide?.howToResolve ?? topic?.how}
          </p>

          {guide?.roleNote && (
            <div className="rounded-xl border border-accent/25 bg-accent/5 px-4 py-3 text-sm text-ink">
              <strong className="text-accent">Frontera de tu cargo ({cargo.shortLabel}): </strong>
              {guide.roleNote}
            </div>
          )}

          {steps.length > 0 && (
            <div className="space-y-2 pt-1">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                Paso a paso del procedimiento oficial:
              </h3>
              <ol className="space-y-2">
                {steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-border bg-paper px-3.5 py-2.5 text-sm text-ink"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-white font-mono text-[11px] font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {(typicalFail || correctMove) && (
            <div className="grid gap-3 sm:grid-cols-2 pt-1">
              {typicalFail && (
                <div className="rounded-xl border border-bad/30 bg-bad-soft/60 p-4 space-y-1">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-bad">
                    <AlertTriangle className="size-3.5" />
                    Error o trampa típica en el examen
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed text-ink">{typicalFail}</p>
                </div>
              )}
              {correctMove && (
                <div className="rounded-xl border border-ok/30 bg-ok-soft/60 p-4 space-y-1">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ok">
                    <CheckCircle2 className="size-3.5" />
                    Jugada correcta que debes marcar
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed text-ink">{correctMove}</p>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* ── SECCIÓN 2: Por qué cae y Desarrollo Punto a Punto ── */}
      <section id="sec-desarrollo" className="scroll-mt-20 space-y-4">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="font-display text-lg font-semibold text-ink flex items-center gap-2">
            <BookOpen className="size-4 text-accent" />
            Por qué cae en el examen DIAN 2676
          </h2>
          <p className="mt-2 text-sm sm:text-base leading-relaxed text-ink">{mod.why}</p>
        </div>

        <h2 className="font-display text-xl font-semibold text-ink pt-2">
          Desarrollo temático punto a punto ({mod.points.length})
        </h2>

        <ol className="space-y-4">
          {mod.points.map((p, i) => (
            <li
              key={p.title}
              className="rounded-2xl border border-border bg-surface p-5 shadow-2xs"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-mono text-xs font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="space-y-2 flex-1">
                  <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-ink">{p.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="rounded-2xl border border-warn/35 bg-warn-soft/50 p-5 space-y-3">
          <h2 className="font-display text-lg font-semibold text-ink flex items-center gap-2">
            <Lightbulb className="size-5 text-warn" />
            Claves fijas de examen para memorizar
          </h2>
          <ul className="space-y-2">
            {mod.examTips.map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-warn" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SECCIÓN 3: Normativa y Artículos de Ley Transcritos en esta misma página ── */}
      <section id="sec-normativa" className="scroll-mt-20 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink flex items-center gap-2">
              <Scale className="size-5 text-accent" />
              Artículos y Normativa de esta Lección ({modArticles.length})
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              Texto normativo transcrito aquí mismo para que no tengas que salir a buscar las leyes
              por fuera.
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
                Expandir todos
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setExpandAllArticles(false)}
                className="text-xs cursor-pointer"
              >
                <ChevronUp className="size-3.5" />
                Contraer todos
              </Button>
            </div>
          )}
        </div>

        {modArticles.length > 0 ? (
          <div className="space-y-3">
            {modArticles.map((art, i) => (
              <ArticleCard
                key={art.id}
                articulo={art}
                defaultOpen={i === 0}
                forceOpen={expandAllArticles}
                showLibraryLink
              />
            ))}
          </div>
        ) : null}

        {/* Fuentes normativas citadas */}
        <div className="rounded-xl border border-border bg-paper px-4 py-3">
          <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted">
            Fuentes normativas y técnicas de referencia
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
      </section>

      {/* ── SECCIÓN 4: Fichas de Memorización Rápida (Flashcards en la misma página) ── */}
      {modFlashcards.length > 0 && (
        <section id="sec-fichas" className="scroll-mt-20 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink flex items-center gap-2">
                <Layers className="size-5 text-accent" />
                Fichas de Repaso Rápido de esta Lección ({modFlashcards.length})
              </h2>
              <p className="text-xs text-muted">
                Haz clic en cada ficha para revelar la respuesta exacta de examen.
              </p>
            </div>
            <Link to="/tarjetas" className="text-xs font-semibold text-accent hover:underline">
              Ir al mazo completo de fichas →
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {modFlashcards.map((fc) => {
              const revealed = Boolean(revealedCards[fc.id]);
              return (
                <button
                  key={fc.id}
                  type="button"
                  onClick={() =>
                    setRevealedCards((prevMap) => ({ ...prevMap, [fc.id]: !prevMap[fc.id] }))
                  }
                  className={cn(
                    "flex flex-col justify-between rounded-xl border p-4 text-left transition-all cursor-pointer",
                    revealed
                      ? "border-accent/50 bg-accent/5"
                      : "border-border bg-surface hover:border-accent/40",
                  )}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                        {TRACKS[fc.track].short}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                        <Eye className="size-3" />
                        {revealed ? "Ocultar respuesta" : "Ver respuesta"}
                      </span>
                    </div>
                    <p className="font-display text-sm font-semibold text-ink">{fc.front}</p>
                    {revealed && (
                      <p className="mt-2 border-t border-border/70 pt-2 text-xs sm:text-sm leading-relaxed text-ink">
                        {fc.back}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* ── SECCIÓN 5: Preguntas de Entrenamiento en esta misma página ── */}
      {nQ > 0 && (
        <section id="sec-preguntas" className="scroll-mt-20 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink flex items-center gap-2">
                <ClipboardCheck className="size-5 text-accent" />
                Entrenamiento inmediato de la lección ({nQ} preguntas)
              </h2>
              <p className="text-xs text-muted">
                Comprueba lo aprendido respondiendo aquí mismo o abre el simulador completo del
                módulo.
              </p>
            </div>
            <Button asChild size="sm">
              <Link to="/practica/$bank" params={{ bank: `mod-${mod.id}` }}>
                <ClipboardCheck className="size-4" />
                Practicar las {nQ} preguntas en modo simulador →
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {inlineQuestions.map((q, qIdx) => {
              const chosen = selectedAnswers[q.id];
              const answered = chosen !== undefined;
              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-border bg-surface p-5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-accent">
                      Caso práctico {qIdx + 1} de {inlineQuestions.length}
                    </span>
                    {q.source && (
                      <Badge variant="outline" className="text-[10px]">
                        {q.source}
                      </Badge>
                    )}
                  </div>
                  {q.caseText && (
                    <p className="text-xs sm:text-sm leading-relaxed text-muted italic bg-paper p-3 rounded-xl border border-border">
                      {q.caseText}
                    </p>
                  )}
                  <p className="font-display text-sm sm:text-base font-semibold text-ink">
                    {q.stem}
                  </p>
                  <div className="space-y-2 pt-1">
                    {q.choices.map((ch) => {
                      const isCorrect = ch.id === q.correct;
                      const isSelected = chosen === ch.id;
                      return (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() =>
                            setSelectedAnswers((prevAns) => ({ ...prevAns, [q.id]: ch.id }))
                          }
                          className={cn(
                            "flex w-full items-start gap-2.5 rounded-xl border p-3 text-left text-xs sm:text-sm transition-colors cursor-pointer",
                            !answered && "border-border bg-paper/50 hover:border-accent/50",
                            answered && isCorrect && "border-ok bg-ok-soft/60 text-ink font-medium",
                            answered &&
                              isSelected &&
                              !isCorrect &&
                              "border-bad bg-bad-soft/60 text-ink",
                            answered && !isSelected && !isCorrect && "border-border opacity-70",
                          )}
                        >
                          <span className="font-mono font-bold text-xs uppercase mt-0.5">
                            {ch.id}.
                          </span>
                          <span className="flex-1 leading-relaxed">{ch.text}</span>
                        </button>
                      );
                    })}
                  </div>
                  {answered && (
                    <div
                      className={cn(
                        "rounded-xl border p-3.5 text-xs sm:text-sm leading-relaxed",
                        chosen === q.correct
                          ? "border-ok/40 bg-ok-soft/50 text-ink"
                          : "border-warn/40 bg-warn-soft/50 text-ink",
                      )}
                    >
                      <strong className="block mb-1">
                        {chosen === q.correct
                          ? "✓ ¡Respuesta correcta!"
                          : `✕ Respuesta correcta: Opción ${q.correct.toUpperCase()}`}
                      </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── SECCIÓN 6: Mis Apuntes Personales de la Lección ── */}
      <section
        id="sec-apuntes"
        className="scroll-mt-20 rounded-2xl border border-border bg-surface p-5 space-y-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <StickyNote className="size-5 text-warn" />
            <h2 className="font-display text-lg font-semibold text-ink">
              Mis apuntes personales de esta lección
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted">
              {note.trim() ? "Guardado automáticamente en tu navegador" : "Sin apuntes aún"}
            </span>
            {note.trim() && (
              <button
                type="button"
                onClick={() => setNote(mod.id, "")}
                className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-muted hover:text-bad cursor-pointer"
              >
                <Trash2 className="size-3" />
                Borrar nota
              </button>
            )}
          </div>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(mod.id, e.target.value)}
          rows={4}
          placeholder="Escribe aquí tus resúmenes, plazos clave (ej. 15 días excepciones, 5 años prescripción) o recordatorios para este módulo…"
          className="w-full rounded-xl border border-border bg-paper p-3.5 text-sm text-ink placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
        />
      </section>

      {/* ── Barra Inferior de Cierre: Control Leído / No Leído + Siguiente Lección ── */}
      <section className="rounded-2xl border border-border bg-surface p-5 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-base font-semibold text-ink">
              {isRead ? "Esta lección está marcada como Leída ✓" : "¿Ya terminaste de estudiar esta lección?"}
            </p>
            <p className="text-xs text-muted">
              {isRead
                ? "Si quieres repasarla después como pendiente, puedes volver a ponerla como No leída con un clic."
                : "Márcala como leída cuando domines sus puntos, artículos y casos prácticos."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => toggleRead(mod.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer",
                isRead
                  ? "border-warn/40 bg-warn-soft text-warn hover:bg-warn-soft/80"
                  : "border-ok/40 bg-ok-soft text-ok hover:bg-ok-soft/80",
              )}
            >
              {isRead ? (
                <>
                  <RotateCcw className="size-4" />
                  Marcar como NO leído
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4" />
                  Marcar como Leído ✓
                </>
              )}
            </button>

            {next && (
              <Button type="button" size="sm" onClick={handleFinishAndNext} className="cursor-pointer">
                Marcar leído y pasar al siguiente →
              </Button>
            )}
          </div>
        </div>

        <nav className="flex items-center justify-between gap-3 border-t border-border pt-4">
          {prev ? (
            <Link
              to="/estudio/$slug"
              params={{ slug: prev.id }}
              className="max-w-[46%] text-sm text-muted hover:text-ink"
            >
              <span className="flex items-center gap-1.5">
                <ArrowLeft className="size-4 shrink-0" />
                <span className="line-clamp-1">
                  {prev.number} · {prev.title}
                </span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/estudio/$slug"
              params={{ slug: next.id }}
              className="max-w-[46%] text-right text-sm text-muted hover:text-ink"
            >
              <span className="flex items-center justify-end gap-1.5">
                <span className="line-clamp-1">
                  {next.number} · {next.title}
                </span>
                <ArrowRight className="size-4 shrink-0" />
              </span>
            </Link>
          ) : null}
        </nav>
      </section>
    </article>
  );
}
