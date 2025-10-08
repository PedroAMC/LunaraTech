// src/components/MobileMenu.tsx
"use client";

import Link from "next/link";
import { useEffect } from "react";
import ThemeToggle from "@/components/theme/ThemeToggle";

type MenuLink = { label: string; href: string };
type MenuSection = { label: string; links: MenuLink[] };

export type MobileMenuProps = {
  /** opcional para aria-controls desde el botón del header */
  id?: string;
  /** abrir/cerrar el menú */
  open: boolean;
  /** cerrar desde fuera (escape, backdrop, botón X) */
  onClose: () => void;
  /** país seleccionado (por ahora solo CL) */
  country?: "CL";
  /** callback al cambiar país (estructura lista para el futuro) */
  onCountryChange?: (country: "CL") => void;
};

const SECTIONS: MenuSection[] = [
  {
    label: "Secciones",
    links: [
      { label: "Catálogo", href: "/productos" },
      { label: "Carrito", href: "/carrito" },
      { label: "Ayuda", href: "/#ayuda" },
    ],
  },
  {
    label: "Cuenta",
    links: [
      { label: "Iniciar sesión", href: "/auth/login" },
      { label: "Crear cuenta", href: "/auth/register" },
    ],
  },
];

export default function MobileMenu({
  id,
  open,
  onClose,
  country = "CL",
  onCountryChange,
}: MobileMenuProps) {
  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Evitar scroll del body cuando está abierto
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const value = e.target.value as "CL";
    onCountryChange?.(value);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        role="presentation"
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        id={id}
        className={`fixed left-0 top-0 z-50 h-full w-[84%] max-w-sm border-r border-white/10 bg-[var(--bg-0)] transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
        aria-label="Menú de navegación"
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
          <span className="font-semibold">Menú</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-1.5 hover:bg-white/10"
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="h-[calc(100%-3.5rem)] overflow-y-auto space-y-6 p-4">
          {/* Preferencias */}
          <div className="space-y-3">
            <div className="text-xs uppercase opacity-70">Preferencias</div>

            <label className="block text-sm">
              <span className="opacity-80">País</span>
              <select
                value={country}
                onChange={handleCountryChange}
                className="mt-1 w-full rounded-md border bg-transparent px-3 py-2"
                style={{ borderColor: "var(--surface-border)" }}
              >
                <option value="CL">🇨🇱 Chile</option>
              </select>
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-md border px-3 py-2 text-sm hover:bg-white/5"
                style={{ borderColor: "var(--surface-border)" }}
                title="Selector de idioma (estructura, conectar más adelante)"
              >
                Idioma
              </button>

              {/* Toggle de tema compacto con etiqueta al lado (no superpuesto) */}
              <div
                className="flex-1 rounded-md border px-3 py-2"
                style={{ borderColor: "var(--surface-border)" }}
                title="Tema claro/oscuro"
              >
                <ThemeToggle compact className="w-full" />
              </div>
            </div>
          </div>

          {/* Secciones */}
          {SECTIONS.map((sec) => (
            <div key={sec.label} className="space-y-2">
              <div className="text-xs uppercase opacity-70">{sec.label}</div>
              <ul className="space-y-1">
                {sec.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={onClose}
                      className="block rounded-md px-3 py-2 hover:bg-white/5"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Redes (placeholder) */}
          <div className="pt-2">
            <div className="mb-2 text-xs uppercase opacity-70">Redes</div>
            <div className="flex gap-2">
              {["Facebook", "Instagram", "TikTok"].map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-xs opacity-80 hover:opacity-100"
                  style={{ borderColor: "var(--surface-border)" }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
