"use client";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === "light" ? "dark" : "light";

  return (
    <button
      onClick={() => setTheme(next)}
      className="rounded px-3 py-1 text-sm border border-white/10 hover:bg-white/5"
      aria-label="Cambiar tema"
      title="Cambiar tema"
    >
      {theme === "light" ? "🌙 Oscuro" : "☀️ Claro"}
    </button>
  );
}
