"use client";

import Link from "next/link";
import { useState } from "react"

export const Dropdown = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-card border-border border-[1px] rounded-md w-max h-max p-2 flex flex-col gap-2">
            { children }
        </div>
    );

}

Dropdown.Link = function DropdownLink ({ children, href }) {
    return (
        <Link href={href} className={`w-fit bg-card p-4 rounded-md hover:bg-border`}>{ children }</Link>
    );
}