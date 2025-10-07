// src/components/SearchBar.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/lib/products";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [q, setQ] = useState(initial);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const suggestions = useMemo(() => {
    if (!q.trim()) return [];
    const needle = q.toLowerCase();
    return products
      .filter(p => p.name.toLowerCase().includes(needle))
      .slice(0, 6);
  }, [q]);

  function submit(v?: string) {
    const term = (v ?? q).trim();
    const usp = new URLSearchParams(params.toString());
    if (term) usp.set("q", term); else usp.delete("q");
    router.push(`/productos?${usp.toString()}`);
    setOpen(false);
  }

  return (
    <div ref={wrapRef} className="relative">
      <div
        className={[
          "group relative mx-auto flex items-center rounded-xl border border-white/15 bg-white/5 transition-all",
          // contraído -> expandido
          "w-44 sm:w-64 focus-within:w-[28rem] max-w-full",
        ].join(" ")}
      >
        {/* Lupa */}
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            inputRef.current?.focus();
          }}
          className="pl-3 pr-2 text-white/70 hover:text-white"
          aria-label="Buscar"
        >
          🔍
        </button>

        <input
          ref={inputRef}
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
          placeholder="Buscar productos…"
          className="w-full bg-transparent px-2 py-2 outline-none placeholder:text-white/50"
          aria-label="Buscar productos"
        />

        {/* botón enviar (oculto visual, útil para accesibilidad) */}
        <button
          type="button"
          onClick={() => submit()}
          className="sr-only"
          aria-hidden={!q}
        >
          Buscar
        </button>
      </div>

      {/* Sugerencias */}
      {open && suggestions.length > 0 && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-950/90 backdrop-blur shadow-2xl">
          <ul className="divide-y divide-white/5">
            {suggestions.map(s => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => submit(s.name)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-white/5"
                >
                  <span className="truncate">{s.name}</span>
                  <span className="text-sm opacity-70">
                    {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(s.price)}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between gap-2 px-3 py-2 text-sm">
            <button
              className="rounded-md border border-white/10 px-2 py-1 hover:bg-white/5"
              onClick={() => submit()}
            >
              Explorar productos
            </button>
            <a href="/carrito" className="rounded-md border border-white/10 px-2 py-1 hover:bg-white/5">
              Ver carrito
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
