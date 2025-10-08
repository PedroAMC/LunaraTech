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
        {/* Barra a todo el ancho, con padding lateral mínimo para respirar */}
        <nav className="flex h-14 items-center gap-3 px-2 sm:px-3">
          {/* IZQUIERDA: Marca pegada a la esquina + botón menú a su lado */}
          <Link
            href="/"
            className="select-none rounded-none border border-white/12 bg-white/[0.06] px-3 py-1.5 font-semibold tracking-wide title-grad hover:bg-white/[0.1]"
            aria-label="Ir al inicio"
            style={{ marginLeft: 0 }}
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

          {/* CENTRO: Buscador (crece) */}
          <div className="mx-2 flex-1">
            <SearchBar />
          </div>

          {/* DERECHA: Acciones */}
          <div className="ml-auto flex items-center gap-3 sm:gap-4 text-sm pr-2 sm:pr-3">
            <Link
              href="/productos"
              className={pathname?.startsWith("/productos") ? "text-brand-300" : "hover:text-brand-300"}
            >
              Catálogo
            </Link>

            {/* Solo bandera (CL) */}
            <span className="hidden sm:inline" aria-label="País">
              <span className="text-lg leading-none">🇨🇱</span>
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

            {/* Carrito (icono + badge) */}
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
