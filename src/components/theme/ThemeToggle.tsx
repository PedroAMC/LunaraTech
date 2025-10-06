"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === "light" ? "dark" : "light";

  return (
    <button
      onClick={() => setTheme(next)}
      className="rounded px-3 py-1.5 text-sm border border-black/20 bg-black/5 hover:bg-black/10
                 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
      aria-label="Cambiar tema"
      title="Cambiar tema"
    >
      {theme === "light" ? "🌙 Oscuro" : "🌞 Claro"}
    </button>
  );
}

