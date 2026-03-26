// src/components/home/SectionDivider.tsx
import Link from "next/link";

export default function SectionDivider() {
  return (
    <section
      aria-label="Browse LunaraTech collections and categories"
      className="w-full bg-white dark:bg-[#020509] border-t border-slate-200/70 dark:border-white/5"
    >
      <div className="max-w-[112rem] mx-auto px-6 py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Texto principal */}
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-[11px] tracking-[0.22em] text-sky-700 dark:text-cyan-300/80 uppercase">
            LunaraTech catalog
          </p>

          <h2 className="text-2xl sm:text-[26px] font-semibold text-slate-900 dark:text-white">
            Browse collections &amp; key categories
          </h2>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 max-w-xl">
            Discover curated hardware, gaming, audio and creator gear selected by
            LunaraTech.
          </p>
        </div>

        {/* CTA lateral */}
        <div className="flex justify-center sm:justify-end">
          <Link
            href="/productos"
            className="group inline-flex items-center justify-center
              rounded-full border px-4 py-2
              text-[11px] font-semibold tracking-wide
              bg-white text-slate-900 border-slate-300
              hover:bg-slate-900 hover:text-white hover:border-slate-900
              dark:bg-transparent dark:text-cyan-100 dark:border-cyan-500/70
              dark:hover:bg-cyan-500/10 dark:hover:border-cyan-400
              transition"
          >
            Open full catalog
            <span className="ml-2 translate-y-[1px] transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
