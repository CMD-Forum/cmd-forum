"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod" // Form Validation
import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import React, { useState } from "react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { login } from "@/app/(general)/lib/actions/login";
import { LoginSchema } from "@/app/(general)/lib/schemas";

import Alert, { AlertSubtitle, AlertTitle } from "../new_alert";
import { OAuthButtons } from "./oauth/OAuthButtons";

function ErrorMessage(props: { message: string }) {
    return <p className="text-red-300 text-sm">{props.message}</p>;
}

export default function LoginForm() {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

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

        <form className="flex flex-col rounded-lg w-[100%] md:w-[50%] max-w-[600px]" onSubmit={form.handleSubmit(onSubmit)}>

            <div className="bg-card p-12 flex flex-col gap-2 rounded-t-md">
                <div className="flex flex-col">
                    <h2 className="!text-2xl md:text-3xl font-inter font-bold text-white">Login to CMD</h2>
                    <p className={`subtitle mb-2`}>Login to your existing CMD account, or use a third party provider.</p>                    
                </div>

                {/* */}

                {query_error === "OAuthCallbackError" ? <Alert type="error"><AlertTitle>Authentication Failed</AlertTitle><AlertSubtitle>The external provider cancelled the login, please try again.</AlertSubtitle></Alert> : null }
                {query_error === "OAuthSigninError" ? <Alert type="error"><AlertTitle>Authentication Failed</AlertTitle><AlertSubtitle>The login failed for an unknown reason, please try again.</AlertSubtitle></Alert> : null }
                {query_error === "AdapterError" ? <Alert type="error"><AlertTitle>Authentication Failed</AlertTitle><AlertSubtitle>The database is currently experiencing issues, please try again later.</AlertSubtitle></Alert> : null }
                {query_error === "CredentialsSignin" ? <Alert type="error"><AlertTitle>Authentication Failed</AlertTitle><AlertSubtitle>The username or password is incorrect.</AlertSubtitle></Alert> : null }
                {query_error === "AuthorizedCallbackError" ? <Alert type="error"><AlertTitle>Authentication Failed</AlertTitle><AlertSubtitle>The account does not exist or has not verified their email.</AlertSubtitle></Alert> : null }
                {query_error === "OAuthAccountNotLinked" ? <Alert type="error"><AlertTitle>Authentication Failed</AlertTitle><AlertSubtitle>The email of your external account is already associated with an account that exists on Command.</AlertSubtitle></Alert> : null }

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

                <div className="subtitle flex gap-1">Email<p className="text-[#fca5a5]">*</p></div>
                <input
                    {...form.register('email')}
                    disabled={isPending}
                    className={`generic_field ${form.formState.errors.email ? "errored" : ""}`}
                />

                {form.formState.errors.email && (
                    // @ts-ignore
                    <ErrorMessage message={form.formState.errors.email.message} />
                )}

                {/* */}

                <div className="subtitle flex gap-1">Password<p className="text-[#fca5a5]">*</p></div>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        {...form.register('password')}
                        disabled={isPending}
                        className={`generic_field ${form.formState.errors.email ? "errored" : ""} w-full`}
                    />
                    <button onClick={() => setShowPassword(!showPassword)} type={"button"} className="absolute right-1 top-[3px] border-1 border-border hover:border-border-light hover:bg-border focus:border-border-light focus:bg-border rounded-md transition-all px-1 py-1 outline-none" aria-label={"Show the Password Field"}>{ showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" /> }</button>              
                </div>

                {form.formState.errors.password && (
                    // @ts-ignore
                    <ErrorMessage message={form.formState.errors.password.message} />
                )}

                <Link href={"/forgot-password"} className="text-sm text-gray-300 hover:underline cursor-pointer w-fit mb-4">Forgot your password?</Link>  

                {/* */}

                <button disabled={!form.formState.isValid || isPending} type="submit" className="navlink-full !w-full h-[36px] justify-center min-w-[62px]">     
                    {isPending ? <img src="/spinner.svg" alt="Loading..." className="spinner"/>  : 'Login' }
                </button>
                {/* */}       

                <div className="flex flex-col gap-1 mt-4">
                    <Link href={"/signup"} className="text-center text-sm text-gray-300 hover:underline cursor-pointer">Don&apos;t have an account?</Link>                             
                </div>
      
            </div>

            <hr className="!mt-0 !mb-0 !p-0" />

            <div className="bg-card-light p-12 rounded-b-md">
                <div className="flex flex-col gap-2">
                    <OAuthButtons width_full={true} />
                </div>      
                <p className="text-center mt-4 text-sm text-gray-300">By logging in to CMD, you agree to the terms and conditions.</p>         
            </div>

        </form>
    
    );
    
}