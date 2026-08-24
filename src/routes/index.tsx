import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Flag,
  Scale,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { TRACKS, type TrackId, CARGO_FAMILIES, type CargoFamily } from "@/data/types";
import { CATALOG } from "@/data/cargos";
import { examCountdown, useProgress, trackAccuracy } from "@/lib/progress-store";
import { useCargoStore } from "@/lib/cargo-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useCargo } from "@/lib/use-cargo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { days, targetLabel } = examCountdown();
  const answers = useProgress((s) => s.answers);
  const readModules = useProgress((s) => s.readModules);
  const { cargo, ficha, modules, questions, isCustom } = useCargo();
  const selectCargo = useCargoStore((s) => s.select);
  const selectedId = useCargoStore((s) => s.selectedId);

  const readCount = modules.filter((m) => readModules[m.id]).length;
  const ids = new Set(questions.map((q) => q.id));
  const answered = Object.keys(answers).filter((id) => ids.has(id)).length;
  const correct = Object.entries(answers).filter(
    ([id, a]) => ids.has(id) && a.correct,
  ).length;
  const acc = answered ? Math.round((correct / answered) * 100) : 0;

  const nextModule = modules.find((m) => !readModules[m.id]) ?? modules[0];

  return (
    <div className="space-y-10">
      {/* ── Hero Principal Integral ── */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="absolute inset-y-0 left-0 w-2 bg-rule" />
        
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-[11px] uppercase tracking-[0.14em] font-mono">
                Proceso de Selección CNSC · DIAN 2676
              </Badge>
              <span className="text-xs text-muted">Acuerdo 21 de 2025</span>
            </div>

            <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-[1.12] text-balance sm:text-4xl lg:text-5xl text-ink">
              Plataforma Integral de Preparación por Competencias y Roles
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Sistema especializado de entrenamiento para las pruebas escritas de ingreso y ascenso a la DIAN. 
              Alineado al Modelo de Estructura de Roles y Funciones (MERF), el Estatuto Tributario, el CPACA y el Código de Integridad.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/80 bg-paper/50 shadow-2xs">
            <img
              src="/hero-merito.jpg"
              alt="Mérito · Preparación Concurso DIAN 2676"
              className="h-full w-full object-cover aspect-16/9 transition-transform duration-500 hover:scale-102"
              loading="eager"
            />
          </div>
        </div>

        {/* ── Tarjeta de Cargo Activo ── */}
        <div className="mt-6 rounded-xl border border-border/90 bg-paper/70 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="flex size-2 rounded-full bg-ok animate-pulse" />
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted font-medium">
                  Cargo activo de estudio:
                </p>
                <Badge variant="outline" className="text-xs font-semibold bg-surface">
                  {ficha.nivel || "Nivel Técnico / Profesional"}
                </Badge>
              </div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-ink">
                {ficha.denominacion}
                {ficha.codigo !== "—" ? ` · Cód. ${ficha.codigo} Grado ${ficha.grado}` : ""}
              </h2>
              <p className="text-xs text-muted max-w-xl">
                {cargo.processLabel} · {isCustom ? "Manual personalizado cargado por el usuario" : cargo.blurb}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Button asChild size="sm">
                <Link to="/guia">
                  Ver guía del cargo
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <Link to="/cargo">
                  <Briefcase className="size-4" />
                  Cambiar / Subir manual
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ── 4 Reglas de Oro para Pasar el Examen ── */}
        <div className="mt-8 border-t border-border pt-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted font-semibold">
              4 Claves Estratégicas del Examen DIAN 2676
            </p>
            <span className="text-xs font-mono text-subtle">A nov 2026: {days}d</span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/guia"
              className="group rounded-xl border border-border/80 bg-surface p-3.5 transition-all hover:border-accent hover:bg-paper/50"
            >
              <div className="flex items-center gap-2 text-accent">
                <Scale className="size-4" />
                <span className="text-xs font-bold font-display text-ink">1. Frontera de Rol</span>
              </div>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                El Analista ejecuta la técnica; el Gestor decide y firma. Nunca usurpes funciones de otro grado.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-accent group-hover:underline">
                Ver límites del rol →
              </span>
            </Link>

            <Link
              to="/practica/$bank"
              params={{ bank: "funcional" }}
              className="group rounded-xl border border-border/80 bg-surface p-3.5 transition-all hover:border-accent hover:bg-paper/50"
            >
              <div className="flex items-center gap-2 text-bad">
                <Flag className="size-4" />
                <span className="text-xs font-bold font-display text-ink">2. Umbral Mín. 70</span>
              </div>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                La prueba Funcional es eliminatoria. Si no alcanzas 70,00 pts, quedas fuera de inmediato.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-bad group-hover:underline">
                Entrenar funcional →
              </span>
            </Link>

            <Link
              to="/estudio"
              className="group rounded-xl border border-border/80 bg-surface p-3.5 transition-all hover:border-accent hover:bg-paper/50"
            >
              <div className="flex items-center gap-2 text-warn">
                <FileText className="size-4" />
                <span className="text-xs font-bold font-display text-ink">3. Debido Proceso</span>
              </div>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                El Estatuto Tributario y la norma escrita priman siempre sobre atajos o el &quot;sentido común&quot;.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-warn group-hover:underline">
                Estudiar normas →
              </span>
            </Link>

            <Link
              to="/tarjetas"
              className="group rounded-xl border border-border/80 bg-surface p-3.5 transition-all hover:border-accent hover:bg-paper/50"
            >
              <div className="flex items-center gap-2 text-ok">
                <CheckCircle2 className="size-4" />
                <span className="text-xs font-bold font-display text-ink">4. Integridad v3</span>
              </div>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                5 Valores: Honestidad, Respeto, Compromiso, Diligencia y Justicia. Cero conflicto de interés.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-ok group-hover:underline">
                Repasar tarjetas →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Selector Rápido de Perfiles y Empleos ── */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              Catálogo de empleos y niveles
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              Selecciona tu perfil de postulación o carga la OPEC de tu empleo para adaptar las preguntas y guías.
            </p>
          </div>
          <Link
            to="/cargo"
            className="text-xs font-medium text-accent hover:underline flex items-center gap-1"
          >
            Ver todos los perfiles <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATALOG.slice(0, 4).map((c) => {
            const active = selectedId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => selectCargo(c.id)}
                className={cn(
                  "flex flex-col justify-between rounded-xl border p-4 text-left transition-all",
                  active
                    ? "border-accent bg-paper shadow-xs ring-1 ring-accent"
                    : "border-border bg-surface hover:border-accent/40 hover:bg-paper/40",
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-[0.12em] font-semibold text-muted">
                      {CARGO_FAMILIES[c.family]?.label || c.family}
                    </span>
                    {active && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-ok">
                        <CheckCircle2 className="size-3.5" /> Activo
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 font-display text-base font-semibold text-ink">
                    {c.ficha.denominacion}
                  </h3>
                  <p className="mt-1 text-xs text-muted line-clamp-2">
                    {c.processLabel}
                  </p>
                </div>
                <span className="mt-3 text-[11px] text-accent font-medium inline-flex items-center gap-1">
                  {active ? "Perfil configurado" : "Seleccionar empleo →"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Las 3 Pruebas del Concurso ── */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">
            Estructura de las Pruebas Escritas
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            Tres evaluaciones aplicadas en una sola jornada según los lineamientos de la CNSC y el operador evaluador.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {(Object.keys(TRACKS) as TrackId[]).map((id) => {
            const meta = TRACKS[id];
            const qs = questions.filter((q) => q.track === id);
            const stats = trackAccuracy(
              answers,
              qs.map((q) => q.id),
            );
            const Icon = id === "funcional" ? Scale : id === "integridad" ? Flag : ClipboardCheck;
            const isEliminatoria = id === "funcional";

            return (
              <Link
                key={id}
                to="/practica/$bank"
                params={{ bank: id }}
                className={cn(
                  "group relative rounded-xl border bg-surface p-5 transition-all hover:border-accent/60 hover:shadow-xs",
                  isEliminatoria ? "border-accent/40 bg-surface" : "border-border",
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-paper p-2 text-accent">
                    <Icon className="size-5" />
                  </div>
                  <Badge variant={isEliminatoria ? "bad" : "outline"} className="text-[10px]">
                    {isEliminatoria ? "Eliminatoria · Mín. 70" : "Clasificatoria"}
                  </Badge>
                </div>

                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {meta.label}
                </h3>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  {meta.blurb}
                </p>

                <div className="mt-5 border-t border-border/80 pt-3">
                  <div className="mb-1.5 flex justify-between text-xs text-muted">
                    <span>
                      {stats.answered} de {qs.length} ítems
                    </span>
                    <span className="tabular-nums font-medium">{stats.pct}% acierto</span>
                  </div>
                  <Progress value={qs.length ? (stats.answered / qs.length) * 100 : 0} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Próxima Lectura y Diagnóstico ── */}
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl border border-border bg-surface p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="size-4 text-accent" />
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted font-medium">
                Módulo sugerido
              </p>
            </div>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">
              {nextModule?.title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
              {nextModule?.summary}
            </p>
          </div>
          {nextModule ? (
            <div className="mt-6">
              <Button asChild variant="secondary" size="sm">
                <Link to="/estudio/$slug" params={{ slug: nextModule.id }}>
                  Estudiar módulo ({nextModule.minutes} min)
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          ) : null}
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 flex flex-col justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted font-medium">
              Diagnóstico de rendimiento
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="font-display text-4xl font-semibold tabular-nums text-ink">{acc}%</p>
              <span className="text-xs text-muted">promedio global</span>
            </div>
            <p className="mt-1 text-xs text-muted leading-relaxed">
              Basado en {answered} preguntas resueltas para {ficha.denominacion}.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/progreso">Ver informe de fallos</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/simulacro">Simulacro oficial</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Nota Legal Institucional ── */}
      <footer className="rounded-xl border border-border/80 bg-paper/60 p-4 text-xs leading-relaxed text-subtle">
        <p>
          <strong>Aviso institucional:</strong> Material de preparación independiente estructurado a partir de normas públicas: 
          Acuerdo CNSC 21 de 2025, Estatuto Tributario Nacional, Ley 1437 de 2011 (CPACA), Ley 1755 de 2015, Decreto Ley 927 de 2023 y 
          el Código de Integridad del Servicio Público (Ley 2016 de 2020). No constituye cuestionario oficial bajo reserva (Ley 909 de 2004, art. 31).
        </p>
      </footer>
    </div>
  );
}
