import { useState, useEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Crown,
  Flag,
  Home,
  Layers,
  Shield,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgress } from "@/lib/progress-store";
import { useCargoStore } from "@/lib/cargo-store";
import { Badge } from "@/components/ui/badge";
import { CargoDropdownSelector } from "@/components/cargo-dropdown";
import { RoadmapModal } from "@/components/roadmap-modal";
import { PricingModal } from "@/components/pricing-modal";

const NAV = [
  {
    to: "/",
    label: "Panel Principal",
    shortLabel: "Inicio",
    sub: "Resumen y estado de preparación",
    icon: Home,
  },
  {
    to: "/indicadores",
    label: "Paso 1 · Indicadores del Cargo",
    shortLabel: "Indicadores",
    sub: "Los 24 aspectos de tu OPEC",
    icon: Sparkles,
    badge: "24 Ejes",
  },
  {
    to: "/estudio",
    label: "Paso 2 · Material de Estudio",
    shortLabel: "Estudio",
    sub: "Normativa y guías de tu empleo",
    icon: BookOpen,
  },
  {
    to: "/practica",
    label: "Paso 3 · Entrenador de Casos",
    shortLabel: "Entrenar",
    sub: "Preguntas con explicación inmediata",
    icon: ClipboardCheck,
  },
  {
    to: "/simulacro",
    label: "Paso 4 · Simulador de Examen",
    shortLabel: "Simulacro",
    sub: "Prueba oficial con cronómetro",
    icon: Flag,
  },
  {
    to: "/progreso",
    label: "Paso 5 · Diagnóstico y Fallos",
    shortLabel: "Diagnóstico",
    sub: "Probabilidad de pase y reporte PDF",
    icon: Layers,
  },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const examMode = pathname.startsWith("/simulacro/examen");
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  useEffect(() => {
    void useProgress.persist.rehydrate();
    void useCargoStore.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-dvh bg-bg text-ink flex flex-col selection:bg-accent/20">
      {/* Modal interactivo de Onboarding / Ruta Paso a Paso */}
      <RoadmapModal isOpen={isRoadmapOpen} onClose={() => setIsRoadmapOpen(false)} />
      {/* Modal de Planes Comerciales */}
      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />

      {examMode ? (
        <header className="sticky top-0 z-40 border-b border-border/80 bg-surface/95 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <span className="flex size-2 rounded-full bg-bad animate-pulse" />
              <p className="font-display text-sm font-bold text-ink">
                Simulación en Tiempo Real · Concurso DIAN 2676
              </p>
            </div>
            <Link
              to="/simulacro"
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted hover:border-bad hover:text-bad transition-all"
            >
              Finalizar / Salir
            </Link>
          </div>
        </header>
      ) : (
        <header className="sticky top-0 z-40 border-b border-border/80 bg-surface/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 lg:px-6">
            <Link to="/" className="flex min-w-0 items-center gap-3 group">
              <span className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-slate-900 to-accent text-accent-fg shadow-xs ring-1 ring-black/5 group-hover:scale-102 transition-transform">
                <span className="font-display text-[16px] font-black tracking-tight text-white">
                  M
                </span>
              </span>
              <span className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="block font-display text-[17px] font-bold leading-none tracking-tight text-ink">
                    Mérito
                  </span>
                  <Badge
                    variant="outline"
                    className="text-[9px] font-bold uppercase tracking-wider bg-accent/10 border-accent/30 text-accent py-0"
                  >
                    DIAN 2676
                  </Badge>
                </div>
                <span className="mt-1 block truncate text-[11px] font-medium tracking-wide text-muted">
                  Plataforma Oficial de Preparación
                </span>
              </span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Botón de Guía Paso a Paso */}
              <button
                type="button"
                onClick={() => setIsRoadmapOpen(true)}
                className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-paper/60 px-2.5 py-1.5 text-xs text-ink hover:border-accent hover:bg-surface font-semibold shadow-2xs transition-all"
              >
                <Compass className="size-3.5 text-accent" />
                <span>¿Cómo empezar?</span>
              </button>

              {/* Botón de Bot Areandina */}
              <Link
                to="/indicadores"
                className={cn(
                  "hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs text-accent hover:bg-accent/20 transition-all font-semibold shadow-2xs",
                  pathname.startsWith("/indicadores") &&
                    "bg-accent text-white border-accent shadow-xs",
                )}
              >
                <Sparkles className="size-3.5" />
                <span>Indicadores Oficiales</span>
                <span className="rounded bg-accent/20 px-1 py-0.5 text-[9px] font-bold uppercase">
                  24 Ejes
                </span>
              </Link>

              {/* Botón de Planes Pro */}
              <button
                type="button"
                onClick={() => setIsPricingOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-accent/60 bg-linear-to-r from-accent/15 to-accent/5 px-2.5 py-1.5 text-xs text-accent hover:bg-accent/25 transition-all font-bold shadow-2xs cursor-pointer"
              >
                <Crown className="size-3.5 text-accent" />
                <span>Planes Pro</span>
              </button>

              {/* Selector de Cargo Rápido Desplegable en el Header */}
              <CargoDropdownSelector />
            </div>
          </div>
        </header>
      )}

      {examMode ? (
        <main className="mx-auto max-w-4xl px-4 pb-12 pt-6 flex-1 w-full">{children}</main>
      ) : (
        <div className="mx-auto flex max-w-7xl w-full flex-1 gap-6 lg:px-6">
          {/* Barra Lateral Dinámica y Fluida */}
          <aside className="sticky top-20 hidden h-[calc(100dvh-5.5rem)] w-72 shrink-0 py-3 pr-2 lg:flex lg:flex-col lg:justify-between overflow-y-auto">
            <div className="space-y-3.5">
              {/* Bloque de Navegación Principal con Secuencia Paso a Paso */}
              <div className="rounded-2xl border border-border/70 bg-surface/80 p-3 shadow-2xs backdrop-blur-xs">
                <div className="flex items-center justify-between px-2 pb-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-subtle">
                    Ruta de Preparación
                  </p>
                  <span className="rounded bg-accent/10 px-1.5 py-0.5 text-[9px] font-bold text-accent font-mono uppercase">
                    5 Pasos
                  </span>
                </div>
                <nav className="mt-1.5 flex flex-col gap-1">
                  {NAV.map((item) => {
                    const active =
                      item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={cn(
                          "group flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-all",
                          active
                            ? "bg-accent text-white font-semibold shadow-xs"
                            : "text-muted hover:bg-paper/80 hover:text-ink",
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon
                            className={cn(
                              "size-4 shrink-0 transition-transform group-hover:scale-110",
                              active ? "text-white" : "text-subtle group-hover:text-ink",
                            )}
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="leading-tight font-medium text-xs whitespace-nowrap">
                              {item.label}
                            </span>
                            <span
                              className={cn(
                                "text-[10px] leading-tight truncate mt-0.5 max-w-44",
                                active ? "text-white/80" : "text-subtle",
                              )}
                            >
                              {item.sub}
                            </span>
                          </div>
                        </div>
                        {"badge" in item ? (
                          <span
                            className={cn(
                              "rounded px-1.5 py-0.5 text-[9px] font-bold shrink-0 ml-1.5",
                              active
                                ? "bg-white/20 text-white"
                                : "bg-accent/10 text-accent group-hover:bg-accent/20",
                            )}
                          >
                            {item.badge}
                          </span>
                        ) : null}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Tarjeta de Guía Paso a Paso */}
              <button
                type="button"
                onClick={() => setIsRoadmapOpen(true)}
                className="w-full rounded-2xl border border-accent/30 bg-accent/5 p-3.5 text-left transition-all hover:bg-accent/10 hover:border-accent hover:shadow-xs group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent flex items-center gap-1 font-mono">
                    <Compass className="size-3 text-accent" />
                    Ruta de Éxito
                  </span>
                  <span className="text-[10px] text-accent font-semibold group-hover:translate-x-0.5 transition-transform">
                    Ver 5 Pasos →
                  </span>
                </div>
                <p className="mt-1 font-display font-bold text-xs text-ink">
                  ¿Cómo usar la plataforma?
                </p>
                <p className="mt-0.5 text-[11px] text-muted leading-relaxed">
                  Aprende la secuencia exacta para asegurar tu puntaje eliminatorio.
                </p>
              </button>

              {/* Banner de Planes Pro en Barra Lateral */}
              <button
                type="button"
                onClick={() => setIsPricingOpen(true)}
                className="w-full rounded-2xl border border-accent/40 bg-linear-to-br from-accent/10 via-surface to-accent/5 p-3.5 text-left transition-all hover:border-accent hover:shadow-xs group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent flex items-center gap-1 font-mono">
                    <Crown className="size-3 text-accent" />
                    Acceso Total
                  </span>
                  <span className="text-[10px] font-bold text-accent group-hover:scale-105 transition-transform">
                    Desde $39k
                  </span>
                </div>
                <p className="mt-1 font-display font-bold text-xs text-ink">
                  Activar Plan Concurrente
                </p>
                <p className="mt-0.5 text-[11px] text-muted leading-relaxed">
                  Desbloquea simulacros ilimitados, audio y reportes PDF hasta el examen.
                </p>
              </button>
            </div>

            {/* Tarjeta Inferior de Garantía Institucional */}
            <div className="rounded-2xl border border-border/80 bg-paper/50 p-3.5 space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-ink font-semibold text-xs">
                  <Shield className="size-3.5 text-ok" />
                  <span>Garantía de Contenido</span>
                </div>
                <span className="text-[9px] font-mono text-muted uppercase">CNSC 2676</span>
              </div>
              <p className="text-[11px] leading-relaxed text-muted">
                100% calibrado al Acuerdo 21 de 2025 y los 24 indicadores del operador Areandina.
              </p>
              <div className="pt-1 flex items-center justify-between border-t border-border/60 text-[10px] font-semibold text-ok">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="size-3" />
                  Simulador Verificado
                </span>
                <span className="text-subtle font-normal">Examen: 8 Nov 2026</span>
              </div>
            </div>
          </aside>

          <main className="min-w-0 flex-1 px-4 pb-28 pt-6 lg:px-0 lg:pb-16 lg:pt-6">
            {children}
          </main>
        </div>
      )}

      {/* Navegación móvil comercial */}
      {!examMode && (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/90 bg-surface/95 backdrop-blur-md lg:hidden">
          <ul className="mx-auto grid max-w-md grid-cols-6 px-1 pb-[env(safe-area-inset-bottom)]">
            {NAV.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "flex h-14 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors",
                      active ? "text-accent font-semibold" : "text-muted",
                    )}
                  >
                    <Icon className={cn("size-5", active ? "text-accent" : "text-subtle")} />
                    <span className="truncate max-w-14">{item.shortLabel}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
