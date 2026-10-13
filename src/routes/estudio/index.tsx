import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, Sparkles, X } from "lucide-react";
import { TRACKS, type TrackId } from "@/data/types";
import { useProgress } from "@/lib/progress-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCargo } from "@/lib/use-cargo";
import { INDICADORES_OFICIALES_BASE } from "@/data/areandina-indicadores";

export const Route = createFileRoute("/estudio/")({ component: EstudioIndex });

const ORDER: TrackId[] = ["funcional", "comportamental", "integridad"];

function EstudioIndex() {
  const read = useProgress((s) => s.readModules);
  const { cargo, modules, questions } = useCargo();
  const [query, setQuery] = useState("");

  const searchQ = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!searchQ) return modules;
    return modules.filter(
      (m) =>
        m.title.toLowerCase().includes(searchQ) ||
        m.summary.toLowerCase().includes(searchQ) ||
        m.why.toLowerCase().includes(searchQ) ||
        m.sources.some((s) => s.toLowerCase().includes(searchQ)) ||
        m.examTips.some((t) => t.toLowerCase().includes(searchQ)) ||
        m.points.some(
          (p) => p.title.toLowerCase().includes(searchQ) || p.body.toLowerCase().includes(searchQ),
        ),
    );
  }, [modules, searchQ]);

  const totalResults = filtered.length;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted font-mono">
          Paso 2 · {cargo.shortLabel}
        </p>
        <h1 className="font-display text-3xl font-semibold">Material de Estudio Oficial</h1>
        <p className="max-w-2xl text-sm text-muted">
          Desarrollo normativo, legal y procedimental de los 24 indicadores de la Universidad Areandina
          para {cargo.ficha.denominacion} ({cargo.processLabel}).{" "}
          <Link to="/fuentes" className="text-accent underline-offset-2 hover:underline">
            Ver fuentes oficiales
          </Link>
          .
        </p>
      </header>

      {/* ── Banner de Unificación Pedagógica con los 24 Indicadores ── */}
      <section className="rounded-2xl border border-accent/40 bg-linear-to-br from-accent/10 via-surface to-accent/5 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-accent text-white text-[10px] font-bold uppercase tracking-wider">
                100% Unificado con Areandina
              </Badge>
              <span className="text-xs text-muted font-medium">
                Cobertura Total de los 24 Indicadores de tu Cargo
              </span>
            </div>
            <h2 className="font-display text-base sm:text-lg font-bold text-ink">
              ¿Cómo se relaciona este material con los Indicadores de tu Cargo?
            </h2>
            <p className="text-xs sm:text-sm text-muted max-w-3xl leading-relaxed">
              Los <strong>Indicadores del Paso 1</strong> son la lista oficial de competencias que te van a evaluar. Aquí en el <strong>Material de Estudio</strong> encuentras las leyes (Estatuto Tributario, CPACA), la doctrina y las funciones de tu empleo explicadas punto a punto para que domines esos 24 temas. <em>Al estudiar cada lección de esta sección, estás estudiando directamente para aprobar los 24 indicadores de tu cargo.</em>
            </p>
          </div>

          <Button asChild variant="outline" size="sm" className="shrink-0 gap-1.5 border-accent/50 text-accent hover:bg-accent/10 cursor-pointer">
            <Link to="/indicadores">
              <Sparkles className="size-3.5" />
              Ver los 24 Indicadores
            </Link>
          </Button>
        </div>
      </section>

      {/* ── Barra de búsqueda ── */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          id="buscar-modulos"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar… mandamiento, cautelares, prescripción, Likert, títulos ejecutivos…"
          className="h-11 w-full rounded-xl border border-border bg-surface py-2 pl-10 pr-10 text-sm placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted hover:text-ink cursor-pointer"
            aria-label="Limpiar búsqueda"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* ── Resultado de la búsqueda ── */}
      {searchQ && (
        <p className="text-sm text-muted">
          {totalResults > 0 ? (
            <>
              <span className="font-semibold text-ink">{totalResults}</span> módulo
              {totalResults !== 1 ? "s" : ""} con «{query}»
            </>
          ) : (
            <span>
              Sin módulos para «{query}».{" "}
              <button
                type="button"
                className="text-accent underline-offset-2 hover:underline cursor-pointer"
                onClick={() => setQuery("")}
              >
                Limpiar
              </button>
            </span>
          )}
        </p>
      )}

      {/* ── Listado por prueba ── */}
      {totalResults === 0 && searchQ ? (
        <div className="rounded-xl border border-border bg-surface px-5 py-10 text-center">
          <p className="text-2xl">🔍</p>
          <p className="mt-2 text-sm text-muted">
            Ningún módulo coincide con «{query}». Prueba con «cobro», «prescripción», «Likert» o el
            número de artículo.
          </p>
        </div>
      ) : (
        ORDER.map((track) => {
          const list = filtered.filter((m) => m.track === track);
          if (list.length === 0) return null;
          const allInTrack = modules.filter((m) => m.track === track);
          const done = allInTrack.filter((m) => read[m.id]).length;
          return (
            <section key={track} className="space-y-3">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-semibold">{TRACKS[track].label}</h2>
                  <p className="text-sm text-muted">{TRACKS[track].nature}</p>
                </div>
                {!searchQ && (
                  <span className="text-xs tabular-nums text-muted">
                    {done}/{allInTrack.length} leídos
                  </span>
                )}
              </div>
              {!searchQ && (
                <Progress value={allInTrack.length ? (done / allInTrack.length) * 100 : 0} />
              )}
              <ul className="grid gap-3 sm:grid-cols-2">
                {list.map((m) => {
                  const n = questions.filter((qItem) => qItem.moduleId === m.id).length;
                  const isRead = Boolean(read[m.id]);
                  const coveredIndicators = INDICADORES_OFICIALES_BASE.filter(
                    (ind) => ind.moduleId === m.id,
                  );

                  return (
                    <li key={m.id}>
                      <Link
                        to="/estudio/$slug"
                        params={{ slug: m.id }}
                        className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent/60 hover:shadow-2xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] text-subtle">{m.number}</span>
                          <Badge variant={isRead ? "ok" : "outline"}>
                            {isRead ? "Leído ✓" : `${m.minutes} min`}
                          </Badge>
                        </div>

                        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">
                          {m.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{m.summary}</p>

                        {/* Indicadores Oficiales Areandina que cubre este módulo */}
                        {coveredIndicators.length > 0 && (
                          <div className="mt-3 rounded-lg border border-accent/20 bg-accent/5 px-2.5 py-1.5 text-[11px] text-accent">
                            <span className="font-bold">Cubre {coveredIndicators.length} indicador{coveredIndicators.length > 1 ? "es" : ""}:</span>{" "}
                            <span className="text-ink font-medium">
                              {coveredIndicators.map((ci) => ci.nombre.split(" ").slice(0, 3).join(" ")).join(" · ")}
                            </span>
                          </div>
                        )}

                        <div className="mt-3 flex items-center justify-between pt-2 border-t border-border/40 text-[11px] text-subtle">
                          <span className="uppercase tracking-[0.12em]">{n} preguntas asociadas</span>
                          <span className="text-accent font-semibold">Leer lección →</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })
      )}
    </div>
  );
}
