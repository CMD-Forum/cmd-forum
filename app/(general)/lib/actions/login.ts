

import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import * as z from "zod";

import { defaultLoginRedirect } from "@/routes";

import { LoginSchema } from "../schemas";

export async function login(values: z.infer<typeof LoginSchema>,) {

        console.warn('Entering login function');
        console.warn('Execution context:', typeof window === 'undefined' ? 'server' : 'client');

        const validatedFields = LoginSchema.safeParse(values);    
        console.log('Validation successful:', validatedFields);

        if ( ! validatedFields.success ) {

            return { error: "Invalid fields!" };

        }

        const { email, password } = validatedFields.data;

        try {

            await signIn("credentials", {
                email,
                password,
                redirectTo: defaultLoginRedirect,
            });

        } catch ( error ) {

            if ( error instanceof AuthError ) {
                switch ( error.type ) {
                    case "CredentialsSignin":
                        return { error: "The username or password is incorrect." }
                    case "AdapterError" || "MissingAdapter" || "MissingAdapterMethods":
                        return { error: "The database is currently experiencing issues, please try again later." }
                    case "CallbackRouteError":
                        return { error: "The login failed to proceed. If you're using an external service such as GitHub, try making an account locally." }
                    case "InvalidCallbackUrl":
                        return { error: "The CallbackUrl was invalid. Make sure your browser allows cookies and doesn't change them." }
                    case "InvalidCheck":
                        return { error: "The login failed to proceed as some checks could not be performed. Make sure your browser isn't blocking cookies." }
                    case "InvalidEndpoints":
                        return { error: "Login via external providers is currently unavailable due to system issues." }
                    case "InvalidProvider":
                        return { error: "The system failed to recognise your authentication provider. Please retry the login process." }
                }
            }

            throw error;

        }

}