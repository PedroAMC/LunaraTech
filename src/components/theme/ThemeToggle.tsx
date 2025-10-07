// src/components/theme/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";

type Props = {
  /** versión más compacta (sin texto), ideal para el menú lateral */
  compact?: boolean;
};

export default function ThemeToggle({ compact }: Props) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // al montar, leemos la clase del <html> para no parpadear
  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  // aplica clase .dark al <html>
  function applyTheme(nextDark: boolean) {
    const root = document.documentElement;
    if (nextDark) root.classList.add("dark");
    else root.classList.remove("dark");
    setIsDark(nextDark);
    // opcional: persistimos
    try {
      localStorage.setItem("lunara-theme", nextDark ? "dark" : "light");
    } catch {}
  }

  // lee preferencia guardada / SO al cargar
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lunara-theme");
      if (saved === "dark") return applyTheme(true);
      if (saved === "light") return applyTheme(false);
    } catch {}
    // si no hay guardado, usamos media-query
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    // esqueleto para evitar salto visual
    return (
      <div
        aria-hidden
        className={`inline-flex items-center ${compact ? "h-8 w-14" : "h-9 w-[5.5rem]"} rounded-full bg-white/10`}
      />
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={() => applyTheme(!isDark)}
      className={[
        "inline-flex items-center rounded-full border transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-400)] focus-visible:ring-offset-2",
        compact ? "h-8 w-14" : "h-9 w-[5.5rem]",
      ].join(" ")}
      style={{ borderColor: "var(--surface-border)", background: "var(--surface)" }}
      title={isDark ? "Tema oscuro" : "Tema claro"}
    >
      {/* pista del switch */}
      <span
        className={[
          "relative mx-1 flex-1 h-6 rounded-full transition-colors",
          isDark ? "bg-[linear-gradient(90deg,#1e293b,#0b0f19)]" : "bg-[linear-gradient(90deg,#e5eefc,#ffffff)]",
        ].join(" ")}
      >
        {/* “thumb” que se desliza */}
        <span
          aria-hidden
          className={[
            "absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full shadow-md transition-transform",
            "border",
            isDark ? "translate-x-[2.1rem] bg-[#111827] border-white/20" : "translate-x-1 bg-white border-black/10",
          ].join(" ")}
        />
      </span>

      {/* label solo en versión no compacta */}
      {!compact && (
        <span className="px-2 text-sm opacity-90 select-none">
          {isDark ? "Oscuro" : "Claro"}
        </span>
      )}
    </button>
  );
}
