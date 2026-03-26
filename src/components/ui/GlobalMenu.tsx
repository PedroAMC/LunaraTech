"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sun, Moon, Globe, User, X, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function GlobalMenu() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const { status } = useSession();

  const isLogged = status === "authenticated";

  // Tema guardado
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "light") {
        setDarkMode(false);
        document.documentElement.classList.remove("dark");
      } else {
        setDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const accountHref = isLogged ? "/perfil" : "/login";
  const accountLabel = isLogged ? "Mi cuenta" : "Login / Crear cuenta";

  const handleLogout = () => {
    setOpen(false);
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="relative">
      {/* Botón menú */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menú global"
        className="p-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition flex items-center justify-center"
      >
        {open ? (
          <X
            className="
              transition-transform duration-150 scale-110
              text-black dark:text-white
            "
            size={20}
          />
        ) : (
          <div className="space-y-[5px] transition-all duration-200">
            {/* LÍNEAS DE LA HAMBURGUESA */}
            <div className="w-6 h-[2px] rounded bg-black dark:bg-white" />
            <div className="w-6 h-[2px] rounded bg-black dark:bg-white" />
            <div className="w-6 h-[2px] rounded bg-black dark:bg-white" />
          </div>
        )}
      </button>

      {/* Menú desplegable */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-52 bg-[#111827] border border-white/10 rounded-lg shadow-lg p-3 z-50 animate-fade-in"
          style={{ animation: "fade-in 0.18s ease-out forwards" }}
        >
          <div className="flex flex-col gap-3 text-sm text-white/90">
            {/* Tema */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 hover:text-emerald-400 transition"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              {darkMode ? "Modo claro" : "Modo oscuro"}
            </button>

            {/* País */}
            <Link
              href="/pais"
              className="flex items-center gap-2 hover:text-emerald-400 transition"
              onClick={() => setOpen(false)}
            >
              <Globe size={16} /> Seleccionar país
            </Link>

            {/* Cuenta */}
            <Link
              href={accountHref}
              className="flex items-center gap-2 hover:text-emerald-400 transition"
              onClick={() => setOpen(false)}
            >
              <User size={16} /> {accountLabel}
            </Link>

            {isLogged && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 hover:text-emerald-400 transition text-left mt-1 pt-2 border-t border-white/10"
              >
                <LogOut size={16} /> Cerrar sesión
              </button>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(-6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
