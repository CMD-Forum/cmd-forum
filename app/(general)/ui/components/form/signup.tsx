'use client';

import React, { useState, useTransition } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import Alert from "../new_alert";
import { signup } from "@/app/(general)/lib/actions/signup";

export const SignupSchema = z.

    object({

        username: z

            .string()
            .min(2, {

                message: "Your username must be at least 2 characters."

            })
            .max(20, {

                message: "Your username must be no longer than 20 characters."

            }),

        name: z
        
            .string()
            .min(2, {

                message: "Your name must be at least 2 characters."

            })
            .max(20, {
                
                message: "Your name must not be longer than 20 characters."
                
            }),

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

const SignupForm = () => {

    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof SignupSchema>>({

        resolver: zodResolver(SignupSchema),
        defaultValues: {
            username: '',
            name: '',
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

        <form className="flex flex-col gap-2 bg-zinc-950 px-10 py-10 rounded-lg facebookTheme:bg-white max-w-3xl sm:w-[505px] ml-auto" onSubmit={form.handleSubmit(onSubmit)}>

            <h2 className="header">Signup for CMD.</h2>

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

            <Link href="/login" className="w-fit hover:underline text-gray-300">Already have an account?</Link>            

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">Username<p className="text-[#fca5a5]">*</p></div>
            <input
                {...form.register('username')}
                disabled={isPending}
                placeholder="Username"
                className={`generic_field ${form.formState.errors.username ? "errored" : ""}`}
            />

            {form.formState.errors.username && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.username.message} />

            )}

            {/* */}

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">Name<p className="text-[#fca5a5]">*</p></div>
            <input
                {...form.register('name')}
                disabled={isPending}
                placeholder="Name"
                className={`generic_field ${form.formState.errors.name ? "errored" : ""}`}
            />

            {form.formState.errors.name && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.name.message} />

            )}

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

            <div className="flex gap-1 facebookTheme:text-[11px] font-medium">Confirm Password<p className="text-[#fca5a5]">*</p></div>
            <input
                type="password"
                {...form.register('confirmpassword')}
                disabled={isPending}
                placeholder="Confirm Password"
                className={`generic_field ${form.formState.errors.confirmpassword ? "errored" : ""}`}
            />

            {form.formState.errors.confirmpassword && (

                // @ts-expect-error
                <ErrorMessage message={form.formState.errors.confirmpassword.message} />

            )}

            {/* */}

            <button disabled={!form.formState.isValid || isPending} type="submit" className="navlink-full !w-full sm:!w-[70px] h-[36px] justify-center min-w-[62px]">
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {isPending ? <img src="/spinner.svg" alt="Loading..." className="spinner"/>  : 'Signup' }
                
            </button>
            {/* */}

            {/*<pre>Validation status: {JSON.stringify(zo.validation, null, 2)}</pre>*/}

        </form>
    
    );
    
}


export default SignupForm;