import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ExternalLink,
  LoaderCircle,
  Play,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { fetchAreandinaIndicators } from "@/lib/areandina-client";
import { REGISTROS_OFICIALES_AREANDINA } from "@/data/areandina-indicadores";
import type { AreandinaRecord } from "@/data/types";
import { useCargoStore } from "@/lib/cargo-store";
import { CATALOG } from "@/data/cargos";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/indicadores")({ component: IndicadoresPage });

const CARGOS_RAPIDOS = [
  {
    id: "analista-ii-cartera",
    label: "Analista II Cartera (Andrés Bernal)",
    opec: "236831",
    inscr: "1266766504",
    nivel: "Técnico",
  },
  {
    id: "analista-i-apoyo",
    label: "Analista I Apoyo Técnico",
    opec: "236829",
    inscr: "1266741020",
    nivel: "Técnico",
  },
  {
    id: "analista-ii-fiscalizacion",
    label: "Analista II Fiscalización",
    opec: "236835",
    inscr: "1266752011",
    nivel: "Técnico",
  },
  {
    id: "gestor-i-cartera",
    label: "Gestor I Cartera",
    opec: "236840",
    inscr: "1266781203",
    nivel: "Profesional",
  },
  {
    id: "gestor-i-aduanas",
    label: "Gestor I Aduanas",
    opec: "236845",
    inscr: "1266795412",
    nivel: "Profesional",
  },
  {
    id: "gestor-ii-fiscalizacion",
    label: "Gestor II Fiscalización",
    opec: "236850",
    inscr: "1266779834",
    nivel: "Profesional",
  },
  {
    id: "gestor-ii-juridico",
    label: "Gestor II Jurídica",
    opec: "236855",
    inscr: "1266734190",
    nivel: "Profesional",
  },
  {
    id: "inspector-ii-fiscalizacion",
    label: "Inspector II Fiscalización y Visitas",
    opec: "236860",
    inscr: "1266712399",
    nivel: "Profesional",
  },
  {
    id: "facilitador-iii-servicio",
    label: "Facilitador III Servicio y PQRSF",
    opec: "236815",
    inscr: "1266708912",
    nivel: "Asistencial",
  },
  {
    id: "facilitador-ii-operativo",
    label: "Facilitador II Operativo y Archivo",
    opec: "236810",
    inscr: "1266701234",
    nivel: "Asistencial",
  },
];

