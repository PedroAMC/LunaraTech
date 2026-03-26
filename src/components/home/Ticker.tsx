// src/components/home/Ticker.tsx
"use client";

import { useEffect, useRef } from "react";

export default function Ticker({ items }: { items: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.innerHTML = [...items, ...items]
      .map((t) => `<span class="px-6">${t}</span>`)
      .join("");
  }, [items]);

  return (
    <div className="relative overflow-hidden border-y border-neutral-800 bg-neutral-950/40">
      <div
        ref={trackRef}
        className="ticker-track whitespace-nowrap py-2 text-sm text-neutral-300"
      />
    </div>
  );
}
