"use client"

import React from "react";

import { logout } from "../../lib/logout";

export default function LogoutButton({ className, children }: { className: string, children: React.ReactNode }) {
    return (
        <form action={logout}>
            <button className={className} type="submit" aria-label="Logout">{children}</button>        
        </form>
    );
} 