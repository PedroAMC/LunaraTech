"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

type Mode = "landing" | "signup" | "login";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("landing");

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-black via-[#020617] to-[#020617]">
      {/* Columna izquierda: contenido principal */}
      <section className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 md:px-16">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
          {mode === "landing"
            ? "Acceso a tu cuenta"
            : mode === "signup"
            ? "Crear cuenta Lunara"
            : "Iniciar sesión"}
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="block text-slate-100 mb-1">
            {mode === "landing"
              ? "Bienvenido a"
              : mode === "signup"
              ? "Tu nueva cuenta en"
              : "Vuelve a"}
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
            LUNARATECH
          </span>
        </h1>

        <p className="text-slate-400 mb-6 max-w-md">
          {mode === "landing" && (
            <>
              Crea tu <span className="font-semibold">Cuenta Lunara</span> o
              entra a una ya existente para guardar pedidos, favoritos y tu
              setup en un solo lugar.
            </>
          )}
          {mode === "signup" && (
            <>
              Registra tu cuenta y conecta tus compras a un perfil único. Parte
              usando Google y, más adelante, otros métodos.
            </>
          )}
          {mode === "login" && (
            <>
              Entra a tu Cuenta Lunara para seguir tus pedidos, editar tus
              datos y revisar tu historial sin perder nada.
            </>
          )}
        </p>

        {/* Contenedor que cambia de “pantalla” con transición */}
        <div className="w-full max-w-md relative overflow-hidden">
          {/* LANDING */}
          <div
            className={`space-y-3 transition-all duration-500 ${
              mode === "landing"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setMode("signup")}
                className="w-full px-4 py-2.5 rounded-full font-semibold bg-white text-black shadow-lg shadow-sky-500/30 hover:shadow-sky-400/60 hover:-translate-y-[2px] hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 transition-transform transition-shadow"
              >
                Crear cuenta Lunara
              </button>

              <button
                onClick={() => setMode("login")}
                className="w-full px-4 py-2.5 rounded-full font-semibold border border-white/20 bg-white/5 text-slate-100 hover:bg-white/10 hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 transition-transform transition-shadow"
              >
                Iniciar sesión
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Desde cualquiera de las dos opciones podrás usar{" "}
              <span className="font-semibold">Google</span> como método de
              acceso. Próximamente agregaremos correo y otros proveedores como{" "}
              <span className="font-semibold">GitHub</span> y{" "}
              <span className="font-semibold">Microsoft</span>.
            </p>
          </div>

          {/* SIGNUP */}
          <div
            className={`absolute inset-0 space-y-3 transition-all duration-500 ${
              mode === "signup"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <button
              onClick={() => signIn("google", { callbackUrl: "/perfil" })}
              className="w-full px-4 py-2.5 rounded-full font-semibold bg-white text-black shadow-lg shadow-sky-500/30 hover:shadow-sky-400/60 hover:-translate-y-[2px] hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 transition-transform transition-shadow"
            >
              Crear cuenta con Google
            </button>

            <button
              disabled
              className="w-full px-4 py-2.5 rounded-full font-semibold border border-white/15 bg-white/5 text-slate-400 cursor-not-allowed hover:bg-white/10 transition"
            >
              Crear cuenta con correo (pronto)
            </button>

            <p className="text-[11px] text-slate-400">
              Al continuar con Google, crearemos tu Cuenta Lunara usando esos
              datos básicos. Más adelante podrás completar tu perfil y elegir
              otros métodos de acceso.
            </p>

            <div className="flex justify-between items-center pt-1 text-[11px] text-slate-400">
              <button
                type="button"
                onClick={() => setMode("landing")}
                className="hover:text-sky-300 transition"
              >
                ← Volver
              </button>
              <button
                type="button"
                onClick={() => setMode("login")}
                className="hover:text-sky-300 transition"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </button>
            </div>
          </div>

          {/* LOGIN */}
          <div
            className={`absolute inset-0 space-y-3 transition-all duration-500 ${
              mode === "login"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <button
              onClick={() => signIn("google", { callbackUrl: "/perfil" })}
              className="w-full px-4 py-2.5 rounded-full font-semibold bg-white text-black shadow-lg shadow-sky-500/30 hover:shadow-sky-400/60 hover:-translate-y-[2px] hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 transition-transform transition-shadow"
            >
              Iniciar sesión con Google
            </button>

            <button
              disabled
              className="w-full px-4 py-2.5 rounded-full font-semibold border border-white/15 bg-white/5 text-slate-400 cursor-not-allowed hover:bg-white/10 transition"
            >
              Iniciar con correo / contraseña (pronto)
            </button>

            <p className="text-[11px] text-slate-400">
              Usaremos tu cuenta de Google para validar que ya tienes una Cuenta
              Lunara asociada. Si no existe, te ofreceremos crearla.
            </p>

            <div className="flex justify-between items-center pt-1 text-[11px] text-slate-400">
              <button
                type="button"
                onClick={() => setMode("landing")}
                className="hover:text-sky-300 transition"
              >
                ← Volver
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="hover:text-sky-300 transition"
              >
                ¿Nuevo por aquí? Crear cuenta
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Columna derecha: imagen / vitrina */}
      <section className="hidden md:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/img/setup-bg.jpg')] bg-cover bg-center scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="relative z-10 flex flex-col justify-end p-10 text-slate-100 space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Próximamente
          </p>
          <p className="text-sm font-semibold">
            Vista previa de tu setup Lunara, estadísticas y beneficios de
            cuenta, todo en un solo lugar.
          </p>
        </div>
      </section>
    </main>
  );
}
