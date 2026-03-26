// src/components/ui/SearchOverlay.tsx
"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Fondo global */}
      <div
        className="fixed inset-0 z-[55] bg-black/60 dark:bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Caja principal */}
      <div
        className="
          fixed top-14 left-1/2 -translate-x-1/2 z-[60]
          w-[90%] max-w-3xl
          rounded-xl backdrop-blur-xl
          border
          shadow-[0_18px_60px_rgba(0,0,0,0.32)]
          animate-slide-down

          bg-[var(--surface)]
          border-[var(--surface-border)]
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-3">
          <Search className="w-5 h-5 text-sky-500 dark:text-sky-400" />

          <input
            type="text"
            placeholder="Buscar productos, categorías o marcas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              flex-1 bg-transparent outline-none text-[var(--tx-0)]
              placeholder:text-[var(--tx-1)]
              text-lg
            "
            autoFocus
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[var(--tx-1)] hover:text-[var(--tx-0)] transition"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Sugerencias rápidas */}
        <div
          className="
            border-t px-5 py-3 flex flex-wrap gap-2
            border-[var(--surface-border)]
          "
        >
          {[
            "GPUs",
            "Teclados",
            "Monitores",
            "Periféricos",
            "Almacenamiento",
            "Cables",
            "Audio",
          ].map((item, i) => (
            <button
              key={i}
              className="
                px-3 py-1.5 rounded-full text-sm
                bg-[var(--surface-2)]
                text-[var(--tx-1)]
                border border-[var(--surface-border)]
                hover:bg-sky-500/10 hover:text-[var(--tx-0)]
                transition
              "
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Glow suave */}
      <div className="pointer-events-none fixed inset-0 z-[56]">
        <div
          className="
            absolute top-0 left-0 w-full h-full
            bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08)_0%,transparent_70%)]
          "
        />
      </div>
    </>
  );
}
