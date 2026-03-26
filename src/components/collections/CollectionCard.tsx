// src/components/collections/CollectionCard.tsx

import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/collections";
import { getImageUrl } from "@/lib/images";

interface Props {
  c: Collection;
}

export default function CollectionCard({ c }: Props) {
  // Si la colección tiene imagen propia, usamos esa; si no, usamos placeholder
  const imageKey =
    c.heroImageUrl && c.heroImageUrl !== ""
      ? c.heroImageUrl
      : "placeholders/hero-hardware.jpg";

  const imageSrc = getImageUrl(imageKey);

  return (
    <article
      className="group relative flex flex-col bg-[#0c1018] border border-white/8
                 hover:border-emerald-400/60 hover:shadow-[0_0_24px_rgba(16,185,129,0.35)]
                 transition-all duration-300 overflow-hidden"
    >
      {/* Imagen de la colección */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={c.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 768px) 400px, 100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Texto */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{c.name}</h3>

          {c.tagline && (
            <p className="text-xs text-emerald-300/80 mb-1 uppercase tracking-wide">
              {c.tagline}
            </p>
          )}

          {c.summary && (
            <p className="text-sm text-white/65 leading-relaxed line-clamp-3">
              {c.summary}
            </p>
          )}
        </div>

        <div className="mt-4">
          <Link
            href={`/colecciones/${c.slug}`}
            className="inline-flex items-center justify-center px-4 py-2 text-sm
                       border border-white/14 text-white/90
                       hover:border-emerald-400 hover:text-emerald-300
                       hover:bg-white/5 transition-colors"
          >
            Ver colección
          </Link>
        </div>
      </div>
    </article>
  );
}
