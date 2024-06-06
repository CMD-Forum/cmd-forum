import bcrypt from "bcryptjs";
import * as z from "zod";

import { SignupSchema } from "../../ui/components/form/signup";

export const signup = async (values: z.infer<typeof SignupSchema>) => {

    const validatedFields = SignupSchema.safeParse(values);

    if ( ! validatedFields.success ) {
        return { error: "Invalid fields!" };
    }

    const { username, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await fetch('/api/account/createAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                "email": email,
                "username": username,
                "name": "",
                "password": hashedPassword
            })
        })
    } catch ( error ) {
        return { error: "Something went wrong on our end, please try again later." }
    }

    return { success: "Your account has been created." };
}