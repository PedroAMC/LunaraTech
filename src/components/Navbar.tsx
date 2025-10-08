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
          {/* Marca pegada al borde izquierdo (rectángulo full-height) */}
          <Link
            href="/"
            className="h-10 sm:h-11 px-3 inline-flex items-center rounded-md bg-[var(--surface-2)] border border-white/10 text-sm font-semibold tracking-wide title-grad"
            style={{ marginLeft: "-0.25rem" }} // visual “pegado”
          >
            LUNARATECH
          </Link>

          {/* Botón menú al lado */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/5 hover:bg-white/10"
          >
            {/* “hamburguesa” moderna */}
            <span className="relative block h-3 w-5">
              <span className="absolute inset-x-0 top-0 h-[2px] rounded bg-current" />
              <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] rounded bg-current" />
              <span className="absolute inset-x-0 bottom-0 h-[2px] rounded bg-current" />
            </span>
          </button>

          {/* Buscador */}
          <div className="flex-1">
            <SearchBar />
          </div>

          {/* Lado derecho */}
          <div className="ml-auto flex items-center gap-4 text-sm">
            <Link
              href="/productos"
              className={pathname?.startsWith("/productos") ? "text-brand-300" : "hover:text-brand-300"}
            >
              Catálogo
            </Link>

            {/* Solo bandera (CL) */}
            <span className="hidden sm:inline text-lg leading-none" aria-label="País">🇨🇱</span>

            {/* Auth unificado */}
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 hover:bg-white/5"
              title="Iniciar sesión / Registrarte"
            >
              <span aria-hidden>👤</span>
              <span className="hidden sm:inline">Iniciar sesión / Registrarte</span>
            </button>

            {/* Carrito */}
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
