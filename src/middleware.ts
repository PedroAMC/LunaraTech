// src/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Solo nos importan rutas /admin
  const isAdminRoute = pathname.startsWith("/admin");
  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const isAdminLoginPath = pathname === "/admin/login";

  // Flag para "cerrar" el panel admin si quieres
  const adminOpen = process.env.NEXT_PUBLIC_ADMIN_OPEN === "true";

  // Si el panel está cerrado, mandamos TODO (menos /admin/login) a home
  if (!adminOpen && !isAdminLoginPath) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  // Sacamos el token (si hay sesión)
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // --- REGLA ESPECIAL PARA /admin/login ---
  if (isAdminLoginPath) {
    // Si YA es admin, no tiene sentido ver el login -> directo al panel
    if (token && (token as any).role === "admin") {
      const url = new URL("/admin", req.url);
      return NextResponse.redirect(url);
    }

    // Si no está logeado o no es admin, puede ver tranquilamente el login admin
    return NextResponse.next();
  }

  // --- A partir de aquí: cualquier /admin/** distinto de /admin/login ---

  // 1) No autenticado -> mandar a /admin/login
  if (!token) {
    const url = new URL("/admin/login", req.url);
    url.searchParams.set("from", pathname); // opcional, por si después lo usas
    return NextResponse.redirect(url);
  }

  const role = (token as any).role;

  // 2) Autenticado pero NO admin -> lo pateamos al login normal de clientes
  if (role !== "admin") {
    const url = new URL("/login", req.url);
    return NextResponse.redirect(url);
  }

  // 3) Admin válido -> pasa normal
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
