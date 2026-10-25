import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Flag,
  Layers,
  RotateCcw,
  Scale,
  Shuffle,
  Sparkles,
} from "lucide-react";
import { TRACKS, type TrackId } from "@/data/types";
import { useProgress, trackAccuracy } from "@/lib/progress-store";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCargo } from "@/lib/use-cargo";
import { clearPracticeSession, loadPracticeSession } from "@/lib/quiz-session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/practica/")({ component: PracticaIndex });

function PracticaIndex() {
  const answers = useProgress((s) => s.answers);
  const readModules = useProgress((s) => s.readModules);
  const toggleRead = useProgress((s) => s.toggleRead);
  const { cargo, ficha, modules, questions, flashcards } = useCargo();
  const [pending, setPending] = useState<ReturnType<typeof loadPracticeSession>>(null);

  useEffect(() => {
    const s = loadPracticeSession();
    setPending(s && s.cargoId === cargo.id ? s : null);
  }, [cargo.id]);

  const qIds = new Set(questions.map((q) => q.id));
  const answeredTotal = Object.keys(answers).filter((id) => qIds.has(id)).length;
  const correctTotal = Object.entries(answers).filter(([id, v]) => qIds.has(id) && v.correct).length;
  const globalPct = answeredTotal ? Math.round((correctTotal / answeredTotal) * 100) : 0;

  const missed = Object.entries(answers)
    .filter(([id, v]) => qIds.has(id) && !v.correct)
    .map(([id]) => id);

  return (
    <div className="space-y-8">
      {/* ── Hero Paso 3: Entrenador de Casos con Validación ── */}
      <header className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
        <div className="absolute inset-y-0 left-0 w-2 bg-accent" />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" className="text-[10px] font-mono">
                PASO 3 DE 5 · ENTRENADOR INTERACTIVO
              </Badge>
              <Badge variant="outline" className="text-[10px] font-mono">
                {ficha.denominacion} {ficha.opec ? `· OPEC ${ficha.opec}` : ""}
              </Badge>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Entrenador de Casos Situacionales con Validación Paso a Paso
            </h1>
            <p className="text-sm leading-relaxed text-muted">
              Entrena con casos reales tipo CNSC/Areandina. En cada pregunta{" "}
              <strong className="text-ink">1) Seleccionas tu opción</strong>,{" "}
              <strong className="text-ink">2) Presionas «Validar mi respuesta ✓»</strong> y recibes la
              justificación jurídica exacta del Estatuto Tributario, CPACA y MERF.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 shrink-0 sm:min-w-80">
            <div className="rounded-xl border border-border bg-paper/70 p-3 text-center">
              <span className="block font-mono text-[10px] uppercase text-muted">Resueltos</span>
              <span className="mt-1 block font-display text-xl font-bold text-ink tabular-nums">
                {answeredTotal}/{questions.length}
              </span>
            </div>
            <div className="rounded-xl border border-border bg-paper/70 p-3 text-center">
              <span className="block font-mono text-[10px] uppercase text-muted">Efectividad</span>
              <span
                className={cn(
                  "mt-1 block font-display text-xl font-bold tabular-nums",
                  globalPct >= 70 ? "text-ok" : "text-accent",
                )}
              >
                {globalPct}%
              </span>
            </div>
            <div className="rounded-xl border border-border bg-paper/70 p-3 text-center">
              <span className="block font-mono text-[10px] uppercase text-muted">Por corregir</span>
              <span
                className={cn(
                  "mt-1 block font-display text-xl font-bold tabular-nums",
                  missed.length > 0 ? "text-bad" : "text-ok",
                )}
              >
                {missed.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Sesión en curso (si dejó una práctica a medias) ── */}
      {pending ? (
        <div className="rounded-2xl border-2 border-accent/50 bg-accent/5 px-5 py-4 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
                Práctica en curso guardada
              </p>
            </div>
            <p className="font-display text-base font-bold text-ink">{pending.title}</p>
            <p className="text-xs text-muted">
              Vas en la pregunta {pending.index + 1} de {pending.ids.length}. Puedes retomar donde
              quedaste o reiniciar.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Button asChild size="sm">
              <Link to="/practica/$bank" params={{ bank: pending.bank }}>
                Continuar práctica
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                clearPracticeSession();
                setPending(null);
              }}
            >
              <RotateCcw className="size-3.5" />
              Empezar de cero
            </Button>
          </div>
        </div>
      ) : null}

      {/* ── Los 3 Bloques Oficiales del Examen + Mixto y Fallos ── */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              1. Entrenar por Bloque Oficial del Examen
            </h2>
            <p className="text-xs text-muted">
              Empieza por Competencias Funcionales (eliminatoria con mínimo 70,00 puntos).
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/tarjetas">
              <Sparkles className="size-3.5 text-accent" />
              Repasar {flashcards.length} fichas de memoria
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {(Object.keys(TRACKS) as TrackId[]).map((id) => {
            const qs = questions.filter((q) => q.track === id);
            const st = trackAccuracy(
              answers,
              qs.map((q) => q.id),
            );
            const isFuncional = id === "funcional";
            const Icon =
              id === "funcional" ? Scale : id === "comportamental" ? ClipboardCheck : Flag;

            return (
              <Link
                key={id}
                to="/practica/$bank"
                params={{ bank: id }}
                className={cn(
                  "group flex flex-col justify-between rounded-2xl border bg-surface p-5 transition-all hover:border-accent hover:shadow-sm",
                  isFuncional ? "border-2 border-accent/45" : "border-border",
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="size-5" />
                    </span>
                    <Badge variant={isFuncional ? "bad" : "outline"} className="text-[10px]">
                      {isFuncional ? "Eliminatoria · Mín 70" : "Clasificatoria"}
                    </Badge>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">
                    {TRACKS[id].label}
                  </h3>
                  <p className="mt-1 text-xs text-muted leading-relaxed">{TRACKS[id].blurb}</p>
                </div>

                <div className="mt-5 space-y-2 border-t border-border/80 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">
                      {st.answered}/{qs.length} resueltas ·{" "}
                      <strong className="text-ink">{st.correct} bien</strong>
                    </span>
                    <span className="font-mono font-bold text-accent tabular-nums">{st.pct}%</span>
                  </div>
                  <Progress value={qs.length ? (st.answered / qs.length) * 100 : 0} />
                  <span className="inline-flex items-center gap-1 pt-1 text-xs font-bold text-accent group-hover:translate-x-0.5 transition-transform">
                    Practicar {qs.length} casos <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Modos rápidos: Mixto 20 preguntas y Repasar Fallos */}
        <div className="grid gap-4 sm:grid-cols-2 pt-1">
          <Link
            to="/practica/$bank"
            params={{ bank: "mixto" }}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5 transition-all hover:border-accent hover:shadow-xs"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Shuffle className="size-4 text-accent" />
                <Badge variant="paper" className="text-[10px]">
                  Entrenamiento Rápido
                </Badge>
              </div>
              <h3 className="font-display text-lg font-bold text-ink">
                Mixto Aleatorio (20 casos)
              </h3>
              <p className="text-xs text-muted">
                Combina casos funcionales, comportamentales y de integridad para calentar antes del
                simulacro.
              </p>
            </div>
            <ArrowRight className="size-5 shrink-0 text-accent group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/practica/$bank"
            params={{ bank: "fallos" }}
            className={cn(
              "group flex items-center justify-between gap-4 rounded-2xl border p-5 transition-all hover:shadow-xs",
              missed.length > 0
                ? "border-bad/40 bg-bad-soft/25 hover:border-bad"
                : "border-border bg-surface hover:border-accent",
            )}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <AlertTriangle
                  className={cn("size-4", missed.length > 0 ? "text-bad" : "text-ok")}
                />
                <Badge variant={missed.length > 0 ? "bad" : "ok"} className="text-[10px]">
                  {missed.length > 0 ? `${missed.length} por corregir` : "0 fallos pendientes"}
                </Badge>
              </div>
              <h3 className="font-display text-lg font-bold text-ink">
                Laboratorio de Fallos de tu Cargo
              </h3>
              <p className="text-xs text-muted">
                {missed.length > 0
                  ? `Repasa y valida nuevamente las ${missed.length} preguntas que has fallado hasta dominarlas al 100%.`
                  : "¡Excelente! No tienes preguntas falladas pendientes en este momento."}
              </p>
            </div>
            <ArrowRight className="size-5 shrink-0 text-ink group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ── Entrenar Tema por Tema (En el mismo orden 01 → 21 del Material de Estudio) ── */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              2. Practicar Tema por Tema (Orden Guiado 01 → {String(modules.length).padStart(2, "0")})
            </h2>
            <p className="text-xs text-muted">
              Cada tarjeta conecta la teoría del módulo con sus casos prácticos para que estudies y
              valides al instante.
            </p>
          </div>
          <Button asChild variant="secondary" size="sm">
            <Link to="/estudio">
              <BookOpen className="size-4" />
              Ir al Material de Estudio
            </Link>
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {modules.map((m) => {
            const qs = questions.filter((q) => q.moduleId === m.id);
            if (!qs.length) return null;
            const st = trackAccuracy(
              answers,
              qs.map((q) => q.id),
            );
            const isRead = Boolean(readModules[m.id]);

            return (
              <div
                key={m.id}
                className={cn(
                  "flex flex-col justify-between rounded-2xl border bg-surface p-4 transition-all hover:border-accent/60 hover:shadow-2xs",
                  isRead ? "border-ok/35" : "border-border",
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-accent/10 px-2 py-0.5 font-mono text-xs font-bold text-accent">
                        Lección {m.number}
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        {TRACKS[m.track].label.replace("Competencias ", "")}
                      </Badge>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleRead(m.id)}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold transition-colors cursor-pointer",
                        isRead
                          ? "border-ok/40 bg-ok-soft text-ok hover:bg-ok/20"
                          : "border-border bg-paper text-muted hover:text-ink",
                      )}
                      title="Cambiar entre Leído y No leído"
                    >
                      <CheckCircle2 className="size-3" />
                      {isRead ? "Teoría Leída ✓" : "No leído"}
                    </button>
                  </div>

                  <h3 className="mt-2.5 font-display text-base font-bold text-ink">{m.title}</h3>
                  <p className="mt-1 text-xs text-muted line-clamp-2">{m.summary}</p>
                </div>

                <div className="mt-4 space-y-2.5 border-t border-border/70 pt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">
                      Casos: <strong className="text-ink">{st.answered}/{qs.length}</strong> ·{" "}
                      <strong className="text-ok">{st.correct} bien</strong>
                    </span>
                    <span className="font-mono font-bold text-ink tabular-nums">{st.pct}%</span>
                  </div>
                  <Progress value={qs.length ? (st.answered / qs.length) * 100 : 0} />

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <Button asChild size="sm" className="flex-1">
                      <Link to="/practica/$bank" params={{ bank: `mod-${m.id}` }}>
                        <Layers className="size-3.5" />
                        Practicar {qs.length} casos
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link to="/estudio/$slug" params={{ slug: m.id }}>
                        <BookOpen className="size-3.5" />
                        Ver teoría
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
