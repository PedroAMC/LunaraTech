// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

const handler = NextAuth(authOptions);

// NextAuth maneja GET y POST en esta ruta catch-all
export { handler as GET, handler as POST };
