"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";

export default function LargeDropdown( { children, title, description }: { children: React.ReactNode, title: string, description: string } ) {

    const [ expanded, setExpanded ] = useState<boolean>();

    return (
        <div className='flex flex-col border-1 border-border rounded-md pt-6'>

            <div className="px-6">
                <h3 className='font-bold text-xl'>{ title }</h3>     
                <p className='text-sm'>{ description }</p>
            </div>

            <div className={`w-full border-t-1 border-border mt-6 px-6 max-h-0 ${ expanded ? "max-h-screen" : ""} overflow-hidden`}>
                <div className={`w-full py-6`}>
                    { children }    
                </div> 
            </div>
            
            <div className='flex flex-col bg-card md:flex-row py-3 px-6 justify-between gap-3 items-center w-full'>

                <button className="navlink !px-2" onClick={() => setExpanded(!expanded)}>{ expanded ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" /> }</button>                 

            </div>

        </div>
    );

}