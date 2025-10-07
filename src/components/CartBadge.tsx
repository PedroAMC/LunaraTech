// src/components/CartBadge.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";

/**
 * Badge del carrito con hidratación segura (evita mismatch SSR/CSR).
 * Suscribimos al array `items` para que re-renderice al cambiar cantidades.
 */
export default function CartBadge() {
  // Suscripción reactiva al contenido del carrito
  const count = useCart((s) => s.items.reduce((acc, it) => acc + it.qty, 0));

  // Evita parpadeos/crashes durante la hidratación
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const safeCount = mounted ? count : 0;

  return (
    <Link
      href="/carrito"
      className="relative inline-flex items-center gap-1.5 group"
      aria-label={`Carrito (${safeCount} ${safeCount === 1 ? "item" : "items"})`}
      title="Ver carrito"
    >
      <span className="underline decoration-transparent group-hover:decoration-current">
        Carrito
      </span>

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
