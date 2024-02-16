/**
 * This file is the main configuration for NextAuth.
 * Anything below ``session`` is copy-pasted from auth.config.ts, as having it in a seperate file would cause some webpack error that I couldn't fix.
 * Credit to "Code With Antonio" (https://www.youtube.com/watch?v=1MTyCvS05V4) on YouTube. NextAuth is ridiculous to setup, thank god someone understands it.
 */

// import authConfig from "./auth.config" // See line 2 of top comment.
import { prisma } from "./app/(general)/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./app/(general)/ui/components/form/login";
import { getUserByEmail } from "./app/(general)/lib/data";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
    // @ts-ignore: Why did I use TypeScript for this project without understanding it?
    debug: true,
    pages: {
        signIn: "/login",
        error: "/error"
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
      Credentials({
          // @ts-ignore: See above ts-ignore. Will fix at some point (never).
          async authorize(credentials) {

              const validatedFields = LoginSchema.safeParse(credentials)

              if ( validatedFields.success ) {

                  const { email, password } = validatedFields.data;
                  const user = await getUserByEmail( email );

                  if ( ! user || ! user.password ) return null;

                  const passwordsMatch = await bcrypt.compare(

                      password,
                      user.password,

                  );

                  if ( passwordsMatch ) return user;

              }

              return null;

          },
      })
  ],
});