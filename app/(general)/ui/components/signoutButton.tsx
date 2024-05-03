"use client"

import { signOut } from "next-auth/react"
import React from "react";

export default function LogoutButton({ className, children }: { className: string, children: React.ReactNode }) {

    const onClick = () => {
        signOut();
    }

    return (
        <button onClick={onClick} className={className}>{children}</button>    
    );

} 