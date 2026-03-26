// src/components/admin/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const item = (href: string, label: string, current: string) => {
  const active = current === href || (href !== "/admin" && current.startsWith(href));
  return (
    <Link
      href={href}
      className={
        "block rounded-md px-3 py-2 text-sm " +
        (active ? "bg-neutral-900 text-emerald-300" : "hover:bg-neutral-900/60")
      }
    >
      {label}
    </Link>
  );
};

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="p-4 space-y-2">
      {item("/admin", "Estado", pathname)}
      {item("/admin/analitica", "Analítica", pathname)}
      {item("/admin/productos", "Productos", pathname)}
      {item("/admin/inventario", "Inventario", pathname)}
      {item("/admin/colaboradores", "Colaboradores", pathname)}
    </aside>
  );
}
