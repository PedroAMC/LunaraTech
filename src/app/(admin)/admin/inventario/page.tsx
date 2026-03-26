"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Badge from "@/components/admin/Badge";
import type { Product } from "@/data/catalog-mock";
import {
  PRODUCTS as BASE,
  LOW_STOCK_THRESHOLD,
  calcStatus,
} from "@/data/catalog-mock";
import { getProducts, saveProducts } from "@/lib/localdb";

// Etiqueta visual según el estado de inventario
function StockBadge({ p }: { p: Product }) {
  const status = calcStatus(p.stock); // "ok" | "low" | "out"
  const kind = status === "ok" ? "green" : status === "low" ? "yellow" : "red";
  const label = status === "ok" ? "En stock" : status === "low" ? "Bajo stock" : "Sin stock";
  return <Badge kind={kind}>{label}</Badge>;
}

export default function InventarioPage() {
  // 1) SSR == primer render del cliente
  const [items, setItems] = useState<Product[]>(BASE);

  // 2) Sincronizo con LocalStorage al montar
  useEffect(() => {
    const fromLS = getProducts(); // si no hay LS, devuelve BASE
    setItems(fromLS);
  }, []);

  const updateStock = (id: string, delta: number) => {
    setItems(prev => {
      const next = prev.map(p =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      );
      saveProducts(next);
      return next;
    });
  };

  const rows = useMemo(() => items, [items]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Inventario</h1>

      <div className="overflow-x-auto rounded-xl border border-neutral-800">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-900 text-neutral-300">
            <tr>
              <th className="px-3 py-2 text-left">Producto</th>
              <th className="px-3 py-2 text-center">Stock</th>
              <th className="px-3 py-2 text-center">Estado</th>
              <th className="px-3 py-2 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-800">
            {rows.map((p) => (
              <tr key={p.id} className="hover:bg-neutral-900/50">
                <td className="px-3 py-2">
                  <Link className="underline hover:no-underline" href={`/admin/productos/${p.id}`}>
                    {p.name}
                  </Link>
                </td>

                <td className="px-3 py-2 text-center">{p.stock}</td>

                <td className="px-3 py-2 text-center">
                  <StockBadge p={p} />
                </td>

                <td className="px-3 py-2">
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => updateStock(p.id, +1)}
                      className="rounded-md px-2 py-1 bg-emerald-700 hover:bg-emerald-600"
                    >
                      +1
                    </button>
                    <button
                      type="button"
                      onClick={() => updateStock(p.id, -1)}
                      className="rounded-md px-2 py-1 bg-neutral-700 hover:bg-neutral-600"
                    >
                      -1
                    </button>
                    {/* Umbral visible solo como tooltip en el badge "Bajo stock" (no leyenda fija) */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
