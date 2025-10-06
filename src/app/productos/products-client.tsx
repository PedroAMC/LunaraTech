"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { products as DATA, type Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CarouselRail from "@/components/CarouselRail";

type Cat = "todos" | "perifericos" | "accesorios" | "almacenamiento";
type Sort = "featured" | "price-asc" | "price-desc" | "name";

export default function ProductsClient() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl p-6">Cargando…</div>}>
      <ProductsClientContent />
    </Suspense>
  );
}

function ProductsClientContent() {
  const search = useSearchParams();
  const router = useRouter();

  const catFromUrl = (search.get("cat") as Cat) ?? "todos";
  const sortFromUrl = (search.get("sort") as Sort) ?? "featured";

  const [cat, setCat] = useState<Cat>(catFromUrl);
  const [sort, setSort] = useState<Sort>(sortFromUrl);

  // Sincroniza la URL solo cuando cambien cat/sort
  useEffect(() => {
    const params = new URLSearchParams();
    if (cat !== "todos") params.set("cat", cat);
    if (sort !== "featured") params.set("sort", sort);
    const q = params.toString();
    router.replace(q ? `/productos?${q}` : "/productos");
  }, [cat, sort, router]);

  // Base por categoría (const, no let)
  const base: Product[] = useMemo(
    () => (cat === "todos" ? DATA : DATA.filter((p) => p.category === cat)),
    [cat]
  );

  // Ordenamiento sin reasignar variables
  const filtered: Product[] = useMemo(() => {
    switch (sort) {
      case "price-asc":
        return [...base].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...base].sort((a, b) => b.price - a.price);
      case "name":
        return [...base].sort((a, b) => a.name.localeCompare(b.name));
      default:
        // Destacados arriba y, a empate, con stock primero
        return [...base].sort(
          (a, b) =>
            Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
            Number((b.stock ?? 0) > 0) - Number((a.stock ?? 0) > 0)
        );
    }
  }, [base, sort]);

  const featured = useMemo(() => DATA.filter((p) => Boolean(p.featured)), []);

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
          {(["todos", "perifericos", "accesorios", "almacenamiento"] as Cat[]).map(
            (c) => (
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
            )
          )}
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
        {filtered.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
