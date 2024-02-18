"use client";

import { defaultLoginRedirect } from "@/routes";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa6";

interface OAuthButtonsProps {
    width_full: boolean
}

export function OAuthButtons( props: OAuthButtonsProps ) {

    const onClick = ( provider: "github" ) => {
        signIn(provider, {
            callbackUrl: defaultLoginRedirect
        })
    }

    return (

        <button className={`${props.width_full === true ? "!w-full justify-center" : ""} navlink`} type="button" onClick={() => onClick("github")}><FaGithub className="w-5 h-5" />Login with GitHub</button>

    );

}