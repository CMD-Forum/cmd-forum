"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod" // Form Validation
import Alert, { AlertSubtitle, AlertTitle } from "../new_alert";
import { login } from "@/app/(general)/lib/actions/login";
import { useTransition } from "react";
import { LoginSchema } from "@/app/(general)/lib/schemas";
import { OAuthButtons } from "./oauth/OAuthButtons";
import { useSearchParams } from 'next/navigation'

function ErrorMessage(props: { message: string }) {
    return <p className="dark:text-red-300 text-sm">{props.message}</p>;
}

export default function LoginForm() {

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
                    // setSuccess(data?.success);
                })
        });
    };

    const searchParams = useSearchParams();
    const query_error = searchParams.get('error');

    return ( 

        <form className="flex flex-col gap-2 bg-background rounded-lg w-[80%] md:w-[50%] max-w-xl" onSubmit={form.handleSubmit(onSubmit)}>

            <h2 className="header !text-4xl text-center">Login to CMD</h2>
            <p className={`text-gray-300 font-bold text-center mb-2`}>Login to your existing CMD account.</p>

            <Link href={"/signup"} className="text-center text-sm text-gray-300 hover:underline cursor-pointer">Don&apos;t have an account?</Link>

            {/* */}

            {query_error === "OAuthCallbackError" ? <Alert type="error"><AlertTitle>Authentication Failed</AlertTitle><AlertSubtitle>The external provider cancelled the login, please try again.</AlertSubtitle></Alert> : null }
            {query_error === "OAuthSigninError" ? <Alert type="error"><AlertTitle>Authentication Failed</AlertTitle><AlertSubtitle>The login failed for an unknown reason, please try again.</AlertSubtitle></Alert> : null }
            {query_error === "AdapterError" ? <Alert type="error"><AlertTitle>Authentication Failed</AlertTitle><AlertSubtitle>The database is currently experiencing issues, please try again later.</AlertSubtitle></Alert> : null }
            {query_error === "CredentialsSignin" ? <Alert type="error"><AlertTitle>Authentication Failed</AlertTitle><AlertSubtitle>The username or password is incorrect.</AlertSubtitle></Alert> : null }
            {query_error === "AuthorizedCallbackError" ? <Alert type="error"><AlertTitle>Authentication Failed</AlertTitle><AlertSubtitle>The account does not exist or has not verified their email.</AlertSubtitle></Alert> : null }
            {query_error === "OAuthAccountNotLinked" ? <Alert type="error"><AlertTitle>Authentication Failed</AlertTitle><AlertSubtitle>The email of your OAuth provider account is already associated with an account that exists on Command.</AlertSubtitle></Alert> : null }

            {success ? (
                <Alert type='notice'>
                    <AlertTitle>{success}</AlertTitle>
                </Alert>
            ): (
                <pre></pre>
            )}

            {error ? (
                <Alert type='error'>
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            ): (
                <pre></pre>
            )}

    

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">Email<p className="text-[#fca5a5]">*</p></div>
            <input
                {...form.register('email')}
                disabled={isPending}
                placeholder="johndoe@example.com"
                className={`generic_field ${form.formState.errors.email ? "errored" : ""}`}
            />

            {form.formState.errors.email && (
                // @ts-ignore
                <ErrorMessage message={form.formState.errors.email.message} />
            )}

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">Password<p className="text-[#fca5a5]">*</p></div>
            <input
                type="password"
                {...form.register('password')}
                disabled={isPending}
                placeholder="********"
                className={`generic_field ${form.formState.errors.email ? "errored" : ""}`}
            />

            {form.formState.errors.password && (
                // @ts-ignore
                <ErrorMessage message={form.formState.errors.password.message} />
            )}

            {/* */}

            <button disabled={!form.formState.isValid || isPending} type="submit" className="navlink-full !w-full h-[36px] justify-center min-w-[62px]">     
                {isPending ? <img src="/spinner.svg" alt="Loading..." className="spinner"/>  : 'Login' }
            </button>
            {/* */}

            {/*<pre>Validation status: {JSON.stringify(zo.validation, null, 2)}</pre>*/}

            <div className="flex flex-row relative mt-4 mb-4">
                <span className="w-full border-b-1 border-border"></span>
                <p className="absolute right-[50%] bottom-0 px-2 bg-background translate-x-2/4 translate-y-2/4 text-sm text-gray-300">OR LOGIN WITH</p>
            </div>

            <div className="flex flex-col gap-2">
                <OAuthButtons width_full={true} />
            </div>

            <p className="text-center mt-4 text-sm text-gray-300">By logging in to CMD, you agree to the terms and conditions.</p>

        </form>
    
    );
    
}