import * as z from "zod";

export const LoginSchema = z.object({

    email: z.string().min(1, "Email is required.").email("Email must be in a valid format."),
    password: z.string().min(1, "Password is required.")

})