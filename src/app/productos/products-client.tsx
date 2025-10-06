"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { products as DATA, type Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CarouselRail from "@/components/CarouselRail";

type Cat = "todos" | "perifericos" | "accesorios" | "almacenamiento";
type Sort = "featured" | "price-asc" | "price-desc" | "name";

export default function ProductsClient() {
  const search = useSearchParams();
  const router = useRouter();

  const catFromUrl = (search.get("cat") as Cat) ?? "todos";
  const sortFromUrl = (search.get("sort") as Sort) ?? "featured";

  const [cat, setCat] = useState<Cat>(catFromUrl);
  const [sort, setSort] = useState<Sort>(sortFromUrl);

  // Sincroniza la URL solo cuando realmente cambia
  useEffect(() => {
    const params = new URLSearchParams();
    if (cat !== "todos") params.set("cat", cat);
    if (sort !== "featured") params.set("sort", sort);
    const next = params.toString() ? `/productos?${params.toString()}` : "/productos";
    // Evita reemplazar si ya estamos en la misma URL
    const current = window.location.pathname + window.location.search;
    if (current !== next) router.replace(next);
  }, [cat, sort, router]);

  const filtered = useMemo(() => {
    let arr: Product[] = cat === "todos" ? DATA : DATA.filter(p => p.category === cat);

    switch (sort) {
      case "price-asc":
        return [...arr].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...arr].sort((a, b) => b.price - a.price);
      case "name":
        return [...arr].sort((a, b) => a.name.localeCompare(b.name));
      default:
        // Destacados arriba y, a empate, con stock primero
        return [...arr].sort(
          (a, b) =>
            Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
            Number((b.stock ?? 0) > 0) - Number((a.stock ?? 0) > 0)
        );
    }
  }, [cat, sort]);

  const featured = useMemo(() => DATA.filter(p => Boolean(p.featured)), []);

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Carrusel tipo vitrina */}
      <div className="mt-4 mb-8">
        <h2 className="mb-3 text-lg font-medium opacity-80">Destacados</h2>
        <CarouselRail items={featured} />
      </div>

      {/* Filtros / Orden */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-2">
          {(["todos", "perifericos", "accesorios", "almacenamiento"] as Cat[]).map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-md border ${
                cat === c
                  ? "bg-brand-600 border-brand-500"
                  : "border-white/15 bg-white/5 hover:bg-white/10"
              }`}
            >
              {c === "todos" ? "Todos" : c[0].toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm">
          Ordenar:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="bg-black/40 border border-white/15 rounded px-2 py-1"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio (menor a mayor)</option>
            <option value="price-desc">Precio (mayor a menor)</option>
            <option value="name">Nombre (A-Z)</option>
          </select>
        </label>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-4">
        {filtered.map(p => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
