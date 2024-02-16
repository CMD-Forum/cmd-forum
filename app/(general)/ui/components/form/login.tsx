"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod" // Form Validation
import GoogleSignInButton from "./oauth/GoogleSignInButton";
import MicrosoftSignInButton from "./oauth/MicrosoftSignInButton";
import Alert from "../new_alert";
import { login } from "@/app/(general)/lib/actions/login";
import { useTransition } from "react";

export const LoginSchema = z.object({

    email: z.string().min(1, "Email is required.").email("Email must be in a valid format."),
    password: z.string().min(1, "Password is required.")

})

function ErrorMessage(props: { message: string }) {

    return <p className="dark:text-red-300 text-sm">{props.message}</p>;
    
}

const LoginForm = () => {

    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({

        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },

    });


    const onSubmit = (values: z.infer<typeof LoginSchema>) => {

        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
        });
    };

    return ( 

        <form className="flex flex-col gap-2 bg-zinc-950 px-10 py-10 rounded-lg facebookTheme:bg-white max-w-3xl sm:w-[505px] ml-auto" onSubmit={form.handleSubmit(onSubmit)}>

            <h2 className="header">Login to CMD.</h2>

            <hr className="border-border facebookTheme:border-[#b3b3b3] mb-2 mt-2" /> 

            {/* */}

            {success ? (

                <Alert type='notice' title='Signup Success' description={success} />

            ): (

                <pre></pre>

            )}

            
            {error ? (

                <Alert type='error' title='Login Failed' description={error} />

            ): (

                <pre></pre>

            )}

            <Link href="/signup" className="w-fit hover:underline text-gray-300">Don&apos;t have an account?</Link>            

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">Email<p className="text-[#fca5a5]">*</p></div>
            <input
                {...form.register('email')}
                disabled={isPending}
                placeholder="Email"
                className={`generic_field ${form.formState.errors.email ? "errored" : ""}`}
            />

            {form.formState.errors.email && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.email.message} />

            )}

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">Password<p className="text-[#fca5a5]">*</p></div>
            <input
                type="password"
                {...form.register('password')}
                disabled={isPending}
                placeholder="Password"
                className={`generic_field ${form.formState.errors.email ? "errored" : ""}`}
            />

            {form.formState.errors.password && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.password.message} />

            )}

            {/* */}

            <button disabled={!form.formState.isValid || isPending} type="submit" className="navlink-full !w-full sm:!w-[60px] h-[36px] justify-center min-w-[62px]">
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {isPending ? <img src="/spinner.svg" alt="Loading..." className="spinner"/>  : 'Login' }
                
            </button>
            {/* */}

            {/*<pre>Validation status: {JSON.stringify(zo.validation, null, 2)}</pre>*/}

            <hr className="border-border mb-2"></hr>

            <div className="flex flex-col gap-2">
    
                <GoogleSignInButton>Login with Google</GoogleSignInButton>    
                <MicrosoftSignInButton>Login with Microsoft</MicrosoftSignInButton>  

            </div>

        </form>
    
    );
    
}

export default LoginForm;