import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
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
  Play,
  RotateCcw,
  Scale,
  Search,
  Sparkles,
  StickyNote,
  Trophy,
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
  const answers = useProgress((s) => s.answers);

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

  // Siguiente paso lógico en orden (01 -> 02 -> 03...)
  const nextRecommended = useMemo(
    () => modules.find((m) => !read[m.id]) ?? modules[0],
    [modules, read],
  );

  const lastModule = useMemo(
    () => (lastLesson ? modules.find((m) => m.id === lastLesson) : undefined),
    [lastLesson, modules],
  );

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

  const handleMarkAllRead = () => {
    for (const m of modules) {
      markRead(m.id);
    }
  };

  const handleResetAllUnread = () => {
    unmarkMany(modules.map((m) => m.id));
  };

  return (
    <div className="space-y-6">
      {/* ═══════════════════════════════════════════════════════════════════════
          1. RUTA GUIADA PASO A PASO (PARA QUE CUALQUIER PERSONA SEPA QUÉ SEGUIR)
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="rounded-2xl border-2 border-accent/35 bg-surface p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-accent text-white font-mono text-[11px]">
                RUTA GUIADA PASO A PASO · {cargo.shortLabel.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="font-mono text-[11px]">
                OPEC {cargo.ficha.opec} · {cargo.ficha.denominacion}
              </Badge>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Tu Plan de Estudio en Orden (Paso 01 al {String(modules.length).padStart(2, "0")})
            </h1>
            <p className="text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
              No tienes que adivinar por dónde empezar: sigue las lecciones en orden numérico (
              <strong>01 El Cargo → 02 → 03…</strong>). Dentro de cada lección tienes{" "}
              <strong>4 pasos dinámicos</strong>: 1) Explicación y rol, 2) Artículos de ley, 3)
              Fichas de memoria y 4) Casos prácticos con validación inmediata.
            </p>
          </div>

          {/* Botones globales Leído / No leído */}
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
                Marcar todo leído
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
                Poner todo como No leído ({totalReadCount})
              </Button>
            )}
          </div>
        </div>

        {/* Tarjeta destacada: TU SIGUIENTE LECCIÓN AHORA MISMO */}
        {nextRecommended && (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-accent/40 bg-accent/5 p-4 sm:p-5">
            <div className="flex items-start gap-3.5 min-w-0">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white font-mono text-base font-bold shadow-xs">
                {nextRecommended.number}
              </span>
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                    {totalReadCount === 0
                      ? "▶ Empieza aquí tu preparación (Lección 01)"
                      : totalReadCount === modules.length
                        ? "🎉 ¡Completaste todas las lecciones! Repasa desde la 01"
                        : `▶ Tu siguiente paso en orden (${totalReadCount} de ${modules.length} leídos)`}
                  </span>
                  {lastModule && lastModule.id !== nextRecommended.id && (
                    <Link
                      to="/estudio/$slug"
                      params={{ slug: lastModule.id }}
                      className="text-[11px] font-medium text-muted underline hover:text-ink"
                    >
                      (O retomar última visitada: {lastModule.number} · {lastModule.title})
                    </Link>
                  )}
                </div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-ink">
                  Lección {nextRecommended.number}: {nextRecommended.title}
                </h2>
                <p className="text-xs sm:text-sm text-muted line-clamp-2">
                  {nextRecommended.summary}
                </p>
              </div>
            </div>

            <Button asChild size="sm" className="shrink-0 gap-2 font-bold shadow-xs">
              <Link to="/estudio/$slug" params={{ slug: nextRecommended.id }}>
                <Play className="size-4 fill-current" />
                Estudiar Lección {nextRecommended.number} ahora →
              </Link>
            </Button>
          </div>
        )}

        {/* Mapa visual de bolitas/pasos (01 -> 02 -> 03 -> ...) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-ink">
              Mapa de avance ({totalReadCount} de {modules.length} lecciones leídas · {readPct}%)
            </span>
            <span className="text-[11px] text-muted">
              Haz clic en cualquier número para ir directo a esa lección
            </span>
          </div>
          <Progress value={readPct} className="h-2" />
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {modules.map((m) => {
              const isRead = Boolean(read[m.id]);
              const isNext = nextRecommended?.id === m.id && !isRead;
              return (
                <Link
                  key={m.id}
                  to="/estudio/$slug"
                  params={{ slug: m.id }}
                  title={`${m.number} · ${m.title} (${isRead ? "Leído" : "No leído"})`}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-lg border px-2 py-1 font-mono text-[11px] font-bold transition-all",
                    isRead
                      ? "border-ok/40 bg-ok-soft text-ok hover:bg-ok-soft/80"
                      : isNext
                        ? "border-accent bg-accent text-white shadow-2xs ring-2 ring-accent/30"
                        : "border-border bg-paper text-muted hover:border-accent/50 hover:text-ink",
                  )}
                >
                  <span>{m.number}</span>
                  <span className="hidden md:inline font-sans font-medium max-w-28 truncate">
                    {m.title.replace(/^El cargo:\s*/i, "")}
                  </span>
                  {isRead && <CheckCircle2 className="size-3 shrink-0" />}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          2. PESTAÑAS DE NAVEGACIÓN DEL CENTRO DE ESTUDIO
         ═══════════════════════════════════════════════════════════════════════ */}
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
          1. Ruta de Lecciones ({modules.length})
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
          2. Biblioteca de Leyes ({ARTICULOS.length} Artículos)
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
          3. Resumen de Rol y Funciones ({cargo.shortLabel})
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
          4. Mis Apuntes y Guardados ({totalNotesCount + savedArticles.length})
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          PESTAÑA 1: RUTA DE LECCIONES PASO A PASO
         ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "lecciones" && (
        <div className="space-y-6">
          {/* Buscador + Filtros Leído / No leído */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                id="buscar-modulos"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar tema o artículo (ej. cobro persuasivo, coactivo, 828, 703, Likert)…"
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
                No hay módulos que coincidan con el filtro actual.
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
                Ver todas las lecciones
              </Button>
            </div>
          ) : (
            ORDER.map((track, trackIdx) => {
              const list = filtered.filter((m) => m.track === track);
              if (list.length === 0) return null;
              const allInTrack = modules.filter((m) => m.track === track);
              const done = allInTrack.filter((m) => read[m.id]).length;
              const trackIds = allInTrack.map((m) => m.id);

              return (
                <section key={track} className="space-y-3">
                  <div className="flex flex-wrap items-end justify-between gap-3 rounded-xl border border-border bg-paper/70 px-4 py-3">
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
                        Bloque {trackIdx + 1} de 3 ·{" "}
                        {track === "funcional"
                          ? "ELIMINATORIA (Mínimo 70,00 puntos)"
                          : "CLASIFICATORIA"}
                      </span>
                      <h2 className="font-display text-xl font-bold text-ink">
                        {TRACKS[track].label}
                      </h2>
                      <p className="text-xs text-muted">{TRACKS[track].blurb}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs tabular-nums text-ink font-semibold">
                        {done}/{allInTrack.length} leídos
                      </span>
                      {done > 0 ? (
                        <button
                          type="button"
                          onClick={() => unmarkMany(trackIds)}
                          className="inline-flex items-center gap-1 rounded-lg border border-warn/40 bg-warn-soft/50 px-2.5 py-1 text-[11px] font-semibold text-warn hover:bg-warn-soft cursor-pointer"
                        >
                          <RotateCcw className="size-3" />
                          Poner bloque como No leído
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => trackIds.forEach((id) => markRead(id))}
                          className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-muted hover:text-ok cursor-pointer"
                        >
                          <BookCheck className="size-3" />
                          Marcar bloque como leído
                        </button>
                      )}
                    </div>
                  </div>

                  <ul className="grid gap-4 sm:grid-cols-2">
                    {list.map((m) => {
                      const modQs = questions.filter((qItem) => qItem.moduleId === m.id);
                      const nQ = modQs.length;
                      const answeredInMod = modQs.filter((qItem) => Boolean(answers[qItem.id])).length;
                      const correctInMod = modQs.filter((qItem) => answers[qItem.id]?.correct).length;
                      const modAcc =
                        answeredInMod > 0 ? Math.round((correctInMod / answeredInMod) * 100) : null;

                      const nCards = flashcards.filter((fItem) => fItem.moduleId === m.id).length;
                      const modArticles = articlesForModule(m.id);
                      const isRead = Boolean(read[m.id]);
                      const isNextStep = nextRecommended?.id === m.id && !isRead;
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
                            "flex flex-col rounded-2xl border bg-surface transition-all",
                            isQuickOpen
                              ? "sm:col-span-2 border-accent shadow-sm"
                              : isNextStep
                                ? "border-accent ring-1 ring-accent/40 shadow-xs"
                                : isRead
                                  ? "border-ok/40 hover:border-accent/60"
                                  : "border-border hover:border-accent/60",
                          )}
                        >
                          <div className="flex flex-1 flex-col p-5">
                            {/* Cabecera de la tarjeta: Paso N + Botón directo Leído / No leído */}
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={cn(
                                    "inline-flex items-center rounded-lg px-2.5 py-1 font-mono text-xs font-bold",
                                    isRead
                                      ? "bg-ok text-white"
                                      : isNextStep
                                        ? "bg-accent text-white"
                                        : "bg-paper text-ink border border-border",
                                  )}
                                >
                                  Paso {m.number}
                                </span>
                                {isNextStep && (
                                  <Badge variant="rule" className="text-[10px]">
                                    Siguiente a estudiar
                                  </Badge>
                                )}
                                <Badge variant="outline" className="text-[11px]">
                                  {m.minutes} min
                                </Badge>
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

                            {/* Título y Resumen */}
                            <Link
                              to="/estudio/$slug"
                              params={{ slug: m.id }}
                              className="group mt-3 block"
                            >
                              <h3 className="font-display text-lg font-bold leading-snug text-ink group-hover:text-accent transition-colors">
                                {m.title}
                              </h3>
                              <p className="mt-1.5 text-sm text-muted leading-relaxed">
                                {m.summary}
                              </p>
                            </Link>

                            {/* Qué incluye esta lección (Píldoras muy fáciles de entender) */}
                            <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                              <span className="rounded-lg border border-border bg-paper px-2.5 py-1 text-[11px] font-medium text-ink">
                                📘 {m.points.length} conceptos clave
                              </span>
                              {modArticles.length > 0 && (
                                <span className="rounded-lg border border-border bg-paper px-2.5 py-1 text-[11px] font-medium text-ink">
                                  ⚖️ {modArticles.length} leyes/artículos
                                </span>
                              )}
                              {nCards > 0 && (
                                <span className="rounded-lg border border-border bg-paper px-2.5 py-1 text-[11px] font-medium text-ink">
                                  🗂 {nCards} fichas
                                </span>
                              )}
                              {nQ > 0 && (
                                <span
                                  className={cn(
                                    "rounded-lg border px-2.5 py-1 text-[11px] font-semibold",
                                    modAcc !== null && modAcc >= 70
                                      ? "border-ok/40 bg-ok-soft text-ok"
                                      : modAcc !== null
                                        ? "border-warn/40 bg-warn-soft text-warn"
                                        : "border-accent/30 bg-accent/5 text-accent",
                                  )}
                                >
                                  🎯{" "}
                                  {answeredInMod > 0
                                    ? `Casos: ${correctInMod}/${nQ} bien (${modAcc}%)`
                                    : `${nQ} casos prácticos para validar`}
                                </span>
                              )}
                            </div>

                            {/* Indicadores Areandina */}
                            {coveredIndicators.length > 0 && (
                              <div className="mt-3 rounded-xl border border-accent/20 bg-accent/5 px-3 py-2 text-[11px]">
                                <span className="font-bold text-accent">
                                  Indicador Areandina:
                                </span>{" "}
                                <span className="text-ink font-medium">
                                  {coveredIndicators.map((ci) => ci.nombre).join(" · ")}
                                </span>
                              </div>
                            )}

                            {/* Botones de Acción Claros */}
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/60">
                              <button
                                type="button"
                                onClick={() => setExpandedQuickId(isQuickOpen ? null : m.id)}
                                className="inline-flex items-center gap-1 rounded-xl border border-border bg-paper px-3 py-2 text-xs font-semibold text-ink hover:border-accent/50 hover:text-accent transition-colors cursor-pointer"
                              >
                                {isQuickOpen ? (
                                  <>
                                    <ChevronUp className="size-3.5" />
                                    Cerrar vista rápida
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="size-3.5" />
                                    Vista rápida aquí
                                  </>
                                )}
                              </button>

                              <Link
                                to="/estudio/$slug"
                                params={{ slug: m.id }}
                                className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-bold text-white hover:bg-accent/90 transition-colors shadow-2xs"
                              >
                                Entrar a la Lección (4 Pasos)
                                <ArrowRight className="size-3.5" />
                              </Link>
                            </div>
                          </div>

                          {/* ── Vista Rápida Desplegable en la misma tarjeta ── */}
                          {isQuickOpen && (
                            <div className="border-t border-border bg-paper/60 p-5 space-y-4 animate-in fade-in-0 duration-200">
                              {(guide || topic) && (
                                <div className="rounded-xl border border-accent/30 bg-surface p-4 space-y-2">
                                  <h4 className="font-display text-sm font-bold text-accent">
                                    Cómo se resuelve en {cargo.shortLabel}:
                                  </h4>
                                  <p className="text-xs sm:text-sm text-ink leading-relaxed">
                                    {guide?.howToResolve ?? topic?.how}
                                  </p>
                                  <div className="grid gap-2 sm:grid-cols-2 pt-1">
                                    {(guide?.typicalFail ?? topic?.trap) && (
                                      <div className="rounded-lg border border-bad/25 bg-bad-soft/50 p-2.5 text-xs">
                                        <strong className="text-bad block">❌ Trampa típica:</strong>
                                        <span className="text-ink">
                                          {guide?.typicalFail ?? topic?.trap}
                                        </span>
                                      </div>
                                    )}
                                    {(guide?.correctMove ?? topic?.correctMove) && (
                                      <div className="rounded-lg border border-ok/25 bg-ok-soft/50 p-2.5 text-xs">
                                        <strong className="text-ok block">
                                          ✅ Jugada ganadora:
                                        </strong>
                                        <span className="text-ink">
                                          {guide?.correctMove ?? topic?.correctMove}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              <div className="grid gap-2.5 sm:grid-cols-2">
                                {m.points.map((pt, idx) => (
                                  <div
                                    key={pt.title}
                                    className="rounded-xl border border-border bg-surface p-3.5"
                                  >
                                    <p className="font-display text-xs sm:text-sm font-bold text-ink">
                                      {idx + 1}. {pt.title}
                                    </p>
                                    <p className="mt-1 text-xs leading-relaxed text-muted">
                                      {pt.body}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                                <Button asChild size="sm">
                                  <Link to="/estudio/$slug" params={{ slug: m.id }}>
                                    Abrir lección interactiva y validar los {nQ} casos prácticos →
                                  </Link>
                                </Button>
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
          PESTAÑA 2: BIBLIOTECA DE LEYES (ARTÍCULOS TRANSCRITOS)
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
                  Texto literal y claves de examen del Estatuto Tributario, Constitución, CPACA,
                  Ley 1755, Ley 1066, Ley 1116, Ley 594, MIPG, Régimen Aduanero y Código de
                  Integridad.
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
                              Paso {rm.number} · {rm.title}
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
          PESTAÑA 3: RESUMEN DE ROL Y FUNCIONES DEL CARGO
         ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "guia" && (
        <section className="space-y-6">
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
                  ✅ Lo que SÍ hace tu rol
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
                  ❌ Lo que NO debes hacer (Trampa)
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
                  ⚖️ Diferencia frente a otros cargos
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
                            Ir al Paso {relMod.number} →
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
                        <strong className="text-bad block mb-0.5">❌ Fallo típico en examen:</strong>
                        <span className="text-ink">{g.typicalFail}</span>
                      </div>
                      <div className="rounded-lg border border-ok/25 bg-ok-soft/50 p-3 text-xs">
                        <strong className="text-ok block mb-0.5">✅ Jugada correcta:</strong>
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
                Aún no has escrito apuntes personales. Entra a cualquier lección y abre el botón{" "}
                <strong>«Apuntes»</strong> arriba a la derecha; se guardan solos en tu dispositivo.
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
                          Paso {m.number} · {m.title}
                        </span>
                        <Link
                          to="/estudio/$slug"
                          params={{ slug: m.id }}
                          className="text-xs font-semibold text-accent hover:underline"
                        >
                          Abrir lección →
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
                cualquier artículo dentro de las lecciones o en la{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("normativa")}
                  className="text-accent underline cursor-pointer"
                >
                  Biblioteca de Leyes
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
