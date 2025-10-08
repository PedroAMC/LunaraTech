"use client";

import { useEffect, useState } from "react";

type Props = {
  /** tamaño más compacto para el menú */
  compact?: boolean;
  /** clases extra del contenedor externo */
  className?: string;
};

export default function ThemeToggle({ compact, className }: Props) {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initial = document.documentElement.classList.contains("dark");
    setDark(initial);
  }, []);

  function toggle() {
    const html = document.documentElement;
    const next = !dark;
    setDark(next);
    html.classList.toggle("dark", next);
    // persiste si usas localStorage
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  const h = compact ? "h-6" : "h-7";
  const w = compact ? "w-11" : "w-12";
  const knob = compact ? "h-5 w-5" : "h-6 w-6";

  if (!mounted) return (
    <div className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <button
        aria-label="Cambiar tema"
        className={`relative ${w} ${h} rounded-full bg-white/10 border border-white/15`}
      />
    </div>
  );

  return (
    <div className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      {/* Etiqueta a la izquierda (no arriba) */}
      <span className="text-sm select-none opacity-80">{dark ? "Oscuro" : "Claro"}</span>

      {/* Switch */}
      <button
        type="button"
        onClick={toggle}
        aria-pressed={dark}
        aria-label="Cambiar tema claro/oscuro"
        className={[
          "relative rounded-full border transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
          w, h,
          dark ? "bg-white/20 border-white/20" : "bg-white/10 border-white/15"
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1/2 -translate-y-1/2 rounded-full transition-all",
            "bg-white shadow",
            knob,
            dark ? "right-1" : "left-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}
