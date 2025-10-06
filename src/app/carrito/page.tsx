"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const items    = useCart((s) => s.items);
  const inc      = useCart((s) => s.inc);
  const dec      = useCart((s) => s.dec);
  const remove   = useCart((s) => s.remove);
  const clear    = useCart((s) => s.clear);
  const count    = useCart((s) => s.count());
  const subtotal = useCart((s) => s.subtotal());

  if (!items || items.length === 0) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <section className="card p-6 md:p-8 text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold title-grad">Tu carrito</h1>
          <p className="opacity-80">Aún no has agregado productos.</p>
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-brand-600 hover:bg-brand-500 active:translate-y-[1px] shadow-md hover:shadow-soft text-white"
          >
            Ir a productos
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <section className="card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold title-grad">Tu carrito</h1>

        <div className="mt-6 space-y-4">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="min-w-0">
                <p className="font-medium truncate">{product.name}</p>
                <p className="opacity-70 text-sm">${product.price.toLocaleString("es-CL")}</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => dec(product.id)} className="rounded-md border border-white/20 px-2 py-1 hover:bg-white/5">-</button>
                <span className="w-8 text-center">{qty}</span>
                <button onClick={() => inc(product.id)} className="rounded-md border border-white/20 px-2 py-1 hover:bg-white/5">+</button>
              </div>

              <div className="text-right min-w-[110px]">
                <p className="font-semibold">
                  ${(product.price * qty).toLocaleString("es-CL")}
                </p>
                <button onClick={() => remove(product.id)} className="text-xs opacity-70 hover:opacity-100">
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button onClick={clear} className="text-sm opacity-80 hover:opacity-100">
            Vaciar carrito
          </button>

          <div className="text-right">
            <p className="text-sm opacity-70">Unidades: {count}</p>
            <p className="text-lg font-semibold">
              Total: ${subtotal.toLocaleString("es-CL")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
