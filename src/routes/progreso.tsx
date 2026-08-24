import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, type ChangeEvent } from "react";
import { Download, Upload } from "lucide-react";
import { TRACKS, type TrackId } from "@/data/types";
import { useProgress, trackAccuracy } from "@/lib/progress-store";
import { useCargoStore } from "@/lib/cargo-store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FailDiagnosis } from "@/components/fail-diagnosis";
import { useCargo } from "@/lib/use-cargo";

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
        localStorage.setItem(
          "cuaderno-2676-progress",
          JSON.stringify(payload.progress),
        );
      }
      if (payload.cargo) {
        localStorage.setItem(
          "cuaderno-2676-cargo",
          JSON.stringify(payload.cargo),
        );
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

  const ids = new Set(questions.map((q) => q.id));
  const answered = Object.keys(answers).filter((id) => ids.has(id)).length;
  const correct = Object.entries(answers).filter(
    ([id, a]) => ids.has(id) && a.correct,
  ).length;
  const missed = questions.filter((q) => answers[q.id] && !answers[q.id].correct);

  function handleImport(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    importBackup(file, () => {
      // Forzar re-hidratación de las tiendas
      void useProgress.persist.rehydrate();
      void useCargoStore.persist.rehydrate();
      window.location.reload();
    });
    // Limpiar el input para que vuelva a disparar onChange si eligen el mismo archivo
    e.target.value = "";
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
          Seguimiento · {cargo.shortLabel}
        </p>
        <h1 className="font-display text-3xl font-semibold">Progreso</h1>
        <p className="text-sm text-muted">
          Se guarda en este dispositivo. El diagnóstico usa tu cargo activo.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Respondidas" value={`${answered}/${questions.length}`} />
        <Stat
          label="Acierto"
          value={answered ? `${Math.round((correct / answered) * 100)}%` : "—"}
        />
        <Stat
          label="Módulos leídos"
          value={`${modules.filter((m) => read[m.id]).length}/${modules.length}`}
        />
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Por prueba</h2>
        {(Object.keys(TRACKS) as TrackId[]).map((id) => {
          const qs = questions.filter((q) => q.track === id);
          const st = trackAccuracy(
            answers,
            qs.map((q) => q.id),
          );
          return (
            <div key={id} className="rounded-xl border border-border bg-surface p-4">
              <div className="mb-2 flex justify-between text-sm">
                <span>{TRACKS[id].label}</span>
                <span className="tabular-nums text-muted">
                  {st.answered}/{qs.length} · {st.pct}%
                </span>
              </div>
              <Progress value={qs.length ? (st.answered / qs.length) * 100 : 0} />
            </div>
          );
        })}
      </section>

      <FailDiagnosis missed={missed} cargo={cargo} />

      {missed.length > 0 ? (
        <Button asChild variant="secondary">
          <Link to="/practica/$bank" params={{ bank: "fallos" }}>
            Repasar {missed.length} fallos
          </Link>
        </Button>
      ) : null}

      {sims.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold">Simulacros</h2>
          <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
            {sims.map((s) => (
              <li key={s.id} className="flex justify-between px-4 py-3 text-sm">
                <span className="text-muted">
                  {new Date(s.at).toLocaleString("es-CO")}
                </span>
                <span className="tabular-nums">
                  {s.total}% {s.passed ? "· umbral funcional ok" : "· funcional bajo 70"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* ── Backup ── */}
      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Copia de seguridad</h2>
        <p className="text-sm text-muted">
          Exporta tu avance, respuestas y simulacros a un archivo JSON para
          recuperarlos si cambias de navegador o dispositivo.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={exportBackup}
            id="btn-exportar-backup"
          >
            <Download className="size-4" />
            Exportar backup
          </Button>
          <Button
            variant="outline"
            onClick={() => importRef.current?.click()}
            id="btn-importar-backup"
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
          Al importar, el avance actual se reemplazará por el del archivo. La
          página se recargará automáticamente.
        </p>
      </section>

      <Button variant="outline" onClick={() => reset()}>
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
