import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { TRACKS, type TrackId } from "@/data/types";
import { useProgress } from "@/lib/progress-store";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useCargo } from "@/lib/use-cargo";

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
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
          Biblioteca · {cargo.shortLabel}
        </p>
        <h1 className="font-display text-3xl font-semibold">Estudiar por módulos</h1>
        <p className="max-w-2xl text-sm text-muted">
          Lecciones alineadas a {cargo.ficha.denominacion} de {cargo.processLabel}.
          Cada una cierra con las claves que suelen caer y con cómo se resuelve
          el caso en tu grado.{" "}
          <Link to="/fuentes" className="text-accent underline-offset-2 hover:underline">
            Fuentes oficiales
          </Link>
          .
        </p>
      </header>

      {/* ── Barra de búsqueda ── */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          id="buscar-modulos"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar… mandamiento, cautelares, prescripción, Likert…"
          className="h-11 w-full rounded-xl border border-border bg-surface py-2 pl-10 pr-10 text-sm placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted hover:text-ink"
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
              <span className="font-semibold text-ink">{totalResults}</span>{" "}
              módulo{totalResults !== 1 ? "s" : ""} con «{query}»
            </>
          ) : (
            <span>
              Sin módulos para «{query}».{" "}
              <button
                type="button"
                className="text-accent underline-offset-2 hover:underline"
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
            Ningún módulo coincide con «{query}». Prueba con «cobro»,
            «prescripción», «Likert» o el número de artículo.
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
                  <h2 className="font-display text-xl font-semibold">
                    {TRACKS[track].label}
                  </h2>
                  <p className="text-sm text-muted">{TRACKS[track].nature}</p>
                </div>
                {!searchQ && (
                  <span className="text-xs tabular-nums text-muted">
                    {done}/{allInTrack.length}
                  </span>
                )}
              </div>
              {!searchQ && (
                <Progress
                  value={allInTrack.length ? (done / allInTrack.length) * 100 : 0}
                />
              )}
              <ul className="grid gap-3 sm:grid-cols-2">
                {list.map((m) => {
                  const n = questions.filter((qItem) => qItem.moduleId === m.id).length;
                  const isRead = Boolean(read[m.id]);
                  return (
                    <li key={m.id}>
                      <Link
                        to="/estudio/$slug"
                        params={{ slug: m.id }}
                        className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] text-subtle">
                            {m.number}
                          </span>
                          <Badge variant={isRead ? "ok" : "outline"}>
                            {isRead ? "Leído" : `${m.minutes} min`}
                          </Badge>
                        </div>
                        <h3 className="mt-3 font-display text-lg font-semibold leading-snug">
                          {m.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">
                          {m.summary}
                        </p>
                        <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-subtle">
                          {n} preguntas asociadas
                        </p>
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
