"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";

export default function CarritoPage() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const total = useCart((s) => s.total);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link href="/productos" className="underline">← Seguir comprando</Link>
      <h1 className="text-2xl font-semibold mt-2">Tu carrito</h1>

      {items.length === 0 ? (
        <p className="mt-4 opacity-80">Aún no tienes productos.</p>
      ) : (
        <>
          <ul className="mt-4 space-y-3">
            {items.map((i) => (
              <li key={i.id} className="flex items-center justify-between border rounded p-3">
                <div>
                  <div className="font-medium">{i.name}</div>
                  <div className="opacity-80">
                    {i.qty} × ${i.price.toLocaleString("es-CL")}
                  </div>
                </div>
                <button className="text-sm underline" onClick={() => remove(i.id)}>
                  Quitar
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-lg font-semibold">
              Total: ${total().toLocaleString("es-CL")}
            </div>
            <div className="space-x-3">
              <button className="underline" onClick={clear}>Vaciar</button>
              <button className="rounded bg-blue-600 px-4 py-2 text-white">Pagar</button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
