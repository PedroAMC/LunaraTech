"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// si más adelante quieres mostrar el contador del carrito:
// import CartBadge from "@/components/CartBadge";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href ? "text-brand-400" : "hover:text-brand-400";

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-semibold tracking-wide title-grad text-lg md:text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
          aria-label="Ir al inicio"
        >
          LUNARATECH
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/productos"
            className={`${isActive("/productos")} focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded`}
          >
            Productos
          </Link>

          <Link
            href="/carrito"
            className={`${isActive("/carrito")} flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded`}
          >
            <span>Carrito</span>
            {/* <CartBadge /> */}
          </Link>
        </div>
      </nav>
    </header>
  );
}
