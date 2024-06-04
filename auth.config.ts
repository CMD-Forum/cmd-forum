import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "@/app/(general)/lib/data";

import { LoginSchema } from "./app/(general)/lib/schemas";

export default {
    providers: [
        Credentials({
            async authorize(credentials, request) {

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
} satisfies NextAuthConfig