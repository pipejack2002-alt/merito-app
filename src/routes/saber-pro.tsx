import { useState, useMemo, useEffect, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Compass,
  Copy,
  GraduationCap,
  HelpCircle,
  Info,
  Layers,
  Play,
  RotateCcw,
  Search,
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/saber-pro")({ component: SaberProPage });

type ActiveTab = "practica" | "simulacro" | "chuleta" | "estructura";

export function SaberProPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("practica");
  const [selectedCareerId, setSelectedCareerId] = useState<string>("contaduria");

  // Countdown to Saber Pro: 18 de Octubre de 2026
  const targetDate = useMemo(() => new Date(2026, 9, 18, 7, 0, 0), []);
  const [daysRemaining, setDaysRemaining] = useState<number>(4);

  useEffect(() => {
    const now = new Date();
    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(Math.max(0, diffDays));
  }, [targetDate]);

  const selectedCareer = useMemo(
    () => SABER_PRO_CAREERS.find((c) => c.id === selectedCareerId) ?? SABER_PRO_CAREERS[0],
    [selectedCareerId],
  );

  return (
    <div className="space-y-8 pb-12">
      {/* ── Banner Superior de Cabecera Oficial ── */}
      <section className="relative overflow-hidden rounded-2xl border border-accent/30 bg-surface p-6 sm:p-8 shadow-xs">
        <div className="absolute inset-y-0 left-0 w-2 bg-accent" />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-accent text-accent-fg font-bold tracking-wider text-[11px] uppercase">
                Módulo Oficial · ICFES Saber Pro 2026
              </Badge>
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
                <GraduationCap className="size-4 text-accent" />
                Tu Carrera:
              </span>
              {SABER_PRO_CAREERS.map((career) => (
                <button
                  key={career.id}
                  type="button"
                  onClick={() => setSelectedCareerId(career.id)}
                  className={cn(
                    "rounded-xl border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer",
                    selectedCareerId === career.id
                      ? "border-accent bg-accent text-white shadow-xs font-semibold"
                      : "border-border/80 bg-paper/60 text-muted hover:border-accent/60 hover:text-ink",
                  )}
                >
                  {career.name}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 sm:p-5 flex flex-col gap-3 shrink-0 lg:max-w-xs w-full">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent font-mono">
                Sprint de 4 Días
              </span>
              <span className="rounded bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent">
                ICFES 0-300 pts
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-ink flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-accent" />
                Objetivo Nivel 4 (Avanzado)
              </p>
              <p className="text-[11px] text-muted leading-relaxed">
                Prioriza las 4 fórmulas de Gestión Financiera y los 3 criterios de dictamen NIA
                700/705 que más puntúan.
              </p>
            </div>
            <div className="pt-2 border-t border-accent/20 flex items-center justify-between text-xs">
              <span className="text-muted">Carrera activa:</span>
              <span className="font-semibold text-ink truncate max-w-36">
                {selectedCareer.name}
              </span>
            </div>
          </div>
        </div>

        {/* ── Tabs de Navegación del Módulo ── */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <Button
            variant={activeTab === "practica" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("practica")}
            className="gap-2 cursor-pointer"
          >
            <BookOpen className="size-4" />
            Entrenador de Preguntas
          </Button>
          <Button
            variant={activeTab === "simulacro" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("simulacro")}
            className="gap-2 cursor-pointer"
          >
            <Clock className="size-4" />
            Simulacro Cronometrado (Escala 0-300)
          </Button>
          <Button
            variant={activeTab === "chuleta" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("chuleta")}
            className="gap-2 cursor-pointer"
          >
            <Zap className="size-4 text-amber-500" />
            Chuleta de Fórmulas y Atajos (4 Días)
          </Button>
          <Button
            variant={activeTab === "estructura" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("estructura")}
            className="gap-2 cursor-pointer"
          >
            <Layers className="size-4" />
            Estructura Oficial ICFES
          </Button>
        </div>
      </section>

      {/* ── Contenido Según Tab Activo ── */}
      {activeTab === "practica" && (
        <SaberProTrainerTab careerId={selectedCareerId} careerName={selectedCareer.name} />
      )}

      {activeTab === "simulacro" && (
        <SaberProSimulatorTab careerId={selectedCareerId} careerName={selectedCareer.name} />
      )}

      {activeTab === "chuleta" && <SaberProCheatsheetTab />}

      {activeTab === "estructura" && <SaberProStructureTab selectedCareer={selectedCareer} />}
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

  // Si la pregunta no tiene methodTip personalizado, derivar técnica de resolución por área
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

  // Análisis de distractores y trampas típicas
  const resolvedDistractors =
    question.distractorAnalysis ||
    "Trampas comunes del ICFES: Las opciones incorrectas emplean distractores de cálculo directo sin considerar variaciones sucesivas, confusión entre tipos de opinión de auditoría, o generalizaciones no respaldadas textualmente por el enunciado normativo.";

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 sm:p-6 space-y-4 transition-all shadow-xs animate-in fade-in-50",
        isCorrect
          ? "border-ok/40 bg-ok/5 text-ink"
          : "border-bad/40 bg-bad/5 text-ink",
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
          <Sparkles className="size-4 text-accent" />
          <span>¿Por qué es la opción correcta? (Fundamento Técnico)</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-ink/90">
          {question.explanation}
        </p>
      </div>

      {/* Bloque 2: Método para Preguntas Similares en el Examen */}
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-4 space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs font-bold text-accent">
          <Compass className="size-4 text-accent" />
          <span>Método de Resolución (¿Cómo resolverla si sale una parecida el domingo?)</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-ink/90">
          {resolvedMethodTip}
        </p>
      </div>

      {/* Bloque 3: Análisis de Trampas y Distractores */}
      <div className="rounded-xl border border-bad/30 bg-bad/5 p-4 space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs font-bold text-bad">
          <ShieldAlert className="size-4 text-bad" />
          <span>Trampas del ICFES y Descarte de las Demás Opciones</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-ink/90">
          {resolvedDistractors}
        </p>
      </div>

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
}: {
  careerId: string;
  careerName: string;
}) {
  const [filterSession, setFilterSession] = useState<"all" | "generica" | "especifica">("all");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [speaking, setSpeaking] = useState(false);

  // Filtrar preguntas según sesión y carrera
  const filteredQuestions = useMemo(() => {
    return SABER_PRO_QUESTIONS.filter((q) => {
      // Si es específica, solo mostrar las de la carrera seleccionada o 'todas'
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

  // Si cambia el filtro y el índice se desborda, reiniciar índice
  useEffect(() => {
    setCurrentIndex(0);
  }, [filterSession, selectedArea, careerId]);

  // Text-To-Speech (Lectura por voz)
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

  // Cancelar audio al cambiar de pregunta
  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, [currentIndex]);

  const handleSelectChoice = (choiceId: string) => {
    if (!currentQ) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: choiceId,
    }));
  };

  const handleResetTrainer = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  };

  const currentSelection = currentQ ? userAnswers[currentQ.id] : undefined;
  const isAnswered = currentSelection !== undefined;

  // Estadísticas globales del entrenador
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
            className="text-xs h-8 cursor-pointer"
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
            className="text-xs h-8 cursor-pointer"
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
            className="text-xs h-8 cursor-pointer"
          >
            Sesión 2: {careerName}
          </Button>
        </div>

        {/* Marcador de Precisión */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-ok">
            <CheckCircle2 className="size-4" />
            <span>Aciertos: {correctCount}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted">
            <span>Respondidas: {answeredCount}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetTrainer}
            className="text-muted hover:text-ink text-xs h-8 gap-1"
          >
            <RotateCcw className="size-3.5" />
            Reiniciar
          </Button>
        </div>
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-3">
          <HelpCircle className="size-10 text-muted mx-auto" />
          <p className="font-display text-base font-bold text-ink">
            No hay preguntas disponibles con los filtros actuales
          </p>
          <p className="text-xs text-muted">
            Intenta seleccionar &quot;Todas&quot; o cambia de carrera en la barra superior.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setFilterSession("all");
              setSelectedArea("all");
            }}
          >
            Restablecer Filtros
          </Button>
        </div>
      ) : currentQ ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Tarjeta Central de la Pregunta */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-xs">
              {/* Encabezado de Pregunta */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs font-bold">
                    Pregunta {currentIndex + 1} de {filteredQuestions.length}
                  </Badge>
                  <Badge className="bg-accent/15 text-accent border-accent/30 font-semibold text-xs">
                    {currentQ.session === "generica" ? "Sesión 1 Genérica" : "Sesión 2 Específica"}
                  </Badge>
                  <span className="text-xs font-medium text-muted">{currentQ.areaLabel}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSpeech}
                    className={cn(
                      "gap-1.5 text-xs h-8 cursor-pointer",
                      speaking && "bg-accent text-white border-accent",
                    )}
                  >
                    {speaking ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
                    <span>{speaking ? "Detener" : "Escuchar"}</span>
                  </Button>
                </div>
              </div>

              {/* Contexto del Ítem */}
              {currentQ.contextText && (
                <div className="rounded-xl border border-border/80 bg-paper/60 p-4 sm:p-5 text-sm sm:text-base leading-relaxed text-ink font-serif italic border-l-4 border-l-accent">
                  {currentQ.contextText}
                </div>
              )}

              {/* Enunciado / Tarea evaluada */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted font-mono">
                  Enunciado:
                </p>
                <p className="text-base sm:text-lg font-display font-semibold text-ink leading-snug">
                  {currentQ.stem}
                </p>
              </div>

              {/* Opciones de Respuesta */}
              <div className="space-y-3 pt-2">
                {currentQ.choices.map((choice) => {
                  const isSelected = currentSelection === choice.id;
                  const isThisCorrect = choice.id === currentQ.correct;

                  let optionStyle =
                    "border-border/80 bg-paper/40 hover:bg-paper hover:border-accent/60 text-ink";

                  if (isAnswered) {
                    if (isThisCorrect) {
                      optionStyle = "border-ok bg-ok/10 text-ink ring-1 ring-ok";
                    } else if (isSelected && !isThisCorrect) {
                      optionStyle = "border-bad bg-bad/10 text-ink ring-1 ring-bad";
                    } else {
                      optionStyle = "border-border/60 bg-paper/20 opacity-60 text-muted";
                    }
                  }

                  return (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() => handleSelectChoice(choice.id)}
                      className={cn(
                        "w-full rounded-xl border p-4 text-left transition-all flex items-start gap-3.5 cursor-pointer",
                        optionStyle,
                      )}
                    >
                      <span
                        className={cn(
                          "size-7 rounded-lg border font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5",
                          isAnswered && isThisCorrect
                            ? "bg-ok text-white border-ok"
                            : isAnswered && isSelected && !isThisCorrect
                              ? "bg-bad text-white border-bad"
                              : "border-border/80 bg-surface text-ink",
                        )}
                      >
                        {choice.id}
                      </span>
                      <span className="text-sm sm:text-base leading-relaxed flex-1">
                        {choice.text}
                      </span>
                      {isAnswered && isThisCorrect && (
                        <CheckCircle2 className="size-5 text-ok shrink-0 mt-0.5" />
                      )}
                      {isAnswered && isSelected && !isThisCorrect && (
                        <XCircle className="size-5 text-bad shrink-0 mt-0.5" />
                      )}
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
                  className="gap-1.5 cursor-pointer"
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
                    btnStyle += " ring-2 ring-accent border-accent text-ink";
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
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4 space-y-2">
              <p className="text-xs font-bold text-ink flex items-center gap-1.5">
                <Sparkles className="size-4 text-accent" />
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
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutos
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [batchSize, setBatchSize] = useState<number>(15);
  const [reviewFilter, setReviewFilter] = useState<"all" | "errors" | "correct">("all");
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);

  // Selección de preguntas para el simulacro: combinamos Genéricas + Específicas
  const examQuestions = useMemo(() => {
    const list = SABER_PRO_QUESTIONS.filter((q) => {
      if (q.session === "especifica") {
        return q.careerId === careerId || q.careerId === "todas";
      }
      return true;
    });
    return list.slice(0, batchSize);
  }, [careerId, batchSize]);

  // Cronómetro
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
    setTimeRemaining(examQuestions.length * 90); // 1.5 minutos por pregunta
    setExamFinished(false);
    setExamStarted(true);
    setExpandedReviewId(null);
  };

  const handleFinishExam = () => {
    setExamFinished(true);
  };

  const handleSelectAnswer = (qId: string, choiceId: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: choiceId }));
  };

  // Cálculo de Resultados en Escala ICFES Oficial (0 a 300 Puntos)
  const results = useMemo(() => {
    const total = examQuestions.length;
    let correct = 0;
    examQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) correct++;
    });

    const missedCount = total - correct;
    const percentage = total > 0 ? (correct / total) * 100 : 0;
    // Escala ICFES: 0 a 300 puntos
    const icfesScore = Math.round((percentage / 100) * 300);

    // Niveles Oficiales ICFES Saber Pro
    let level = "Nivel 1 (Insuficiente)";
    let levelBadge = "bg-bad text-white";
    if (icfesScore >= 225) {
      level = "Nivel 4 (Avanzado)";
      levelBadge = "bg-emerald-600 text-white";
    } else if (icfesScore >= 175) {
      level = "Nivel 3 (Satisfactorio)";
      levelBadge = "bg-accent text-white";
    } else if (icfesScore >= 125) {
      level = "Nivel 2 (Mínimo)";
      levelBadge = "bg-amber-600 text-white";
    }

    return { total, correct, missedCount, percentage, icfesScore, level, levelBadge };
  }, [examQuestions, answers]);

  const filteredReviewQuestions = useMemo(() => {
    if (reviewFilter === "errors") {
      return examQuestions.filter((q) => answers[q.id] !== q.correct);
    }
    if (reviewFilter === "correct") {
      return examQuestions.filter((q) => answers[q.id] === q.correct);
    }
    return examQuestions;
  }, [examQuestions, answers, reviewFilter]);

  const currentQ = examQuestions[currentIndex];

  if (!examStarted) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 max-w-2xl mx-auto text-center space-y-6 shadow-xs">
        <div className="size-16 rounded-2xl bg-accent/10 border border-accent/30 text-accent flex items-center justify-center mx-auto">
          <Clock className="size-8" />
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-ink">
            Simulador Oficial Saber Pro 2026
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Ponte a prueba en condiciones reales de examen. Evaluaremos preguntas de competencias
            genéricas y de tu especialidad en <strong className="text-ink">{careerName}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-left">
          <div className="rounded-xl border border-border/80 bg-paper/60 p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted font-mono">
              Modalidad
            </span>
            <p className="text-xs font-semibold text-ink">Cronometrado</p>
          </div>
          <div className="rounded-xl border border-border/80 bg-paper/60 p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted font-mono">
              Puntuación
            </span>
            <p className="text-xs font-semibold text-accent">Escala 0-300 ICFES</p>
          </div>
          <div className="rounded-xl border border-border/80 bg-paper/60 p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted font-mono">
              Preguntas
            </span>
            <p className="text-xs font-semibold text-ink">{batchSize} Ítems</p>
          </div>
        </div>

        {/* Selector de cantidad de preguntas */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="text-xs text-muted font-medium">Longitud de la prueba:</span>
          {[10, 15, 20].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setBatchSize(size)}
              className={cn(
                "px-3 py-1 text-xs rounded-lg border font-mono transition-all cursor-pointer",
                batchSize === size
                  ? "border-accent bg-accent text-white font-bold"
                  : "border-border bg-paper/60 text-muted hover:text-ink",
              )}
            >
              {size} preguntas
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button
            size="lg"
            onClick={handleStartExam}
            className="gap-2 font-bold px-8 shadow-xs cursor-pointer"
          >
            <Play className="size-4 fill-white" />
            Comenzar Simulacro Ahora
          </Button>
        </div>
      </div>
    );
  }

  if (examFinished) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 max-w-2xl mx-auto space-y-6 shadow-xs animate-in fade-in-50">
        <div className="text-center space-y-2">
          <div className="size-16 rounded-2xl bg-accent/10 border border-accent/30 text-accent flex items-center justify-center mx-auto">
            <Award className="size-8" />
          </div>
          <h2 className="font-display text-2xl font-bold text-ink">
            Resultado Oficial del Simulacro
          </h2>
          <p className="text-xs text-muted">
            Calibrado según la escala oficial de calificación del ICFES Saber Pro.
          </p>
        </div>

        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-accent font-mono">
            Puntaje Global ICFES
          </span>
          <div className="font-display text-5xl font-black text-ink">
            {results.icfesScore}{" "}
            <span className="text-lg font-normal text-muted font-sans">/ 300 pts</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Badge className={cn("text-xs font-bold px-3 py-1", results.levelBadge)}>
              {results.level}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl border border-border/80 bg-paper/60 p-3.5">
            <p className="text-xs text-muted font-medium">Aciertos</p>
            <p className="font-display text-lg font-bold text-ok">
              {results.correct} / {results.total}
            </p>
          </div>
          <div className="rounded-xl border border-border/80 bg-paper/60 p-3.5">
            <p className="text-xs text-muted font-medium">Porcentaje</p>
            <p className="font-display text-lg font-bold text-ink">
              {Math.round(results.percentage)}%
            </p>
          </div>
          <div className="rounded-xl border border-border/80 bg-paper/60 p-3.5">
            <p className="text-xs text-muted font-medium">Tiempo Restante</p>
            <p className="font-display text-lg font-bold text-accent">
              {formatTimer(timeRemaining)}
            </p>
          </div>
        </div>

        {/* Revisión Interactiva Expandible */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink font-mono">
                Revisión Detallada de Preguntas ({examQuestions.length})
              </h3>
              <p className="text-xs text-muted">
                Haz clic en cualquier pregunta para ver el desglose técnico, el método para resolverla si sale una parecida y el descarte de trampas.
              </p>
            </div>

            {/* Filtros de Revisión */}
            <div className="flex items-center gap-1.5 shrink-0">
              <Button
                variant={reviewFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setReviewFilter("all")}
                className="text-xs h-7 px-2.5 cursor-pointer"
              >
                Todas ({examQuestions.length})
              </Button>
              <Button
                variant={reviewFilter === "errors" ? "danger" : "outline"}
                size="sm"
                onClick={() => setReviewFilter("errors")}
                className="text-xs h-7 px-2.5 cursor-pointer"
              >
                Fallidas ({results.missedCount})
              </Button>
              <Button
                variant={reviewFilter === "correct" ? "default" : "outline"}
                size="sm"
                onClick={() => setReviewFilter("correct")}
                className="text-xs h-7 px-2.5 cursor-pointer"
              >
                Aciertos ({results.correct})
              </Button>
            </div>
          </div>

          {/* Lista interactiva expandible */}
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredReviewQuestions.map((q, idx) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.correct;
              const isExpanded = expandedReviewId === q.id;

              return (
                <div
                  key={q.id}
                  className={cn(
                    "rounded-2xl border transition-all overflow-hidden",
                    isCorrect
                      ? "border-ok/30 bg-surface hover:border-ok/60"
                      : "border-bad/30 bg-surface hover:border-bad/60",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedReviewId(isExpanded ? null : q.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-paper/40 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="size-6 rounded-md bg-paper border border-border font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-ink truncate">
                          {q.stem}
                        </p>
                        <p className="text-[11px] text-muted">
                          {q.areaLabel} · {q.session === "generica" ? "Sesión 1 Genéricas" : "Sesión 2 Específicas"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className={cn("px-2 py-0.5 rounded font-bold", isCorrect ? "bg-ok/10 text-ok" : "bg-bad/10 text-bad")}>
                          Tú: {userAns ?? "Sin resp."}
                        </span>
                        <span className="bg-ok/10 text-ok px-2 py-0.5 rounded font-bold">
                          Clave: {q.correct}
                        </span>
                      </div>
                      {isCorrect ? (
                        <CheckCircle2 className="size-4 text-ok shrink-0" />
                      ) : (
                        <XCircle className="size-4 text-bad shrink-0" />
                      )}
                      {isExpanded ? (
                        <ChevronUp className="size-4 text-muted" />
                      ) : (
                        <ChevronDown className="size-4 text-muted" />
                      )}
                    </div>
                  </button>

                  {/* Panel Expandido con Opciones y Explicación Pedagógica */}
                  {isExpanded && (
                    <div className="border-t border-border/70 p-5 bg-paper/30 space-y-5 animate-in fade-in-50">
                      {q.contextText && (
                        <div className="rounded-xl border border-border/80 bg-paper/60 p-4 text-xs sm:text-sm leading-relaxed text-ink font-serif italic border-l-4 border-l-accent">
                          {q.contextText}
                        </div>
                      )}

                      <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted font-mono">
                          Pregunta completa:
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-ink">{q.stem}</p>
                        
                        <div className="grid gap-2 pt-2">
                          {q.choices.map((c) => {
                            const wasSelected = userAns === c.id;
                            const isThisKey = c.id === q.correct;
                            return (
                              <div
                                key={c.id}
                                className={cn(
                                  "rounded-xl border p-3.5 text-xs sm:text-sm flex items-start gap-3 transition-colors",
                                  isThisKey
                                    ? "border-ok bg-ok/10 text-ink font-medium ring-1 ring-ok"
                                    : wasSelected && !isThisKey
                                      ? "border-bad bg-bad/10 text-ink ring-1 ring-bad"
                                      : "border-border/60 bg-surface text-muted",
                                )}
                              >
                                <span className={cn(
                                  "size-6 rounded-md font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5",
                                  isThisKey
                                    ? "bg-ok text-white"
                                    : wasSelected
                                      ? "bg-bad text-white"
                                      : "bg-paper text-muted border border-border/60",
                                )}>
                                  {c.id}
                                </span>
                                <span className="flex-1 leading-snug">{c.text}</span>
                                {isThisKey && (
                                  <Badge className="bg-ok text-white text-[10px] uppercase font-bold shrink-0">
                                    Clave Oficial
                                  </Badge>
                                )}
                                {wasSelected && !isThisKey && (
                                  <Badge className="bg-bad text-white text-[10px] uppercase font-bold shrink-0">
                                    Tu Elección
                                  </Badge>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Explicación Pedagógica Integral */}
                      <SaberProPedagogicalFeedback
                        question={q}
                        selectedAnswer={userAns}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button variant="outline" size="sm" onClick={handleStartExam} className="gap-1.5">
            <RotateCcw className="size-3.5" />
            Reintentar Simulacro
          </Button>
          <Button size="sm" onClick={() => setExamStarted(false)}>
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
          <Badge className="bg-accent text-accent-fg font-mono text-xs">
            Pregunta {currentIndex + 1} de {examQuestions.length}
          </Badge>
          <span className="text-xs text-muted hidden sm:inline">{currentQ?.areaLabel}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-accent bg-accent/10 px-3 py-1 rounded-lg">
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
            <div className="rounded-xl border border-border/80 bg-paper/60 p-4 sm:p-5 text-sm sm:text-base leading-relaxed text-ink font-serif italic border-l-4 border-l-accent">
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
                      ? "border-accent bg-accent/10 ring-1 ring-accent text-ink"
                      : "border-border/80 bg-paper/40 hover:bg-paper hover:border-accent/50 text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "size-7 rounded-lg border font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5",
                      isSelected
                        ? "bg-accent text-white border-accent"
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
              <Button size="sm" onClick={handleFinishExam} className="gap-1.5 cursor-pointer">
                Entregar Simulacro
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => setCurrentIndex((i) => i + 1)}
                className="gap-1.5 cursor-pointer"
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
      <div className="rounded-2xl border border-accent/40 bg-linear-to-r from-accent/10 via-surface to-accent/5 p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Badge className="bg-amber-500 text-white font-bold text-xs uppercase">
            Sprint 4 Días · 18 Octubre 2026
          </Badge>
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
              className="w-full rounded-xl border border-border bg-surface pl-9 pr-4 py-2 text-xs text-ink focus:border-accent focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Grid de Fórmulas y Ratios */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCheatsheet.map((item, idx) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border/80 bg-surface p-5 space-y-3 shadow-2xs hover:border-accent/60 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent font-mono">
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

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs leading-relaxed text-ink/90 flex items-start gap-2">
              <Zap className="size-3.5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-600 block text-[11px] uppercase tracking-wider">
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
              Evaluación obligatoria para todos los estudiantes de carreras universitarias en
              Colombia.
            </p>
          </div>
          <Badge className="bg-accent/15 text-accent border-accent/30 font-bold">4h 40min</Badge>
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
              Facultad: {selectedCareer.faculty} · Módulos especializados fijados por el Ministerio
              de Educación.
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
          <Info className="size-4 text-accent" />
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
