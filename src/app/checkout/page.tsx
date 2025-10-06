"use client";

import { useCart } from "@/store/cart";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 grid gap-6 md:grid-cols-2">
      <section className="card p-4">
        <h1 className="text-xl font-semibold mb-4">Datos del comprador</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Demo: acá iría el proceso con el proveedor de pagos.");
          }}
          className="space-y-3"
        >
          <div>
            <label className="block text-sm mb-1">Nombre y apellido</label>
            <input required className="w-full rounded border border-white/15 bg-black/30 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" required className="w-full rounded border border-white/15 bg-black/30 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Dirección</label>
            <input required className="w-full rounded border border-white/15 bg-black/30 px-3 py-2" />
          </div>
          <div className="pt-2">
            <button className="rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-500">
              Pagar (demo)
            </button>
          </div>
        </form>
        <p className="mt-3 text-sm text-white/70">
          *En producción integraríamos <b>Transbank</b>, <b>Mercado Pago</b> o <b>Stripe</b>.
        </p>
      </section>

      <aside className="card p-4">
        <h2 className="text-lg font-semibold mb-3">Resumen</h2>
        <ul className="divide-y divide-white/10 mb-3">
          {items.map(({ product: p, qty }) => (
            <li key={p.id} className="py-2 flex justify-between text-sm">
              <span>{p.name} × {qty}</span>
              <span>${(p.price * qty).toLocaleString("es-CL")}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-medium">
          <span>Subtotal</span>
          <span>${subtotal().toLocaleString("es-CL")}</span>
        </div>

        <div className="mt-4 flex justify-between text-sm">
          <Link href="/carrito" className="hover:underline text-white/80">Volver al carrito</Link>
          <button onClick={clear} className="hover:underline text-white/70">Vaciar</button>
        </div>
      </aside>
    </main>
  );
}
