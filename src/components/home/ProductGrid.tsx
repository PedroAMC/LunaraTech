"use client";

import ProductCard from "@/components/home/ProductCard";
import { Product } from "@/lib/products";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

export default function ProductGrid({ products }: { products: Product[] }) {
  // Filtros internos
  const [filters, setFilters] = useState({
    category: "Todos",
    search: "",
    priceMin: 0,
    priceMax: 30000,
    sort: "none",
    inStock: false,
  });

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const filtered = useMemo(() => {
    return products
      .filter((p) =>
        filters.category === "Todos" ? true : p.category === filters.category
      )
      .filter((p) =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      )
      .filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax)
      .filter((p) => (filters.inStock ? p.stock > 0 : true))
      .sort((a, b) => {
        if (filters.sort === "asc") return a.price - b.price;
        if (filters.sort === "desc") return b.price - a.price;
        return 0;
      });
  }, [filters, products]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const current = filtered.slice(start, start + itemsPerPage);

  return (
    <section>
      {/* 🧾 Controles */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 flex-wrap">
        <p className="text-white/70 text-sm">
          Mostrando{" "}
          <span className="text-blue-400 font-semibold">{current.length}</span>{" "}
          de{" "}
          <span className="text-cyan-400 font-semibold">
            {filtered.length}
          </span>{" "}
          productos
        </p>

        <div className="flex items-center gap-2 bg-white/5 rounded-md px-3 py-2 border border-white/10 focus-within:border-blue-500/40 transition">
          <Search className="text-white/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
            className="bg-transparent w-48 sm:w-64 text-sm text-white placeholder-white/40 outline-none"
          />
        </div>
      </div>

      {/* 🧱 Grilla */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {current.map((product) => (
          <ProductCard key={product.id} p={product} />
        ))}
      </div>
    </section>
  );
}
