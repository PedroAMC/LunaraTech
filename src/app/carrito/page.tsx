"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const { items, updateQuantity, remove, subtotal, totalItems } = useCart();
  const [removing, setRemoving] = useState<number | null>(null);

  const isEmpty = !items || items.length === 0;

  return (
    <main className="min-h-[90vh] bg-gradient-to-br from-[#0a0a0e] via-[#0f1116] to-[#151820] text-white py-20 px-6">
      <section className="max-w-6xl mx-auto">

        {/* TITULO */}
        <h1 className="text-4xl font-extrabold tracking-wide text-center mb-14 drop-shadow-[0_0_12px_rgba(0,150,255,0.3)] animate-fade-slide">
          CARRITO
        </h1>

        {/* 🛒 Carrito vacío */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center text-center mt-28 animate-fade-slide">
            <div className="w-28 h-28 mb-6 bg-gradient-to-br from-cyan-500/20 to-blue-700/20 flex items-center justify-center shadow-[0_0_30px_rgba(0,200,255,0.2)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="rgb(56,189,248)"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386a.75.75 0 01.727.574l1.176 4.702M7.5 13.5h11.25a.75.75 0 00.727-.574l2.25-9A.75.75 0 0020.977 3H4.364M7.5 13.5L6 18.75m1.5-5.25L9 18.75m-3 0A.75.75 0 006.75 19.5h10.5a.75.75 0 00.75-.75m-12 0a.75.75 0 01-.75-.75m12.75.75l1.5-5.25m-1.5 5.25L15 18.75"
                />
              </svg>
            </div>

            <p className="text-white/70 text-lg">Tu carrito está vacío.</p>
            <p className="text-white/40 text-sm mb-6">
              Cuando agregues productos, aparecerán aquí.
            </p>

            <Link
              href="/productos"
              className="px-6 py-3 font-semibold bg-[#0aaacb] hover:bg-[#11c7ef] text-black transition-all border border-cyan-400/40 shadow-[0_0_15px_rgba(0,200,255,0.25)] btn-pop"
            >
              Ir a productos
            </Link>
          </div>
        )}

        {/* 🟩 Carrito con productos */}
        {!isEmpty && (
          <div className="grid md:grid-cols-3 gap-10 animate-fade-slide">

            {/* 🛒 LISTA PRODUCTOS */}
            <div className="md:col-span-2 space-y-6">
              {items.map((item) => {
                if (!item) return null;
                const price = typeof item.price === "number" ? item.price : 0;

                const isRemoving = removing === item.id;

                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-6 bg-[#0d1117] border border-white/10 p-5 shadow-[0_0_20px_rgba(0,0,0,0.35)] hover:border-cyan-400/40 transition-all glow-hover ${isRemoving ? "collapse" : "animate-fade-slide"}`}
                  >
                    {/* IMAGEN */}
                    <div className="w-28 h-28 bg-black/30 flex items-center justify-center overflow-hidden border border-white/10">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={120}
                          height={120}
                          className="object-contain float-img"
                        />
                      ) : (
                        <span className="text-gray-500 text-xs">SIN IMAGEN</span>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-white tracking-wide">
                        {item.name ?? "Producto"}
                      </h3>

                      <p className="text-gray-300 text-sm mb-3">
                        ${price.toLocaleString("es-CL")}
                      </p>

                      {/* CONTROLES */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 py-1 bg-[#151921] border border-white/10 hover:bg-[#1d222b] transition text-white btn-pop"
                        >
                          −
                        </button>

                        <span className="text-white font-semibold text-lg">
                          {item.quantity ?? 1}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, +1)}
                          className="px-3 py-1 bg-[#151921] border border-white/10 hover:bg-[#1d222b] transition text-white btn-pop"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* ELIMINAR */}
                    <button
                      onClick={() => {
                        setRemoving(item.id);
                        setTimeout(() => remove(item.id), 350);
                      }}
                      className="text-red-400 hover:text-red-300 text-sm font-medium btn-pop"
                    >
                      Eliminar
                    </button>
                  </div>
                );
              })}
            </div>

            {/* 🧾 RESUMEN */}
            <div className="bg-[#0c0f14]/70 border border-white/10 p-6 shadow-[0_0_15px_rgba(0,0,0,0.4)] backdrop-blur-sm h-fit sticky top-24 animate-fade-slide">
              <h2 className="text-xl font-semibold mb-4 text-cyan-300 tracking-wide">
                Resumen de compra
              </h2>

              <div className="flex justify-between text-white/70 mb-2">
                <span>Productos</span>
                <span>{totalItems()} ítem(s)</span>
              </div>

              <div className="flex justify-between text-white/70 mb-2">
                <span>Subtotal</span>
                <span>${subtotal().toLocaleString("es-CL")}</span>
              </div>

              <div className="flex justify-between text-white/70 mb-1">
                <span>Envío</span>
                <span>$0</span>
              </div>

              <hr className="border-white/10 my-4" />

              <div className="flex justify-between text-white text-lg font-bold">
                <span>Total</span>
                <span>${subtotal().toLocaleString("es-CL")}</span>
              </div>

              <button
                className="mt-6 w-full py-3 bg-gradient-to-r from-[#0aaacb] to-[#0046ff] hover:brightness-110 text-white font-semibold tracking-wide border border-cyan-400/20 shadow-[0_0_15px_rgba(0,200,255,0.25)] transition-all btn-pop"
              >
                Continuar compra
              </button>
            </div>

          </div>
        )}

      </section>
    </main>
  );
}
