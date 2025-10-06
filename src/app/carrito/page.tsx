"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const { items, inc, dec, remove, clear, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Tu carrito</h1>
        <p className="mb-6 text-white/80">No tienes productos.</p>
        <Link href="/productos" className="rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-500">
          Ir a productos
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Tu carrito</h1>

      <section className="card p-4">
        <ul className="divide-y divide-white/10">
          {items.map(({ product: p, qty }) => (
            <li key={p.id} className="py-3 grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-3">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-white/70">${p.price.toLocaleString("es-CL")}</div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => dec(p.id)} className="rounded px-2 py-1 border border-white/15 hover:bg-white/10">–</button>
                <span className="w-8 text-center">{qty}</span>
                <button onClick={() => inc(p.id)} className="rounded px-2 py-1 border border-white/15 hover:bg-white/10">+</button>
              </div>

              <div className="text-right">${(p.price * qty).toLocaleString("es-CL")}</div>

              <button onClick={() => remove(p.id)} className="text-sm text-rose-400 hover:underline">Eliminar</button>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between">
          <button onClick={clear} className="text-sm text-white/70 hover:underline">
            Vaciar carrito
          </button>
          <div className="text-lg font-medium">
            Subtotal: ${subtotal().toLocaleString("es-CL")}
          </div>
        </div>

        <div className="mt-4 text-right">
          <Link href="/checkout" className="inline-flex rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-500">
            Continuar al pago
          </Link>
        </div>
      </section>
    </main>
  );
}
