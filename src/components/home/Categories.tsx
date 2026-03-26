// src/components/home/Categories.tsx
import Link from "next/link";

type Category = {
  slug: string;
  label: string;
  href?: string;
  image?: string;
};

export default function Categories({ items }: { items: Category[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {items.map((c) => (
        <Link
          key={c.slug}
          href={c.href || `/productos?cat=${encodeURIComponent(c.slug)}`}
          className="
            group relative overflow-hidden rounded-2xl
            border transition-all

            /* ☀️ MODO CLARO */
            bg-slate-100 border-slate-300 
            hover:border-sky-400 hover:bg-slate-200

            /* 🌙 MODO OSCURO */
            dark:bg-black/90 dark:border-white/10
            dark:hover:border-cyan-400/70 dark:hover:bg-black
          "
        >
          {/* Fondo suave arriba */}
          <div
            className="
              h-24 w-full 
              bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent)]
              dark:bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent)]
            "
          />

          {/* Texto */}
          <div className="absolute inset-x-0 bottom-0 px-3 pb-3">
            <div
              className="
                text-xs uppercase tracking-[0.16em]

                /* CLARO */
                text-slate-700

                /* OSCURO */
                dark:text-cyan-300/80
              "
            >
              Explorar
            </div>

            <div
              className="
                text-sm font-semibold

                /* CLARO */
                text-slate-900

                /* OSCURO */
                dark:text-white
              "
            >
              {c.label}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
