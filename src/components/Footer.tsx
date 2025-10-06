"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 inset-x-0 z-30 border-t border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <h3 className="mb-2 font-semibold text-white/90">LunaraTech</h3>
          <ul className="space-y-1 text-white/70">
            <li><Link href="/nosotros" className="hover:text-brand-400">Sobre nosotros</Link></li>
            <li><Link href="/contacto" className="hover:text-brand-400">Contacto</Link></li>
            <li><Link href="/faq" className="hover:text-brand-400">Preguntas frecuentes</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-white/90">Tienda</h3>
          <ul className="space-y-1 text-white/70">
            <li><Link href="/productos?cat=perifericos" className="hover:text-brand-400">Periféricos</Link></li>
            <li><Link href="/productos?cat=accesorios" className="hover:text-brand-400">Accesorios</Link></li>
            <li><Link href="/productos?cat=almacenamiento" className="hover:text-brand-400">Almacenamiento</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-white/90">Ayuda</h3>
          <ul className="space-y-1 text-white/70">
            <li><Link href="/envios" className="hover:text-brand-400">Envíos</Link></li>
            <li><Link href="/devoluciones" className="hover:text-brand-400">Devoluciones</Link></li>
            <li><Link href="/garantia" className="hover:text-brand-400">Garantía</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-white/90">Redes</h3>
          <ul className="space-y-1 text-white/70">
            <li><a href="#" className="hover:text-brand-400">Instagram</a></li>
            <li><a href="#" className="hover:text-brand-400">TikTok</a></li>
            <li><a href="#" className="hover:text-brand-400">WhatsApp</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
