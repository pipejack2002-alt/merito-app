import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState, type ChangeEvent } from "react";
import {
  Crown,
  Download,
  FileText,
  Upload,
} from "lucide-react";
import { TRACKS, type TrackId } from "@/data/types";
import { useProgress, trackAccuracy } from "@/lib/progress-store";
import { useCargoStore } from "@/lib/cargo-store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FailDiagnosis } from "@/components/fail-diagnosis";
import { useCargo } from "@/lib/use-cargo";
import {
  trunc100,
  formatPuntaje,
  calculatePassingProbability,
  calculateQuestionsNeeded,
} from "@/lib/cnsc-score";
import { DiagnosticReportModal } from "@/components/diagnostic-report-modal";
import { PricingModal } from "@/components/pricing-modal";

export const Route = createFileRoute("/progreso")({ component: ProgresoPage });

// ── Tipos del backup ──────────────────────────────────────────────────────────
interface BackupPayload {
  v: 1;
  exportedAt: string;
  progress: ReturnType<typeof exportProgress>;
  cargo: ReturnType<typeof exportCargo>;
}

function exportProgress() {
  const raw = localStorage.getItem("cuaderno-2676-progress");
  try {
    return raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

function exportCargo() {
  const raw = localStorage.getItem("cuaderno-2676-cargo");
  try {
    return raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

function exportBackup() {
  const payload: BackupPayload = {
    v: 1,
    exportedAt: new Date().toISOString(),
    progress: exportProgress(),
    cargo: exportCargo(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cuaderno-2676-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importBackup(file: File, onDone: () => void) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const payload = JSON.parse(e.target?.result as string) as BackupPayload;
      if (payload.v !== 1) {
        alert("Archivo de backup no reconocido (versión incorrecta).");
        return;
      }
      if (payload.progress) {
        localStorage.setItem("cuaderno-2676-progress", JSON.stringify(payload.progress));
      }
      if (payload.cargo) {
        localStorage.setItem("cuaderno-2676-cargo", JSON.stringify(payload.cargo));
      }
      onDone();
    } catch {
      alert("No se pudo leer el archivo. Asegúrate de que sea un backup válido.");
    }
  };
  reader.readAsText(file);
}

// ── Componente principal ──────────────────────────────────────────────────────
function ProgresoPage() {
  const answers = useProgress((s) => s.answers);
  const read = useProgress((s) => s.readModules);
  const sims = useProgress((s) => s.simulacros);
  const reset = useProgress((s) => s.reset);
  const { cargo, modules, questions } = useCargo();
  const importRef = useRef<HTMLInputElement>(null);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  const ids = new Set(questions.map((q) => q.id));
  const answered = Object.keys(answers).filter((id) => ids.has(id)).length;
  const correct = Object.entries(answers).filter(([id, a]) => ids.has(id) && a.correct).length;
  const missed = questions.filter((q) => answers[q.id] && !answers[q.id].correct);

  // Cálculos matemáticos precisos por prueba
  const tracksAccuracy = (Object.keys(TRACKS) as TrackId[]).reduce(
    (acc, id) => {
      const qs = questions.filter((q) => q.track === id);
      acc[id] = trackAccuracy(
        answers,
        qs.map((q) => q.id),
      );
      return acc;
    },
    {} as Record<TrackId, ReturnType<typeof trackAccuracy>>,
  );

  const funcionalScore =
    tracksAccuracy.funcional.answered > 0
      ? trunc100(tracksAccuracy.funcional.correct, tracksAccuracy.funcional.answered)
      : 0;

  const comportamentalScore =
    tracksAccuracy.comportamental.answered > 0
      ? trunc100(tracksAccuracy.comportamental.correct, tracksAccuracy.comportamental.answered)
      : 0;

  const integridadScore =
    tracksAccuracy.integridad.answered > 0
      ? trunc100(tracksAccuracy.integridad.correct, tracksAccuracy.integridad.answered)
      : 0;

  const totalScore = answered > 0 ? trunc100(correct, answered) : 0;
  const passedFuncional = funcionalScore >= 70.0;

  // Probabilidad estadística de superar la fase eliminatoria
  const passEstimate = calculatePassingProbability(funcionalScore, tracksAccuracy.funcional.answered, 70.0);
  const neededQuestions = calculateQuestionsNeeded(
    tracksAccuracy.funcional.correct,
    tracksAccuracy.funcional.answered,
    70.0,
  );

  function handleImport(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    importBackup(file, () => {
      void useProgress.persist.rehydrate();
      void useCargoStore.persist.rehydrate();
      window.location.reload();
    });
    e.target.value = "";
  }

  return (
    <div className="space-y-8">
      {/* Modales */}
      <DiagnosticReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        data={{
          cargo,
          funcionalScore,
          comportamentalScore,
          integridadScore,
          totalScore,
          passed: passedFuncional,
          answeredCount: answered,
          correctCount: correct,
          missedCount: missed.length,
        }}
      />
      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />

      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
            Seguimiento · {cargo.shortLabel}
          </p>
          <h1 className="font-display text-3xl font-semibold">Mi Rendimiento y Diagnóstico</h1>
          <p className="text-sm text-muted">
            Métricas oficiales en tiempo real calibradas al corte de 70.00 pts (Acuerdo 21).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={() => setIsReportOpen(true)}
            size="sm"
            className="gap-2 bg-accent text-white hover:bg-accent/90 shadow-xs cursor-pointer font-semibold"
          >
            <FileText className="size-4" />
            Descargar Informe PDF
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPricingOpen(true)}
            className="gap-1.5 cursor-pointer border-accent/40 text-accent hover:bg-accent/10"
          >
            <Crown className="size-3.5" />
            Planes Pro
          </Button>
        </div>
      </header>

      {/* ── Calculadora / Estimador de Probabilidad Eliminatoria CNSC ── */}
      <section className="rounded-2xl border border-border bg-surface p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="text-[10px] font-mono uppercase tracking-wider bg-paper"
              >
                Algoritmo Predictivo CNSC
              </Badge>
              <span className="text-xs text-muted">Corte Oficial: 70.00 pts en Funcionales</span>
            </div>
            <h2 className="font-display text-xl font-bold text-ink">
              Probabilidad de Superar Fase Eliminatoria
            </h2>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-black text-ink tabular-nums">
              {passEstimate.probability}%
            </span>
            <span className="text-xs text-muted font-medium">probabilidad estimada</span>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted">Desempeño en Prueba Funcional</span>
              <span className="tabular-nums font-bold text-ink">
                {formatPuntaje(funcionalScore)} / 100.00 pts
                <span className="text-muted font-normal ml-1">
                  ({passEstimate.margin >= 0 ? `+${formatPuntaje(passEstimate.margin)}` : formatPuntaje(passEstimate.margin)} margen)
                </span>
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-paper overflow-hidden p-0.5 border border-border/80">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  passEstimate.status === "seguro"
                    ? "bg-ok"
                    : passEstimate.status === "competitivo"
                      ? "bg-accent"
                      : passEstimate.status === "en_riesgo"
                        ? "bg-amber-500"
                        : "bg-bad"
                }`}
                style={{ width: `${Math.min(100, Math.max(5, passEstimate.probability))}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="rounded-xl border border-border bg-paper/60 p-3">
              <span className="text-[10px] uppercase font-mono text-muted block">Estado Predictivo</span>
              <p className="text-xs font-bold text-ink mt-0.5">{passEstimate.label}</p>
            </div>

            <div className="rounded-xl border border-border bg-paper/60 p-3">
              <span className="text-[10px] uppercase font-mono text-muted block">Nivel de Confianza</span>
              <p className="text-xs font-bold text-ink mt-0.5 capitalize">
                Muestra {passEstimate.confidence} ({tracksAccuracy.funcional.answered} preguntas funcionales)
              </p>
            </div>

            <div className="rounded-xl border border-border bg-paper/60 p-3">
              <span className="text-[10px] uppercase font-mono text-muted block">Simulación de Aciertos</span>
              <p className="text-xs font-bold text-ink mt-0.5">
                {neededQuestions === 0
                  ? "✓ Estás sobre el umbral de 70.00"
                  : `Necesitas +${neededQuestions} aciertos seguidos para asegurar 70.00`}
              </p>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-muted bg-paper/40 p-3 rounded-lg border border-border/60">
            💡 <strong>Recomendación pedagógica:</strong> {passEstimate.recommendation}
          </p>
        </div>
      </section>

      {/* ── Estadísticas Generales ── */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Total Preguntas Respondidas" value={`${answered}/${questions.length}`} />
        <Stat
          label="Tasa Global de Acierto"
          value={answered ? `${Math.round((correct / answered) * 100)}%` : "—"}
        />
        <Stat
          label="Módulos Teóricos Leídos"
          value={`${modules.filter((m) => read[m.id]).length}/${modules.length}`}
        />
      </div>

      {/* ── Desglose por Prueba Escrita Oficial ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Por Prueba Escrita (Acuerdo 21)</h2>
          <span className="text-xs text-muted font-mono">Puntajes Truncados (0-100)</span>
        </div>

        {(Object.keys(TRACKS) as TrackId[]).map((id) => {
          const qs = questions.filter((q) => q.track === id);
          const st = tracksAccuracy[id];
          const score = st.answered > 0 ? trunc100(st.correct, st.answered) : 0;
          return (
            <div key={id} className="rounded-xl border border-border bg-surface p-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="font-semibold">{TRACKS[id].label}</span>
                  <span className="text-xs text-muted ml-2">({TRACKS[id].nature})</span>
                </div>
                <span className="tabular-nums font-mono font-bold text-ink">
                  {formatPuntaje(score)} pts · {st.correct}/{st.answered} aciertos
                </span>
              </div>
              <Progress value={qs.length ? (st.answered / qs.length) * 100 : 0} />
            </div>
          );
        })}
      </section>

      {/* ── Diagnóstico de Fallos ── */}
      <FailDiagnosis missed={missed} cargo={cargo} />

      {missed.length > 0 ? (
        <Button asChild variant="secondary" className="cursor-pointer">
          <Link to="/practica/$bank" params={{ bank: "fallos" }}>
            Repasar {missed.length} fallos en el entrenador
          </Link>
        </Button>
      ) : null}

      {/* ── Historial de Simulacros ── */}
      {sims.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold">Historial de Simulacros Oficiales</h2>
          <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
            {sims.map((s) => (
              <li key={s.id} className="flex justify-between items-center px-4 py-3 text-sm">
                <span className="text-muted">{new Date(s.at).toLocaleString("es-CO")}</span>
                <span className="tabular-nums font-mono font-medium">
                  {s.total}% {s.passed ? "· ✓ Superó umbral funcional" : "· ⚠ Funcional bajo 70.00"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* ── Copia de Seguridad ── */}
      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Copia de Seguridad</h2>
        <p className="text-sm text-muted">
          Exporta tu avance, respuestas y simulacros a un archivo JSON para recuperarlos si cambias
          de navegador o dispositivo.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={exportBackup} id="btn-exportar-backup" className="cursor-pointer">
            <Download className="size-4" />
            Exportar backup
          </Button>
          <Button
            variant="outline"
            onClick={() => importRef.current?.click()}
            id="btn-importar-backup"
            className="cursor-pointer"
          >
            <Upload className="size-4" />
            Importar backup
          </Button>
          <input
            ref={importRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={handleImport}
          />
        </div>
        <p className="text-xs text-subtle">
          Al importar, el avance actual se reemplazará por el del archivo. La página se recargará
          automáticamente.
        </p>
      </section>

      <Button variant="outline" onClick={() => reset()} className="text-bad hover:bg-bad/10 cursor-pointer">
        Borrar avance de este dispositivo
      </Button>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}
