import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#0b0c0d] text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-[#111315] border-r border-gray-800 p-6 space-y-6">
        <h1 className="text-xl font-bold text-green-400">LunaraTech Admin</h1>

        <nav className="flex flex-col gap-3">
          <Link href="/admin" className="hover:text-green-400">
            Dashboard
          </Link>

          {/* Productos */}
          <div className="flex flex-col gap-1">
            <Link href="/admin/productos" className="hover:text-green-400">
              Productos
            </Link>
            <Link
              href="/admin/productos/nuevo"
              className="ml-3 text-sm text-neutral-400 hover:text-green-300"
            >
              + Nuevo producto
            </Link>
          </div>

          {/* Colecciones */}
          <div className="flex flex-col gap-1">
            <Link href="/admin/colecciones" className="hover:text-green-400">
              Colecciones
            </Link>
            <Link
              href="/admin/colecciones/nueva"
              className="ml-3 text-sm text-neutral-400 hover:text-green-300"
            >
              + Nueva colección
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
