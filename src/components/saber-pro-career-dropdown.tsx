import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, GraduationCap, Search, Sparkles, BookOpen } from "lucide-react";
import { SABER_PRO_CAREERS } from "@/data/saber-pro-data";
import { useSaberProStore, getSelectedCareer } from "@/lib/saber-pro-store";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SaberProCareerDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCareerId = useSaberProStore((s) => s.selectedCareerId);
  const selectCareer = useSaberProStore((s) => s.selectCareer);

  const currentCareer = getSelectedCareer(selectedCareerId);

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

  const filteredCareers = SABER_PRO_CAREERS.filter((c) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(term) ||
      c.faculty.toLowerCase().includes(term) ||
      c.specificModules.some((m) => m.name.toLowerCase().includes(term))
    );
  });

  const handleSelect = (careerId: string) => {
    selectCareer(careerId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón Principal Disparador */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-2.5 py-1.5 text-xs transition-all hover:bg-amber-500/20 hover:border-amber-500/60 shadow-2xs group cursor-pointer",
          isOpen && "ring-2 ring-amber-500 border-amber-500 bg-surface",
        )}
      >
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold group-hover:scale-105 transition-transform">
          <GraduationCap className="size-4 text-amber-600 dark:text-amber-400" />
        </div>

        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xs leading-none text-ink truncate max-w-28 sm:max-w-36">
              {currentCareer.name}
            </span>
            <Badge
              variant="outline"
              className="px-1.5 py-0 text-[9px] font-bold text-amber-700 dark:text-amber-300 border-amber-500/40 bg-amber-500/15 hidden sm:inline-flex"
            >
              Saber Pro
            </Badge>
          </div>
          <span className="text-[10px] text-muted leading-tight mt-0.5 flex items-center gap-1">
            <span>Prueba Específica</span>
            <span className="text-subtle font-normal">· Cambiar</span>
          </span>
        </div>

        <ChevronDown
          className={cn(
            "size-3.5 text-muted transition-transform duration-200 shrink-0 ml-0.5",
            isOpen && "rotate-180 text-amber-600",
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
                <Sparkles className="size-3.5 text-amber-500" />
                <h4 className="text-xs font-bold text-ink">Cambiar Carrera Profesional</h4>
              </div>
              <p className="text-[10px] text-muted">
                Las preguntas de la Sesión 2 y fórmulas se calibrarán a tu carrera.
              </p>
            </div>
            <span className="text-[10px] font-mono text-muted bg-paper px-2 py-0.5 rounded-md border border-border/60">
              {filteredCareers.length} carreras
            </span>
          </div>

          {/* Buscador Rápido de Carrera */}
          <div className="relative mt-2.5">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar carrera (Contaduría, Derecho, etc.)..."
              className="w-full rounded-lg border border-border bg-paper py-1.5 pl-8 pr-3 text-xs text-ink placeholder:text-muted/60 focus:border-amber-500 focus:outline-hidden"
              autoFocus
            />
          </div>

          {/* Lista de Carreras Disponibles */}
          <div className="mt-2.5 max-h-64 space-y-1.5 overflow-y-auto pr-1">
            {filteredCareers.length === 0 ? (
              <div className="py-6 text-center text-xs text-muted">
                No se encontraron carreras que coincidan con &quot;{search}&quot;.
              </div>
            ) : (
              filteredCareers.map((c) => {
                const isSelected = selectedCareerId === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelect(c.id)}
                    className={cn(
                      "group flex w-full items-start justify-between rounded-xl p-2.5 text-left transition-all cursor-pointer",
                      isSelected
                        ? "bg-amber-500/10 border border-amber-500/50 text-ink font-semibold"
                        : "hover:bg-paper/70 text-ink border border-transparent",
                    )}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-mono font-bold transition-colors mt-0.5",
                          isSelected
                            ? "bg-amber-500 text-white shadow-xs"
                            : "bg-paper text-muted group-hover:bg-surface group-hover:text-ink",
                        )}
                      >
                        <BookOpen className="size-3.5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold leading-snug text-ink truncate">
                            {c.name}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted truncate max-w-[200px] sm:max-w-[240px]">
                          {c.faculty}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {c.specificModules.map((m) => (
                            <span
                              key={m.id}
                              className="text-[9px] bg-paper px-1.5 py-0.2 rounded border border-border/60 text-muted"
                            >
                              {m.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-1 ml-1" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