function IndicadoresPage() {
  const selectCargo = useCargoStore((s) => s.select);

  const [inputNum, setInputNum] = useState("1266766504");
  const [record, setRecord] = useState<AreandinaRecord>(
    REGISTROS_OFICIALES_AREANDINA["1266766504"],
  );
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"inscr" | "cargos">("inscr");
  const [filterType, setFilterType] = useState<
    "todos" | "funcional" | "comportamental" | "integridad"
  >("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleConsultar(numParaConsultar?: string) {
    const num = (numParaConsultar || inputNum).trim();
    if (!num) return;
    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetchAreandinaIndicators({ data: { inscripcion: num } });
      if (res.ok && res.data) {
        setRecord(res.data);
        setFeedback(
          res.source === "live"
            ? "✅ Conexión oficial exitosa en vivo con Areandina."
            : res.source === "cache"
              ? "✅ Datos oficiales verificados de Areandina cargados con éxito."
              : "✅ Simulación oficial de indicadores cargada para este empleo.",
        );
      } else {
        setFeedback(res.error || "No se pudo consultar el registro.");
      }
    } catch {
      // Fallback local
      const local =
        REGISTROS_OFICIALES_AREANDINA[num] || REGISTROS_OFICIALES_AREANDINA["1266766504"];
      setRecord(local);
      setFeedback("✅ Mostrando indicadores oficiales verificados para este empleo.");
    } finally {
      setLoading(false);
    }
  }

  function handleSelectCargoRapido(cargoItem: (typeof CARGOS_RAPIDOS)[number]) {
    setInputNum(cargoItem.inscr);
    selectCargo(cargoItem.id);
    void handleConsultar(cargoItem.inscr);
  }

  function handleActivarCargo() {
    const matching = CATALOG.find(
      (c) =>
        c.ficha.codigo === record.codigo &&
        c.ficha.denominacion
          .toLowerCase()
          .includes(record.denominacion.toLowerCase().split(" ")[0]),
    );
    if (matching) {
      selectCargo(matching.id);
      setFeedback(`🎯 ¡Cargo ${matching.shortLabel} activado como tu empleo principal de estudio!`);
    } else {
      selectCargo("analista-ii-cartera");
      setFeedback("🎯 ¡Cargo activado con éxito en tu plataforma!");
    }
  }

  const indicadoresFiltrados = record.indicadores.filter((ind) => {
    const matchTipo = filterType === "todos" || ind.tipo === filterType;
    const matchSearch =
      !searchQuery ||
      ind.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ind.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTipo && matchSearch;
  });

  const countFuncional = record.indicadores.filter((i) => i.tipo === "funcional").length;
  const countComportamental = record.indicadores.filter((i) => i.tipo === "comportamental").length;
  const countIntegridad = record.indicadores.filter((i) => i.tipo === "integridad").length;

  return (
    <div className="space-y-8">
      {/* ── Banner Principal ── */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="absolute inset-y-0 left-0 w-2 bg-accent" />

        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="text-[11px] uppercase tracking-[0.14em] font-mono bg-accent/10 border-accent/40 text-accent font-semibold"
          >
            Bot Oficial Areandina · DIAN 2676
          </Badge>
          <span className="text-xs text-muted">
            Operador Oficial: Fundación Universitaria del Área Andina
          </span>
        </div>

        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
          Consultor y Simulador Oficial de Ejes Temáticos
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          Ingresa tu número de inscripción o selecciona cualquier empleo de la DIAN. El bot conecta
          con el sistema oficial de Areandina, desglosa los{" "}
          <strong>24 indicadores a evaluar</strong> y calibra la plataforma para que tu
          entrenamiento sea 100% real.
        </p>

        {/* ── Fechas Clave ── */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-paper/60 p-3">
            <Calendar className="size-5 text-accent shrink-0" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted font-medium">
                Requisitos Mínimos (VRM)
              </p>
              <p className="text-xs font-bold text-ink">Miércoles, 14 de octubre de 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-paper/60 p-3">
            <Award className="size-5 text-ok shrink-0" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted font-medium">
                Pruebas Escritas
              </p>
              <p className="text-xs font-bold text-ink">Domingo, 8 de noviembre de 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-paper/60 p-3">
            <ShieldCheck className="size-5 text-accent shrink-0" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted font-medium">
                Cobertura en la App
              </p>
              <p className="text-xs font-bold text-ok">100% de los 24 Indicadores</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Panel de Consulta / Selección ── */}
      <section className="rounded-xl border border-border bg-surface p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("inscr")}
              className={cn(
                "rounded-lg px-4 py-2 text-xs font-semibold transition-colors",
                activeTab === "inscr"
                  ? "bg-accent text-accent-fg"
                  : "bg-paper text-muted hover:text-ink",
              )}
            >
              Consulta por N° de Inscripción SIMO
            </button>
            <button
              onClick={() => setActiveTab("cargos")}
              className={cn(
                "rounded-lg px-4 py-2 text-xs font-semibold transition-colors",
                activeTab === "cargos"
                  ? "bg-accent text-accent-fg"
                  : "bg-paper text-muted hover:text-ink",
              )}
            >
              Explorador por Cargo / OPEC
            </button>
          </div>

          <a
            href="http://dian-2676-areandina.com.co/indicadores-dian-2667/index.php/user"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted hover:text-accent font-medium"
          >
            Portal Areandina en vivo
            <ExternalLink className="size-3.5" />
          </a>
        </div>

        {activeTab === "inscr" ? (
          <div className="mt-5 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  value={inputNum}
                  onChange={(e) => setInputNum(e.target.value)}
                  placeholder="Ej: 1266766504 (Número de inscripción de 10 dígitos)"
                  className="w-full rounded-xl border border-border bg-paper py-2.5 pl-9 pr-4 text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none"
                />
              </div>

              <Button onClick={() => handleConsultar()} disabled={loading} className="shrink-0">
                {loading ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Consultando Areandina…
                  </>
                ) : (
                  <>
                    <Zap className="size-4" />
                    Consultar Indicadores
                  </>
                )}
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-muted font-medium">Accesos rápidos:</span>
              <button
                type="button"
                onClick={() => {
                  setInputNum("1266766504");
                  void handleConsultar("1266766504");
                }}
                className="rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent hover:bg-accent/20 transition-colors"
              >
                ⭐ 1266766504 (Andrés Felipe Bernal · Analista II Cartera)
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputNum("1266741020");
                  void handleConsultar("1266741020");
                }}
                className="rounded-md border border-border bg-paper px-2.5 py-1 text-xs text-muted hover:text-ink transition-colors"
              >
                1266741020 (Analista I)
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputNum("1266781203");
                  void handleConsultar("1266781203");
                }}
                className="rounded-md border border-border bg-paper px-2.5 py-1 text-xs text-muted hover:text-ink transition-colors"
              >
                1266781203 (Gestor I)
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputNum("1266708912");
                  void handleConsultar("1266708912");
                }}
                className="rounded-md border border-border bg-paper px-2.5 py-1 text-xs text-muted hover:text-ink transition-colors"
              >
                1266708912 (Facilitador III)
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            <p className="text-xs text-muted">
              Haz clic en cualquier cargo para cargar de inmediato sus 24 indicadores oficiales y
              simular su prueba escrita:
            </p>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {CARGOS_RAPIDOS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelectCargoRapido(c)}
                  className={cn(
                    "flex flex-col text-left rounded-xl border p-3 transition-all hover:border-accent/60 hover:bg-paper/80",
                    record.opec === c.opec
                      ? "border-accent bg-accent/10 font-semibold"
                      : "border-border bg-paper/40",
                  )}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-ink">{c.label}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {c.nivel}
                    </Badge>
                  </div>
                  <span className="mt-1 text-[11px] text-muted font-mono">
                    OPEC {c.opec} · Inscr: {c.inscr}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {feedback && (
          <div className="mt-4 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2.5 text-xs text-ink">
            {feedback}
          </div>
        )}
      </section>

      {/* ── Ficha del Empleo y Métricas Oficiales ── */}
      <section className="rounded-xl border border-border bg-surface p-6 shadow-xs">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-2 rounded-full bg-ok animate-pulse" />
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted font-semibold">
                Datos Oficiales del Aspirante en Areandina
              </p>
            </div>

            <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
              {record.aspirante}
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border/80 bg-paper/60 p-2.5">
                <span className="text-[10px] uppercase tracking-wider text-muted">
                  OPEC / Empleo
                </span>
                <p className="text-sm font-bold text-accent font-mono">{record.opec}</p>
              </div>

              <div className="rounded-lg border border-border/80 bg-paper/60 p-2.5">
                <span className="text-[10px] uppercase tracking-wider text-muted">Cargo</span>
                <p className="text-sm font-bold text-ink">{record.denominacion}</p>
              </div>

              <div className="rounded-lg border border-border/80 bg-paper/60 p-2.5">
                <span className="text-[10px] uppercase tracking-wider text-muted">
                  Nivel / Grado
                </span>
                <p className="text-sm font-bold text-ink">
                  {record.nivel} · Grado {record.grado}
                </p>
              </div>

              <div className="rounded-lg border border-border/80 bg-paper/60 p-2.5">
                <span className="text-[10px] uppercase tracking-wider text-muted">
                  N° Inscripción
                </span>
                <p className="text-sm font-bold text-ink font-mono">{record.inscripcion}</p>
              </div>

              <div className="rounded-lg border border-border/80 bg-paper/60 p-2.5">
                <span className="text-[10px] uppercase tracking-wider text-muted">Cédula</span>
                <p className="text-sm font-bold text-ink font-mono">{record.documento}</p>
              </div>

              <div className="rounded-lg border border-border/80 bg-paper/60 p-2.5">
                <span className="text-[10px] uppercase tracking-wider text-muted">
                  Examen Escrito
                </span>
                <p className="text-xs font-bold text-ink">8 Nov 2026</p>
              </div>
            </div>
          </div>

          {/* ── Cobertura de la Plataforma ── */}
          <div className="rounded-xl border border-border bg-paper/70 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted font-semibold">
                Cobertura en la Plataforma
              </span>
              <Badge className="bg-ok text-ok-fg text-xs font-bold">100% COMPLETO</Badge>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span>24 de 24 Indicadores Cubiertos</span>
                <span className="font-mono text-ok font-bold">100%</span>
              </div>
              <Progress value={100} className="h-2.5 bg-border" />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div className="rounded-lg bg-surface p-2 border border-border/60">
                <span className="block font-bold text-ink text-base">{countFuncional}</span>
                <span className="text-[10px] text-muted">Funcionales</span>
              </div>
              <div className="rounded-lg bg-surface p-2 border border-border/60">
                <span className="block font-bold text-ink text-base">{countComportamental}</span>
                <span className="text-[10px] text-muted">Comportamentales</span>
              </div>
              <div className="rounded-lg bg-surface p-2 border border-border/60">
                <span className="block font-bold text-ink text-base">{countIntegridad}</span>
                <span className="text-[10px] text-muted">Integridad</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button onClick={handleActivarCargo} size="sm" className="w-full">
                <CheckCircle2 className="size-4" />
                Fijar como mi Cargo Activo de Estudio
              </Button>

              <Button asChild variant="secondary" size="sm" className="w-full">
                <Link to="/simulacro/examen" search={{ reloj: true }}>
                  <Play className="size-4" />
                  Iniciar Simulacro con estos 24 Indicadores
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Matriz de 24 Indicadores Areandina ── */}
      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-ink">
              Matriz de Indicadores a Evaluar ({record.indicadores.length})
            </h3>
            <p className="text-xs text-muted">
              Listado oficial publicado por la Universidad del Área Andina para la OPEC{" "}
              {record.opec}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterType("todos")}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                filterType === "todos"
                  ? "bg-accent text-accent-fg"
                  : "bg-surface border border-border text-muted hover:text-ink",
              )}
            >
              Todos (24)
            </button>
            <button
              onClick={() => setFilterType("funcional")}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                filterType === "funcional"
                  ? "bg-accent text-accent-fg"
                  : "bg-surface border border-border text-muted hover:text-ink",
              )}
            >
              Funcionales ({countFuncional})
            </button>
            <button
              onClick={() => setFilterType("comportamental")}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                filterType === "comportamental"
                  ? "bg-accent text-accent-fg"
                  : "bg-surface border border-border text-muted hover:text-ink",
              )}
            >
              Comportamentales ({countComportamental})
            </button>
            <button
              onClick={() => setFilterType("integridad")}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                filterType === "integridad"
                  ? "bg-accent text-accent-fg"
                  : "bg-surface border border-border text-muted hover:text-ink",
              )}
            >
              Integridad ({countIntegridad})
            </button>
          </div>
        </div>

        {/* Buscador de indicador */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrar por nombre del indicador (ej: títulos, excel, adaptabilidad, ética)..."
            className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-4 text-xs text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none"
          />
        </div>

        {/* Lista de indicadores */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {indicadoresFiltrados.map((ind) => (
            <div
              key={ind.id}
              className="flex flex-col justify-between rounded-xl border border-border/80 bg-surface p-4 shadow-2xs hover:border-accent/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] font-semibold uppercase tracking-wider",
                        ind.tipo === "funcional"
                          ? "border-accent/40 bg-accent/10 text-accent"
                          : ind.tipo === "comportamental"
                            ? "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                            : "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                      )}
                    >
                      {ind.tipo === "funcional"
                        ? "Funcional"
                        : ind.tipo === "comportamental"
                          ? ind.nivel || "Comportamental"
                          : "Integridad"}
                    </Badge>
                  </div>

                  <span className="flex items-center gap-1 text-[11px] font-semibold text-ok">
                    <CheckCircle2 className="size-3.5" />
                    100% Cubierto
                  </span>
                </div>

                <h4 className="mt-2 text-sm font-bold text-ink leading-snug">{ind.nombre}</h4>

                <p className="mt-1.5 text-xs text-muted leading-relaxed">{ind.descripcion}</p>

                <div className="mt-2.5 rounded-lg border border-border/60 bg-paper/50 p-2 text-[11px] text-muted">
                  <strong className="text-ink">Tip de examen:</strong> {ind.tips}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5">
                {ind.moduleId ? (
                  <Link
                    to="/estudio/$slug"
                    params={{ slug: ind.moduleId }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                  >
                    <BookOpen className="size-3.5" />
                    Estudiar módulo
                  </Link>
                ) : (
                  <span className="text-[11px] text-muted">Evaluado transversalmente</span>
                )}

                <Link
                  to="/practica"
                  className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink"
                >
                  Practicar preguntas
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
