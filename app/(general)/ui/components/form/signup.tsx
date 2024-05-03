'use client';

import React, { useState, useTransition } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import Alert from "../new_alert";
import { signup } from "@/app/(general)/lib/actions/signup";
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

        /*name: z
        
            .string()
            .min(2, {

                message: "Your name must be at least 2 characters."

            })
            .max(15, {
                
                message: "Your name must not be longer than 15 characters."
                
            }),*/

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

    })

function ErrorMessage(props: { message: string }) {

    return <p className="dark:text-red-300 text-sm facebookTheme:text-[11px]">{props.message}</p>;
    
}

export default function SignupForm () {

    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isLoading, setIsLoading] = useState(false);

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

        setError("");
        setSuccess("");

        startTransition(() => {
            signup(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        });
    };

    return ( 

        <form className="flex flex-col gap-2 bg-background rounded-lg w-[80%] md:w-[50%] max-w-xl" onSubmit={form.handleSubmit(onSubmit)}>

            <h2 className="header !text-4xl text-center">Signup for CMD.</h2>
            <p className={`text-gray-300 font-bold text-center mb-2`}>Signup for an account with CMD/&gt;.</p>

            <Link href={"/login"} className="text-center text-sm text-gray-300 hover:underline cursor-pointer">Already have an account?</Link>

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

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">Username<p className="text-[#fca5a5]">*</p></div>
            <input
                {...form.register('username')}
                disabled={isPending}
                placeholder="john_doe"
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

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">Email<p className="text-[#fca5a5]">*</p></div>
            <input
                {...form.register('email')}
                disabled={isPending}
                placeholder="johndoe@example.com"
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
                placeholder="********"
                className={`generic_field ${form.formState.errors.email ? "errored" : ""}`}
            />

            {form.formState.errors.password && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.password.message} />

            )}

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">Confirm Password<p className="text-[#fca5a5]">*</p></div>
            <input
                type="password"
                {...form.register('confirmpassword')}
                disabled={isPending}
                placeholder="********"
                className={`generic_field ${form.formState.errors.confirmpassword ? "errored" : ""}`}
            />

            {form.formState.errors.confirmpassword && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.confirmpassword.message} />

            )}

            {/* */}

            <button disabled={!form.formState.isValid || isPending} type="submit" className="navlink-full !w-full h-[36px] justify-center">
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {isPending ? <img src="/spinner.svg" alt="Loading..." className="spinner"/>  : 'Signup' }
                
            </button>

            <div className="flex flex-row relative mt-4 mb-4">
                <span className="w-full border-b-1 border-border"></span>
                <p className="absolute right-[50%] bottom-0 px-2 bg-background translate-x-2/4 translate-y-2/4 text-sm text-gray-300">OR SIGNUP WITH</p>
            </div>

            <div className="flex flex-col gap-2">

                <OAuthButtons width_full={true} />

            </div>

        </form>
    
    );
    
}