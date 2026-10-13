import { useEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  Flag,
  Home,
  Layers,
  Shield,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgress } from "@/lib/progress-store";
import { useCargoStore } from "@/lib/cargo-store";
import { useCargo } from "@/lib/use-cargo";
import { Badge } from "@/components/ui/badge";

const NAV = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/indicadores", label: "Bot Areandina", icon: Sparkles, badge: "24 Ejes" },
  { to: "/estudio", label: "Módulos de Estudio", icon: BookOpen },
  { to: "/practica", label: "Banco de Práctica", icon: ClipboardCheck },
  { to: "/simulacro", label: "Simulacro Oficial", icon: Flag },
  { to: "/progreso", label: "Métricas y Análisis", icon: Layers },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const examMode = pathname.startsWith("/simulacro/examen");
  const { cargo, ficha } = useCargo();

  useEffect(() => {
    void useProgress.persist.rehydrate();
    void useCargoStore.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-dvh bg-bg text-ink flex flex-col selection:bg-accent/20">
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

            <div className="flex items-center gap-2.5">
              <Link
                to="/indicadores"
                className={cn(
                  "hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs text-accent hover:bg-accent/20 transition-all font-semibold shadow-2xs",
                  pathname.startsWith("/indicadores") &&
                    "bg-accent text-white border-accent shadow-xs",
                )}
              >
                <Sparkles className="size-3.5" />
                <span>Bot Areandina</span>
                <span className="rounded bg-accent/20 px-1 py-0.5 text-[9px] font-bold uppercase">
                  24 Ejes
                </span>
              </Link>

              <Link
                to="/cargo"
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border border-border/90 bg-surface px-3 py-1.5 text-xs text-ink hover:border-accent/50 hover:bg-paper/50 transition-all shadow-2xs",
                  (pathname.startsWith("/cargo") ||
                    pathname.startsWith("/guia") ||
                    pathname.startsWith("/ficha")) &&
                    "border-accent ring-1 ring-accent/30 bg-paper/50 font-semibold",
                )}
              >
                <Briefcase className="size-3.5 text-accent shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-xs leading-none truncate max-w-30 sm:max-w-40">
                    {cargo.shortLabel}
                  </span>
                  <span className="text-[10px] text-muted leading-tight mt-0.5">
                    {ficha.nivel || "Técnico"} · Cambiar
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </header>
      )}

      {examMode ? (
        <main className="mx-auto max-w-4xl px-4 pb-12 pt-6 flex-1 w-full">{children}</main>
      ) : (
        <div className="mx-auto flex max-w-6xl w-full flex-1 gap-6 lg:px-6">
          <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-60 shrink-0 py-6 pr-4 lg:flex lg:flex-col lg:justify-between">
            <div className="space-y-6">
              <div>
                <p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-subtle">
                  Navegación
                </p>
                <nav className="mt-2 flex flex-col gap-1">
                  {NAV.map((item) => {
                    const active =
                      item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={cn(
                          "group flex h-10 items-center justify-between rounded-xl px-3 text-xs font-medium transition-all",
                          active
                            ? "bg-accent text-white font-semibold shadow-xs"
                            : "text-muted hover:bg-paper/80 hover:text-ink",
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={cn(
                              "size-4 transition-transform group-hover:scale-110",
                              active ? "text-white" : "text-subtle group-hover:text-ink",
                            )}
                          />
                          <span>{item.label}</span>
                        </div>
                        {"badge" in item ? (
                          <span
                            className={cn(
                              "rounded px-1.5 py-0.5 text-[9px] font-bold",
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

              <div>
                <p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-subtle">
                  Herramientas del Cargo
                </p>
                <nav className="mt-2 flex flex-col gap-1">
                  <Link
                    to="/guia"
                    className={cn(
                      "flex h-10 items-center gap-2.5 rounded-xl px-3 text-xs font-medium transition-all",
                      pathname.startsWith("/guia")
                        ? "bg-accent text-white font-semibold shadow-xs"
                        : "text-muted hover:bg-paper/80 hover:text-ink",
                    )}
                  >
                    <BookOpen className="size-4 text-subtle" />
                    <span>Guía del Empleo</span>
                  </Link>
                  <Link
                    to="/cargo"
                    className={cn(
                      "flex h-10 items-center gap-2.5 rounded-xl px-3 text-xs font-medium transition-all",
                      pathname.startsWith("/cargo")
                        ? "bg-accent text-white font-semibold shadow-xs"
                        : "text-muted hover:bg-paper/80 hover:text-ink",
                    )}
                  >
                    <Briefcase className="size-4 text-subtle" />
                    <span>Catálogo de Cargos</span>
                  </Link>
                </nav>
              </div>
            </div>

            {/* Tarjeta de Garantía Institucional */}
            <div className="rounded-xl border border-border/80 bg-paper/50 p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 text-ink font-semibold text-xs">
                <Shield className="size-3.5 text-ok" />
                <span>Garantía de Contenido</span>
              </div>
              <p className="text-[11px] leading-relaxed text-muted">
                100% alineado al Acuerdo 21 de 2025 de la CNSC y los 24 indicadores oficiales del
                operador Areandina.
              </p>
              <div className="pt-1 flex items-center gap-1 text-[10px] font-semibold text-ok">
                <CheckCircle2 className="size-3" />
                <span>Simulador Verificado</span>
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
                    <span className="truncate max-w-14">{item.label.split(" ")[0]}</span>
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
