"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"      // <html class="dark"> …
      defaultTheme="light"   // por defecto claro
      enableSystem={false}   // sin seguir tema del SO (lo podemos activar luego)
    >
      {children}
    </NextThemesProvider>
  );
}
