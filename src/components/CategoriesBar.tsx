// src/components/CategoriesBar.tsx
"use client";

import Link from "next/link";

type Cat = {
  key: string;
  label: string;
  emoji: string; // placeholder de icono hasta que metas SVGs
};

const CATS: Cat[] = [
  { key: "perifericos",   label: "Periféricos",   emoji: "⌨️" },
  { key: "accesorios",    label: "Accesorios",    emoji: "🎧" },
  { key: "almacenamiento",label: "Almacenamiento",emoji: "💾" },
  { key: "monitores",     label: "Monitores",     emoji: "🖥️" },
  { key: "sillas",        label: "Sillas",        emoji: "🪑" },
  { key: "ofertas",       label: "Ofertas",       emoji: "🏷️" },
];

export default function CategoriesBar() {
  return (
    <section className="mx-auto mt-10 max-w-5xl">
      <div className="mb-3 text-sm opacity-80">Categorías</div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {CATS.map((c) => (
          <Link
            key={c.key}
            href={`/productos?cat=${encodeURIComponent(c.key)}`}
            className="group rounded-xl border border-white/10 bg-white/5 p-4 text-center hover:bg-white/10"
          >
            <div className="mb-2 flex h-12 items-center justify-center rounded-md border border-dashed border-white/15 bg-black/20 text-2xl">
              {/* espacio para imagen/icono real más adelante */}
              <span aria-hidden>{c.emoji}</span>
            </div>
            <div className="text-sm font-medium">{c.label}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
