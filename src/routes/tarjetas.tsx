import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Filter,
  RotateCw,
  Square,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { shuffle } from "@/data/questions";
import { useCargo } from "@/lib/use-cargo";
import { TRACKS, type TrackId } from "@/data/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tarjetas")({ component: TarjetasPage });

function TarjetasPage() {
  const { flashcards, cargo } = useCargo();
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [learned, setLearned] = useState<Record<string, boolean>>({});

  const filteredCards = useMemo(() => {
    if (selectedTrack === "all") return flashcards;
    return flashcards.filter((c) => c.track === selectedTrack);
  }, [flashcards, selectedTrack]);

  const deck = useMemo(() => shuffle(filteredCards, 2676), [filteredCards]);
  const card = deck[i];

  const go = useCallback(
    (delta: number) => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setSpeaking(false);
      setFlip(false);
      setI((n) => (n + delta + deck.length) % deck.length);
    },
    [deck.length],
  );

  const toggleSpeech = useCallback(() => {
    if (!("speechSynthesis" in window)) {
      alert("Tu navegador no soporta lectura de voz.");
      return;
    }
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    if (!card) return;
    const textToRead = flip ? `Respuesta: ${card.back}` : `Pregunta: ${card.front}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "es-CO";
    utterance.rate = 1.0;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, [speaking, flip, card]);

  // Atajos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlip((f) => !f);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [go]);

  if (!card) {
    return (
      <div className="mx-auto max-w-xl space-y-4">
        <h1 className="font-display text-2xl font-semibold">Tarjetas de Memoria</h1>
        <p className="text-sm text-muted">
          No hay tarjetas con el filtro seleccionado para {cargo.shortLabel}.
        </p>
        <Button variant="outline" onClick={() => setSelectedTrack("all")}>
          Ver todas las tarjetas
        </Button>
      </div>
    );
  }

  const isCurrentLearned = Boolean(learned[card.id]);
  const progressPct = deck.length > 0 ? Math.round(((i + 1) / deck.length) * 100) : 0;
  const learnedCount = Object.values(learned).filter(Boolean).length;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted font-mono">
            Memoria Activa · {cargo.shortLabel}
          </p>
          <span className="text-xs text-muted font-mono">
            {learnedCount}/{deck.length} memorizadas
          </span>
        </div>
        <h1 className="font-display text-3xl font-semibold">Fichas Nemotécnicas</h1>
        <p className="text-sm text-muted">
          Artículos, plazos, excepciones del Estatuto Tributario y CPACA que debes recordar en segundos.
        </p>
      </header>

      {/* Filtros por Prueba */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-border pb-3 text-xs">
        <span className="text-muted text-[11px] font-medium mr-1 flex items-center gap-1">
          <Filter className="size-3" />
          Filtro:
        </span>
        <button
          type="button"
          onClick={() => {
            setSelectedTrack("all");
            setI(0);
            setFlip(false);
          }}
          className={cn(
            "rounded-lg px-2.5 py-1 font-medium transition-colors cursor-pointer",
            selectedTrack === "all"
              ? "bg-accent text-white font-semibold"
              : "bg-paper text-muted hover:text-ink",
          )}
        >
          Todas ({flashcards.length})
        </button>
        {(Object.keys(TRACKS) as TrackId[]).map((tr) => (
          <button
            key={tr}
            type="button"
            onClick={() => {
              setSelectedTrack(tr);
              setI(0);
              setFlip(false);
            }}
            className={cn(
              "rounded-lg px-2.5 py-1 font-medium transition-colors cursor-pointer",
              selectedTrack === tr
                ? "bg-accent text-white font-semibold"
                : "bg-paper text-muted hover:text-ink",
            )}
          >
            {TRACKS[tr].short}
          </button>
        ))}
      </div>

      {/* Barra de progreso */}
      <div className="space-y-1">
        <div className="flex justify-between text-[11px] text-muted font-mono">
          <span>Tarjeta {i + 1} de {deck.length}</span>
          <span>{progressPct}% del mazo</span>
        </div>
        <Progress value={progressPct} />
      </div>

      {/* Tarjeta Interactiva con Giro */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setFlip((f) => !f)}
          className={cn(
            "flex min-h-64 w-full flex-col justify-between rounded-2xl border p-6 text-left transition-all duration-300 shadow-sm cursor-pointer select-none",
            flip
              ? "border-accent/60 bg-linear-to-br from-surface to-accent/5 ring-1 ring-accent/20"
              : "border-border bg-surface hover:border-accent/40",
          )}
        >
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Badge variant={flip ? "default" : "outline"} className="text-[10px] uppercase font-mono">
                  {flip ? "Respuesta / Doctrina" : "Pregunta / Norma"}
                </Badge>
                {card.track && (
                  <Badge variant="paper" className="text-[10px]">
                    {TRACKS[card.track]?.short || card.track}
                  </Badge>
                )}
              </div>

              <span className="flex items-center gap-1 text-[11px] text-muted font-mono">
                <RotateCw className="size-3" />
                Haz clic o Espacio para girar
              </span>
            </div>

            <p className="mt-5 font-display text-lg sm:text-xl font-semibold leading-relaxed text-ink">
              {flip ? card.back : card.front}
            </p>
          </div>

          <div className="mt-6 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted">
            <span className="font-mono text-[11px]">Módulo: {card.moduleId}</span>
            <span className="text-[11px]">{flip ? "✓ Toca para ver la pregunta" : "👁 Toca para ver la respuesta"}</span>
          </div>
        </button>

        {/* Botón flotante de voz sobre la tarjeta */}
        <button
          type="button"
          onClick={toggleSpeech}
          className={cn(
            "absolute bottom-4 right-4 flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs font-semibold backdrop-blur-md transition-all cursor-pointer",
            speaking
              ? "border-accent bg-accent text-white shadow-xs animate-pulse"
              : "border-border bg-surface/90 text-muted hover:border-accent hover:text-ink",
          )}
          title="Escuchar en voz alta"
        >
          {speaking ? (
            <>
              <Square className="size-3 fill-current" />
              <span className="text-[11px]">Detener</span>
            </>
          ) : (
            <>
              <Volume2 className="size-3 text-accent" />
              <span className="text-[11px]">Escuchar</span>
            </>
          )}
        </button>
      </div>

      {/* Controles de Navegación y Marcado */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => go(-1)} className="cursor-pointer gap-1.5">
            <ArrowLeft className="size-4" />
            Anterior
          </Button>
          <Button onClick={() => go(1)} className="cursor-pointer gap-1.5">
            Siguiente
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setLearned((prev) => ({ ...prev, [card.id]: !prev[card.id] }));
          }}
          className={cn(
            "gap-1.5 cursor-pointer",
            isCurrentLearned && "border-ok/40 text-ok bg-ok/10 hover:bg-ok/20",
          )}
        >
          <CheckCircle2 className="size-4" />
          <span>{isCurrentLearned ? "Memorizada ✓" : "Marcar aprendida"}</span>
        </Button>
      </div>

      <p className="text-center text-[11px] text-subtle">
        Atajos: <kbd className="rounded border bg-paper px-1 py-0.5">Espacio</kbd> gira la tarjeta ·{" "}
        <kbd className="rounded border bg-paper px-1 py-0.5">←</kbd>
        <kbd className="rounded border bg-paper px-1 py-0.5">→</kbd> navega entre fichas.
      </p>
    </div>
  );
}
