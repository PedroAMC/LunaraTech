// src/lib/auth/authOptions.ts
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Correos que tendrán rol admin (configúralos en .env como: ADMIN_EMAILS=a@b.cl,b@c.cl)
const adminEmails =
  process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) ?? [];

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    // Pantalla de login principal (clientes)
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      // Primera vez que se logea con Google
      if (account && profile) {
        const anyProfile = profile as any;

        const email = (anyProfile.email as string | undefined) ?? "";
        const isAdmin = adminEmails.includes(email);

        // Guardamos datos base del usuario
        (token as any).user = {
          name: anyProfile.name ?? "",
          email,
          image: anyProfile.picture ?? null,
        };

        // Marcamos rol
        (token as any).role = isAdmin ? "admin" : "user";
      }

      // Si por alguna razón aún no hay rol, asignamos user por defecto
      if ((token as any).role === undefined) {
        (token as any).role = "user";
      }

      return token;
    },

    async session({ session, token }) {
      // Pasamos el usuario del token a la sesión
      if ((token as any).user) {
        (session as any).user = (token as any).user;
      }

      // Pasamos también el rol
      if (!session.user) {
        // Por si acaso, aseguramos que exista
        (session as any).user = {};
      }

      (session as any).user.role = (token as any).role ?? "user";

      return session;
    },
  },
};

export default authOptions;
