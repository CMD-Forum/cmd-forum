import * as z from "zod";

export const LoginSchema = z.object({

    email: z.string().min(1, "Email is required.").email("Email must be in a valid format."),
    password: z.string().min(1, "Password is required.")

})

export const UpdateUsernameSchema = z.object({

    userID: z.string(),
    username: z
        .string()
        .min(2, "Your username must be at least 2 characters.")
        .max(15, "Your username must be no longer than 15 characters.")
        .regex(/^[a-zA-Z0-9_-]+$/, "Your username must only contains letters, numbers, underscores and hyphens."),

})