import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/theme/ThemeProvider";

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
  keywords: ["tecnología", "accesorios", "periféricos", "setup gamer", "LunaraTech"],
  alternates: { canonical: site.url },

  // Manifest + favicons
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  // Open Graph
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: site.name }],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/og-image.png"],
  },

  robots: { index: true, follow: true },
  other: { "theme-color": "#0b0f19", "msapplication-TileColor": "#0b0f19" },
};

export const viewport: Viewport = {
  // El color real lo sobreescribe el tema en CSS
  themeColor: "#0b0f19",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      {/* Con next-themes usamos la clase en el <html> */}
      <body className="min-h-dvh antialiased">
        <ThemeProvider>
          <Navbar />
          {/* padding-top para que el contenido no quede bajo el navbar sticky */}
          <main className="pt-14">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
