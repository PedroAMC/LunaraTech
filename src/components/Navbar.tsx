"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme/ThemeToggle";
import CartBadge from "@/components/CartBadge";
import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import MobileMenu from "@/components/MobileMenu";
import AuthModal from "@/components/AuthModal";
import { useUI } from "@/store/ui";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { setAuthOpen } = useUI();

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
          {/* IZQUIERDA: Logo + menú móvil */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden rounded-md border border-white/15 px-2 py-1 hover:bg-white/5"
              aria-label="Abrir menú"
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>

            <Link href="/" className="font-semibold tracking-wide title-grad">
              LUNARATECH
            </Link>
          </div>

          {/* CENTRO: Buscador */}
          <div className="hidden flex-1 md:block">
            <SearchBar />
          </div>

          {/* DERECHA: acciones */}
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/productos"
              className={pathname?.startsWith("/productos") ? "underline" : ""}
            >
              Productos
            </Link>

            {/* País fijo visual (Chile) */}
            <div className="hidden items-center gap-1 opacity-90 sm:flex">
              <span className="text-xs">🇨🇱</span>
              <span>Chile</span>
            </div>

            {/* Botón unificado Auth */}
            <button
              onClick={() => setAuthOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 hover:bg-white/5"
              title="Iniciar sesión / Registrarte"
            >
              <span>👤</span>
              <span className="hidden sm:inline">Iniciar sesión / Registrarte</span>
            </button>

            <CartBadge />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Overlays */}
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      <AuthModal />
    </>
  );
}
