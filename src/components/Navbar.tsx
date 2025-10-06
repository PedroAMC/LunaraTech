"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ThemeToggle from "@/components/theme/ThemeToggle";
import CartBadge from "@/components/CartBadge";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [q, setQ] = useState(params.get("q") ?? "");

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const usp = new URLSearchParams(params.toString());
    if (q) usp.set("q", q);
    else usp.delete("q");
    router.push(`/productos?${usp.toString()}`);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur">
      <nav className="mx-auto h-14 max-w-6xl px-4 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link href="/" className="font-semibold tracking-wide title-grad">
          LUNARATECH
        </Link>

        {/* Buscador */}
        <form onSubmit={submitSearch} className="hidden md:flex items-center flex-1 max-w-md">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar productos…"
            className="w-full rounded-md border px-3 py-1.5 bg-transparent"
            style={{ borderColor: "var(--surface-border)" }}
          />
        </form>

        {/* Acciones */}
        <div className="flex items-center gap-4 text-sm">
          <Link href="/productos" className={pathname?.startsWith("/productos") ? "underline" : ""}>
            Productos
          </Link>

          {/* País fijo (Chile) */}
          <div className="hidden sm:flex items-center gap-1 opacity-90">
            <span className="text-xs">🇨🇱</span>
            <span>Chile</span>
          </div>

          {/* Auth (maquetas) */}
          <Link href="/auth/login" className="hover:text-brand-400">Iniciar sesión</Link>
          <Link href="/auth/register" className="hover:text-brand-400">Crear cuenta</Link>

          {/* Carrito + Tema */}
          <CartBadge />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
