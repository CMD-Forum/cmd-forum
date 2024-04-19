/**
 * This file is the main configuration for NextAuth.
 * Anything below ``session`` is copy-pasted from auth.config.ts, as having it in a seperate file would cause some webpack error that I couldn't fix.
 * Credit to "Code With Antonio" (https://www.youtube.com/watch?v=1MTyCvS05V4) on YouTube. NextAuth is ridiculous to setup, thank god someone understands it.
 */

// import authConfig from "./auth.config" // See line 2 of top comment.
import { prisma } from "./app/(general)/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./app/(general)/lib/schemas";
import { getUserByEmail, getUserById } from "./app/(general)/lib/data";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";
import GitHub from "next-auth/providers/github";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}

interface NextAuthUserWithStringId extends ExtendedUser {
    id: string;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    // @ts-ignore
    debug: false,
    pages: {
        signIn: "/login",
        signOut: "/logout",
        error: "/login",
    },
    //@ts-ignore
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    callbacks: {

        async signIn({ user }) {
            // @ts-ignore
            const existingUser = await getUserById(user.id);

            /*if ( ! existingUser || existingUser.emailVerified === null ) {
                return false;
            }*/ // This is broken for OAuth, so is disabled for now.

            return true;
        },

        async session({ token, session, user }) {

            // @ts-ignore
            if (session.user) session.profile = token.profile;

            // console.log({ sessionToken: token})

            if (session.user && token.sub) {
                session.user.id = token.sub;    
            }

            if (session.user && token.role ) {
                session.user.role = token.role as UserRole;
            }

            if (session.user && token.picture) {
                session.user.profile_image = token.picture;
            }

            if (session.user && token.username) {
                // @ts-ignore
                session.user.username = token.username;
            }

            if (session.user && token.description) { 
                // @ts-ignore
                session.user.description = token.description;
            }

            if (session.user && token.usernameLastUpdated) { 
                // @ts-ignore
                session.user.usernameLastUpdated = token.usernameLastUpdated;
            }
            
            return session;
        },
        
        async jwt({ token, user, profile }) {

            if (user) token.user = user
            if (profile) token.profile = profile

            if ( ! token.sub) {
                return token;
            }

            const existingUser = await getUserById(token.sub);

            if ( ! existingUser ) {
                return token;
            }

            token.role = existingUser.role;
            token.picture = existingUser.image;
            token.username = existingUser.username;
            token.description = existingUser.description;
            token.usernameLastUpdated = existingUser.usernameLastUpdate;

            return token;
        }
    },
    providers: [
      GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        profile(profile) {
            return {
                id: profile.id.toString(),
                name: profile.name || profile.login,
                email: profile.email,
                image: profile.avatar_url,
                username: profile.login,
                description: profile.bio,
            } as unknown as NextAuthUserWithStringId;
          },
      }),
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
      }),
  ],
});