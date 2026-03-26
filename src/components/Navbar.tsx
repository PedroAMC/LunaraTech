"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, User } from "lucide-react";
import { useEffect, useState, FormEvent } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import SearchOverlay from "@/components/ui/SearchOverlay";
import GlobalMenu from "@/components/ui/GlobalMenu";
import SearchSuggestions from "@/components/ui/SearchSuggestions";

import { useCart } from "@/store/cart";
import { useSession } from "next-auth/react";

const ReactCountryFlag = dynamic(() => import("react-country-flag"), {
  ssr: false,
});

const links = [
  { href: "/", label: "Home" },
  { href: "/productos", label: "Productos" },
  { href: "/colecciones", label: "Colecciones" },
];

function getUserInitials(name?: string | null) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  const initials = parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  return initials || "U";
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [openSearchOverlay, setOpenSearchOverlay] = useState(false);
  const [desktopQuery, setDesktopQuery] = useState("");
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const { totalItems } = useCart();
  const count = totalItems();

  const { data: session, status } = useSession();

  // Para evitar mismatch de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Detectar scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // País desde localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("selectedCountry");
      if (stored) {
        const parsed = JSON.parse(stored);
        setCountryCode(parsed.code || null);
      }
    } catch {
      // ignore
    }
  }, []);

  const isLogged = status === "authenticated";

  const handleUserClick = () => {
    if (isLogged) {
      router.push("/perfil");
    } else {
      router.push("/login");
    }
  };

  // Búsqueda escritorio
  const handleDesktopSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = desktopQuery.trim();
    if (!q) return;
    router.push(`/productos?search=${encodeURIComponent(q)}`);
  };

  const handleSuggestionClick = () => {};

  const headerTone = scrolled
    ? // scrolleado: más sólido en ambos temas
      "bg-white/95 border-b border-slate-200/80 shadow-[0_1px_0_rgba(148,163,184,0.45)] dark:bg-[rgba(3,7,18,0.96)] dark:border-slate-800/80 dark:shadow-[0_1px_0_rgba(56,189,248,0.35)]"
    : // top: un poco más translúcido
      "bg-white/90 border-b border-slate-200/70 dark:bg-[rgba(3,7,18,0.86)] dark:border-slate-800/60";

  return (
    <>
      <header
        className={`sticky top-0 z-50 backdrop-blur-md transition-all ${headerTone}`}
      >
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          {/* IZQUIERDA */}
          <div className="flex items-center gap-6 min-w-0 flex-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="relative h-8 w-8">
                <Image
                  src="/brand/lunara-astronaut-32.png"
                  alt="Logo LunaraTech"
                  fill
                  className="rounded-full object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.9)] group-hover:drop-shadow-[0_0_18px_rgba(56,189,248,1)] transition-shadow"
                  sizes="32px"
                  priority
                />
              </div>
              <span className="font-semibold tracking-wide text-slate-900 text-sm sm:text-base dark:text-white">
                LUNARA
                <span className="text-sky-500 dark:text-sky-400">TECH</span>
              </span>
            </Link>

            {/* Links desktop */}
            <nav className="hidden md:flex items-center gap-6 text-sm flex-1 justify-center">
              {links.map((l) => {
                const active =
                  l.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(l.href);

                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`transition ${
                      active
                        ? "text-sky-600 dark:text-sky-300"
                        : "text-slate-900/80 dark:text-white/80"
                    } hover:text-sky-600 dark:hover:text-sky-300`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* BÚSQUEDA desktop */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="w-full max-w-2xl relative">
              <form onSubmit={handleDesktopSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-500 dark:text-sky-400" />
                <input
                  type="text"
                  value={desktopQuery}
                  onChange={(e) => setDesktopQuery(e.target.value)}
                  placeholder="Buscar productos, categorías o marcas..."
                  className="
                    nav-search-input
                    w-full pl-9 pr-3 py-2
                    rounded-none outline-none focus:outline-none focus-visible:outline-none
                    focus:ring-0 shadow-[0_0_0_rgba(0,0,0,0)]
                    transition border
                    bg-white text-slate-900 placeholder:text-slate-500 border-slate-300
                    focus:shadow-[0_0_16px_rgba(148,163,184,0.35)]
                    dark:bg-white/5 dark:border-sky-500/25
                    dark:text-white dark:placeholder:text-white/55
                    dark:focus:shadow-[0_0_16px_rgba(56,189,248,0.28)]
                  "
                />
              </form>

              <SearchSuggestions
                query={desktopQuery}
                onResultClick={handleSuggestionClick}
              />
            </div>
          </div>

          {/* DERECHA */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Buscar móvil */}
            <button
              onClick={() => setOpenSearchOverlay(true)}
              className="p-2 rounded-md transition lg:hidden hover:bg-slate-100 dark:hover:bg-white/10"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5 text-slate-900 dark:text-white" />
            </button>

            {/* Usuario */}
            <button
              onClick={handleUserClick}
              className="p-1.5 rounded-full transition flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10"
              aria-label="Cuenta de usuario"
            >
              <div className="relative flex items-center justify-center">
                {isLogged && session?.user ? (
                  session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name ?? "Usuario"}
                      width={28}
                      height={28}
                      className="rounded-full border border-sky-400/70"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-sky-500/90 text-black text-xs font-semibold flex items-center justify-center">
                      {getUserInitials(session.user.name)}
                    </div>
                  )
                ) : (
                  <User className="h-5 w-5 text-slate-900 dark:text-white" />
                )}

                {countryCode && (
                  <span className="absolute -bottom-0.5 -right-0.5 rounded-[3px] overflow-hidden border border-black/60 shadow-[0_0_4px_rgba(0,0,0,0.6)] bg-black">
                    <ReactCountryFlag
                      countryCode={countryCode}
                      svg
                      style={{
                        width: "0.85rem",
                        height: "0.85rem",
                        display: "block",
                      }}
                    />
                  </span>
                )}
              </div>
            </button>

            {/* Carrito */}
            <Link
              href="/carrito"
              aria-label="Ver carrito"
              className="relative p-2 rounded-md transition hover:bg-slate-100 dark:hover:bg-white/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 text-slate-900 dark:text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.5l2.1 12.6a1 1 0 0 0 .99.84h11.42a1 1 0 0 0 .98-.8l1.46-7.3H7.5"
                />
                <circle cx="10" cy="19.5" r="1" />
                <circle cx="17" cy="19.5" r="1" />
              </svg>

              {count > 0 && (
                <span
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1
                    bg-gradient-to-r from-sky-500 to-sky-400
                    text-[11px] leading-[18px] text-black text-center
                    rounded-full font-semibold shadow-[0_0_8px_rgba(56,189,248,0.7)]"
                >
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>

            {/* Menú global */}
            <GlobalMenu />
          </div>
        </div>

        {/* Línea azul abajo */}
        <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(56,189,248,.65),transparent)]" />
      </header>

      {/* Overlay búsqueda */}
      <SearchOverlay
        open={openSearchOverlay}
        onClose={() => setOpenSearchOverlay(false)}
      />
    </>
  );
}
