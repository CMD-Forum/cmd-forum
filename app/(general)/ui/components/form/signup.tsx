'use client';

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { signup } from "@/app/(general)/lib/actions/signup";

import Alert, { AlertTitle } from "../new_alert";
import { OAuthButtons } from "./oauth/OAuthButtons";

export const SignupSchema = z.
    object({
        username: z
            .string()
            .min(2, {

                message: "Your username must be at least 2 characters."

            })
            .max(25, {

                message: "Your username must be no longer than 25 characters."

            })
            .regex(/^[a-zA-Z0-9_-]+$/, "Your username must only contains letters, numbers, underscores and hyphens."),
        email: z      
            .string()
            .min(1, "Email is required.")
            .email("Your email must be in a valid format."),
        password: z
            .string()
            .min(1, "Password is required.")
            .min(8, "Password must have 8 characters"),
        confirmpassword: z
            .string()
            .min(1, "Please confirm your password.")
    })
    .refine((data) => data.password === data.confirmpassword, {
        path: ['confirmpassword'],
        message: "Passwords do not match."
    });

function ErrorMessage(props: { message: string }) {
    return <p className="text-red-300 subtitle">{props.message}</p>;
}

export default function SignupForm () {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = useState(false); // To be implemented at some point

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            username: '',
            // name: '',
            email: '',
            password: '',
            confirmpassword: '',
        },
    });

    const onSubmit = (values: z.infer<typeof SignupSchema>) => {
        setIsLoading(true);
        setError("");
        setSuccess("");
        startTransition(() => {
            signup(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                    setIsLoading(false);
                })
        });
    };

    return ( 

        <form className="flex flex-col rounded-lg w-[100%] md:w-[50%] max-w-[600px]" onSubmit={form.handleSubmit(onSubmit)}>

            <div className="bg-card p-12 flex flex-col gap-2 rounded-t-md">
                <div className="flex flex-col">
                    <h2 className="!text-2xl md:text-3xl font-inter font-bold text-white">Signup for CMD</h2>
                    <p className={`subtitle mb-2`}>Signup for an account with CMD, or use a third party provider.</p>                    
                </div>

                {/* */}

                {success ? (
                    <Alert type="success">
                        <AlertTitle>{success}</AlertTitle>
                    </Alert>
                ): (
                    <pre></pre>
                )}

                
                {error ? (
                    <Alert type="error">
                        <AlertTitle>{error}</AlertTitle>
                    </Alert>
                ): (
                    <pre></pre>
                )}         

                {/* */}

                <div className="flex gap-1 subtitle">Username<p className="text-[#fca5a5]">*</p></div>
                <input
                    {...form.register('username')}
                    disabled={isPending}
                    className={`generic_field ${form.formState.errors.username ? "errored" : ""}`}
                />

                {form.formState.errors.username && (
                    // @ts-expect-error
                    <ErrorMessage message={form.formState.errors.username.message} />
                )}

                {/* */}

                {/*<div className="flex gap-1 facebookTheme:text-[11px] font-medium">Name<p className="text-[#fca5a5]">*</p></div>
                <input
                    {...form.register('name')}
                    disabled={isPending}
                    placeholder="John Doe"
                    className={`generic_field ${form.formState.errors.name ? "errored" : ""}`}
                />

                {form.formState.errors.name && (

                    // @ts-expect-error
                    <ErrorMessage message={form.formState.errors.name.message} />

                )}

                */}
                {/* */}

                <div className="flex gap-1 subtitle">Email<p className="text-[#fca5a5]">*</p></div>
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

                <div className="flex gap-1 subtitle">Password<p className="text-[#fca5a5]">*</p></div>
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

                {/* */}

                <div className="flex gap-1 subtitle">Confirm Password<p className="text-[#fca5a5]">*</p></div>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        {...form.register('confirmpassword')}
                        disabled={isPending}
                        className={`generic_field ${form.formState.errors.email ? "errored" : ""} w-full`}
                    />
                    <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} type={"button"} className="absolute right-1 top-[3px] border-1 border-border hover:border-border-light hover:bg-border focus:border-border-light focus:bg-border rounded-md transition-all px-1 py-1 outline-none" aria-label={"Show the Confirm Password Field"}>{ showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" /> }</button>              
                </div>

                {form.formState.errors.confirmpassword && (
                    // @ts-ignore
                    <ErrorMessage message={form.formState.errors.confirmpassword.message} />
                )}

                {/* */}

                <button disabled={!form.formState.isValid || isPending} type="submit" className="navlink-full !w-full h-[36px] justify-center">
                    {isPending ? <img src="/spinner.svg" alt="Loading..." className="spinner"/>  : 'Signup' }
                </button>

                <div className="flex flex-col gap-1 mt-4">
                    <Link href={"/login"} className="text-center text-sm text-gray-300 hover:underline cursor-pointer">Already have an account?</Link>                             
                </div>
            </div>

            <hr className="!mt-0 !mb-0 !p-0" />

            <div className="bg-card-light p-12 rounded-b-md">
                <div className="flex flex-col gap-2">
                    <OAuthButtons width_full={true} />
                </div>                
                <p className="text-center mt-4 text-sm text-gray-300">By signing up for CMD, you agree to the terms and conditions.</p>
            </div>

        </form>
    
    );
    
}