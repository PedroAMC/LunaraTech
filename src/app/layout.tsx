import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import CartBadge from "@/components/CartBadge";

export const metadata: Metadata = {
  title: "LunaraTech",
  description: "Tienda de tecnología e innovación",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
            <Link href="/" className="text-lg font-semibold">
              <span className="title-grad">LUNARATECH</span>
            </Link>

            <div className="flex items-center gap-6">
              <Link href="/productos" className="underline decoration-transparent hover:decoration-current">
                Productos
              </Link>
              <CartBadge />
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-5xl p-6">{children}</main>
      </body>
    </html>
  );
}
