"use client";

import Link from "next/link";
import { useEffect } from "react";

type MenuLink = { label: string; href: string };
type MenuSection = { label: string; links: MenuLink[] };

type MobileMenuProps = {
  /** abrir/cerrar el menú */
  open: boolean;
  /** cerrar desde fuera (escape, backdrop, botón X) */
  onClose: () => void;
  /** país seleccionado (por ahora solo CL) */
  country?: "CL";
  /** callback al cambiar país (estructura lista; luego conectamos moneda/idioma real) */
  onCountryChange?: (country: "CL") => void;
};

const SECTIONS: MenuSection[] = [
  {
    label: "Secciones",
    links: [
      { label: "Productos", href: "/productos" },
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

/**
 * Menú móvil tipo “drawer”. No usa `any` y cumple ESLint.
 * Controlado por props `open` / `onClose`.
 */
export default function MobileMenu({
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

  // Evita scroll del body cuando está abierto
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  // Handler tipado para el select de país (placeholder para el futuro)
  function handleCountryChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ): void {
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
        className={`fixed left-0 top-0 z-50 h-full w-[84%] max-w-sm bg-[var(--bg-0)] border-r border-white/10 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
        aria-label="Menú de navegación"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-white/10">
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
        <div className="p-4 space-y-6 overflow-y-auto h-[calc(100%-3.5rem)]">
          {/* País + (futuro) idioma/tema */}
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
                {/* Solo Chile por ahora */}
                <option value="CL">🇨🇱 Chile</option>
              </select>
            </label>

            {/* Slots para futuro: idioma y tema (estructura lista) */}
            <div className="flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-md border px-3 py-2 text-sm hover:bg-white/5"
                style={{ borderColor: "var(--surface-border)" }}
                title="Selector de idioma (estructura, conectar más adelante)"
              >
                Idioma
              </button>
              <button
                type="button"
                className="flex-1 rounded-md border px-3 py-2 text-sm hover:bg-white/5"
                style={{ borderColor: "var(--surface-border)" }}
                title="Tema claro/oscuro (ya existe toggle en navbar)"
              >
                Tema
              </button>
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

          {/* Social (placeholder estético) */}
          <div className="pt-2">
            <div className="text-xs uppercase opacity-70 mb-2">Redes</div>
            <div className="flex gap-2">
              {["Facebook", "Instagram", "TikTok"].map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-xs opacity-80 hover:opacity-100"
                  style={{ borderColor: "var(--surface-border)" }}
                  title={name}
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
