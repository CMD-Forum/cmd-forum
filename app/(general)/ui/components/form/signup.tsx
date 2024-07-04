"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { signup } from "@/app/(general)/lib/actions/signup";

import Alert, { AlertSubtitle, AlertTitle } from "../new_alert";
import { OAuthButtons } from "./oauth/OAuthButtons";
// import { OAuthButtons } from "./oauth/OAuthButtons";

export default function SignupForm () {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [state, formAction] = useFormState(signup, null);

    return ( 
        // @ts-ignore
        <form className="flex flex-col rounded w-[100%] lg:w-[50%] max-w-[600px]" action={formAction}>
            <div className="bg-card p-6 lg:p-12 flex flex-col gap-2 rounded-t">
                <div className="flex flex-col">
                    <h2 className="!text-2xl md:text-3xl font-inter font-bold text-white">Signup for Command</h2>
                    <p className={`subtitle mb-2`}>Signup for an account with Command, or use a third party provider.</p>
                </div>     

                {state &&
                    <Alert type="error" closeBtn={false}>
                        <AlertTitle>Oops, something went wrong.</AlertTitle>
                        <AlertSubtitle>{state.error}</AlertSubtitle>
                    </Alert>
                }

                {/* */}

                <label className="subtitle flex gap-1 w-fit" htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    className={`generic_field`}
                />

                {/* */}

                <label className="subtitle flex gap-1 w-fit" htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    className={`generic_field`}
                />

                {/* */}

                <label className="subtitle flex gap-1 w-fit" htmlFor="password">Password</label>
                <div className="relative">
                    <input
                        type={"password"}
                        id="password"
                        name="password"
                        className={`generic_field w-full`}
                    />
                    <button onClick={() => setShowPassword(!showPassword)} type={"button"} className="absolute right-1 top-[3px] border-1 border-border hover:border-border-light hover:bg-border focus:border-border-light focus:bg-border rounded transition-all px-1 py-1 outline-none" aria-label={"Show the Password Field"}>{ showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" /> }</button>              
                </div>

                <Link href={"/forgot-password"} className="text-sm text-gray-300 hover:underline cursor-pointer w-fit mb-4">Forgot your password?</Link>

                {/* */}

                <SubmitButton />

                <div className="flex flex-col gap-1 mt-4">
                    <Link href={"/login"} className="text-center text-sm text-gray-300 hover:underline cursor-pointer">Already have an account?</Link>                             
                </div>
            </div>

            <hr className="!mt-0 !mb-0 !p-0" />

            <div className="bg-card-light p-12 rounded-b">
                <div className="flex flex-col gap-2">
                    <OAuthButtons width_full={true} />
                </div>                
                <p className="text-center mt-4 text-sm text-gray-300">By signing up for Command, you agree to the site rules.</p>
            </div>
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} className="navlink-full !w-full h-[36px] justify-center">
            {pending ? <><img src="/spinner_black.svg" alt="Signing Up..." className="spinner"/>Signing Up</>  : 'Sign Up' }
        </button>        
    );
}