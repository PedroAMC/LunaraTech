// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import CartBadge from "@/components/CartBadge";
import MobileMenu from "@/components/MobileMenu";
import AuthModal from "@/components/AuthModal";
import { useUI } from "@/store/ui";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { setAuthOpen } = useUI();

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          {/* IZQ: Marca pegada a la esquina + botón menú */}
          <Link
            href="/"
            className="border border-white/15 bg-white/5 px-3 py-1.5 font-semibold tracking-wide title-grad hover:bg-white/10 rounded-none"
            aria-label="Ir al inicio"
          >
            LUNARATECH
          </Link>

          <button
            type="button"
            className="rounded-md border border-white/15 px-2 py-1 hover:bg-white/5"
            aria-label="Abrir menú"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          {/* CENTRO: buscador (expandible) */}
          <div className="flex-1">
            <SearchBar />
          </div>

          {/* DER: orden definitivo */}
          <div className="ml-auto flex items-center gap-4 text-sm">
            <Link
              href="/productos"
              className={pathname?.startsWith("/productos") ? "text-brand-300" : "hover:text-brand-300"}
            >
              Catálogo
            </Link>

            {/* Solo bandera */}
            <span className="hidden sm:inline text-lg leading-none" aria-label="País">
              🇨🇱
            </span>

            {/* Login/Register unido */}
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 hover:bg-white/5"
              title="Iniciar sesión / Registrarte"
            >
              <span aria-hidden>👤</span>
              <span className="hidden sm:inline">Iniciar sesión / Registrarte</span>
            </button>

            {/* Carrito (ícono + badge) */}
            <CartBadge />
          </div>
        </nav>
      </header>

      {/* Overlays */}
      <MobileMenu
        id="mobile-menu"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        country="CL"
        onCountryChange={() => {}}
      />
      <AuthModal />
    </>
  );
}
