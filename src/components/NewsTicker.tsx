// src/components/NewsTicker.tsx
"use client";

import { useEffect, useRef } from "react";

const ITEMS = [
  { icon: "🛰️", text: "James Webb captura nueva imagen de una galaxia a 33 Mly" },
  { icon: "🛰️", text: "Starlink supera los 3M de suscriptores globales" },
  { icon: "🧪", text: "Detectado nuevo cometa visible a simple vista en el hemisferio sur" },
  { icon: "🚀", text: "SpaceX completa lanzamiento #XX del año" },
];

export default function NewsTicker() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // auto-scroll suave (opcional; quita este efecto si prefieres estático)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    let x = 0;
    const step = () => {
      x = (x + 0.3) % el.scrollWidth;
      el.scrollLeft = x;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="full-bleed border-b border-white/10 bg-[var(--surface-2)]">
      <div
        ref={wrapRef}
        className="mx-auto flex max-w-[1400px] gap-6 overflow-x-auto whitespace-nowrap px-4 py-2 [scrollbar-width:none]"
      >
        {ITEMS.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-2 opacity-90">
            <span>{it.icon}</span>
            <span className="text-sm">{it.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
