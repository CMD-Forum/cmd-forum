"use client";

import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function Banner({ message, fixedAtTop }: { message: string, fixedAtTop: boolean }) {

    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div className={`flex flex-row w-full bg-border items-center justify-center p-2 px-4 subtitle gap-2 z-[39] ${fixedAtTop ? "fixed" : ""}`}>
                <ExclamationTriangleIcon className="w-5 h-5"/>{ message }
                <button onClick={() => setVisible(false)} className="border-0 rounded-md focus:ring-2 ring-white transition-all p-1 ml-auto"><XMarkIcon className="w-5 h-5"/></button>
            </div>         
        );        
    }

}