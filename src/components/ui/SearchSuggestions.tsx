// src/components/ui/SearchSuggestions.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Search, ChevronRight, Star } from "lucide-react";

type Suggestion = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string | null;
  description?: string | null;
};

type Props = {
  query: string;
  onResultClick?: () => void;
};

function formatPriceCLP(value: number) {
  try {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `$${value}`;
  }
}

export default function SearchSuggestions({ query, onResultClick }: Props) {
  const [results, setResults] = useState<Suggestion[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query.trim();

    if (!q || q.length < 2) {
      setResults([]);
      setTotal(0);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Error HTTP en búsqueda");

        const data = await res.json();

        if (!data.ok) throw new Error(data.error ?? "Error");

        setResults(data.results ?? []);
        setTotal(typeof data.total === "number" ? data.total : 0);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        setError("No se pudo cargar la búsqueda");
      } finally {
        setLoading(false);
      }
    }, 220);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return null;

  const handleClick = () => onResultClick?.();

  return (
    <div
      className="
        absolute left-0 top-[calc(100%+0.45rem)] w-full z-40
        rounded-xl overflow-hidden backdrop-blur-xl

        bg-[var(--surface)]
        border border-[var(--surface-border)]
        shadow-[0_18px_50px_rgba(0,0,0,0.35)]
      "
    >
      {/* HEADER */}
      <div
        className="
          flex items-center justify-between px-4 py-2
          border-b border-[var(--surface-border)]
          text-[var(--tx-1)]
        "
      >
        <div className="flex items-center gap-2 text-xs">
          <Search className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
          Resultados para{" "}
          <span className="text-sky-600 dark:text-sky-300">“{trimmed}”</span>
        </div>

        {loading && (
          <div className="flex items-center gap-1 text-[11px] text-[var(--tx-1)]">
            <Loader2 className="w-3 h-3 animate-spin" />
            Buscando...
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="max-h-[24rem] overflow-y-auto">
        {error && (
          <div className="px-4 py-3 text-sm text-red-600 dark:text-red-300">
            {error}
          </div>
        )}

        {!error && !loading && results.length === 0 && (
          <div className="px-4 py-3 text-sm text-[var(--tx-1)]">
            No se encontraron productos.
          </div>
        )}

        {results.map((item) => (
          <Link
            key={item.id}
            href={`/productos/${item.slug}`}
            onClick={handleClick}
            className="
              flex items-stretch gap-3 px-4 py-3 text-sm
              hover:bg-[var(--surface-2)] transition group
            "
          >
            {/* Imagen */}
            <div
              className="
                relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0
                bg-[var(--surface-2)]
                border border-[var(--surface-border)]
              "
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              ) : (
                <span className="text-xs text-[var(--tx-1)] flex items-center justify-center h-full">
                  No img
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex items-center justify-between gap-3">
                <p
                  className="
                    font-medium truncate text-[var(--tx-0)]
                    group-hover:text-sky-600 dark:group-hover:text-sky-300
                  "
                >
                  {item.name}
                </p>

                <span className="text-xs font-semibold text-sky-600 dark:text-sky-300 whitespace-nowrap">
                  {formatPriceCLP(item.price)}
                </span>
              </div>

              {item.description && (
                <p className="mt-0.5 text-xs text-[var(--tx-1)] line-clamp-2">
                  {item.description}
                </p>
              )}

              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[var(--tx-1)]">
                <div className="flex items-center gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-3 h-3" strokeWidth={1.4} />
                  ))}
                </div>
                <span>Sin reseñas aún</span>
              </div>
            </div>

            {/* Flecha */}
            <ChevronRight
              className="
                w-4 h-4 self-center text-[var(--tx-1)]
                group-hover:text-sky-600 dark:group-hover:text-sky-300 transition
              "
            />
          </Link>
        ))}
      </div>

      {/* FOOTER: VER MÁS */}
      {total > results.length && (
        <Link
          href={`/productos?search=${encodeURIComponent(trimmed)}`}
          onClick={handleClick}
          className="
            flex items-center justify-between px-4 py-2.5 text-xs
            border-t border-[var(--surface-border)]
            bg-[var(--surface-2)] hover:bg-sky-500/10
            text-sky-600 dark:text-sky-300
          "
        >
          <span>
            Ver todos los resultados{" "}
            <span className="font-semibold">({total})</span>
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}
