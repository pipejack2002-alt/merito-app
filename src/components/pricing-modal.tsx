import { useEffect } from "react";
import {
  Check,
  CreditCard,
  Crown,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCargo } from "@/lib/use-cargo";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const { cargo } = useCargo();

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

  const opecCode = cargo.ficha?.opec || "236831";
  const cargoLabel = cargo.ficha?.denominacion || cargo.shortLabel;

  const handleWhatsAppContact = (planName: string, price: string) => {
    const text = encodeURIComponent(
      `¡Hola! Deseo activar el ${planName} (${price}) en la plataforma Mérito para preparar mi cargo de la DIAN: OPEC ${opecCode} - ${cargoLabel}. ¿Cuáles son los medios de pago (Nequi / Daviplata / PSE / Bancolombia)?`,
    );
    window.open(`https://wa.me/573000000000?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden my-auto">
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b border-border bg-paper/80 px-6 py-4">
          <div className="flex items-center gap-2">
            <Crown className="size-5 text-accent" />
            <div>
              <h2 className="font-display text-base font-bold text-ink">
                Planes de Preparación · Concurso DIAN 2676
              </h2>
              <p className="text-xs text-muted">
                Pago único hasta el día del examen (8 de Noviembre de 2026). Sin suscripciones mensuales.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="rounded-lg p-1.5 text-muted hover:bg-paper hover:text-ink transition-colors cursor-pointer"
            aria-label="Cerrar modal de precios"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Tarjetas de Planes */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Plan 1: Básico Aspirante */}
            <div className="rounded-xl border border-border bg-paper/50 p-5 flex flex-col justify-between hover:border-border/80 transition-colors">
              <div>
                <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-wider">
                  Básico
                </Badge>
                <h3 className="font-display text-lg font-bold text-ink mt-2">Aspirante Inicial</h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Para quienes inician a conocer la estructura general de la prueba.
                </p>

                <div className="mt-4 pb-4 border-b border-border">
                  <span className="font-display text-3xl font-black text-ink">$39.000</span>
                  <span className="text-xs text-muted ml-1">COP · Pago único</span>
                </div>

                <ul className="mt-4 space-y-2 text-xs text-muted">
                  <li className="flex items-center gap-2">
                    <Check className="size-3.5 text-accent shrink-0" />
                    <span>Banco de preguntas funcionales básicas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-3.5 text-accent shrink-0" />
                    <span>Simulador con cronómetro estándar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-3.5 text-accent shrink-0" />
                    <span>Acceso a guías MERF en la plataforma</span>
                  </li>
                </ul>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleWhatsAppContact("Plan Básico Aspirante", "$39.000 COP")}
                className="mt-6 w-full cursor-pointer"
              >
                Elegir Plan Básico
              </Button>
            </div>

            {/* Plan 2: Pro Concurrente (Destacado) */}
            <div className="relative rounded-xl border-2 border-accent bg-surface p-5 flex flex-col justify-between shadow-lg scale-102">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-accent text-white font-bold text-[10px] uppercase tracking-wider shadow-xs">
                  ⭐ Más Recomendado
                </Badge>
              </div>

              <div>
                <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-wider text-accent border-accent/40 bg-accent/10">
                  Profesional
                </Badge>
                <h3 className="font-display text-lg font-bold text-ink mt-2">Pro Concurrente</h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Todo el sistema de 24 indicadores de Areandina calibrado a tu OPEC.
                </p>

                <div className="mt-4 pb-4 border-b border-border">
                  <span className="font-display text-3xl font-black text-accent">$69.000</span>
                  <span className="text-xs text-muted ml-1">COP · Pago único</span>
                </div>

                <ul className="mt-4 space-y-2 text-xs text-ink font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="size-3.5 text-ok shrink-0" />
                    <span>Los 24 Indicadores Areandina para tu OPEC</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-3.5 text-ok shrink-0" />
                    <span>Modo Examen Estricto con pantalla completa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-3.5 text-ok shrink-0" />
                    <span>Audio-Lectura Text-to-Speech de casos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-3.5 text-ok shrink-0" />
                    <span>Descarga de Reporte Diagnóstico en PDF</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-3.5 text-ok shrink-0" />
                    <span>Entrenador ilimitado de preguntas falladas</span>
                  </li>
                </ul>
              </div>

              <Button
                size="sm"
                onClick={() => handleWhatsAppContact("Plan Pro Concurrente", "$69.000 COP")}
                className="mt-6 w-full bg-accent text-white hover:bg-accent/90 shadow-xs cursor-pointer font-bold"
              >
                Activar Plan Pro Inmediato
              </Button>
            </div>

            {/* Plan 3: Élite Mérito Total */}
            <div className="rounded-xl border border-border bg-paper/50 p-5 flex flex-col justify-between hover:border-border/80 transition-colors">
              <div>
                <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-wider">
                  Élite
                </Badge>
                <h3 className="font-display text-lg font-bold text-ink mt-2">Mérito Total</h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Para asegurar el primer puesto en la lista de elegibles de la DIAN.
                </p>

                <div className="mt-4 pb-4 border-b border-border">
                  <span className="font-display text-3xl font-black text-ink">$119.000</span>
                  <span className="text-xs text-muted ml-1">COP · Pago único</span>
                </div>

                <ul className="mt-4 space-y-2 text-xs text-muted">
                  <li className="flex items-center gap-2">
                    <Check className="size-3.5 text-accent shrink-0" />
                    <span>Todo lo incluido en el Plan Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-3.5 text-accent shrink-0" />
                    <span>Simulador ilimitado para múltiples OPECs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-3.5 text-accent shrink-0" />
                    <span>Fichas nemotécnicas completas de normativa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="size-3.5 text-accent shrink-0" />
                    <span>Canal prioritario de WhatsApp para dudas</span>
                  </li>
                </ul>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleWhatsAppContact("Plan Élite Mérito Total", "$119.000 COP")}
                className="mt-6 w-full cursor-pointer"
              >
                Elegir Plan Élite
              </Button>
            </div>
          </div>

          {/* Garantías y Medios de Pago */}
          <div className="rounded-xl border border-border bg-surface p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="size-5 text-ok shrink-0" />
              <div>
                <span className="font-bold text-ink block">Garantía de Contenido Oficial:</span>
                <span className="text-muted">
                  100% calibrado al Acuerdo 21 de 2025 y a la matriz de evaluación de Areandina.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-muted shrink-0">
              <CreditCard className="size-4 text-accent" />
              <span>Nequi · Daviplata · PSE · Bancolombia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
