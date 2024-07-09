"use client";

import { ArrowLeftEndOnRectangleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FaGithub } from "react-icons/fa6";

import { signup } from "@/app/(general)/lib/actions/signup";

import Dialog from "../dialog/dialog";
import Alert, { AlertSubtitle, AlertTitle } from "../new_alert";

export default function SignupForm () {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [state, formAction] = useFormState(signup, null);

    return ( 
        // @ts-ignore
        <form className="flex flex-col w-[100%] max-w-[600px]" action={formAction}>
            <div className="bg-transparent flex flex-col gap-2">
                <h2 className="!text-2xl md:text-3xl font-inter font-bold text-white">Signup for Command</h2>

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
                    <button onClick={() => setShowPassword(!showPassword)} type={"button"} className="absolute right-1 top-[3px] navlink !px-1 !py-1 !rounded outline-none" aria-label={"Show the Password Field"}>{ showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" /> }</button>              
                </div>

                {/* */}

                <SubmitButton />
            </div>

            <hr className="my-4" />

            <div className="bg-transparent">
                <div className="flex flex-col md:flex-row gap-1">
                    <Dialog>
                        <Dialog.Trigger><button className="navlink-ghost !text-gray-300 !w-full md:!w-fit !justify-center"><FaGithub className="w-5 h-5" />Login with GitHub</button></Dialog.Trigger>
                        <Dialog.Content>
                            <Dialog.Title>Login with GitHub?</Dialog.Title>
                            <Dialog.Subtitle>This will make your GitHub profile details visible to anyone on this site. You may be asked for confirmation.</Dialog.Subtitle>
                            <Dialog.ButtonContainer>
                                <Dialog.CloseButton><button className="navlink">Cancel</button></Dialog.CloseButton>
                                <Link href={"/login/github"} className="navlink-full" aria-label="Login with GitHub">Login with GitHub</Link>
                            </Dialog.ButtonContainer>
                        </Dialog.Content>
                    </Dialog>
                    <Link href={"/login"} className="navlink-ghost !text-gray-300 !w-full md:!w-fit !justify-center"><ArrowLeftEndOnRectangleIcon className="w-5 h-5" />Login</Link>
                </div>
            </div>
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} className="navlink-full !w-full h-[36px] justify-center mt-2">
            {pending ? <><img src="/spinner_black.svg" alt="Signing Up..." className="spinner"/>Signing Up</>  : 'Sign Up' }
        </button>        
    );
}