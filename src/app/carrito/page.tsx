// src/app/carrito/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";
import Link from "next/link";

export default function CartPage() {
  const [ready, setReady] = useState(false);

  // Espera un tick en el navegador para asegurar localStorage/hidratación
  useEffect(() => setReady(true), []);

  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal);

  if (!ready) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <p className="opacity-70">Cargando carrito…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-semibold title-grad">Carrito</h1>

      {items.length === 0 ? (
        <div className="mt-6 space-y-3">
          <p className="opacity-80">Tu carrito está vacío.</p>
          <Link href="/productos" className="text-brand-400 underline">
            Ir a productos
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex items-center justify-between rounded-lg border px-4 py-3"
                 style={{ borderColor: "var(--surface-border)" }}>
              <div className="min-w-0">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm opacity-70">
                  {qty} × ${product.price.toLocaleString("es-CL")}
                </p>
              </div>
              <p className="shrink-0 font-semibold">
                ${(product.price * qty).toLocaleString("es-CL")}
              </p>
            </div>
          ))}

          <div className="flex items-center justify-between border-t pt-4"
               style={{ borderColor: "var(--surface-border)" }}>
            <p className="text-lg font-semibold">Subtotal</p>
            <p className="text-lg font-semibold">
              ${subtotal().toLocaleString("es-CL")}
            </p>
          </div>

          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-500"
          >
            Ir a pagar
          </Link>
        </div>
      )}
    </main>
  );
}
