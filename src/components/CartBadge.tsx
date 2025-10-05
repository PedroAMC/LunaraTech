"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";

export default function CartBadge() {
  const count = useCart((s) => s.count());
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Link href="/carrito" className="relative inline-flex items-center group">
      <span className="underline decoration-transparent group-hover:decoration-current">
        Carrito
      </span>
      <span
        aria-label="items-count"
        className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-2 text-xs font-semibold group-hover:bg-brand-500"
      >
        {mounted ? count : 0}
      </span>
    </Link>
  );
}

