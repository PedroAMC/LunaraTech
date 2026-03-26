import type { Metadata, Viewport } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProviders from "@/components/AuthProviders";
import AppThemeProvider from "src/components/AppThemeProvider";
import { Suspense } from "react";

const site = {
  name: "LUNARATECH",
  url: "https://lunaratech.cl",
  description:
    "Tecnología con estilo espacial. Componentes, periféricos y accesorios para llevar tu setup a la estratósfera.",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  keywords: [
    "tecnología",
    "hardware",
    "accesorios",
    "periféricos",
    "setup gamer",
    "LunaraTech",
  ],
  alternates: { canonical: site.url },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/brand/lunara-astronaut-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/lunara-astronaut-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/brand/lunara-astronaut-apple.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  other: {
    "theme-color": "#020509",
    "msapplication-TileColor": "#020509",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#020509",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.lunaratech.cl" />
        <link rel="dns-prefetch" href="https://cdn.lunaratech.cl" />
      </head>

      <body className="min-h-screen antialiased">
        {/* ⬇️ ESTE PROVIDER ES EL QUE FALTABA */}
        <AppThemeProvider>
          <AuthProviders>
            <Suspense fallback={<div className="h-16" />}>
              <Navbar />
            </Suspense>

            <div>{children}</div>

            <Footer />
          </AuthProviders>
        </AppThemeProvider>
      </body>
    </html>
  );
}
