import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
export const { handlers, signIn, signout, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_SECRET,
      clientSecret: process.env.GOOGLE_ID,
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
