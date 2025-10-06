"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { products as DATA, type Product } from "@/lib/products";
import Link from "next/link";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const initialQ = params.get("q") ?? "";
  const [q, setQ] = useState(initialQ);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sugerencias (nombre o categoría que contenga el término)
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [] as Product[];
    return DATA.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    ).slice(0, 6);
  }, [q]);

  // Cerrar dropdown al click fuera
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#searchbox")) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const submit = (term?: string) => {
    const t = (term ?? q).trim();
    setOpen(false);
    setIdx(-1);
    if (!t) {
      router.push("/productos");
      return;
    }
    const sp = new URLSearchParams();
    sp.set("q", t);
    router.push(`/productos?${sp.toString()}`);
  };

  return (
    <div id="searchbox" className="relative w-full max-w-xl">
      <input
        ref={inputRef}
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => results.length && setOpen(true)}
        onKeyDown={(e) => {
          if (!open) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setIdx((i) => Math.min(i + 1, results.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setIdx((i) => Math.max(i - 1, -1));
          } else if (e.key === "Enter") {
            e.preventDefault();
            if (idx >= 0) submit(results[idx].name);
            else submit();
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        placeholder="Buscar productos…"
        className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 outline-none focus:border-brand-400"
      />

      {/* Dropdown de sugerencias */}
      {open && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-white/10 bg-[var(--bg-1)] backdrop-blur">
          <ul className="divide-y divide-white/5">
            {results.map((p, i) => (
              <li key={p.id} className={i === idx ? "bg-white/5" : ""}>
                <Link
                  href={`/producto/${p.slug}`}
                  onMouseEnter={() => setIdx(i)}
                  onMouseDown={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-white/5"
                >
                  <span className="text-sm">{p.name}</span>
                  <span className="ml-auto text-xs opacity-60">
                    ${p.price.toLocaleString("es-CL")}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onMouseDown={() => submit()}
                className="w-full px-3 py-2 text-left text-sm hover:bg-white/5"
              >
                Buscar “{q}”
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
