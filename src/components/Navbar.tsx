"use client";

import Link from "next/link";
import ThemeToggle from "@/components/theme/ThemeToggle";
// import CartBadge from "@/components/CartBadge";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur dark:bg-black/30">
      <nav className="mx-auto h-14 max-w-5xl px-4 flex items-center justify-between">
        {/* Logo / Home */}
        <Link href="/" className="font-semibold tracking-wide title-grad">
          LUNARATECH
        </Link>

        {/* Links + acciones */}
        <div className="flex items-center gap-6 text-sm">
          <Link href="/productos" className="hover:text-brand-400">
            Productos
          </Link>

          <Link href="/carrito" className="hover:text-brand-400 flex items-center gap-2">
            <span>Carrito</span>
            {/* <CartBadge /> */}
          </Link>

          {/* Toggle de tema */}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
