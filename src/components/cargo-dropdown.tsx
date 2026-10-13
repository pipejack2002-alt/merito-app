import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Briefcase, Check, ChevronDown, Search, ExternalLink, Sparkles } from "lucide-react";
import { CATALOG } from "@/data/cargos";
import { useCargoStore } from "@/lib/cargo-store";
import { useCargo } from "@/lib/use-cargo";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Lista enriquecida con metadatos oficiales y códigos OPEC
const CARGOS_HEADER_LIST = [
  {
    id: "analista-ii-cartera",
    opec: "236831",
    label: "Analista II",
    sub: "Cartera, Recaudo y Devoluciones",
    nivel: "Técnico",
    codigo: "202",
    grado: "02",
    popular: true,
  },
  {
    id: "gestor-i-cartera",
    opec: "236840",
    label: "Gestor I",
    sub: "Cartera, Recaudo y Devoluciones",
    nivel: "Profesional",
    codigo: "301",
    grado: "01",
    popular: true,
  },
  {
    id: "gestor-ii-cartera",
    opec: "236850",
    label: "Gestor II",
    sub: "Cartera, Recaudo y Devoluciones",
    nivel: "Profesional",
    codigo: "302",
    grado: "02",
    popular: false,
  },
  {
    id: "analista-ii-fiscalizacion",
    opec: "236835",
    label: "Analista II",
    sub: "Fiscalización Tributaria",
    nivel: "Técnico",
    codigo: "202",
    grado: "02",
    popular: true,
  },
  {
    id: "gestor-i-aduanas",
    opec: "236845",
    label: "Gestor I",
    sub: "Operaciones y Regímenes Aduaneros",
    nivel: "Profesional",
    codigo: "301",
    grado: "01",
    popular: false,
  },
  {
    id: "gestor-ii-juridica",
    opec: "236855",
    label: "Gestor II",
    sub: "Cobro Coactivo y Jurídica",
    nivel: "Profesional",
    codigo: "302",
    grado: "02",
    popular: false,
  },
  {
    id: "inspector-ii-visitas",
    opec: "236860",
    label: "Inspector II",
    sub: "Fiscalización y Visitas",
    nivel: "Profesional",
    codigo: "302",
    grado: "02",
    popular: false,
  },
  {
    id: "facilitador-iii-servicio",
    opec: "236815",
    label: "Facilitador III",
    sub: "Atención al Ciudadano y PQRSF",
    nivel: "Asistencial",
    codigo: "103",
    grado: "03",
    popular: false,
  },
  {
    id: "facilitador-ii-operativo",
    opec: "236810",
    label: "Facilitador II",
    sub: "Gestión Documental y Archivo",
    nivel: "Asistencial",
    codigo: "102",
    grado: "02",
    popular: false,
  },
];

