// src/components/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    // usamos la clase `site-footer` para que tome los tokens de globals.css
    <footer className="site-footer w-full border-t border-slate-200/70 dark:border-sky-900/30">
      <div className="mx-auto max-w-[112rem] px-6 lg:px-10 py-10">
        {/* Top: brand + claim + confianza */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-8 border-b border-slate-200/70 dark:border-white/5">
          {/* Brand + texto */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 rounded-full bg-sky-500/10 ring-1 ring-sky-400/40 flex items-center justify-center overflow-hidden">
                <Image
                  src="/brand/lunara-astronaut-32.png"
                  alt="Logo LunaraTech"
                  width={24}
                  height={24}
                  className="drop-shadow-[0_0_14px_rgba(56,189,248,0.9)]"
                />
              </div>
              <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                LUNARA<span className="text-sky-500 dark:text-sky-400">TECH</span>
              </span>
            </div>

            <p className="max-w-xl text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
              Curated hardware, custom builds y soluciones pro para quienes se
              toman en serio su setup.
            </p>

            <p className="text-[10px] text-slate-500 dark:text-neutral-500">
              Envíos a todo Chile · Stock real · Soporte humano especializado.
            </p>
          </div>

          {/* MÉTODOS DE PAGO */}
          <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-500 dark:text-neutral-500">
            <span className="uppercase tracking-[0.16em] text-slate-600 dark:text-neutral-400">
              Métodos de pago
            </span>

            <div className="flex items-center gap-3">
              <Image
                src="/payment/visa.png"
                alt="Visa"
                width={44}
                height={18}
                className="opacity-90"
              />
              <Image
                src="/payment/mastercard.png"
                alt="Mastercard"
                width={36}
                height={18}
                className="opacity-90"
              />
              <Image
                src="/payment/paypal.png"
                alt="PayPal"
                width={50}
                height={18}
                className="opacity-90"
              />
            </div>

            <span className="ml-3 uppercase tracking-[0.16em] text-slate-600 dark:text-neutral-400">
              Checkout seguro
            </span>
          </div>
        </div>

        {/* Middle: columnas de links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 text-sm">
          <div>
            <h4 className="mb-3 text-xs font-semibold tracking-[0.16em] text-slate-600 dark:text-neutral-400 uppercase">
              LunaraTech
            </h4>
            <ul className="space-y-1.5 text-slate-700 dark:text-neutral-300">
              <li>
                <Link
                  href="/sobre-nosotros"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold tracking-[0.16em] text-slate-600 dark:text-neutral-400 uppercase">
              Tienda
            </h4>
            <ul className="space-y-1.5 text-slate-700 dark:text-neutral-300">
              <li>
                <Link
                  href="/productos?cat=perifericos"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Periféricos
                </Link>
              </li>
              <li>
                <Link
                  href="/productos?cat=accesorios"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Accesorios
                </Link>
              </li>
              <li>
                <Link
                  href="/productos?cat=almacenamiento"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Almacenamiento
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold tracking-[0.16em] text-slate-600 dark:text-neutral-400 uppercase">
              Soporte
            </h4>
            <ul className="space-y-1.5 text-slate-700 dark:text-neutral-300">
              <li>
                <Link
                  href="/envios"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Envíos
                </Link>
              </li>
              <li>
                <Link
                  href="/devoluciones"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link
                  href="/garantia"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Garantía
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold tracking-[0.16em] text-slate-600 dark:text-neutral-400 uppercase">
              Comunidad
            </h4>
            <ul className="space-y-1.5 text-slate-700 dark:text-neutral-300">
              <li>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://tiktok.com"
                  target="_blank"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  TikTok
                </Link>
              </li>
              <li>
                <Link
                  href="https://wa.me"
                  target="_blank"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  WhatsApp
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] text-slate-500 dark:text-neutral-500">
          <p>© {year} LunaraTech. Todos los derechos reservados.</p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/terminos"
              className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              Términos
            </Link>
            <Link
              href="/privacidad"
              className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              Privacidad
            </Link>
            <span>
              Latencia baja,{" "}
              <span className="text-sky-600 dark:text-sky-400">
                vibes altas
              </span>{" "}
              🚀
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
