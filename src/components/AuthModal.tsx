"use client";

import { useEffect } from "react";
import { useUI } from "@/store/ui";

export default function AuthModal() {
  const { authOpen, setAuthOpen } = useUI();

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setAuthOpen(false);
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [setAuthOpen]);

  if (!authOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
      onClick={() => setAuthOpen(false)}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[var(--bg-1)] p-6 shadow-xl backdrop-blur"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">Iniciar sesión / Registrarte</h3>
          <button
            onClick={() => setAuthOpen(false)}
            className="rounded-md border border-white/15 px-2 py-1 hover:bg-white/5"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className="space-y-3">
            <h4 className="text-sm opacity-70">Iniciar sesión</h4>
            <label className="block text-sm opacity-80">Email</label>
            <input className="w-full rounded-md border border-white/15 bg-transparent px-3 py-2" />

            <label className="block text-sm opacity-80">Contraseña</label>
            <input
              type="password"
              className="w-full rounded-md border border-white/15 bg-transparent px-3 py-2"
            />

            <button className="mt-2 w-full rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-500">
              Entrar
            </button>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm opacity-70">Crear cuenta</h4>
            <label className="block text-sm opacity-80">Nombre</label>
            <input className="w-full rounded-md border border-white/15 bg-transparent px-3 py-2" />

            <label className="block text-sm opacity-80">Email</label>
            <input className="w-full rounded-md border border-white/15 bg-transparent px-3 py-2" />

            <label className="block text-sm opacity-80">Contraseña</label>
            <input
              type="password"
              className="w-full rounded-md border border-white/15 bg-transparent px-3 py-2"
            />

            <button className="mt-2 w-full rounded-lg bg-white/10 px-4 py-2 hover:bg-white/15">
              Registrarme
            </button>
          </section>
        </div>

        <p className="mt-4 text-center text-xs opacity-60">
          Más adelante conectamos esto a la base de datos (auth real).
        </p>
      </div>
    </div>
  );
}
