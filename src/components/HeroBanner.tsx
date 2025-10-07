// src/components/HeroBanner.tsx
"use client";

import Image from "next/image";

type Props = {
  title?: string;
  imgSrc?: string;
  href?: string;
  height?: number; // alto en px (desktop). Mobile se adapta.
};

/**
 * Banner de héroe simple, 1 imagen, full-bleed (ocupa todo el ancho de la ventana).
 * Si no hay imagen, muestra un gradiente de respaldo.
 */
export default function HeroBanner({
  title = "Kirby llega en 8K (guiño)",
  imgSrc = "/hero/placeholder.jpg",
  href,
  height = 360,
}: Props) {
  // contenedor full-bleed (truco del 100vw dentro de un wrapper centrado)
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
      <div
        className="relative w-full border-y border-white/10"
        style={{ minHeight: 220, height }}
      >
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 from-[#0b1223] via-[#0f172a] to-transparent bg-gradient-to-br" />
        )}

        {/* overlay sutil para legibilidad */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Título (opcional) */}
        <div className="absolute bottom-3 left-4 right-4 max-w-6xl mx-auto">
          <h2 className="text-lg md:text-xl font-semibold drop-shadow">
            {title}
          </h2>
        </div>

        {/* Paginación fantasma (1 solo slide) por ahora */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          <span className="h-1.5 w-4 rounded-full bg-white/60" />
        </div>

        {/* Click-through opcional */}
        {href && <a href={href} className="absolute inset-0" aria-label={title} />}
      </div>
    </section>
  );
}
