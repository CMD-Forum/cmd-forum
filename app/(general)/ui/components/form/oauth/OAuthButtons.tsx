"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

interface OAuthButtonsProps {
    width_full: boolean
}

export function OAuthButtons( props: OAuthButtonsProps ) {

    return (
        <div className="flex flex-col gap-2">
            <Link href={"/login/github"} className={`${props.width_full === true ? "!w-full justify-center" : ""} navlink`} type="button"><FaGithub className="w-5 h-5" />Login with GitHub</Link>    
        </div>
    );

}