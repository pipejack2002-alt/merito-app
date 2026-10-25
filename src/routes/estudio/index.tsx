import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  BookCheck,
  BookMarked,
  BookOpen,
  BookmarkCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  ClipboardCheck,
  Compass,
  FileText,
  Layers,
  RotateCcw,
  Scale,
  Search,
  Sparkles,
  StickyNote,
  X,
} from "lucide-react";
import { TRACKS, type TrackId } from "@/data/types";
import { useProgress } from "@/lib/progress-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCargo } from "@/lib/use-cargo";
import { indicatorsForCargo } from "@/data/areandina-indicadores";
import {
  ARTICULOS,
  NORMAS,
  NORMA_ORDER,
  type NormaId,
  articlesForModule,
  modulesForArticle,
} from "@/data/normas";
import { ArticleCard } from "@/components/study/article-card";
import { topicForModule } from "@/data/topics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/estudio/")({ component: EstudioIndex });

const ORDER: TrackId[] = ["funcional", "comportamental", "integridad"];

type MainTab = "lecciones" | "normativa" | "guia" | "apuntes";
type ReadFilter = "todos" | "pendientes" | "leidos" | "con-apuntes";

function EstudioIndex() {
  const read = useProgress((s) => s.readModules);
  const markRead = useProgress((s) => s.markRead);
  const toggleRead = useProgress((s) => s.toggleRead);
  const unmarkMany = useProgress((s) => s.unmarkMany);
  const lastLesson = useProgress((s) => s.lastLesson);
  const lessonNotes = useProgress((s) => s.lessonNotes);
  const savedArticles = useProgress((s) => s.savedArticles);

  const { cargo, modules, questions, flashcards } = useCargo();
  const cargoIndicators = useMemo(() => indicatorsForCargo(cargo), [cargo]);

  const [activeTab, setActiveTab] = useState<MainTab>("lecciones");
  const [readFilter, setReadFilter] = useState<ReadFilter>("todos");
  const [query, setQuery] = useState("");
  const [expandedQuickId, setExpandedQuickId] = useState<string | null>(null);

  // Estado para la pestaña de Biblioteca Normativa integrada
  const [normaFilter, setNormaFilter] = useState<NormaId | "todas" | "guardados">("todas");
  const [normaQuery, setNormaQuery] = useState("");
  const [expandAllNorms, setExpandAllNorms] = useState<boolean | null>(null);

  // Si se navega con hash #art-... o #normas, abrir automáticamente la pestaña normativa
  useEffect(() => {
    if (typeof window === "undefined") return;
    const h = window.location.hash;
    if (h.startsWith("#art-") || h === "#normas") {
      setActiveTab("normativa");
    }
  }, []);

  const searchQ = query.trim().toLowerCase();

  const totalReadCount = useMemo(
    () => modules.filter((m) => Boolean(read[m.id])).length,
    [modules, read],
  );
  const totalUnreadCount = modules.length - totalReadCount;
  const totalNotesCount = useMemo(
    () => modules.filter((m) => Boolean(lessonNotes[m.id]?.trim())).length,
    [modules, lessonNotes],
  );
  const readPct = modules.length ? Math.round((totalReadCount / modules.length) * 100) : 0;

  const filtered = useMemo(() => {
    return modules.filter((m) => {
      const isRead = Boolean(read[m.id]);
      const hasNote = Boolean(lessonNotes[m.id]?.trim());
      if (readFilter === "pendientes" && isRead) return false;
      if (readFilter === "leidos" && !isRead) return false;
      if (readFilter === "con-apuntes" && !hasNote) return false;

      if (!searchQ) return true;
      const modArticles = articlesForModule(m.id);
      return (
        m.title.toLowerCase().includes(searchQ) ||
        m.summary.toLowerCase().includes(searchQ) ||
        m.why.toLowerCase().includes(searchQ) ||
        m.sources.some((s) => s.toLowerCase().includes(searchQ)) ||
        m.examTips.some((t) => t.toLowerCase().includes(searchQ)) ||
        m.points.some(
          (p) => p.title.toLowerCase().includes(searchQ) || p.body.toLowerCase().includes(searchQ),
        ) ||
        modArticles.some(
          (a) =>
            a.numero.toLowerCase().includes(searchQ) ||
            a.titulo.toLowerCase().includes(searchQ) ||
            a.texto.some((t) => t.toLowerCase().includes(searchQ)),
        )
      );
    });
  }, [modules, read, lessonNotes, readFilter, searchQ]);

  const filteredArticles = useMemo(() => {
    const q = normaQuery.trim().toLowerCase();
    return ARTICULOS.filter((a) => {
      if (normaFilter === "guardados" && !savedArticles.includes(a.id)) return false;
      if (normaFilter !== "todas" && normaFilter !== "guardados" && a.norma !== normaFilter)
        return false;
      if (!q) return true;
      return (
        a.numero.toLowerCase().includes(q) ||
        a.titulo.toLowerCase().includes(q) ||
        (a.clave && a.clave.toLowerCase().includes(q)) ||
        a.texto.some((p) => p.toLowerCase().includes(q))
      );
    });
  }, [normaFilter, normaQuery, savedArticles]);

  const lastModule = useMemo(
    () => (lastLesson ? modules.find((m) => m.id === lastLesson) : undefined),
    [lastLesson, modules],
  );

  const handleMarkAllRead = () => {
    for (const m of modules) {
      markRead(m.id);
    }
  };

  const handleResetAllUnread = () => {
    unmarkMany(modules.map((m) => m.id));
  };

  return (
    <div className="space-y-7">
      {/* ── Encabezado Principal ── */}
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted font-mono">
            Paso 2 · Centro Integrado de Estudio · {cargo.shortLabel} (OPEC {cargo.ficha.opec})
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono text-[11px]">
              {modules.length} módulos del cargo
            </Badge>
            <Badge variant="outline" className="font-mono text-[11px]">
              {ARTICULOS.length} artículos transcritos
            </Badge>
            <Badge variant="outline" className="font-mono text-[11px]">
              {questions.length} preguntas
            </Badge>
          </div>
        </div>
        <h1 className="font-display text-3xl font-semibold text-ink">
          Material de Estudio, Normativa y Guía en un Solo Lugar
        </h1>
        <p className="max-w-3xl text-sm text-muted leading-relaxed">
          Todo el desarrollo teórico, artículos exactos de ley (E.T., CPACA, Constitución, Aduanas,
          MIPG e Integridad), paso a paso procedimental y los{" "}
          <strong className="text-ink">24 indicadores oficiales de Areandina</strong> para{" "}
          <strong className="text-ink">{cargo.ficha.denominacion}</strong> ({cargo.processLabel})
          integrados aquí mismo, con control total de lecciones{" "}
          <strong className="text-ink">leídas y no leídas</strong>.
        </p>
      </header>

      {/* ── Panel de Progreso de Lectura y Control Leído / No Leído ── */}
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-xs space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-display text-base font-semibold text-ink">
                Progreso de lectura en {cargo.shortLabel}
              </span>
              <Badge variant={totalReadCount === modules.length ? "ok" : "rule"}>
                {totalReadCount} de {modules.length} leídos ({readPct}%)
              </Badge>
              {totalUnreadCount > 0 && (
                <Badge variant="outline" className="text-muted">
                  {totalUnreadCount} pendiente{totalUnreadCount === 1 ? "" : "s"} por leer
                </Badge>
              )}
            </div>
            <Progress value={readPct} className="h-2.5" />
            <p className="text-xs text-muted">
              Puedes marcar o desmarcar cualquier módulo como{" "}
              <strong className="text-ink">Leído ✓</strong> o{" "}
              <strong className="text-ink">No leído</strong> directamente desde cada tarjeta o
              dentro de la lección.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {totalUnreadCount > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleMarkAllRead}
                className="gap-1.5 text-xs cursor-pointer"
              >
                <BookCheck className="size-3.5 text-ok" />
                Marcar todos como leídos
              </Button>
            )}
            {totalReadCount > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleResetAllUnread}
                className="gap-1.5 text-xs border-warn/40 text-warn hover:bg-warn-soft/50 cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                Pasar todos a No leído ({totalReadCount})
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs border-accent/40 text-accent hover:bg-accent/10"
            >
              <Link to="/indicadores">
                <Sparkles className="size-3.5" />
                24 Indicadores
              </Link>
            </Button>
          </div>
        </div>

        {/* Continuar donde quedaste */}
        {lastModule && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-accent/25 bg-accent/5 px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-white font-mono text-xs font-bold">
                {lastModule.number}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                  Última lección abierta
                </p>
                <p className="truncate font-display text-sm font-semibold text-ink">
                  {lastModule.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleRead(lastModule.id)}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium transition-colors cursor-pointer",
                  read[lastModule.id]
                    ? "border-ok/40 bg-ok-soft text-ok hover:bg-ok-soft/70"
                    : "border-border bg-surface text-muted hover:text-ink",
                )}
              >
                {read[lastModule.id] ? (
                  <>
                    <CheckCircle2 className="size-3.5" />
                    Leído · Pasar a no leído
                  </>
                ) : (
                  <>
                    <Circle className="size-3.5" />
                    No leído · Marcar leído
                  </>
                )}
              </button>
              <Button asChild size="sm" className="h-8 text-xs">
                <Link to="/estudio/$slug" params={{ slug: lastModule.id }}>
                  Continuar lección →
                </Link>
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* ── Pestañas de Navegación Todo-en-Uno ── */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("lecciones")}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer",
            activeTab === "lecciones"
              ? "bg-accent text-white shadow-xs"
              : "bg-surface text-muted border border-border hover:text-ink hover:border-accent/40",
          )}
        >
          <BookOpen className="size-4" />
          Lecciones del Cargo
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-mono",
              activeTab === "lecciones" ? "bg-white/20 text-white" : "bg-paper text-muted",
            )}
          >
            {modules.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("normativa")}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer",
            activeTab === "normativa"
              ? "bg-accent text-white shadow-xs"
              : "bg-surface text-muted border border-border hover:text-ink hover:border-accent/40",
          )}
        >
          <Scale className="size-4" />
          Biblioteca Normativa (Artículos de Ley)
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-mono",
              activeTab === "normativa" ? "bg-white/20 text-white" : "bg-paper text-muted",
            )}
          >
            {ARTICULOS.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("guia")}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer",
            activeTab === "guia"
              ? "bg-accent text-white shadow-xs"
              : "bg-surface text-muted border border-border hover:text-ink hover:border-accent/40",
          )}
        >
          <Compass className="size-4" />
          Cómo Resolver según tu Cargo y Ficha
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-mono",
              activeTab === "guia" ? "bg-white/20 text-white" : "bg-paper text-muted",
            )}
          >
            {cargo.functionGuides.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("apuntes")}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer",
            activeTab === "apuntes"
              ? "bg-accent text-white shadow-xs"
              : "bg-surface text-muted border border-border hover:text-ink hover:border-accent/40",
          )}
        >
          <StickyNote className="size-4" />
          Mis Apuntes y Guardados
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-mono",
              activeTab === "apuntes" ? "bg-white/20 text-white" : "bg-paper text-muted",
            )}
          >
            {totalNotesCount + savedArticles.length}
          </span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          PESTAÑA 1: LECCIONES DEL CARGO (CON VISTA RÁPIDA EN LA MISMA PÁGINA)
         ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "lecciones" && (
        <div className="space-y-6">
          {/* Barra de búsqueda + Filtros Leído / No leído */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                id="buscar-modulos"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar tema, artículo (ej. 828, 703, 817), mandamiento, cautelares, Likert…"
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

            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  { id: "todos", label: `Todos (${modules.length})` },
                  { id: "pendientes", label: `No leídos (${totalUnreadCount})` },
                  { id: "leidos", label: `Leídos ✓ (${totalReadCount})` },
                  { id: "con-apuntes", label: `Con apuntes (${totalNotesCount})` },
                ] as { id: ReadFilter; label: string }[]
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setReadFilter(f.id)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-xs font-medium transition-colors cursor-pointer",
                    readFilter === f.id
                      ? "border-accent bg-accent/10 text-accent font-semibold"
                      : "border-border bg-surface text-muted hover:text-ink",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface px-5 py-10 text-center space-y-3">
              <p className="text-sm text-muted">
                No hay módulos que coincidan con el filtro actual{" "}
                {searchQ ? `(«${query}»)` : `(${readFilter})`}.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery("");
                  setReadFilter("todos");
                }}
              >
                Mostrar todos los módulos
              </Button>
            </div>
          ) : (
            ORDER.map((track) => {
              const list = filtered.filter((m) => m.track === track);
              if (list.length === 0) return null;
              const allInTrack = modules.filter((m) => m.track === track);
              const done = allInTrack.filter((m) => read[m.id]).length;
              const trackIds = allInTrack.map((m) => m.id);

              return (
                <section key={track} className="space-y-3">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h2 className="font-display text-xl font-semibold text-ink">
                        {TRACKS[track].label}
                      </h2>
                      <p className="text-sm text-muted">{TRACKS[track].nature}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs tabular-nums text-muted font-medium">
                        {done}/{allInTrack.length} leídos
                      </span>
                      {done > 0 ? (
                        <button
                          type="button"
                          onClick={() => unmarkMany(trackIds)}
                          className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-muted hover:border-warn/50 hover:text-warn cursor-pointer"
                        >
                          <RotateCcw className="size-3" />
                          Marcar bloque como no leído
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => trackIds.forEach((id) => markRead(id))}
                          className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-muted hover:border-ok/50 hover:text-ok cursor-pointer"
                        >
                          <BookCheck className="size-3" />
                          Marcar bloque como leído
                        </button>
                      )}
                    </div>
                  </div>

                  <Progress value={allInTrack.length ? (done / allInTrack.length) * 100 : 0} />

                  <ul className="grid gap-4 sm:grid-cols-2">
                    {list.map((m) => {
                      const nQ = questions.filter((qItem) => qItem.moduleId === m.id).length;
                      const nCards = flashcards.filter((fItem) => fItem.moduleId === m.id).length;
                      const modArticles = articlesForModule(m.id);
                      const isRead = Boolean(read[m.id]);
                      const hasNote = Boolean(lessonNotes[m.id]?.trim());
                      const coveredIndicators = cargoIndicators.filter(
                        (ind) => ind.moduleId === m.id,
                      );
                      const isQuickOpen = expandedQuickId === m.id;
                      const guide = cargo.functionGuides.find((g) =>
                        g.relatedModuleIds.includes(m.id),
                      );
                      const topic = topicForModule(m.id);

                      return (
                        <li
                          key={m.id}
                          className={cn(
                            "flex flex-col rounded-xl border bg-surface transition-all",
                            isQuickOpen
                              ? "sm:col-span-2 border-accent shadow-sm"
                              : isRead
                                ? "border-ok/35 hover:border-accent/60"
                                : "border-border hover:border-accent/60",
                          )}
                        >
                          <div className="flex flex-1 flex-col p-5">
                            {/* Cabecera de la tarjeta con botón directo Leído / No leído */}
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="flex size-6 items-center justify-center rounded-md bg-paper font-mono text-[11px] font-semibold text-ink">
                                  {m.number}
                                </span>
                                <Badge variant="outline" className="text-[11px]">
                                  {m.minutes} min
                                </Badge>
                                {modArticles.length > 0 && (
                                  <Badge variant="paper" className="gap-1 text-[11px]">
                                    <Scale className="size-3 text-accent" />
                                    {modArticles.length} art{modArticles.length === 1 ? "." : "s."}
                                  </Badge>
                                )}
                                {hasNote && (
                                  <Badge variant="warn" className="gap-1 text-[10px]">
                                    <StickyNote className="size-3" />
                                    Con apuntes
                                  </Badge>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() => toggleRead(m.id)}
                                title={
                                  isRead
                                    ? "Haz clic para marcar como NO leído"
                                    : "Haz clic para marcar como leído"
                                }
                                className={cn(
                                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer",
                                  isRead
                                    ? "border-ok/40 bg-ok-soft text-ok hover:border-warn/50 hover:bg-warn-soft hover:text-warn"
                                    : "border-border bg-paper text-muted hover:border-ok/40 hover:bg-ok-soft/60 hover:text-ok",
                                )}
                              >
                                {isRead ? (
                                  <>
                                    <CheckCircle2 className="size-3.5" />
                                    <span>Leído ✓ · Poner no leído</span>
                                  </>
                                ) : (
                                  <>
                                    <Circle className="size-3.5" />
                                    <span>No leído · Marcar leído</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <Link
                              to="/estudio/$slug"
                              params={{ slug: m.id }}
                              className="group mt-3 block"
                            >
                              <h3 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-accent transition-colors">
                                {m.title}
                              </h3>
                              <p className="mt-1.5 text-sm text-muted leading-relaxed">
                                {m.summary}
                              </p>
                            </Link>

                            {/* Indicadores Oficiales Areandina del cargo activo que cubre este módulo */}
                            {coveredIndicators.length > 0 && (
                              <div className="mt-3 rounded-lg border border-accent/20 bg-accent/5 px-3 py-2 text-[11px]">
                                <span className="font-bold text-accent">
                                  Cubre {coveredIndicators.length} indicador
                                  {coveredIndicators.length > 1 ? "es" : ""} de {cargo.shortLabel}:
                                </span>{" "}
                                <span className="text-ink font-medium">
                                  {coveredIndicators.map((ci) => ci.nombre).join(" · ")}
                                </span>
                              </div>
                            )}

                            {/* Pie de tarjeta con botón "Estudiar aquí mismo" + "Abrir lección completa" */}
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/50 text-xs">
                              <div className="flex flex-wrap items-center gap-2 text-[11px] text-subtle">
                                <span>{m.points.length} puntos clave</span>
                                <span>·</span>
                                <span>{nQ} preguntas</span>
                                {nCards > 0 && (
                                  <>
                                    <span>·</span>
                                    <span>{nCards} fichas</span>
                                  </>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedQuickId(isQuickOpen ? null : m.id)
                                  }
                                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-paper px-2.5 py-1.5 text-xs font-medium text-ink hover:border-accent/50 hover:text-accent transition-colors cursor-pointer"
                                >
                                  {isQuickOpen ? (
                                    <>
                                      <ChevronUp className="size-3.5" />
                                      Ocultar resumen
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="size-3.5" />
                                      Ver todo aquí mismo
                                    </>
                                  )}
                                </button>

                                <Link
                                  to="/estudio/$slug"
                                  params={{ slug: m.id }}
                                  className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:bg-accent/90 transition-colors"
                                >
                                  Abrir lección →
                                </Link>
                              </div>
                            </div>
                          </div>

                          {/* ── Desplegable Todo-En-La-Misma-Parte ── */}
                          {isQuickOpen && (
                            <div className="border-t border-border bg-paper/60 p-5 space-y-5 animate-in fade-in-0 duration-200">
                              {/* Cómo se resuelve en tu cargo */}
                              {(guide || topic) && (
                                <div className="rounded-xl border border-accent/30 bg-surface p-4 space-y-2.5">
                                  <div className="flex items-center justify-between gap-2">
                                    <h4 className="font-display text-sm font-bold text-accent uppercase tracking-wider">
                                      Cómo se resuelve en {cargo.shortLabel}
                                    </h4>
                                    <Badge variant="paper" className="text-[10px]">
                                      Aplicación en el cargo
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-ink leading-relaxed">
                                    {guide?.howToResolve ?? topic?.how}
                                  </p>
                                  {guide?.roleNote && (
                                    <p className="text-xs font-medium text-muted border-l-2 border-accent pl-2.5">
                                      <strong>Límite de tu rol:</strong> {guide.roleNote}
                                    </p>
                                  )}
                                  {(guide?.steps ?? topic?.steps) && (
                                    <ol className="mt-2 space-y-1.5 pl-4 list-decimal text-xs text-ink">
                                      {(guide?.steps ?? topic?.steps ?? []).map((st, idx) => (
                                        <li key={idx} className="leading-relaxed">
                                          {st}
                                        </li>
                                      ))}
                                    </ol>
                                  )}
                                  <div className="grid gap-2 sm:grid-cols-2 pt-1">
                                    {(guide?.typicalFail ?? topic?.trap) && (
                                      <div className="rounded-lg border border-bad/25 bg-bad-soft/50 p-2.5 text-xs">
                                        <strong className="text-bad block">
                                          Trampa típica en el examen:
                                        </strong>
                                        <span className="text-ink">
                                          {guide?.typicalFail ?? topic?.trap}
                                        </span>
                                      </div>
                                    )}
                                    {(guide?.correctMove ?? topic?.correctMove) && (
                                      <div className="rounded-lg border border-ok/25 bg-ok-soft/50 p-2.5 text-xs">
                                        <strong className="text-ok block">Jugada correcta:</strong>
                                        <span className="text-ink">
                                          {guide?.correctMove ?? topic?.correctMove}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Puntos clave del módulo */}
                              <div className="space-y-2.5">
                                <h4 className="font-display text-sm font-semibold text-ink">
                                  Desarrollo punto a punto ({m.points.length})
                                </h4>
                                <div className="grid gap-2.5 sm:grid-cols-2">
                                  {m.points.map((pt, idx) => (
                                    <div
                                      key={pt.title}
                                      className="rounded-xl border border-border bg-surface p-3.5"
                                    >
                                      <p className="font-display text-sm font-semibold text-ink">
                                        {idx + 1}. {pt.title}
                                      </p>
                                      <p className="mt-1 text-xs leading-relaxed text-muted">
                                        {pt.body}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Claves de examen */}
                              <div className="rounded-xl border border-warn/30 bg-warn-soft/40 p-4 space-y-2">
                                <h4 className="font-display text-sm font-semibold text-ink">
                                  Claves fijas de examen
                                </h4>
                                <ul className="space-y-1 text-xs text-ink list-disc pl-4">
                                  {m.examTips.map((tip) => (
                                    <li key={tip} className="leading-relaxed">
                                      {tip}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Artículos de ley del módulo directamente aquí */}
                              {modArticles.length > 0 && (
                                <div className="space-y-2.5">
                                  <h4 className="font-display text-sm font-semibold text-ink flex items-center gap-1.5">
                                    <Scale className="size-4 text-accent" />
                                    Normativa transcrita de este módulo ({modArticles.length}{" "}
                                    artículos)
                                  </h4>
                                  <div className="space-y-2">
                                    {modArticles.map((art) => (
                                      <ArticleCard key={art.id} articulo={art} />
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                                <button
                                  type="button"
                                  onClick={() => toggleRead(m.id)}
                                  className={cn(
                                    "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold cursor-pointer",
                                    isRead
                                      ? "border-warn/40 bg-warn-soft text-warn"
                                      : "border-ok/40 bg-ok-soft text-ok",
                                  )}
                                >
                                  {isRead ? (
                                    <>
                                      <RotateCcw className="size-3.5" />
                                      Marcar como NO leído
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle2 className="size-3.5" />
                                      Marcar como Leído ✓
                                    </>
                                  )}
                                </button>

                                <div className="flex flex-wrap items-center gap-2">
                                  {nQ > 0 && (
                                    <Button asChild variant="outline" size="sm">
                                      <Link
                                        to="/practica/$bank"
                                        params={{ bank: `mod-${m.id}` }}
                                      >
                                        <ClipboardCheck className="size-3.5" />
                                        Practicar {nQ} preguntas
                                      </Link>
                                    </Button>
                                  )}
                                  <Button asChild size="sm">
                                    <Link to="/estudio/$slug" params={{ slug: m.id }}>
                                      Ver vista completa con fichas y apuntes →
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PESTAÑA 2: BIBLIOTECA NORMATIVA INTEGRADA (TODOS LOS ARTÍCULOS AQUÍ)
         ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "normativa" && (
        <section id="normas" className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  Biblioteca Normativa Integrada ({filteredArticles.length} de {ARTICULOS.length}{" "}
                  artículos)
                </h2>
                <p className="text-xs sm:text-sm text-muted">
                  Lee aquí mismo el texto literal y las claves de examen del Estatuto Tributario,
                  Constitución, CPACA, Ley 1755, Ley 1066, Ley 1116, Ley 594, MIPG, Régimen Aduanero
                  y Código de Integridad.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setExpandAllNorms(true)}
                  className="text-xs cursor-pointer"
                >
                  Expandir todos
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setExpandAllNorms(false)}
                  className="text-xs cursor-pointer"
                >
                  Contraer todos
                </Button>
              </div>
            </div>

            {/* Buscador de artículos */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={normaQuery}
                onChange={(e) => setNormaQuery(e.target.value)}
                placeholder="Buscar por número de artículo (ej. 817, 828, 831, 703, 14) o palabra clave…"
                className="h-11 w-full rounded-xl border border-border bg-paper py-2 pl-10 pr-10 text-sm placeholder:text-subtle focus:border-accent focus:outline-none"
              />
              {normaQuery && (
                <button
                  type="button"
                  onClick={() => setNormaQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted hover:text-ink cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Filtros por cuerpo normativo */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setNormaFilter("todas")}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                  normaFilter === "todas"
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-paper text-muted hover:text-ink",
                )}
              >
                Todas las normas ({ARTICULOS.length})
              </button>
              <button
                type="button"
                onClick={() => setNormaFilter("guardados")}
                className={cn(
                  "inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                  normaFilter === "guardados"
                    ? "border-warn bg-warn text-white"
                    : "border-border bg-paper text-muted hover:text-ink",
                )}
              >
                <BookmarkCheck className="size-3.5" />
                Guardados ({savedArticles.length})
              </button>
              {NORMA_ORDER.map((nid) => {
                const n = NORMAS[nid];
                const count = ARTICULOS.filter((a) => a.norma === nid).length;
                return (
                  <button
                    key={nid}
                    type="button"
                    onClick={() => setNormaFilter(nid)}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                      normaFilter === nid
                        ? "border-accent bg-accent/15 text-accent font-semibold"
                        : "border-border bg-paper text-muted hover:text-ink",
                    )}
                  >
                    {n.sigla} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface p-8 text-center text-sm text-muted">
              No se encontraron artículos con ese filtro.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredArticles.map((art) => {
                const relatedModIds = modulesForArticle(art.id);
                const relatedMods = modules.filter((m) => relatedModIds.includes(m.id));
                return (
                  <ArticleCard
                    key={art.id}
                    articulo={art}
                    query={normaQuery}
                    forceOpen={expandAllNorms}
                    footer={
                      relatedMods.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-1.5 border-t border-border/60 pt-2.5 text-xs">
                          <span className="text-muted">Se estudia en:</span>
                          {relatedMods.map((rm) => (
                            <Link
                              key={rm.id}
                              to="/estudio/$slug"
                              params={{ slug: rm.id }}
                              className="inline-flex items-center gap-1 rounded-md border border-border bg-paper px-2 py-0.5 text-[11px] font-medium text-ink hover:border-accent hover:text-accent"
                            >
                              {rm.number} · {rm.title}
                            </Link>
                          ))}
                        </div>
                      ) : null
                    }
                  />
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PESTAÑA 3: GUÍA PRÁCTICA DE FUNCIONES Y ROL DEL CARGO
         ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "guia" && (
        <section className="space-y-6">
          {/* Resumen de Ficha y Límites del Rol */}
          <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                  {cargo.ficha.denominacion} · Código {cargo.ficha.codigo} · Grado{" "}
                  {cargo.ficha.grado} · OPEC {cargo.ficha.opec}
                </p>
                <h2 className="font-display text-xl font-semibold text-ink mt-0.5">
                  Propósito y Frontera Funcional de {cargo.shortLabel}
                </h2>
              </div>
              <Badge variant="paper">{cargo.ficha.nivel}</Badge>
            </div>

            <p className="text-sm text-ink leading-relaxed bg-paper p-3.5 rounded-xl border border-border">
              <strong>Propósito principal (MERF):</strong> {cargo.ficha.proposito}
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-ok/30 bg-ok-soft/40 p-4 space-y-2">
                <h3 className="font-display text-sm font-bold text-ok uppercase tracking-wide">
                  Lo que SÍ hace tu rol
                </h3>
                <ul className="space-y-1.5 text-xs text-ink list-disc pl-4">
                  {cargo.rolBoundary.youDo.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-bad/30 bg-bad-soft/40 p-4 space-y-2">
                <h3 className="font-display text-sm font-bold text-bad uppercase tracking-wide">
                  Lo que NO debes hacer (Trampa)
                </h3>
                <ul className="space-y-1.5 text-xs text-ink list-disc pl-4">
                  {cargo.rolBoundary.youDont.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-accent/30 bg-accent/5 p-4 space-y-2">
                <h3 className="font-display text-sm font-bold text-accent uppercase tracking-wide">
                  Diferencia frente a otros cargos
                </h3>
                <p className="text-xs text-ink leading-relaxed">{cargo.rolBoundary.vsOthers}</p>
                <div className="pt-2 border-t border-border/60">
                  <p className="text-[11px] font-semibold text-muted uppercase">
                    Foco del examen en este cargo:
                  </p>
                  <ul className="mt-1 space-y-1 text-xs text-ink list-disc pl-4">
                    {cargo.examFocus.map((ef) => (
                      <li key={ef}>{ef}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Guías paso a paso por función */}
          <div className="space-y-3">
            <h3 className="font-display text-lg font-semibold text-ink">
              Guía de resolución paso a paso por función ({cargo.functionGuides.length})
            </h3>
            <div className="grid gap-4">
              {cargo.functionGuides.map((g) => {
                const relMod = modules.find((m) => g.relatedModuleIds.includes(m.id));
                const isRead = relMod ? Boolean(read[relMod.id]) : false;
                return (
                  <div
                    key={g.topicId}
                    className="rounded-xl border border-border bg-surface p-5 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-display text-lg font-semibold text-ink">
                        {g.functionTitle}
                      </h4>
                      {relMod && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleRead(relMod.id)}
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium cursor-pointer",
                              isRead
                                ? "border-ok/40 bg-ok-soft text-ok"
                                : "border-border bg-paper text-muted",
                            )}
                          >
                            {isRead ? "Leído ✓" : "No leído"}
                          </button>
                          <Link
                            to="/estudio/$slug"
                            params={{ slug: relMod.id }}
                            className="text-xs font-semibold text-accent hover:underline"
                          >
                            Ir a la lección {relMod.number} →
                          </Link>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-ink leading-relaxed">{g.howToResolve}</p>
                    {g.roleNote && (
                      <p className="text-xs text-accent font-medium bg-accent/5 px-3 py-2 rounded-lg border border-accent/20">
                        <strong>En {cargo.shortLabel}:</strong> {g.roleNote}
                      </p>
                    )}

                    <ol className="space-y-1.5 pl-5 list-decimal text-xs sm:text-sm text-ink">
                      {g.steps.map((s, i) => (
                        <li key={i} className="leading-relaxed">
                          {s}
                        </li>
                      ))}
                    </ol>

                    <div className="grid gap-3 sm:grid-cols-2 pt-1">
                      <div className="rounded-lg border border-bad/25 bg-bad-soft/50 p-3 text-xs">
                        <strong className="text-bad block mb-0.5">Fallo típico en examen:</strong>
                        <span className="text-ink">{g.typicalFail}</span>
                      </div>
                      <div className="rounded-lg border border-ok/25 bg-ok-soft/50 p-3 text-xs">
                        <strong className="text-ok block mb-0.5">Jugada correcta:</strong>
                        <span className="text-ink">{g.correctMove}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PESTAÑA 4: MIS APUNTES PERSONALES Y ARTÍCULOS GUARDADOS
         ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "apuntes" && (
        <section className="space-y-6">
          <div className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-ink flex items-center gap-2">
              <StickyNote className="size-5 text-warn" />
              Mis Apuntes por Lección ({totalNotesCount})
            </h2>
            {totalNotesCount === 0 ? (
              <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
                Aún no has escrito apuntes personales. Entra a cualquier lección y escribe tus
                resúmenes o nemotecnias en la sección <strong>«Mis apuntes personales»</strong>; se
                guardan automáticamente en tu dispositivo.
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {modules
                  .filter((m) => Boolean(lessonNotes[m.id]?.trim()))
                  .map((m) => (
                    <div
                      key={m.id}
                      className="rounded-xl border border-border bg-surface p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs text-accent font-semibold">
                          Lección {m.number} · {m.title}
                        </span>
                        <Link
                          to="/estudio/$slug"
                          params={{ slug: m.id }}
                          className="text-xs font-semibold text-accent hover:underline"
                        >
                          Editar en lección →
                        </Link>
                      </div>
                      <p className="whitespace-pre-wrap text-xs sm:text-sm text-ink bg-paper p-3 rounded-lg border border-border">
                        {lessonNotes[m.id]}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-ink flex items-center gap-2">
              <BookMarked className="size-5 text-accent" />
              Artículos de Ley Guardados ({savedArticles.length})
            </h2>
            {savedArticles.length === 0 ? (
              <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
                No tienes artículos guardados todavía. Usa el botón <strong>«Guardar»</strong> en
                cualquier artículo dentro de las lecciones o en la pestaña{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("normativa")}
                  className="text-accent underline cursor-pointer"
                >
                  Biblioteca Normativa
                </button>{" "}
                para tenerlos a mano antes del examen.
              </div>
            ) : (
              <div className="space-y-3">
                {ARTICULOS.filter((a) => savedArticles.includes(a.id)).map((art) => (
                  <ArticleCard key={art.id} articulo={art} defaultOpen />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
