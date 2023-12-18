"use client";

import { 

    ArrowLeftOnRectangleIcon,
    Bars2Icon 

} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function LogoutButton() {

    return (

        <button className='navlink topnavlink' onClick={() => signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/login`,
            })
        }>
        <ArrowLeftOnRectangleIcon className="font-medium h-5 w-5" /><p>Logout</p></button> 

    );

}