export function CargoDropdownSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { cargo, ficha } = useCargo();
  const selectCargo = useCargoStore((s) => s.select);
  const selectedId = useCargoStore((s) => s.selectedId);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredCargos = CARGOS_HEADER_LIST.filter((c) => {
    const term = search.toLowerCase().trim();
    if (!term) return true;
    return (
      c.label.toLowerCase().includes(term) ||
      c.sub.toLowerCase().includes(term) ||
      c.opec.includes(term) ||
      c.nivel.toLowerCase().includes(term) ||
      c.codigo.includes(term)
    );
  });

  function handleSelect(id: string) {
    // Verificar si el id existe directamente en CATALOG
    const match = CATALOG.find((c) => c.id === id);
    if (match) {
      selectCargo(id);
    } else {
      // Si el id tiene un alias, buscar el más cercano
      const fallback = CATALOG.find(
        (c) =>
          c.family.toLowerCase().includes(id.split("-")[0]) ||
          c.ficha.denominacion.toLowerCase().includes(id.split("-")[0]),
      );
      if (fallback) selectCargo(fallback.id);
    }
    setIsOpen(false);
    setSearch("");
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón Activador del Selector */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          "inline-flex items-center gap-2.5 rounded-xl border border-border/90 bg-surface px-3 py-1.5 text-xs text-ink transition-all shadow-2xs hover:border-accent hover:bg-paper/50 focus:outline-none focus:ring-2 focus:ring-accent/30",
          isOpen && "border-accent ring-2 ring-accent/30 bg-paper/60",
        )}
      >
        <div className="flex size-7 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
          <Briefcase className="size-3.5" />
        </div>

        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xs leading-none text-ink truncate max-w-28 sm:max-w-36">
              {cargo.shortLabel}
            </span>
            <Badge
              variant="outline"
              className="px-1.5 py-0 text-[9px] font-semibold text-accent border-accent/30 bg-accent/5 hidden sm:inline-flex"
            >
              {ficha.nivel?.replace("Nivel ", "") || "Técnico"}
            </Badge>
          </div>
          <span className="text-[10px] text-muted leading-tight mt-0.5 flex items-center gap-1">
            <span>OPEC {ficha.opec || "236831"}</span>
            <span className="text-subtle font-normal">· Cambiar</span>
          </span>
        </div>

        <ChevronDown
          className={cn(
            "size-3.5 text-muted transition-transform duration-200 shrink-0 ml-0.5",
            isOpen && "rotate-180 text-accent",
          )}
        />
      </button>

      {/* Menú Desplegable Popover */}
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 sm:w-96 rounded-2xl border border-border/90 bg-surface p-3 shadow-xl backdrop-blur-md animate-in fade-in-0 zoom-in-95 duration-150">
          {/* Cabecera del Dropdown */}
          <div className="flex items-center justify-between border-b border-border/80 pb-2.5 px-1">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-accent" />
                <h4 className="text-xs font-bold text-ink">Cambiar Empleo de Estudio</h4>
              </div>
              <p className="text-[10px] text-muted">
                Toda la app (preguntas, guías y simulacros) se calibrará a tu OPEC.
              </p>
            </div>
            <span className="text-[10px] font-mono text-muted bg-paper px-2 py-0.5 rounded-md border border-border/60">
              {filteredCargos.length} opciones
            </span>
          </div>

          {/* Buscador Rápido de Cargo */}
          <div className="relative mt-2.5">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por cargo, nivel o código OPEC..."
              className="w-full rounded-lg border border-border bg-paper py-1.5 pl-8 pr-3 text-xs text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none"
              autoFocus
            />
          </div>

          {/* Lista de Empleos Disponibles */}
          <div className="mt-2.5 max-h-64 space-y-1 overflow-y-auto pr-1">
            {filteredCargos.length === 0 ? (
              <div className="py-6 text-center text-xs text-muted">
                No se encontraron empleos que coincidan con &quot;{search}&quot;.
              </div>
            ) : (
              filteredCargos.map((c) => {
                const isSelected = selectedId === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelect(c.id)}
                    className={cn(
                      "group flex w-full items-center justify-between rounded-xl p-2 text-left transition-all",
                      isSelected
                        ? "bg-accent/10 border border-accent/40 text-accent font-semibold"
                        : "hover:bg-paper/70 text-ink border border-transparent",
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-mono font-bold transition-colors",
                          isSelected
                            ? "bg-accent text-white"
                            : "bg-paper text-muted group-hover:bg-surface group-hover:text-ink",
                        )}
                      >
                        {c.codigo}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold leading-none text-ink truncate">
                            {c.label}
                          </span>
                          <span className="text-[10px] font-mono text-muted">Gr. {c.grado}</span>
                        </div>
                        <p className="mt-0.5 text-[10px] text-muted truncate max-w-[200px] sm:max-w-[240px]">
                          {c.sub}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-paper border border-border/60 text-subtle">
                        OPEC {c.opec}
                      </span>
                      {isSelected ? (
                        <Check className="size-4 text-accent" />
                      ) : (
                        <div className="size-4" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Pie del Dropdown: Enlace al Catálogo Completo */}
          <div className="mt-2.5 border-t border-border/80 pt-2 px-1">
            <Link
              to="/cargo"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-lg p-1.5 text-xs font-semibold text-accent hover:bg-accent/10 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Briefcase className="size-3.5" />
                Explorar Catálogo Completo o Subir Manual Propio
              </span>
              <ExternalLink className="size-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
