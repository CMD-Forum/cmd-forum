"use client";

import { BellIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";

/**
 * ## Alert
 * ---
 * @param type The type of alert. If unsure, think about the severity of what's happening in the alert.
 * @param style The style of the alert, can be  `subtle`, `left-accent` or `top-accent`.
 * @param children You should pass `<AlertTitle>` and/or `<AlertDescription>` for the children.
 * @param [className] Optionally provide CSS styling.
 * @example
 * <Alert type={"notice"} style={"subtle"}>
 *     <AlertTitle>Notice to all users.</AlertTitle>
 *     <AlertSubtitle>The website will be down for maintenance from 9:00am to 14:30pm GMT.</AlertSubtitle>
 * </Alert> 
 */

export default function Alert({ 
    type = "notice", 
    style = "subtle", 
    children, 
    className,
    closeBtn = true,
}: { 
    type: "notice" | "alert" | "success" | "error", 
    style?: "subtle" | "left-accent" | "top-accent", 
    children: React.ReactNode, 
    className?: string 
    closeBtn?: boolean
}) { 

    const [visible, setVisible] = useState(true);

    return (

        <div 
        className={`
            w-full ${style === "left-accent" ? "border-border border-[1px] border-l-8" : "" } ${style === "top-accent" ? "border-border border-1 border-t-8" : ""} transition-all 
            ${type === "notice" ? `${style === "left-accent" ? "border-l-white" : "" } ${style === "top-accent" ? "border-t-white" : "" } ${style === "subtle" ? "bg-card-light" : "" }` : ``} 
            ${type === "alert" ? `${style === "left-accent" ? "border-l-[#fb923c]" : "" } ${style === "top-accent" ? "border-t-[#fb923c]" : "" } ${style === "subtle" ? "bg-[#fb923c]/5" : "" }` : ``}
            ${type === "success" ? `${style === "left-accent" ? "border-l-[#4ade80]" : "" } ${style === "top-accent" ? "border-t-[#4ade80]" : "" } ${style === "subtle" ? "bg-[#4ade80]/5" : "" }` : ``} 
            ${type === "error" ? `${style === "left-accent" ? "border-l-[#ef4444]" : "" } ${style === "top-accent" ? "border-t-[#ef4444]" : "" } ${style === "subtle" ? "bg-[#ef4444]/5" : "" }` : ``} 
            rounded-md px-3 py-3 items-center
            ${className ? className : null}
            ${visible === true ? "" : "hidden"}
        `}
        >
            <div className="flex flex-row items-centre gap-3">
                
                {/* Notice */}
                { type === "notice" && <div className="w-5 !h-full"><BellIcon color="white" className="w-5 h-5" /></div> }

                {/* Alert */}
                { type === "alert" && <div className="w-5 !h-full"><ExclamationTriangleIcon color="#fb923c" className="w-5 h-5" /></div>}

                {/* Success */}
                { type === "success" && <div className="w-5 !h-full"><CheckCircleIcon color="#4ade80" className="w-5 h-5" /></div> }
                
                {/* Error */}
                { type === "error" && <div className="w-5 !h-full"><XCircleIcon color="#ef4444" className="w-5 h-5" /></div> }

                <div className="flex flex-col">
                    { children }       
                </div>      
                { closeBtn && <button className="navlink-ghost !px-1 !py-1 !w-7 !h-7 mt-auto mb-auto ml-auto" type="button" onClick={() => setVisible(false)}><XMarkIcon className="w-5 h-5" /></button> }
            </div>  
             
        </div>

    );

}

export const AlertTitle = ({ children, className = "", ...other }: { children: React.ReactNode, className?: string }) => (
    <p className={`text-white font-bold text-sm ${className ? className : null}`} {...other}>{ children }</p>   
)

export const AlertSubtitle = ({ children, className = "", ...other }: { children: React.ReactNode, className?: string }) => (
    <p className={`subtitle !leading-snug ${className ? className : null}`} {...other}>{ children }</p>   
)