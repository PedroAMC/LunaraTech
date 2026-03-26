"use client";

import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
return (
    <div className="min-h-dvh bg-neutral-950 text-neutral-100">
    <div className="mx-auto max-w-7xl grid grid-cols-[16rem_1fr]">
        <div className="border-r border-neutral-900">
        <AdminSidebar />
        </div>
        <main className="p-6">{children}</main>
    </div>
    </div>
);
}
