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
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RoadmapModal({ isOpen, onClose }: RoadmapModalProps) {
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

  const STEPS = [
    {
      num: "01",
      title: "Configura tu Empleo y OPEC",
      desc: "Usa el selector en el encabezado para activar tu cargo (Analista, Gestor, Inspector o Facilitador). Toda la plataforma calibra sus preguntas, guías y casos situacionales a tus funciones exactas.",
      icon: Briefcase,
      link: "/cargo",
      cta: "Seleccionar empleo",
      highlight: "Adaptabilidad total a tu cargo",
    },
    {
      num: "02",
      title: "Revisa tus 24 Indicadores Oficiales",
      desc: "Areandina (el operador oficial de la DIAN) publicó 24 ejes temáticos: 9 funcionales, 10 comportamentales y 5 de integridad. Consulta qué temas evaluará la universidad para tu OPEC.",
      icon: Sparkles,
      link: "/indicadores",
      cta: "Consultar Areandina",
      highlight: "100% cubiertos en la app",
    },
    {
      num: "03",
      title: "Estudia las Guías Temáticas",
      desc: "Lee los resúmenes normativos condensados: Estatuto Tributario, Cobro Coactivo (Art. 828), Devoluciones (Art. 850), CPACA y el Código de Integridad. Cada módulo incluye tips para juicio situacional.",
      icon: BookOpen,
      link: "/estudio",
      cta: "Ver módulos de estudio",
      highlight: "Normas explicadas al grano",
    },
    {
      num: "04",
      title: "Entrena en el Banco de Preguntas",
      desc: "Practica ítem por ítem con retroalimentación pedagógica instantánea. Aprende a descartar opciones distractoras y comprende el fundamento legal de la respuesta correcta.",
      icon: ClipboardCheck,
      link: "/practica",
      cta: "Entrenar preguntas",
      highlight: "Feedback inmediato y tips",
    },
    {
      num: "05",
      title: "Mídete en el Simulador con Cronómetro",
      desc: "Enfrenta la prueba escrita con límite de tiempo estricto idéntico al día del examen (8 de noviembre de 2026). Recuerda que la prueba Funcional es eliminatoria: requieres mínimo 70,00 pts para continuar.",
      icon: Flag,
      link: "/simulacro",
      cta: "Hacer simulacro oficial",
      highlight: "Umbral eliminatorio mín. 70 pts",
    },
  ];

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
              <span className="flex size-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider font-bold text-accent font-mono">
                Guía Oficial de Preparación · Concurso DIAN 2676
              </span>
            </div>
            <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-ink">
              Ruta de Éxito en 5 Pasos para Ganar tu Empleo
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted">
              Sigue esta secuencia metodológica diseñada para superar con éxito las pruebas escritas
              eliminatorias.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted hover:bg-paper hover:text-ink transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Contenido con scroll */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <div className="grid gap-3.5">
            {STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border/80 bg-paper/40 p-4 transition-all hover:border-accent/60 hover:bg-surface hover:shadow-xs"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent font-display font-bold text-sm">
                      {s.num}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-display font-bold text-sm text-ink flex items-center gap-1.5">
                          <Icon className="size-4 text-accent" />
                          {s.title}
                        </h4>
                        <span className="rounded px-2 py-0.5 text-[9px] font-bold bg-ok/10 text-ok border border-ok/30">
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
                    className="shrink-0 self-start sm:self-center"
                  >
                    <Link to={s.link} onClick={onClose}>
                      {s.cta}
                      <ArrowRight className="size-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Advertencia Importante Eliminatoria */}
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
        </div>

        {/* Footer */}
        <div className="border-t border-border/80 p-4 bg-paper/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <CheckCircle2 className="size-4 text-ok" />
            <span>Plataforma 100% calibrada a tu OPEC</span>
          </div>

          <Button onClick={onClose} size="sm">
            ¡Entendido, empezar a prepararme!
          </Button>
        </div>
      </div>
    </div>
  );
}
