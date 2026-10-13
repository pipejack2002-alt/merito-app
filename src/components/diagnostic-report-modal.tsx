import { useEffect } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Printer,
  X,
  ShieldCheck,
  FileText,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPuntaje } from "@/lib/cnsc-score";
import type { CargoProfile } from "@/data/types";
import { INDICADORES_OFICIALES_BASE } from "@/data/areandina-indicadores";

export interface DiagnosticData {
  cargo: CargoProfile;
  funcionalScore: number;
  comportamentalScore: number;
  integridadScore: number;
  totalScore: number;
  passed: boolean;
  answeredCount: number;
  correctCount: number;
  missedCount: number;
  dateStr?: string;
}

interface DiagnosticReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DiagnosticData;
}

export function DiagnosticReportModal({ isOpen, onClose, data }: DiagnosticReportModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const today = data.dateStr || new Date().toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const opecNumber = data.cargo.ficha?.opec || "236831";
  const cargoName = data.cargo.ficha?.denominacion || data.cargo.shortLabel;
  const cargoNivel = data.cargo.ficha?.nivel || data.cargo.family;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-3xl rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden print:border-none print:shadow-none print:max-w-none print:w-full print:rounded-none">
        {/* Barra superior de controles (se oculta al imprimir) */}
        <div className="flex items-center justify-between border-b border-border bg-paper/80 px-5 py-3.5 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-wider text-ink font-mono">
              Vista Previa · Informe Oficial Imprimible
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handlePrint}
              className="gap-1.5 bg-accent text-white hover:bg-accent/90 cursor-pointer shadow-xs"
            >
              <Printer className="size-3.5" />
              <span>Imprimir / Guardar en PDF</span>
            </Button>
            <button
              onClick={onClose}
              type="button"
              className="rounded-lg p-1.5 text-muted hover:bg-paper hover:text-ink transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Contenido Imprimible del Informe */}
        <div className="p-6 sm:p-8 space-y-6 bg-white text-slate-900 print:p-6" id="informe-oficial-content">
          {/* Encabezado Institucional */}
          <div className="border-b-2 border-slate-900 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600 font-mono">
                  República de Colombia · Proceso de Selección CNSC
                </p>
                <h1 className="text-2xl font-black tracking-tight text-slate-950 font-display">
                  Concurso DIAN 2676 · Diagnóstico Oficial de Competencias
                </h1>
                <p className="text-xs text-slate-600">
                  Operador Académico: Areandina · Acuerdo 21 de 2025 · MERF
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-right sm:min-w-44 shrink-0">
                <p className="text-[10px] font-mono text-slate-500 uppercase">Emisión Oficial</p>
                <p className="text-xs font-semibold text-slate-900">{today}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Prueba Escrita: 8 Nov 2026</p>
              </div>
            </div>

            {/* Ficha del Empleo y OPEC */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-lg bg-slate-100/80 p-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Código OPEC</span>
                <span className="font-bold text-slate-900 font-mono">{opecNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Denominación Empleo</span>
                <span className="font-bold text-slate-900 truncate block">{cargoName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Nivel Jerárquico</span>
                <span className="font-bold text-slate-900 capitalize">{cargoNivel}</span>
              </div>
            </div>
          </div>

          {/* Veredicto de Fase Eliminatoria */}
          <div
            className={`rounded-xl border p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              data.passed
                ? "border-emerald-300 bg-emerald-50 text-emerald-950"
                : "border-amber-300 bg-amber-50 text-amber-950"
            }`}
          >
            <div className="flex items-start gap-3">
              {data.passed ? (
                <CheckCircle2 className="size-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="size-6 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h2 className="font-bold text-base leading-tight font-display">
                  {data.passed
                    ? "SUPERÓ LA FASE ELIMINATORIA DE LA PRUEBA FUNCIONAL"
                    : "NO ALCANZA EL UMBRAL MÍNIMO APROBATORIO (70.00 PTS)"}
                </h2>
                <p className="text-xs mt-1 text-slate-700 leading-relaxed">
                  {data.passed
                    ? "Tu puntaje funcional cumple con el mínimo del Artículo 17 del Acuerdo 21. Si la prueba oficial fuera hoy, pasarías a la valoración clasificatoria de antecedentes."
                    : "El concurso DIAN establece carácter eliminatorio para la prueba funcional con corte de 70.00 pts. Debes priorizar el refuerzo en los indicadores marcados en alerta."}
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-300 sm:pl-4 shrink-0">
              <span className="text-[10px] uppercase font-mono text-slate-600 block">Puntaje Funcional</span>
              <span className="text-2xl font-black font-display tracking-tight">
                {formatPuntaje(data.funcionalScore)} / 100
              </span>
            </div>
          </div>

          {/* Desglose de Pruebas Escritas Truncadas */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono mb-3">
              1. Calificación por Pruebas Escritas (Anexo Técnico 2676)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">
                  Funcionales (60% Peso)
                </span>
                <p className="text-xl font-bold font-display text-slate-900 mt-1">
                  {formatPuntaje(data.funcionalScore)}
                </p>
                <p className="text-[10px] text-slate-600 mt-0.5">Carácter Eliminatorio (Mín. 70.00)</p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">
                  Comportamentales (25% Peso)
                </span>
                <p className="text-xl font-bold font-display text-slate-900 mt-1">
                  {formatPuntaje(data.comportamentalScore)}
                </p>
                <p className="text-[10px] text-slate-600 mt-0.5">Carácter Clasificatorio</p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">
                  Integridad Pública (15% Peso)
                </span>
                <p className="text-xl font-bold font-display text-slate-900 mt-1">
                  {formatPuntaje(data.integridadScore)}
                </p>
                <p className="text-[10px] text-slate-600 mt-0.5">Carácter Clasificatorio</p>
              </div>
            </div>
          </div>

          {/* Resumen Muestral */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-slate-600" />
              <span className="font-semibold text-slate-800">Métricas de la Jornada:</span>
              <span className="text-slate-600">
                {data.answeredCount} preguntas respondidas · {data.correctCount} aciertos · {data.missedCount} fallos
              </span>
            </div>
            <div className="font-mono text-slate-700">
              Promedio Ponderado: <strong>{formatPuntaje(data.totalScore)} / 100</strong>
            </div>
          </div>

          {/* Mapeo de los Indicadores Areandina */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono mb-2">
              2. Matriz de Indicadores de Evaluación Areandina
            </h3>
            <p className="text-[11px] text-slate-600 mb-3">
              Desglose técnico de competencias conforme a la citación y matriz metodológica del operador:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {INDICADORES_OFICIALES_BASE.slice(0, 10).map((ind, idx) => (
                <div
                  key={ind.id}
                  className="flex items-center justify-between rounded-md border border-slate-200 bg-white p-2"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded bg-slate-100 font-mono text-[10px] font-bold text-slate-700">
                      {idx + 1}
                    </span>
                    <span className="truncate text-[11px] font-medium text-slate-900" title={ind.nombre}>
                      {ind.nombre}
                    </span>
                  </div>
                  <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800 uppercase shrink-0">
                    Cubierto
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 italic mt-2">
              + 14 indicadores adicionales calibrados para {cargoName} (disponibles en la sección 24 Indicadores de la app).
            </p>
          </div>

          {/* Plan de Acción Pedagógico Recomendado */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald-600" />
              Plan de Acción Recomendado (Siguientes Semanas)
            </h4>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
              <li>
                <strong>Reforzar Régimen Procedimental:</strong> Repasar el Libro V del Estatuto Tributario y notificaciones electrónicas.
              </li>
              <li>
                <strong>Simulacros con Presión de Tiempo:</strong> Realizar al menos 2 jornadas completas con cronómetro de 4 horas en la app.
              </li>
              <li>
                <strong>Entrenamiento de Juicio Situacional:</strong> En las preguntas de integridad, priorizar siempre el principio de primacía del interés general y transparencia.
              </li>
            </ul>
          </div>

          {/* Pie de Firma Institucional */}
          <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500">
            <span>Generado automáticamente por Mérito App · Plataforma Preparación Concurso DIAN 2676</span>
            <span className="font-mono">Documento de Auto-Evaluación y Diagnóstico · No tiene validez legal vinculante</span>
          </div>
        </div>
      </div>
    </div>
  );
}
