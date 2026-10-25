import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, Check, ChevronDown, Copy, KeyRound, Scale } from "lucide-react";
import { type Articulo, NORMAS, citaArticulo } from "@/data/normas";
import { useProgress } from "@/lib/progress-store";
import { cn } from "@/lib/utils";

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Resalta las coincidencias de `query` dentro de `text`. */
export function Highlight({ text, query }: { text: string; query?: string }) {
  const q = query?.trim();
  if (!q || q.length < 2) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark key={i} className="rounded-sm bg-warn-soft px-0.5 text-ink">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

interface ArticleCardProps {
  articulo: Articulo;
  defaultOpen?: boolean;
  /** Permite expandir o contraer masivamente desde el contenedor padre. */
  forceOpen?: boolean | null;
  query?: string;
  /** Muestra el enlace a la biblioteca normativa completa. */
  showLibraryLink?: boolean;
  footer?: React.ReactNode;
}

export function ArticleCard({
  articulo: a,
  defaultOpen = false,
  forceOpen = null,
  query,
  showLibraryLink = false,
  footer,
}: ArticleCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);
  const saved = useProgress((s) => s.savedArticles.includes(a.id));
  const toggleSaved = useProgress((s) => s.toggleSavedArticle);
  const norma = NORMAS[a.norma];
  const cita = citaArticulo(a);

  useEffect(() => {
    if (forceOpen !== null && forceOpen !== undefined) {
      setOpen(forceOpen);
    }
  }, [forceOpen]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${cita} — ${a.titulo}\n\n${a.texto.join("\n\n")}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* el portapapeles puede no estar disponible */
    }
  };

  return (
    <article
      id={`art-${a.id}`}
      className={cn(
        "scroll-mt-24 overflow-hidden rounded-xl border bg-surface transition-colors",
        open ? "border-accent/40 shadow-xs" : "border-border hover:border-accent/30",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 px-4 py-3.5 text-left"
      >
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Scale className="size-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-accent">
              {cita}
            </span>
            {a.extracto ? (
              <span className="rounded-full bg-paper px-1.5 py-px text-[10px] font-medium uppercase tracking-wide text-subtle">
                Extracto
              </span>
            ) : null}
            {saved ? <BookmarkCheck className="size-3.5 text-warn" aria-label="Guardado" /> : null}
          </span>
          <span className="mt-0.5 block font-display text-[15px] font-semibold leading-snug text-ink">
            <Highlight text={a.titulo} query={query} />
          </span>
          {!open && a.clave ? (
            <span className="mt-1 line-clamp-1 block text-xs text-muted">{a.clave}</span>
          ) : null}
        </span>
        <ChevronDown
          className={cn("mt-1 size-4 shrink-0 text-subtle transition-transform", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div className="space-y-3 border-t border-border/70 px-4 pb-4 pt-3 animate-in fade-in-0 slide-in-from-top-1 duration-200">
          {a.clave ? (
            <div className="flex gap-2 rounded-lg border border-warn/30 bg-warn-soft/60 px-3 py-2 text-[13px] leading-relaxed text-ink">
              <KeyRound className="mt-0.5 size-3.5 shrink-0 text-warn" />
              <span>
                <strong className="font-semibold">Clave de examen: </strong>
                {a.clave}
              </span>
            </div>
          ) : null}

          <blockquote className="space-y-2 border-l-2 border-rule/70 pl-3.5 font-serif">
            {a.texto.map((p, i) => (
              <p key={i} className="text-[14px] leading-relaxed text-ink">
                <Highlight text={p} query={query} />
              </p>
            ))}
          </blockquote>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => toggleSaved(a.id)}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition-colors",
                saved
                  ? "border-warn/40 bg-warn-soft text-warn hover:bg-warn-soft/70"
                  : "border-border text-muted hover:bg-paper hover:text-ink",
              )}
            >
              {saved ? <BookmarkCheck className="size-3.5" /> : <Bookmark className="size-3.5" />}
              {saved ? "Guardado" : "Guardar"}
            </button>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs font-medium text-muted transition-colors hover:bg-paper hover:text-ink"
            >
              {copied ? <Check className="size-3.5 text-ok" /> : <Copy className="size-3.5" />}
              {copied ? "Copiado" : "Copiar texto"}
            </button>
            {showLibraryLink ? (
              <Link
                to="/estudio"
                hash={`art-${a.id}`}
                className="inline-flex h-8 items-center px-1 text-xs font-medium text-accent hover:underline"
              >
                Ver en la biblioteca normativa
              </Link>
            ) : null}
            <a
              href={norma.href}
              target="_blank"
              rel="noreferrer"
              className="ml-auto text-[11px] text-subtle underline-offset-2 hover:text-muted hover:underline"
            >
              Fuente oficial ↗
            </a>
          </div>
          {footer}
        </div>
      ) : null}
    </article>
  );
}
