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
        {/* sin padding a la izquierda para que la marca quede pegada */}
        <nav className="flex h-14 items-center gap-3 px-2 sm:px-3">
          {/* Marca: alto del header, pegada al borde, SOLO borde derecho */}
          <Link
            href="/"
            aria-label="Ir al inicio"
            className="h-14 -my-px flex select-none items-center px-3 font-semibold tracking-wide title-grad bg-white/[0.06] hover:bg-white/[0.10] border-r border-white/12 rounded-none"
          >
            LUNARATECH
          </Link>

          {/* Botón menú al lado de la marca */}
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

          {/* CENTRO: buscador (flex-1) */}
          <div className="mx-2 flex-1">
            <SearchBar />
          </div>

          {/* DERECHA */}
          <div className="ml-auto flex items-center gap-3 sm:gap-4 text-sm pr-2 sm:pr-3">
            <Link
              href="/productos"
              className={pathname?.startsWith("/productos") ? "text-brand-300" : "hover:text-brand-300"}
            >
              Catálogo
            </Link>

            <span className="hidden sm:inline text-lg leading-none" aria-label="País">🇨🇱</span>

            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 hover:bg-white/5"
              title="Iniciar sesión / Registrarte"
            >
              <span aria-hidden>👤</span>
              <span className="hidden sm:inline">Iniciar sesión / Registrarte</span>
            </button>

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
