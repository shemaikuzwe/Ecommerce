import NextAuth, { DefaultSession } from "next-auth";
import { Role } from "@prisma/client";
import "next-auth/jwt";
declare module "next-auth" {
  interface User {
    role: Role;
  }
  interface Session {
    user: {
      role: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
  }
}
