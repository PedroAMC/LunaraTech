// src/components/CartBadge.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";

export default function CartBadge() {
  const count = useCart((s) => s.count());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const safe = mounted ? count : 0;

  return (
    <Link
      href="/carrito"
      className="relative inline-flex items-center justify-center rounded-full border border-white/15 p-2 hover:bg-white/5"
      aria-label={`Carrito (${safe})`}
    >
      {/* carrito simple (puedes cambiarlo luego a un SVG/imagen) */}
      <span aria-hidden className="text-[18px] leading-none">🛒</span>
      <span
        aria-hidden
        className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1.5 text-[11px] font-semibold leading-5 text-white"
      >
        {safe}
      </span>
    </Link>
  );
}
