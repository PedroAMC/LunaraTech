"use client";

import { useUI } from "@/store/ui";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  const { country, lang, setCountry, setLang } = useUI();

  return (
    <aside className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="ml-auto h-full w-[88%] max-w-sm overflow-y-auto border-l border-white/10 bg-[var(--bg-1)] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="mb-4 flex items-center justify-between">
          <h3 className="text-sm opacity-70">MENÚ</h3>
          <button
            className="rounded-md border border-white/15 px-2 py-1 text-sm hover:bg-white/5"
            onClick={onClose}
          >
            ✕
          </button>
        </header>

        <div className="space-y-6">
          <section>
            <h4 className="mb-2 text-xs opacity-70">PAÍS</h4>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value as any)}
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2"
            >
              <option value="CL">🇨🇱 Chile</option>
              {/* futuros: AR, PE, MX… */}
            </select>
            <p className="mt-2 text-xs opacity-60">
              La moneda se ajustará según el país seleccionado.
            </p>
          </section>

          <section>
            <h4 className="mb-2 text-xs opacity-70">IDIOMA</h4>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2"
            >
              <option value="es">Español</option>
              <option value="en" disabled>
                English (pronto)
              </option>
            </select>
          </section>

          <section className="flex items-center justify-between">
            <span>Tema</span>
            <ThemeToggle />
          </section>
        </div>
      </div>
    </aside>
  );
}
