import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Flag,
  RotateCcw,
  Scale,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SIMULACRO } from "@/data/questions";
import { useProgress } from "@/lib/progress-store";
import { useCargo } from "@/lib/use-cargo";
import { formatPuntaje } from "@/lib/cnsc-score";
import { clearExamSession, loadExamSession } from "@/lib/quiz-session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/simulacro/")({ component: SimulacroHome });

function SimulacroHome() {
  const history = useProgress((s) => s.simulacros);
  const { cargo, ficha } = useCargo();
  const [pending, setPending] = useState<ReturnType<typeof loadExamSession>>(null);
  useEffect(() => {
    setPending(loadExamSession());
  }, []);
  const total = SIMULACRO.funcional + SIMULACRO.comportamental + SIMULACRO.integridad;
  const pendingTimed = pending?.remainingMs != null;

  return (
    <div className="space-y-8">
      {/* ── Hero Paso 4: Simulador Oficial CNSC ── */}
      <header className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
        <div className="absolute inset-y-0 left-0 w-2 bg-rule" />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="rule" className="text-[10px] font-mono">
                PASO 4 DE 5 · SIMULADOR OFICIAL CNSC
              </Badge>
              <Badge variant="outline" className="text-[10px] font-mono">
                {ficha.denominacion} {ficha.opec ? `· OPEC ${ficha.opec}` : ""}
              </Badge>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Simulador de Pruebas Escritas · Proceso DIAN 2676
            </h1>
            <p className="text-sm leading-relaxed text-muted">
              Réplica fiel de la jornada oficial CNSC/Areandina para{" "}
              <strong className="text-ink">
                {ficha.denominacion} ({ficha.codigo}-{ficha.grado})
              </strong>
              : un cuadernillo único, hoja de respuestas interactiva y tres bloques evaluados el
              mismo día con puntaje truncado a dos decimales.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 shrink-0 sm:min-w-80">
            <div className="rounded-xl border border-border bg-paper/70 p-3 text-center">
              <span className="block font-mono text-[10px] uppercase text-muted">Preguntas</span>
              <span className="mt-1 block font-display text-xl font-bold text-ink tabular-nums">
                {total} ítems
              </span>
            </div>
            <div className="rounded-xl border border-border bg-paper/70 p-3 text-center">
              <span className="block font-mono text-[10px] uppercase text-muted">Duración</span>
              <span className="mt-1 block font-display text-xl font-bold text-accent tabular-nums">
                {SIMULACRO.minutes} min
              </span>
            </div>
            <div className="rounded-xl border border-border bg-paper/70 p-3 text-center">
              <span className="block font-mono text-[10px] uppercase text-muted">Corte Mín.</span>
              <span className="mt-1 block font-display text-xl font-bold text-bad tabular-nums">
                {SIMULACRO.passFuncional}.00
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Jornada en curso (si hay sesión guardada) ── */}
      {pending && pending.cargoId === cargo.id ? (
        <div className="rounded-2xl border-2 border-accent/50 bg-accent/5 px-5 py-4 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
                Jornada de Simulacro en Curso
              </p>
            </div>
            <p className="font-display text-base font-bold text-ink">
              Tienes un examen guardado ({pendingTimed ? "Modo Con Reloj" : "Modo Sin Tiempo"})
            </p>
            <p className="text-xs text-muted">
              Puedes retomarlo exactamente en el punto en que lo dejaste o anularlo para iniciar uno
              nuevo.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Button asChild size="sm">
              <Link to="/simulacro/examen" search={{ reloj: pendingTimed }}>
                Continuar simulacro
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                clearExamSession();
                setPending(null);
              }}
            >
              <RotateCcw className="size-3.5" />
              Anular y empezar otro
            </Button>
          </div>
        </div>
      ) : null}

      {/* ── Selección de Modalidad: Con Reloj Oficial vs Sin Tiempo ── */}
      <section className="space-y-3">
        <div>
          <h2 className="font-display text-xl font-bold text-ink">
            1. Elige la Modalidad de tu Simulacro
          </h2>
          <p className="text-xs text-muted">
            Puedes presentar la prueba bajo presión real de tiempo o en modo estudio tranquilo.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/simulacro/examen"
            search={{ reloj: true }}
            className="group flex flex-col justify-between rounded-2xl border-2 border-accent/50 bg-surface p-6 transition-all hover:border-accent hover:shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Clock className="size-5" />
                </span>
                <Badge variant="default" className="text-[10px]">
                  Recomendado · Condiciones Reales
                </Badge>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-ink">
                Simulacro Oficial Con Tiempo ({SIMULACRO.minutes} min)
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
                El cronómetro corre igual que en el salón de examen CNSC. Al cumplirse los{" "}
                {SIMULACRO.minutes} minutos, la hoja de respuestas se cierra y califica
                automáticamente.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-border/80 pt-3">
              <span className="font-mono text-xs text-muted">{total} preguntas · 1 sesión</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
                Iniciar con cronómetro <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>

          <Link
            to="/simulacro/examen"
            search={{ reloj: false }}
            className="group flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent hover:shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-rule/10 text-rule">
                  <Flag className="size-5" />
                </span>
                <Badge variant="outline" className="text-[10px]">
                  Modo Estudio Sin Presión
                </Badge>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-ink">
                Simulacro Sin Límite de Tiempo
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
                Mismo cuadernillo de {total} ítems y misma hoja de respuestas oficial, pero sin
                reloj. Ideal para analizar cada caso con calma antes de medir tu velocidad.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-border/80 pt-3">
              <span className="font-mono text-xs text-muted">{total} preguntas · Sin reloj</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rule group-hover:translate-x-1 transition-transform">
                Iniciar sin tiempo <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Estructura de los 3 Bloques del Cuadernillo ── */}
      <section className="space-y-3">
        <div>
          <h2 className="font-display text-xl font-bold text-ink">
            2. Estructura del Cuadernillo Oficial ({total} Ítems)
          </h2>
          <p className="text-xs text-muted">
            Las tres pruebas se responden en orden continuo dentro de la misma jornada.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-bad-soft px-2 py-0.5 font-mono text-xs font-bold text-bad">
                BLOQUE 01
              </span>
              <Badge variant="bad" className="text-[10px]">
                Eliminatoria · Mín {SIMULACRO.passFuncional}
              </Badge>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Scale className="size-4 text-accent" />
              <h3 className="font-display text-base font-bold text-ink">
                Competencias Funcionales ({SIMULACRO.funcional} ítems)
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-muted">
              Evalúa las funciones del MERF de tu empleo (D.L. 927 art. 58), Estatuto Tributario y
              CPACA mediante casos situacionales de única respuesta.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-accent/10 px-2 py-0.5 font-mono text-xs font-bold text-accent">
                BLOQUE 02
              </span>
              <Badge variant="outline" className="text-[10px]">
                Clasificatoria
              </Badge>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <ClipboardCheck className="size-4 text-accent" />
              <h3 className="font-display text-base font-bold text-ink">
                Competencias Comportamentales ({SIMULACRO.comportamental} ítems)
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-muted">
              Evalúa las conductas asociadas a tu nivel jerárquico (Diccionario DIAN art. 59):
              Trabajo en equipo, Adaptabilidad, Comunicación efectiva y Ética.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-ok-soft px-2 py-0.5 font-mono text-xs font-bold text-ok">
                BLOQUE 03
              </span>
              <Badge variant="outline" className="text-[10px]">
                Clasificatoria
              </Badge>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <ShieldCheck className="size-4 text-ok" />
              <h3 className="font-display text-base font-bold text-ink">
                Prueba de Integridad ({SIMULACRO.integridad} ítems)
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-muted">
              Evalúa la rectitud y prelación del interés general sobre el particular conforme a los
              5 valores del Código de Integridad (Ley 2016 de 2020).
            </p>
          </div>
        </div>
      </section>

      {/* ── Reglas Oficiales de Calificación ── */}
      <section className="rounded-2xl border border-border bg-paper/70 p-5 space-y-3">
        <h2 className="font-display text-base font-bold text-ink">
          Reglas de Calificación Oficial (Acuerdo CNSC 21 de 2025 · Anexo Técnico)
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 text-xs leading-relaxed text-muted">
          <div className="rounded-xl border border-border bg-surface p-3.5">
            <strong className="text-ink block mb-1">1. Escala 0,00 a 100,00 truncada</strong>
            El puntaje se calcula con dos decimales truncados (sin redondear). Por ejemplo, 69,99 no
            sube a 70,00.
          </div>
          <div className="rounded-xl border border-border bg-surface p-3.5">
            <strong className="text-ink block mb-1">2. Hoja de respuestas interactiva</strong>
            Puedes avanzar, retroceder y marcar preguntas con bandera para revisarlas antes de
            entregar el cuadernillo.
          </div>
        </div>
      </section>

      {/* ── Historial de Simulacros Presentados ── */}
      {history.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-ink">
            Historial de Jornadas Presentadas ({history.length})
          </h2>
          <div className="divide-y divide-border rounded-2xl border border-border bg-surface overflow-hidden">
            {history.map((h) => (
              <div
                key={h.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-3.5"
              >
                <div className="flex items-center gap-2.5">
                  {h.passed ? (
                    <CheckCircle2 className="size-4 text-ok shrink-0" />
                  ) : (
                    <XCircle className="size-4 text-bad shrink-0" />
                  )}
                  <span className="text-sm font-medium text-ink">
                    {new Date(h.at).toLocaleDateString("es-CO", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <Badge variant={h.passed ? "ok" : "bad"} className="text-[10px]">
                    {h.passed ? "Superó Umbral 70.00" : "Bajo Umbral Funcional"}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 font-bold",
                      h.passed ? "bg-ok-soft text-ok" : "bg-bad-soft text-bad",
                    )}
                  >
                    Global: {formatPuntaje(h.total)}
                  </span>
                  <span className="rounded-md bg-paper px-2 py-0.5 text-ink">
                    F: {formatPuntaje(h.funcional)}
                  </span>
                  <span className="rounded-md bg-paper px-2 py-0.5 text-ink">
                    C: {formatPuntaje(h.comportamental)}
                  </span>
                  <span className="rounded-md bg-paper px-2 py-0.5 text-ink">
                    I: {formatPuntaje(h.integridad)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
