"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { login } from "@/app/(general)/lib/actions/login";

import Alert, { AlertSubtitle, AlertTitle } from "../new_alert";
import { OAuthButtons } from "./oauth/OAuthButtons";

export default function LoginForm() {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [state, formAction] = useFormState(login, null);

    return ( 

        <form className="flex flex-col rounded-lg w-[100%] md:w-[50%] max-w-[600px]" action={formAction}>

            <div className="bg-card p-12 flex flex-col gap-2 rounded-t-md">
                <div className="flex flex-col">
                    <h2 className="!text-2xl md:text-3xl font-inter font-bold text-white">Login to CMD</h2>
                    <p className={`subtitle mb-2`}>Login to your existing CMD account, or use a third party provider.</p>                    
                </div>

                {state &&
                    <Alert type="error" closeBtn={false}>
                        <AlertTitle>Oops, something went wrong.</AlertTitle>
                        <AlertSubtitle>{state.error}</AlertSubtitle>
                    </Alert>                
                }

                {/* */}

                <label className="subtitle flex gap-1" htmlFor="username">Username</label>
                <input
                    className={`generic_field`}
                    id="username"
                    name="username"
                />

                {/* */}

                <label className="subtitle flex gap-1" htmlFor="password">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className={`generic_field w-full`}
                        id="password"
                        name="password"
                    />
                    <button onClick={() => setShowPassword(!showPassword)} type={"button"} className="absolute right-1 top-[3px] border-1 border-border hover:border-border-light hover:bg-border focus:border-border-light focus:bg-border rounded transition-all px-1 py-1 outline-none" aria-label={"Show the Password Field"}>{ showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" /> }</button>              
                </div>

                <Link href={"/forgot-password"} className="text-sm text-gray-300 hover:underline cursor-pointer w-fit mb-4">Forgot your password?</Link>  

                {/* */}

                <SubmitButton />

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

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} className="navlink-full !w-full h-[36px] justify-center">
            {pending ? <><img src="/spinner_black.svg" alt="Signing Up..." className="spinner"/>Logging In</>  : 'Login' }
        </button>        
    );
}