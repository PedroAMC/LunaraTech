"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";

export default function CartBadge() {
  // se vuelve a renderizar cuando cambia el contador
  const count = useCart((s) => s.count());
  // evitar “mismatch” entre SSR y cliente
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const safeCount = mounted ? count : 0;

  return (
    <Link
      href="/carrito"
      className="relative inline-flex items-center gap-1.5 group"
      aria-label={`Carrito (${safeCount} ${safeCount === 1 ? "item" : "items"})`}
    >
      <span className="underline decoration-transparent group-hover:decoration-current">
        Carrito
      </span>

      {/* badge con número; mostramos 0 sólo para que no parpadee al montar */}
      <span
        aria-live="polite"
        aria-atomic="true"
        className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1.5 text-[11px] font-semibold leading-5 text-white group-hover:bg-brand-500"
      >
        {safeCount}
      </span>
    </Link>
  );
}
