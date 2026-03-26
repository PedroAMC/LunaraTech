// src/components/home/NewArrivals.tsx
"use client";

import Link from "next/link";
import ProductCarousel from "./ProductCarousel";

const MOCK_ITEMS = [
  { id: "p1", name: "Cable HDMI 2.1 2m", price: 9990, rating: 4 },
  { id: "p2", name: "Ventilador 120mm ARGB", price: 7990, rating: 5 },
  { id: "p3", name: "Mouse Gamer 6K DPI", price: 15990, rating: 4 },
  { id: "p4", name: "Teclado Mecánico TKL", price: 34990, rating: 5 },
  { id: "p5", name: "SSD NVMe 1TB Gen4", price: 89990, rating: 5 },
];

export default function NewArrivals() {
  return (
    <section
      className="
        w-full 
        pt-16 pb-32

        /* ☀️ MODO CLARO */
        bg-slate-100 text-slate-900

        /* 🌙 MODO OSCURO */
        dark:bg-black dark:text-white
      "
    >
      <div className="max-w-[112rem] mx-auto px-6 lg:px-10">
        {/* TÍTULO */}
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <p
              className="
                text-[10px] font-semibold tracking-[0.16em] uppercase

                /* claro */
                text-sky-600

                /* oscuro */
                dark:text-cyan-300
              "
            >
              NEW ARRIVALS
            </p>

            <h2
              className="
                mt-1 text-3xl sm:text-4xl font-bold

                /* claro */
                text-slate-900

                /* oscuro */
                dark:text-white
              "
            >
              Novedades
            </h2>

            <p
              className="
                mt-1 text-sm

                /* claro */
                text-slate-600

                /* oscuro */
                dark:text-neutral-300
              "
            >
              Lo último en llegar a LunaraTech, listo para despachar.
            </p>
          </div>

          {/* BOTÓN */}
          <Link
            href="/productos?sort=new"
            className="
              group inline-flex items-center rounded-full px-4 py-2 text-[11px] font-semibold tracking-wide border transition

              /* claro */
              border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white

              /* oscuro */
              dark:border-cyan-400/70 dark:text-cyan-200
              dark:hover:bg-cyan-400 dark:hover:text-black
            "
          >
            View all new arrivals
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* CARRUSEL */}
        <div className="mt-10">
          <ProductCarousel items={MOCK_ITEMS} />
        </div>
      </div>
    </section>
  );
}
