"use client";

const ITEMS = [
  "🌌 James Webb captura nueva imagen de una galaxia a 33 Mly",
  "🛰️ Starlink supera los 3M de suscriptores globales",
  "☄️ Detectado nuevo cometa visible a simple vista en el hemisferio sur",
  "🚀 SpaceX completa lanzamiento #XX del año",
];

export default function NewsTicker() {
  return (
    <div className="w-full border-b border-white/10 bg-[var(--surface-2)]">
      <div className="mx-auto max-w-6xl overflow-hidden px-4">
        <div className="flex gap-8 py-2 animate-[ticker_30s_linear_infinite]">
          {ITEMS.concat(ITEMS).map((t, i) => (
            <span key={i} className="whitespace-nowrap text-sm opacity-80">{t}</span>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
