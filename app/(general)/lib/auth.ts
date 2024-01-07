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

                    },

                    select: {

                        id: true,
                        email: true,
                        username: true,
                        password: true,
                        createdAt: true,
                        updatedAt: true,
                        name: true,
                        profile_image: true

                    },

                })

                // console.log("existingUser: ", existingUser);

                if ( ! existingUser ) {

                    return null;

                }

                const passwordMatch = await compare(credentials.password, existingUser.password);

                if ( ! passwordMatch ) {

                    return "Password is incorrect.";

                }

                return {

                    id: `${existingUser.id}`,
                    username: existingUser.username,
                    email: existingUser.email,
                    name: existingUser.name,
                    profile_image: existingUser.profile_image

                }

            }

        })
    ],

    callbacks: {

        async jwt({ token, user }) {

            // console.log("User in JWT Callback: ", user);

            if ( user ) {

                return {

                    ...token,
                    username: user.username,
                    name: user.name,
                    profile_image: user.profile_image,

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
                    profile_image: token.profile_image,

                }

            }

        },

        async signIn({ user, account, profile, email, credentials }) {

            return true

        },

        async redirect({ url, baseUrl }) {

            return baseUrl
            
        }

    }

}