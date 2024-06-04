"use client";

import { KeyIcon } from "@heroicons/react/16/solid";
import { signIn, useSession } from "next-auth/react";
import { signIn as WebAuthnSignIn } from "next-auth/webauthn"
import { FaGithub } from "react-icons/fa6";

import { defaultLoginRedirect } from "@/routes";

interface OAuthButtonsProps {
    width_full: boolean
}

export function OAuthButtons( props: OAuthButtonsProps ) {

    const onClick = ( provider: "github" ) => {
        signIn(provider, {
            callbackUrl: defaultLoginRedirect
        })
    }

    const { data: session, update, status } = useSession();

    return (
        <div className="flex flex-col gap-2">
            <button className={`${props.width_full === true ? "!w-full justify-center" : ""} navlink`} type="button" onClick={() => onClick("github")}><FaGithub className="w-5 h-5" />GitHub</button>    
            {status === "authenticated" ? (
                <button onClick={() => WebAuthnSignIn("passkey", { action: "register" })} className="navlink !w-full !justify-center" type="button">
                    <KeyIcon className="w-5 h-5" />
                    Register new Passkey
                </button>
            ) : status === "unauthenticated" ? (
                <button onClick={() => WebAuthnSignIn("passkey")} className="navlink !w-full !justify-center" type="button">
                    <KeyIcon className="w-5 h-5" />
                    Sign in with Passkey
                </button>
            ) : null
            }
        </div>
    );

}