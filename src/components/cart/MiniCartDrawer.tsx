"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/cart";

export default function MiniCartDrawer() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // ← FIX HIDRATION

  const { items, subtotal, totalItems, updateQuantity, remove } = useCart();

  // ⚠️ Evita el hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const count = mounted ? totalItems() : 0;
  const isEmpty = mounted ? items.length === 0 : true;

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const subtotalValue = mounted ? subtotal() : 0;

  return (
    <>
      {/* BOTÓN DEL NAVBAR (icono de carrito) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center justify-center rounded-full
                   p-2 hover:bg-white/5 transition"
        aria-label="Abrir carrito"
      >
        {/* Icono */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.5l2.1 12.6a1 1 0 0 0 .99.84h11.42a1 1 0 0 0 .98-.8l1.46-7.3H7.5"
          />
          <circle cx="10" cy="19.5" r="1" />
          <circle cx="17" cy="19.5" r="1" />
        </svg>

        {/* BADGE — ahora solo aparece en cliente */}
        {mounted && count > 0 && (
          <span
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1
                       bg-gradient-to-r from-cyan-500 to-blue-600
                       text-[11px] leading-[18px] text-white text-center
                       rounded-full font-semibold shadow-[0_0_10px_rgba(0,200,255,0.6)]"
          >
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {/* OVERLAY + PANEL */}
      {open && (
        <div
          className="fixed inset-0 z-[80]
                     flex sm:justify-end sm:items-stretch
                     justify-center items-end
                     bg-black/55 backdrop-blur-[14px]"
          onClick={() => setOpen(false)}
        >
          {/* Panel */}
          <div
            className="w-full sm:max-w-xl md:max-w-3xl
                       h-[82vh] sm:h-full
                       bg-[#05070c] border-l border-white/10
                       shadow-[0_0_40px_rgba(0,0,0,0.75)]
                       sm:rounded-none rounded-t-2xl
                       flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <header className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div>
                <h2 className="text-lg font-semibold tracking-wide">
                  Tu carrito
                </h2>
                <p className="text-xs text-white/50">
                  {count === 0
                    ? "Aún no has agregado productos."
                    : `${count} ítem${count === 1 ? "" : "s"} en tu carrito`}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/5 text-white/70 hover:text-white transition"
                aria-label="Cerrar carrito"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l12 12M18 6L6 18"
                  />
                </svg>
              </button>
            </header>

            {/* CONTENIDO */}
            <div className="flex-1 px-5 py-4 overflow-hidden">
              {!mounted ? null : isEmpty ? (
                // 🔹 Empty state
                <div className="h-full flex flex-col items-center justify-center text-center gap-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/15 to-blue-600/15 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-9 h-9"
                      fill="none"
                      stroke="rgb(56,189,248)"
                      strokeWidth="1.6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.5l2.1 12.6a1 1 0 0 0 .99.84h11.42a1 1 0 0 0 .98-.8l1.46-7.3H7.5"
                      />
                      <circle cx="10" cy="19.5" r="1" />
                      <circle cx="17" cy="19.5" r="1" />
                    </svg>
                  </div>
                  <p className="text-white/75 text-sm">
                    Tu carrito está vacío.
                  </p>
                  <p className="text-white/40 text-xs mb-2">
                    Explora el catálogo y agrega lo que quieras.
                  </p>
                  <Link
                    href="/productos"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 text-sm font-semibold
                               bg-gradient-to-r from-cyan-500 to-blue-600
                               hover:from-cyan-400 hover:to-blue-500
                               rounded-md shadow-[0_0_14px_rgba(0,200,255,0.35)]
                               transition"
                  >
                    Ver productos
                  </Link>
                </div>
              ) : (
                // 🔹 Productos + resumen
                <div className="h-full grid md:grid-cols-[minmax(0,2.1fr)_minmax(0,1.3fr)] gap-5">
                  {/* Lista */}
                  <div className="space-y-4 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4
                                   bg-white/5 border border-white/10
                                   p-4 rounded-lg"
                      >
                        {/* Imagen */}
                        <div className="w-20 h-20 bg-black/30 rounded-md overflow-hidden flex items-center justify-center">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="object-contain"
                            />
                          ) : (
                            <span className="text-[10px] text-gray-500">SIN IMAGEN</span>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-white/50 mb-1">
                            ${item.price.toLocaleString("es-CL")}
                          </p>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center
                                         text-sm rounded-md bg-white/10 hover:bg-white/20 transition"
                            >
                              −
                            </button>

                            <span className="text-sm font-semibold">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, +1)}
                              className="w-7 h-7 flex items-center justify-center
                                         text-sm rounded-md bg-white/10 hover:bg-white/20 transition"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Eliminar */}
                        <button
                          type="button"
                          onClick={() => remove(item.id)}
                          className="text-[11px] text-rose-400 hover:text-rose-300 ml-1"
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Resumen */}
                  <aside className="bg-white/5 border border-white/12 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-cyan-300 mb-3">
                      Resumen rápido
                    </h3>

                    <div className="flex justify-between text-xs text-white/65 mb-1">
                      <span>Productos</span>
                      <span>{count}</span>
                    </div>

                    <div className="flex justify-between text-xs text-white/65 mb-1">
                      <span>Subtotal</span>
                      <span>${subtotalValue.toLocaleString("es-CL")}</span>
                    </div>

                    <div className="flex justify-between text-xs text-white/65">
                      <span>Envío</span>
                      <span>$0</span>
                    </div>

                    <hr className="border-white/10 my-3" />

                    <div className="flex justify-between text-sm font-semibold">
                      <span>Total</span>
                      <span>${subtotalValue.toLocaleString("es-CL")}</span>
                    </div>

                    <button
                      type="button"
                      className="mt-4 w-full py-2 text-sm font-semibold
                                 bg-gradient-to-r from-cyan-500 to-blue-600
                                 hover:from-cyan-400 hover:to-blue-500
                                 rounded-md shadow-[0_0_16px_rgba(0,200,255,0.35)]
                                 transition"
                    >
                      Continuar compra
                    </button>

                    <Link
                      href="/carrito"
                      onClick={() => setOpen(false)}
                      className="block w-full text-center text-xs text-white/60 hover:text-white mt-2 underline underline-offset-4"
                    >
                      Ver carrito completo
                    </Link>
                  </aside>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
