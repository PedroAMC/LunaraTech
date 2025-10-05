"use client";
import Link from "next/link";
import { useCart } from "@/store/cart";

export default function CartBadge() {
  const count = useCart((s) => s.count());
  return (
    <Link href="/carrito" className="relative inline-flex items-center">
      <span className="underline">Carrito</span>
      <span aria-label="items-count" className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-2 text-xs font-medium text-white">
        {count}
      </span>
    </Link>
  );
}
