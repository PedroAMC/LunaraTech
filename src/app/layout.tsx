import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// Si más adelante activamos dark/light:
// import ThemeProvider from "@/components/theme/ThemeProvider";

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

  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
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
  other: { "theme-color": "#0b0f19", "msapplication-TileColor": "#0b0f19" },
};

export const viewport: Viewport = {
  themeColor: "#0b0f19",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen">
        {/* <ThemeProvider> */}
          <Navbar />
          {/* 56px header + 72px footer */}
          <main className="pt-14 pb-20">{children}</main>
          <Footer />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
