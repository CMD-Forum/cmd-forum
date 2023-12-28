'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod" // Form Validation
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AlertWarning } from "../alert";

const FormSchema = z.object({

    email: z.string().min(1, "Email is required.").email("Your email must be in a valid format."),

    password: z.string().min(1, "Password is required.")

})

function ErrorMessage(props: { message: string }) {

    return <p className="dark:text-red-300 text-sm">{props.message}</p>;
    
}

const LoginForm = () => {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({

        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },

    });

    const OnSubmit = async (values: z.infer<typeof FormSchema>) => {

        setIsLoading(true);

        const signInData = await signIn('credentials', {

            email: values.email,
            password: values.password,
            redirect: false,

        });

        if (signInData?.error) {
            
            setError(signInData.error);
            setIsLoading(false);
            
        } else {

            setError(null);
            setIsLoading(false);
            window.location.replace('/');

        }

    };

    return ( 

        <form className="flex flex-col gap-2 bg-zinc-950 px-10 py-10 rounded-lg facebookTheme:bg-white" onSubmit={form.handleSubmit(OnSubmit)}>

            <h2 className="text-xl font-semibold facebookTheme:font-bold facebookTheme:text-[15px]">Login to CMD.</h2>

            <hr className="border-zinc-900 mt-1 mb-1 facebookTheme:border-[#b3b3b3] facebookTheme:mt-0"></hr>

            {/* */}

            <Link href="/signup" className="w-fit hover:underline text-gray-300">Don&apos;t have an account?</Link>


            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px]">Email<p className="text-[#fca5a5]">*</p></div>
            <input
                {...form.register('email')}
                placeholder="Email"
                className={`generic_field ${form.formState.errors.email ? "errored" : ""}`}
            />

            {form.formState.errors.email && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.email.message} />

            )}

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px]">Password<p className="text-[#fca5a5]">*</p></div>
            <input
                type="password"
                {...form.register('password')}
                placeholder="Password"
                className={`generic_field ${form.formState.errors.email ? "errored" : ""}`}
            />

            {form.formState.errors.password && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.password.message} />

            )}

            {/* */}

            <button disabled={!form.formState.isValid || isLoading} type="submit" className="navlink-full !w-full sm:!w-fit justify-center min-w-[62px]">
                
                {isLoading ? <img src="/spinner.svg" alt="Loading..." className="spinner"/>  : 'Login' }
                
            </button>
            {/* */}

            {/*<pre>Validation status: {JSON.stringify(zo.validation, null, 2)}</pre>*/}

            {error && <AlertWarning title="Login Failure" text={error} />}

        </form>
    
    );
    
}

export default LoginForm;