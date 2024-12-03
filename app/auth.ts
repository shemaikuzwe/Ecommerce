import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {PrismaClient} from "@prisma/client";
import credentials from "next-auth/providers/credentials";

import {getUser} from "@/lib/action/server";

const prisma = new PrismaClient();
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        return await getUser(
            credentials.email as string,
            credentials.password as string
        );
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role=token.role
      return session;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isAdmin = auth?.user.role === "ADMIN";
      const isOnHome = nextUrl.pathname === "/";
      if (isOnLogin && isLoggedIn) {
        if (isAdmin) {
          return Response.redirect(new URL("/admin", nextUrl));
        }
        return Response.redirect(new URL("/", nextUrl));
      } else if (isOnAdmin) {
        if (!isLoggedIn || !isAdmin)
          return Response.redirect(new URL("/login", nextUrl));
        return true;
      } else if (isOnHome && isAdmin) {
      return Response.redirect(new URL("/admin", nextUrl));
      }
      return true;
    },
  },
});
