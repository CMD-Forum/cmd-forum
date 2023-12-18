import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {

    debug: true,

    adapter: PrismaAdapter(prisma),

    secret: process.env.NEXTAUTH_SECRET,

    session: {

        strategy: 'jwt'

    },

    pages: {

        signIn: "/login",
        signOut: '/logout',
        error: '/login',
        newUser: '/new-user'

    },

    providers: [

        CredentialsProvider({

            name: "CMD",
            credentials: {
            email: { label: "Email", type: "email", placeholder: "johndoe@example.com" },
            password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {

                    return null;

                }

                const existingUser = await prisma.user.findUnique({

                    where: { 

                        email: credentials?.email 

                    }

                })

                if ( ! existingUser ) {

                    return null;

                }

                const passwordMatch = await compare(credentials.password, existingUser.password);

                if ( ! passwordMatch ) {

                    return null;

                }

                return {

                    id: `${existingUser.id}`,
                    username: existingUser.username,
                    email: existingUser.email,
                    name: existingUser.name,

                }

            }

        })
    ],

    callbacks: {

        async jwt({ token, user }) {

            if ( user ) {

                return {

                    ...token,
                    username: user.username,
                    name: user.name,

                }

            }

            return token
            
        },

        async session({ session, token }) {

            return {

                ...session,
                
                user: {

                    ...session.user,
                    username: token.username,
                    name: token.name,

                }

            }

        },

    }

}