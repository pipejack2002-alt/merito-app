import { useState, useEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Crown,
  Flag,
  GraduationCap,
  Home,
  Languages,
  Layers,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgress } from "@/lib/progress-store";
import { useCargoStore } from "@/lib/cargo-store";
import { useSaberProStore } from "@/lib/saber-pro-store";
import { Badge } from "@/components/ui/badge";
import { CargoDropdownSelector } from "@/components/cargo-dropdown";
import { SaberProCareerDropdown } from "@/components/saber-pro-career-dropdown";
import { RoadmapModal } from "@/components/roadmap-modal";
import { PricingModal } from "@/components/pricing-modal";
import type { SaberProTab } from "@/routes/saber-pro";

const DIAN_NAV = [
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

const SABER_PRO_NAV = [
  {
    tab: "resumen",
    label: "Panel Principal",
    shortLabel: "Inicio",
    sub: "Resumen y estado Saber Pro 2026",
    icon: Home,
  },
  {
    tab: "practica",
    label: "Paso 1 · Entrenador de Preguntas",
    shortLabel: "Entrenar",
    sub: "Genéricas y específicas explicadas",
    icon: ClipboardCheck,
    badge: "26 Casos",
  },
  {
    tab: "simulacro",
    label: "Paso 2 · Simulador de Examen",
    shortLabel: "Simulacro",
    sub: "Prueba oficial cronometrada (0-300)",
    icon: Flag,
    badge: "ICFES",
  },
  {
    tab: "chuleta",
    label: "Paso 3 · Chuleta de Fórmulas",
    shortLabel: "Chuleta",
    sub: "Ratios y normas clave (Sprint 4 Días)",
    icon: Zap,
    badge: "Sprint",
  },
  {
    tab: "estructura",
    label: "Paso 4 · Estructura Oficial ICFES",
    shortLabel: "Estructura",
    sub: "Marco de referencia y competencias",
    icon: BookOpen,
  },
  {
    tab: "diagnostico",
    label: "Paso 5 · Diagnóstico y Fallos",
    shortLabel: "Diagnóstico",
    sub: "Probabilidad Nivel 4 y mapa de fallos",
    icon: Layers,
    badge: "Reporte",
  },
  {
    tab: "glosario",
    label: "Paso 6 · Traductor de Jerga",
    shortLabel: "Traductor",
    sub: "Falacias en latín y términos explicados",
    icon: Languages,
    badge: "Traductor",
  },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.search }) as { tab?: SaberProTab };
  const isSaberPro = pathname.startsWith("/saber-pro");
  const currentSaberProTab: SaberProTab = isSaberPro ? search?.tab || "resumen" : "resumen";
  const examMode = pathname.startsWith("/simulacro/examen");

  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  // Control interactivo de ancho de barra lateral (Normal 320px vs Amplio 384px)
  const [isSidebarWide, setIsSidebarWide] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("merito-sidebar-wide") === "true";
    }
    return false;
  });

  const toggleSidebarWidth = () => {
    setIsSidebarWide((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("merito-sidebar-wide", String(next));
      }
      return next;
    });
  };

  useEffect(() => {
    void useProgress.persist.rehydrate();
    void useCargoStore.persist.rehydrate();
    void useSaberProStore.persist.rehydrate();
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
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 lg:px-6">
            {/* Logo y Nombre del Entorno Dinámico (DIAN vs Saber Pro) */}
            <Link
              to={isSaberPro ? "/saber-pro" : "/"}
              className="flex min-w-0 items-center gap-3 group"
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-xl text-white shadow-xs ring-1 ring-black/5 group-hover:scale-102 transition-transform",
                  isSaberPro
                    ? "bg-linear-to-br from-emerald-600 via-emerald-700 to-teal-800"
                    : "bg-linear-to-br from-slate-900 to-accent text-accent-fg",
                )}
              >
                {isSaberPro ? (
                  <GraduationCap className="size-5 text-white" />
                ) : (
                  <span className="font-display text-[16px] font-black tracking-tight text-white">
                    M
                  </span>
                )}
              </span>
              <span className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="block font-display text-[17px] font-bold leading-none tracking-tight text-ink">
                    Mérito
                  </span>
                  {isSaberPro ? (
                    <Badge
                      variant="outline"
                      className="text-[9px] font-bold uppercase tracking-wider bg-emerald-500/15 border-emerald-500/50 text-emerald-800 dark:text-emerald-300 py-0"
                    >
                      SABER PRO 2026
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-[9px] font-bold uppercase tracking-wider bg-accent/10 border-accent/30 text-accent py-0"
                    >
                      DIAN 2676
                    </Badge>
                  )}
                </div>
                <span className="mt-1 block truncate text-[11px] font-medium tracking-wide text-muted">
                  {isSaberPro
                    ? "Módulo Oficial ICFES · 18 Oct"
                    : "Plataforma Oficial de Preparación"}
                </span>
              </span>
            </Link>

            {/* Selector de Modo y Acciones Principales */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Botón Switch: Concurso DIAN 2676 */}
              <Link
                to="/"
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all shadow-2xs cursor-pointer",
                  !isSaberPro
                    ? "bg-accent text-white shadow-xs border border-accent"
                    : "border border-border/80 bg-paper/60 text-muted hover:text-ink hover:border-emerald-500 hover:bg-surface",
                )}
              >
                <Briefcase className="size-3.5" />
                <span className="hidden sm:inline">Concurso</span>
                <span>DIAN 2676</span>
              </Link>

              {/* Botón Switch: Saber Pro 2026 con Paleta Esmeralda de Alto Contraste */}
              <Link
                to="/saber-pro"
                search={{ tab: currentSaberProTab || "resumen" }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all shadow-2xs cursor-pointer",
                  isSaberPro
                    ? "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 border border-emerald-500 shadow-sm"
                    : "border border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/20",
                )}
              >
                <GraduationCap
                  className={cn(
                    "size-3.5",
                    isSaberPro ? "text-white dark:text-slate-950" : "text-emerald-700 dark:text-emerald-300",
                  )}
                />
                <span>Saber Pro</span>
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[9px] font-black uppercase font-mono tracking-wider",
                    isSaberPro
                      ? "bg-emerald-800 text-emerald-100 dark:bg-slate-950 dark:text-emerald-300 border border-emerald-400/30"
                      : "bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 border border-emerald-500/40",
                  )}
                >
                  18 Oct
                </span>
              </Link>

              {/* Botón de Guía Paso a Paso */}
              <button
                type="button"
                onClick={() => setIsRoadmapOpen(true)}
                className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-paper/60 px-2.5 py-1.5 text-xs text-ink hover:border-accent hover:bg-surface font-semibold shadow-2xs transition-all cursor-pointer"
              >
                <Compass className="size-3.5 text-accent" />
                <span>¿Cómo empezar?</span>
              </button>

              {/* Botón de Indicadores Oficiales (solo en DIAN) */}
              {!isSaberPro && (
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
                  <span className="rounded bg-accent/20 px-1 py-0.5 text-[9px] font-bold uppercase font-mono">
                    24 Ejes
                  </span>
                </Link>
              )}

              {/* Botón de Planes Pro */}
              <button
                type="button"
                onClick={() => setIsPricingOpen(true)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-bold shadow-2xs transition-all cursor-pointer",
                  isSaberPro
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/20"
                    : "border-accent/60 bg-linear-to-r from-accent/15 to-accent/5 text-accent hover:bg-accent/25",
                )}
              >
                <Crown className={cn("size-3.5", isSaberPro ? "text-emerald-600 dark:text-emerald-400" : "text-accent")} />
                <span>Planes Pro</span>
              </button>

              {/* Selector de Perfil Rápido: Cargo OPEC en DIAN / Carrera Universitaria en Saber Pro */}
              {isSaberPro ? <SaberProCareerDropdown /> : <CargoDropdownSelector />}
            </div>
          </div>
        </header>
      )}

      {examMode ? (
        <main className="mx-auto max-w-4xl px-4 pb-12 pt-6 flex-1 w-full">{children}</main>
      ) : (
        <div className="mx-auto flex max-w-7xl w-full flex-1 gap-6 lg:px-6">
          {/* Barra Lateral Dinámica con Ancho Ajustable y Tipografía Unificada */}
          <aside
            className={cn(
              "sticky top-20 hidden h-[calc(100dvh-5.5rem)] shrink-0 py-3 pr-2 lg:flex lg:flex-col lg:justify-between overflow-y-auto transition-all duration-200",
              isSidebarWide ? "w-92 xl:w-96" : "w-80",
            )}
          >
            <div className="space-y-3.5">
              {/* Bloque de Navegación Principal */}
              <div className="rounded-2xl border border-border/70 bg-surface/80 p-3 shadow-2xs backdrop-blur-xs">
                {/* Cabecera de la Barra con Control de Ancho Interactivo */}
                <div className="flex items-center justify-between px-2 pb-2 border-b border-border/60">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-subtle">
                    {isSaberPro ? "Ruta Saber Pro" : "Ruta de Preparación"}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={toggleSidebarWidth}
                      className={cn(
                        "rounded-md border border-border/70 bg-paper/70 px-1.5 py-0.5 text-[9px] font-mono font-medium text-muted hover:text-ink hover:border-border transition-all flex items-center gap-1 cursor-pointer",
                        isSidebarWide &&
                          (isSaberPro
                            ? "border-emerald-500/40 text-emerald-800 dark:text-emerald-300 bg-emerald-500/10"
                            : "border-accent/40 text-accent bg-accent/10"),
                      )}
                      title="Ajustar ancho de barra lateral (Normal / Amplio)"
                    >
                      <ArrowLeftRight className="size-2.5" />
                      <span>{isSidebarWide ? "Amplio" : "Normal"}</span>
                    </button>
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[9px] font-bold font-mono uppercase",
                        isSaberPro
                          ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300"
                          : "bg-accent/10 text-accent",
                      )}
                    >
                      {isSaberPro ? "6 Pasos" : "5 Pasos"}
                    </span>
                  </div>
                </div>

                <nav className="mt-2 flex flex-col gap-1">
                  {isSaberPro
                    ? SABER_PRO_NAV.map((item) => {
                        const active = currentSaberProTab === item.tab;
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.tab}
                            to="/saber-pro"
                            search={{ tab: item.tab }}
                            className={cn(
                              "group flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-xs transition-all",
                              active
                                ? "bg-emerald-600 text-white font-semibold shadow-xs"
                                : "text-muted hover:bg-paper/80 hover:text-ink",
                            )}
                          >
                            <Icon
                              className={cn(
                                "size-4 shrink-0 mt-0.5 transition-transform group-hover:scale-110",
                                active ? "text-white" : "text-subtle group-hover:text-ink",
                              )}
                            />
                            <div className="flex flex-col min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1.5 w-full">
                                <span
                                  className={cn(
                                    "leading-tight font-medium text-xs",
                                    active ? "text-white font-bold" : "text-ink",
                                  )}
                                >
                                  {item.label}
                                </span>
                                {"badge" in item ? (
                                  <span
                                    className={cn(
                                      "rounded px-1.5 py-0.5 text-[9px] font-bold font-mono shrink-0 ml-1.5",
                                      active
                                        ? "bg-white/25 text-white"
                                        : "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 group-hover:bg-emerald-500/25",
                                    )}
                                  >
                                    {item.badge}
                                  </span>
                                ) : null}
                              </div>
                              <span
                                className={cn(
                                  "text-[10px] leading-tight truncate mt-1",
                                  active ? "text-white/80" : "text-subtle",
                                )}
                              >
                                {item.sub}
                              </span>
                            </div>
                          </Link>
                        );
                      })
                    : DIAN_NAV.map((item) => {
                        const active =
                          item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            className={cn(
                              "group flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-xs transition-all",
                              active
                                ? "bg-accent text-white font-semibold shadow-xs"
                                : "text-muted hover:bg-paper/80 hover:text-ink",
                            )}
                          >
                            <Icon
                              className={cn(
                                "size-4 shrink-0 mt-0.5 transition-transform group-hover:scale-110",
                                active ? "text-white" : "text-subtle group-hover:text-ink",
                              )}
                            />
                            <div className="flex flex-col min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1.5 w-full">
                                <span
                                  className={cn(
                                    "leading-tight font-medium text-xs",
                                    active ? "text-white font-bold" : "text-ink",
                                  )}
                                >
                                  {item.label}
                                </span>
                                {"badge" in item ? (
                                  <span
                                    className={cn(
                                      "rounded px-1.5 py-0.5 text-[9px] font-bold font-mono shrink-0 ml-1.5",
                                      active
                                        ? "bg-white/20 text-white"
                                        : "bg-accent/10 text-accent group-hover:bg-accent/20",
                                    )}
                                  >
                                    {item.badge}
                                  </span>
                                ) : null}
                              </div>
                              <span
                                className={cn(
                                  "text-[10px] leading-tight truncate mt-1",
                                  active ? "text-white/80" : "text-subtle",
                                )}
                              >
                                {item.sub}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                </nav>
              </div>

              {/* Tarjetas Contextuales Armonizadas por Modo Activo */}
              {isSaberPro ? (
                <>
                  {/* Tarjeta de Retorno a Concurso DIAN (Armonizada en Saber Pro) */}
                  <Link
                    to="/"
                    className="w-full rounded-2xl border border-border/80 bg-paper/60 p-3.5 text-left transition-all hover:border-emerald-500/50 hover:bg-surface group cursor-pointer block shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted flex items-center gap-1.5 font-mono group-hover:text-ink transition-colors">
                        <Briefcase className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                        Concurso DIAN 2676
                      </span>
                      <span className="rounded bg-paper px-1.5 py-0.5 text-[9px] font-bold text-muted font-mono border border-border/60">
                        Volver
                      </span>
                    </div>
                    <p className="mt-1.5 font-display font-bold text-xs text-ink">
                      Regresar a Preparación DIAN
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted leading-relaxed">
                      Vuelve a tu OPEC, los 24 indicadores oficiales y el simulador de examen CNSC.
                    </p>
                    <div className="mt-2 flex items-center text-[10px] font-bold text-emerald-700 dark:text-emerald-300 group-hover:translate-x-0.5 transition-transform">
                      <span>Ir a Concurso DIAN →</span>
                    </div>
                  </Link>

                  {/* Tarjeta de Guía Paso a Paso (Paleta Esmeralda Saber Pro) */}
                  <button
                    type="button"
                    onClick={() => setIsRoadmapOpen(true)}
                    className="w-full rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 text-left transition-all hover:bg-emerald-500/10 hover:border-emerald-500/60 hover:shadow-xs group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1 font-mono">
                        <Compass className="size-3 text-emerald-600 dark:text-emerald-400" />
                        Ruta de Éxito
                      </span>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold group-hover:translate-x-0.5 transition-transform">
                        Ver 5 Pasos →
                      </span>
                    </div>
                    <p className="mt-1 font-display font-bold text-xs text-ink">
                      ¿Cómo usar la plataforma?
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted leading-relaxed">
                      Aprende la secuencia exacta para asegurar tu Nivel 4 en Saber Pro.
                    </p>
                  </button>

                  {/* Banner de Planes Pro (Paleta Esmeralda Saber Pro) */}
                  <button
                    type="button"
                    onClick={() => setIsPricingOpen(true)}
                    className="w-full rounded-2xl border border-emerald-500/40 bg-linear-to-br from-emerald-500/10 via-surface to-emerald-500/5 p-3.5 text-left transition-all hover:border-emerald-500 hover:shadow-xs group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1 font-mono">
                        <Crown className="size-3 text-emerald-600 dark:text-emerald-400" />
                        Acceso Total
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 group-hover:scale-105 transition-transform font-mono">
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
                </>
              ) : (
                <>
                  {/* Tarjeta Destacada Saber Pro 2026 (Armonizada en Verde Esmeralda) */}
                  <Link
                    to="/saber-pro"
                    search={{ tab: "resumen" }}
                    className="w-full rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-surface to-emerald-500/5 p-3.5 text-left transition-all hover:border-emerald-500 hover:shadow-xs group cursor-pointer block"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 font-mono">
                        <GraduationCap className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                        Saber Pro 2026
                      </span>
                      <span className="rounded bg-emerald-600 text-white px-1.5 py-0.5 text-[9px] font-bold font-mono uppercase shadow-2xs">
                        18 Octubre
                      </span>
                    </div>
                    <p className="mt-1.5 font-display font-bold text-xs text-ink">
                      Módulo Oficial Saber Pro
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted leading-relaxed">
                      Entrenador intensivo: Genéricas y Contaduría Pública con simulación oficial.
                    </p>
                    <div className="mt-2 flex items-center text-[10px] font-bold text-emerald-700 dark:text-emerald-300 group-hover:translate-x-0.5 transition-transform">
                      <span>Activar Saber Pro →</span>
                    </div>
                  </Link>

                  {/* Tarjeta de Guía Paso a Paso (Paleta DIAN) */}
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

                  {/* Banner de Planes Pro (Paleta DIAN) */}
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
                      <span className="text-[10px] font-bold text-accent group-hover:scale-105 transition-transform font-mono">
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
                </>
              )}
            </div>

            {/* Tarjeta Inferior de Garantía Institucional Calibrada */}
            <div className="rounded-2xl border border-border/80 bg-paper/50 p-3.5 space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-ink font-semibold text-xs">
                  <Shield
                    className={cn(
                      "size-3.5",
                      isSaberPro ? "text-emerald-600 dark:text-emerald-400" : "text-ok",
                    )}
                  />
                  <span>
                    {isSaberPro ? "Marco Oficial ICFES" : "Garantía de Contenido"}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-muted uppercase">
                  {isSaberPro ? "Saber Pro 2026" : "CNSC 2676"}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-muted">
                {isSaberPro
                  ? "Alineado a las especificaciones oficiales ICFES: Genéricas (Lectura, Matemáticas, Ciudadanas, Inglés) y Específicas."
                  : "100% calibrado al Acuerdo 21 de 2025 y los 24 indicadores del operador Areandina."}
              </p>
              <div
                className={cn(
                  "pt-1 flex items-center justify-between border-t border-border/60 text-[10px] font-semibold",
                  isSaberPro
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-ok",
                )}
              >
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="size-3" />
                  Simulador Verificado
                </span>
                <span className="text-subtle font-normal font-mono">
                  {isSaberPro ? "18 Oct 2026" : "8 Nov 2026"}
                </span>
              </div>
            </div>
          </aside>

          <main className="min-w-0 flex-1 px-4 pb-28 pt-6 lg:px-0 lg:pb-16 lg:pt-6">
            {children}
          </main>
        </div>
      )}

      {/* Navegación móvil dinámica según el modo activo */}
      {!examMode && (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/90 bg-surface/95 backdrop-blur-md lg:hidden">
          <ul className="mx-auto grid max-w-md grid-cols-6 px-1 pb-[env(safe-area-inset-bottom)]">
            {isSaberPro
              ? SABER_PRO_NAV.map((item) => {
                  const active = currentSaberProTab === item.tab;
                  const Icon = item.icon;
                  return (
                    <li key={item.tab}>
                      <Link
                        to="/saber-pro"
                        search={{ tab: item.tab }}
                        className={cn(
                          "flex h-14 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors",
                          active ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-muted",
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-5",
                            active ? "text-emerald-600 dark:text-emerald-400" : "text-subtle",
                          )}
                        />
                        <span className="truncate max-w-14">{item.shortLabel}</span>
                      </Link>
                    </li>
                  );
                })
              : DIAN_NAV.map((item) => {
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
