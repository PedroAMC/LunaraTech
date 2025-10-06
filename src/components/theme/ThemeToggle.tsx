"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita desajustes de hidratación: solo mostramos el botón en cliente
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const next = theme === "light" ? "dark" : "light";
  const label = theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="rounded px-3 py-1 text-sm border border-white/10 hover:bg-white/5"
      aria-label={label}
      title={label}
    >
      {theme === "light" ? "🌙 Oscuro" : "🌞 Claro"}
    </button>
  );
}
