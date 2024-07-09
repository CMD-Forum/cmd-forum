"use client";

import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useState } from "react";

export default function Banner({ message, fixedAtTop, learnMoreEnabled = false, learnMoreLink = "/" }: { message: string, fixedAtTop: boolean, learnMoreEnabled?: boolean, learnMoreLink?: string }) {

    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div className={`flex flex-row w-full bg-border items-center justify-center p-2 px-4 subtitle gap-2 z-[39] ${fixedAtTop ? "fixed" : ""}`}>
                <ExclamationTriangleIcon className="w-5 h-5"/>{ message }
                { learnMoreEnabled ? <Link href={learnMoreLink} className="hover:underline">Learn More.</Link> : null }
                <button onClick={() => setVisible(false)} className="border-1 !border-transparent rounded-lg focus:border-1 focus:!border-border-light focus-visible:outline-none transition-all p-1 ml-auto"><XMarkIcon className="w-5 h-5"/></button>
            </div>         
        );        
    }

}