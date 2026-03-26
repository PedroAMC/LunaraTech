// src/components/home/ProductCarousel.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  rating?: number;
};

type Props = {
  items: Product[];
};

export default function ProductCarousel({ items }: Props) {
  const VISIBLE = 4;
  const [index, setIndex] = useState(0);

  const maxIndex = Math.max(0, items.length - VISIBLE);

  const clamp = (v: number) => Math.max(0, Math.min(v, maxIndex));
  const prev = () => setIndex((i) => clamp(i - 1));
  const next = () => setIndex((i) => clamp(i + 1));

  return (
    <div className="relative w-full pb-14">

      {/* CARRUSEL */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${index * (100 / VISIBLE)}%)`,
          }}
        >
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/producto/${item.id}`}
              className="w-[25%] shrink-0 px-0.5 group"
            >
              <div className="flex flex-col items-center text-center">

                {/* Imagen flotante */}
                <div className="w-full h-36 flex items-center justify-center bg-[#050910]">
                  {item.image ? (
                    <img
                      src={item.image}
                      className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      alt={item.name}
                    />
                  ) : (
                    <div className="h-full w-full bg-[#050910]" />
                  )}
                </div>

                {/* Rating */}
                <div className="mt-2 flex justify-center gap-0.5">
                  {Array.from({
                    length: Math.round(item.rating ?? 4.5),
                  }).map((_, i) => (
                    <span key={i} className="text-cyan-300 text-xs">★</span>
                  ))}
                </div>

                {/* Nombre */}
                <p className="mt-2 text-sm text-white line-clamp-2">
                  {item.name}
                </p>

                {/* Precio */}
                <p className="mt-1 text-sm font-semibold text-cyan-300">
                  ${item.price.toLocaleString("es-CL")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FLECHAS DEBAJO, ÚNICAS */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-center gap-3">
        <button
          onClick={prev}
          disabled={index === 0}
          className={`h-10 w-10 flex items-center justify-center border border-white/15 bg-black/70 hover:bg-black hover:border-cyan-400/70 transition 
            ${index === 0 ? "opacity-30 cursor-default" : ""}`}
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>

        <button
          onClick={next}
          disabled={index === maxIndex}
          className={`h-10 w-10 flex items-center justify-center border border-white/15 bg-black/70 hover:bg-black hover:border-cyan-400/70 transition 
            ${index === maxIndex ? "opacity-30 cursor-default" : ""}`}
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
}
