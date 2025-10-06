"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { products as DATA, type Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CarouselRail from "@/components/CarouselRail";

type Cat = "todos" | "perifericos" | "accesorios" | "almacenamiento";
type Sort = "featured" | "price-asc" | "price-desc" | "name";

export default function ProductsClient() {
  const search = useSearchParams();
  const router = useRouter();

  const qFromUrl = (search.get("q") ?? "").trim().toLowerCase();
  const catFromUrl = (search.get("cat") as Cat) ?? "todos";
  const sortFromUrl = (search.get("sort") as Sort) ?? "featured";

  const [cat, setCat] = useState<Cat>(catFromUrl);
  const [sort, setSort] = useState<Sort>(sortFromUrl);

  // Sincroniza cat/sort en la URL, preservando ?q= si existe
  useEffect(() => {
    const params = new URLSearchParams(search.toString());
    if (cat !== "todos") params.set("cat", cat);
    else params.delete("cat");

    if (sort !== "featured") params.set("sort", sort);
    else params.delete("sort");

    router.replace(params.size ? `/productos?${params}` : "/productos");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat, sort]);

  // Filtrado por categoría + término de búsqueda (q)
  const filtered = useMemo(() => {
    let arr: Product[] =
      cat === "todos" ? DATA : DATA.filter((p) => p.category === cat);

    if (qFromUrl) {
      arr = arr.filter(
        (p) =>
          p.name.toLowerCase().includes(qFromUrl) ||
          p.category.toLowerCase().includes(qFromUrl)
      );
    }

    switch (sort) {
      case "price-asc":
        arr = [...arr].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        arr = [...arr].sort((a, b) => b.price - a.price);
        break;
      case "name":
        arr = [...arr].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Destacados primero; a empate, con stock primero
        arr = [...arr].sort(
          (a, b) =>
            Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
            Number((b.stock ?? 0) > 0) - Number((a.stock ?? 0) > 0)
        );
    }
    return arr;
  }, [cat, sort, qFromUrl]);

  const featured = useMemo(() => DATA.filter((p) => Boolean(p.featured)), []);

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Carrusel sin título duplicado */}
      <div className="mt-4 mb-8">
        <CarouselRail items={featured} />
      </div>

      {/* Filtros / Orden */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
            className="rounded border border-white/15 bg-black/40 px-2 py-1"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio (menor a mayor)</option>
            <option value="price-desc">Precio (mayor a menor)</option>
            <option value="name">Nombre (A-Z)</option>
          </select>
        </label>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
