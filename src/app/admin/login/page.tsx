// src/app/admin/login/page.tsx
"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  // 👉 Solo en /admin/login apagamos header + footer
  useEffect(() => {
    document.body.classList.add("admin-login-shell-off");
    return () => {
      document.body.classList.remove("admin-login-shell-off");
    };
  }, []);

  return (
    <main className="admin-login-page min-h-screen w-full flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-2xl border border-red-500/40 bg-neutral-950 p-8 shadow-[0_0_45px_rgba(248,113,113,0.25)]">
        <p className="text-xs uppercase tracking-[0.35em] text-red-400 mb-3">
          Acceso administrador
        </p>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-50 mb-2 leading-snug">
          Panel de administración{" "}
          <span className="text-red-400">LunaraTech</span>
        </h1>

        <p className="text-sm text-slate-400 mb-6">
          Solo personal autorizado. Cada inicio de sesión puede ser registrado
          y auditado.
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          className="w-full px-4 py-2.5 rounded-full font-semibold bg-red-500 text-black hover:bg-red-400 hover:-translate-y-[1px] hover:shadow-lg hover:shadow-red-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/80 transition"
        >
          Iniciar sesión como administrador
        </button>

        <p className="text-[11px] text-slate-500 mt-4">
          Próximamente: verificación en dos pasos, claves de acceso dedicadas y
          soporte para otros proveedores (GitHub, Microsoft, etc.).
        </p>
      </div>
    </main>
  );
}
