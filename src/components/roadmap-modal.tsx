import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Briefcase,
  Sparkles,
  BookOpen,
  ClipboardCheck,
  Flag,
  CheckCircle2,
  X,
  ArrowRight,
  ShieldAlert,
  GraduationCap,
  Zap,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSaberPro?: boolean;
}

export function RoadmapModal({ isOpen, onClose, isSaberPro = false }: RoadmapModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const DIAN_STEPS = [
    {
      num: "01",
      title: "Configura tu Empleo y OPEC",
      desc: "Usa el selector en el encabezado para activar tu cargo (Analista, Gestor, Inspector o Facilitador). Toda la plataforma calibra sus preguntas, guías y casos situacionales a tus funciones exactas.",
      icon: Briefcase,
      link: "/cargo",
      search: undefined,
      cta: "Seleccionar empleo",
      highlight: "Adaptabilidad total a tu cargo",
    },
    {
      num: "02",
      title: "Revisa tus 24 Indicadores Oficiales",
      desc: "Areandina (el operador oficial de la DIAN) publicó 24 ejes temáticos: 9 funcionales, 10 comportamentales y 5 de integridad. Consulta qué temas evaluará la universidad para tu OPEC.",
      icon: Sparkles,
      link: "/indicadores",
      search: undefined,
      cta: "Consultar Areandina",
      highlight: "100% cubiertos en la app",
    },
    {
      num: "03",
      title: "Estudia las Guías Temáticas",
      desc: "Lee los resúmenes normativos condensados: Estatuto Tributario, Cobro Coactivo (Art. 828), Devoluciones (Art. 850), CPACA y el Código de Integridad. Cada módulo incluye tips para juicio situacional.",
      icon: BookOpen,
      link: "/estudio",
      search: undefined,
      cta: "Ver módulos de estudio",
      highlight: "Normas explicadas al grano",
    },
    {
      num: "04",
      title: "Entrena en el Banco de Preguntas",
      desc: "Practica ítem por ítem con retroalimentación pedagógica instantánea. Aprende a descartar opciones distractoras y comprende el fundamento legal de la respuesta correcta.",
      icon: ClipboardCheck,
      link: "/practica",
      search: undefined,
      cta: "Entrenar preguntas",
      highlight: "Feedback inmediato y tips",
    },
    {
      num: "05",
      title: "Mídete en el Simulador con Cronómetro",
      desc: "Enfrenta la prueba escrita con límite de tiempo estricto idéntico al día del examen (8 de noviembre de 2026). Recuerda que la prueba Funcional es eliminatoria: requieres mínimo 70,00 pts para continuar.",
      icon: Flag,
      link: "/simulacro",
      search: undefined,
      cta: "Hacer simulacro oficial",
      highlight: "Umbral eliminatorio mín. 70 pts",
    },
  ];

  const SABER_PRO_STEPS = [
    {
      num: "01",
      title: "Configura tu Carrera Universitaria",
      desc: "Usa el selector en el encabezado para activar tu programa (Contaduría Pública, Administración, Derecho, Ingeniería, etc.). La plataforma adaptará los módulos específicos de la Sesión 2 a tu carrera.",
      icon: GraduationCap,
      link: "/saber-pro",
      search: { tab: "resumen" as const },
      cta: "Ver carrera",
      highlight: "Módulos específicos activos",
    },
    {
      num: "02",
      title: "Paso 1 · Entrenador de Preguntas y Casos",
      desc: "Practica más de 50 preguntas oficiales tipo ICFES organizadas por módulos (Genéricas y Específicas) con retroalimentación pedagógica inmediata, justificación técnica, voz y descarte de trampas.",
      icon: ClipboardCheck,
      link: "/saber-pro",
      search: { tab: "practica" as const },
      cta: "Entrenar preguntas",
      highlight: "50+ Casos con Audio y Feedback",
    },
    {
      num: "03",
      title: "Paso 2 · Simulador Oficial Cronometrado (0 a 300 pts)",
      desc: "Enfrenta la prueba con límite de tiempo estricto idéntico al examen oficial. Tu puntaje se calcula automáticamente en la escala oficial ICFES de 0 a 300.",
      icon: Flag,
      link: "/saber-pro",
      search: { tab: "simulacro" as const },
      cta: "Iniciar simulacro",
      highlight: "Escala oficial ICFES 0-300",
    },
    {
      num: "04",
      title: "Paso 3 · Chuleta de Fórmulas y Ratios (Sprint 4 Días)",
      desc: "Memoriza los 4 ratios contables determinantes (ROA, ROE, WACC, VPN, TIR, NIA 705) y las reglas de aumentos y descuentos sucesivos de alta frecuencia.",
      icon: Zap,
      link: "/saber-pro",
      search: { tab: "chuleta" as const },
      cta: "Consultar fórmulas",
      highlight: "Sprint 4 Días",
    },
    {
      num: "05",
      title: "Paso 4 · Estructura Oficial y Diagnóstico de Fallos",
      desc: "Conoce el número de preguntas por sesión y revisa detalladamente las preguntas erradas en tu mapa de diagnóstico para reforzar conceptos antes de la prueba.",
      icon: BookOpen,
      link: "/saber-pro",
      search: { tab: "estructura" as const },
      cta: "Ver estructura",
      highlight: "Marco de referencia oficial",
    },
    {
      num: "06",
      title: "Paso 6 · Traductor de Jerga y Términos en Latín",
      desc: "Traduce falacias como ad hominem, ad misericordiam, figuras de la Constitución y ratios a lenguaje cotidiano con enlaces directos para buscar en Google.",
      icon: Languages,
      link: "/saber-pro",
      search: { tab: "glosario" as const },
      cta: "Abrir traductor",
      highlight: "Glosario y Google directo",
    },
  ];

  const activeSteps = isSaberPro ? SABER_PRO_STEPS : DIAN_STEPS;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in-0 duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl border border-border/90 bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border/80 p-5 sm:p-6 bg-paper/40">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-2 rounded-full animate-pulse",
                  isSaberPro ? "bg-emerald-600" : "bg-accent",
                )}
              />
              <span
                className={cn(
                  "text-[11px] uppercase tracking-wider font-bold font-mono",
                  isSaberPro
                    ? "text-emerald-800 dark:text-emerald-300"
                    : "text-accent",
                )}
              >
                {isSaberPro
                  ? "Guía Oficial ICFES · Saber Pro 2026 (18 de Octubre)"
                  : "Guía Oficial de Preparación · Concurso DIAN 2676"}
              </span>
            </div>
            <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-ink">
              {isSaberPro
                ? "Ruta Oficial en 6 Pasos para Alcanzar Nivel 4"
                : "Ruta de Éxito en 5 Pasos para Ganar tu Empleo"}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted">
              {isSaberPro
                ? "Sigue la secuencia metodológica diseñada para dominar competencias genéricas y específicas antes de la prueba dominical."
                : "Sigue esta secuencia metodológica diseñada para superar con éxito las pruebas escritas eliminatorias."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted hover:bg-paper hover:text-ink transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Contenido con scroll */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <div className="grid gap-3.5">
            {activeSteps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className={cn(
                    "group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border/80 bg-paper/40 p-4 transition-all hover:bg-surface hover:shadow-xs",
                    isSaberPro ? "hover:border-emerald-500/60" : "hover:border-accent/60",
                  )}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl font-display font-bold text-sm",
                        isSaberPro
                          ? "bg-emerald-600/15 text-emerald-800 dark:text-emerald-300"
                          : "bg-accent/10 text-accent",
                      )}
                    >
                      {s.num}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-display font-bold text-sm text-ink flex items-center gap-1.5">
                          <Icon
                            className={cn(
                              "size-4",
                              isSaberPro ? "text-emerald-600 dark:text-emerald-400" : "text-accent",
                            )}
                          />
                          {s.title}
                        </h4>
                        <span
                          className={cn(
                            "rounded px-2 py-0.5 text-[9px] font-bold border",
                            isSaberPro
                              ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                              : "bg-ok/10 text-ok border-ok/30",
                          )}
                        >
                          {s.highlight}
                        </span>
                      </div>
                      <p className="text-xs text-muted leading-relaxed max-w-xl">{s.desc}</p>
                    </div>
                  </div>

                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className={cn(
                      "shrink-0 self-start sm:self-center cursor-pointer font-semibold",
                      isSaberPro && "hover:border-emerald-600 hover:text-emerald-700",
                    )}
                  >
                    <Link to={s.link} search={s.search} onClick={onClose}>
                      {s.cta}
                      <ArrowRight className="size-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Advertencia / Consejo Clave */}
          {isSaberPro ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex items-start gap-3">
              <Sparkles className="size-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs">
                <span className="font-bold text-emerald-900 dark:text-emerald-200">
                  ¡Objetivo Nivel 4 (Avanzado) en Saber Pro!
                </span>
                <p className="text-muted leading-relaxed">
                  Para obtener un puntaje sobresaliente (&gt;190 sobre 300 puntos), prioriza
                  comprender la estructura lógica de los argumentos, memoriza las fórmulas clave de
                  Gestión Financiera y usa el <strong>Traductor de Jerga</strong> para descartar
                  trampas con términos en latín en segundos.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-bad/30 bg-bad/5 p-4 flex items-start gap-3">
              <ShieldAlert className="size-5 text-bad shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs">
                <span className="font-bold text-bad">
                  ¡Clave eliminatoria del Acuerdo CNSC 21 de 2025!
                </span>
                <p className="text-muted leading-relaxed">
                  La prueba <strong>Funcional</strong> es de carácter <strong>eliminatorio</strong>.
                  Si obtienes un puntaje inferior a <strong>70,00 sobre 100</strong>, serás excluido
                  automáticamente del proceso. Entrena intensivamente en el Banco y el Simulador.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border/80 p-4 bg-paper/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <CheckCircle2 className="size-4 text-ok" />
            <span>
              {isSaberPro
                ? "Simulador oficial calibrado a tu carrera y fecha 18 Oct"
                : "Plataforma 100% calibrada a tu OPEC"}
            </span>
          </div>

          <Button
            onClick={onClose}
            size="sm"
            className={cn(
              "cursor-pointer font-bold",
              isSaberPro && "bg-emerald-600 hover:bg-emerald-700 text-white",
            )}
          >
            {isSaberPro ? "¡Entendido, empezar a entrenar Saber Pro!" : "¡Entendido, empezar a prepararme!"}
          </Button>
        </div>
      </div>
    </div>
  );
}
