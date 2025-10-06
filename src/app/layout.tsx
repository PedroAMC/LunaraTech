import type { Metadata, Viewport } from "next";
import "./globals.css";

const site = {
  name: "LUNARATECH",
  url: "https://lunaratech.cl",
  description:
    "Tecnología con estilo espacial. Componentes, periféricos y accesorios para llevar tu setup a la estratósfera.",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "tecnología",
    "accesorios",
    "periféricos",
    "setup gamer",
    "LunaraTech",
  ],
  alternates: {
    canonical: site.url,
  },

  // ✅ Manifest + favicons + apple touch icon (todo desde /public)
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  // ✅ Open Graph (para previews en WhatsApp/FB/etc.)
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [
      {
        url: "/og-image.png", // <-- aseguré la extensión .png
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },

  // ✅ Twitter Card (preview grande)
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/og-image.png"], // <-- .png
  },

  robots: {
    index: true,
    follow: true,
  },

  // (Opcional) pequeños metadatos extra útiles
  other: {
    "theme-color": "#0b0f19",
    "msapplication-TileColor": "#0b0f19",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0f19",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      {/* Si en algún momento quieres fonts de Google, acá podemos preconectar:
      
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      
      */}
      <body>{children}</body>
    </html>
  );
}
