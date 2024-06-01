"use client";

import { AnimatePresence, cubicBezier, easeIn, easeInOut, easeOut, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { MouseEventHandler, useEffect, useRef } from "react";
import { useState } from "react";
import type { Route } from 'next'

import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
    FloatingFocusManager,
    Placement,
    FloatingList,
    useListNavigation,
    useTypeahead,
} from '@floating-ui/react';
import { ChevronDownIcon } from "@heroicons/react/16/solid";

/**
 * Dropdown
 * @param {boolean} [defaultPlacement] Where the dropdown is aligned to the button.
 * @param {React.ReactNode} children Children to be passed.
 * @param {boolean} [accountHeading] If set to true, replaces the dropdown button with the information of the currently signed in user.
 * @param {string} [headerText]
 * @param {React.ReactNode} [headerIcon]  
 * @param {string} [className]
 * @param {string} [headerClassName]
 */

export default function Dropdown({ 
    defaultPlacement = "bottom-end", 
    children, 
    accountHeading = false, 
    headerText, 
    headerIcon, 
    className, 
    headerClassName,
    chevronIcon = true,
}: { 
    defaultPlacement?: Placement, 
    children: React.ReactNode, 
    accountHeading?: boolean, 
    headerText?: string | React.ReactNode, 
    headerIcon?: React.ReactNode, 
    className?: string, headerClassName?: string,
    chevronIcon?: boolean, 
}) {

    const [open, setIsOpen] = useState<boolean>(false);
    const { data: session } = useSession();

    const {refs, floatingStyles, context} = useFloating({
        open: open,
        onOpenChange: setIsOpen,
        middleware: [shift()],
        whileElementsMounted: autoUpdate,
        placement: defaultPlacement,
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);
   
    const {getReferenceProps, getFloatingProps} = useInteractions([
      click,
      dismiss,
      role,
    ]);

    const easing = cubicBezier(0,0,0,1);

    return (
        <>
            <div className="w-fit">
                { accountHeading === true ? (
                    <>
                        {session && (
                            <button 
                                className={`navlink ${headerClassName ? headerClassName : ""} !p-0 !border-0 !mt-0 flex !font-medium !bg-transparent`}
                                onClick={() => setIsOpen(!open)}
                                ref={refs.setReference}
                                {...getReferenceProps()}
                            >
                                {session.user.image 
                                    ?
                                    <img className={`w-[36px] h-[36px] transition-all border-1 border-border hover:brightness-75 ${open === true ? "brightness-75" : ""} rounded-md`} src={session.user.image} alt='Your Account Image' />
                                    :
                                    <img className={`w-[36px] h-[36px] transition-all border-1 border-border hover:brightness-75 ${open === true ? "brightness-75" : ""} rounded-md`} src="/images/favicon/favicon.svg" alt='Your Account Image' />
                                }
                            </button>
                        )}        
                    </>
                ) : (
                    <>
                        <button 
                            className={`navlink ${headerClassName} ${headerIcon && !headerText ? "!px-2" : ""} ${open ? "!bg-border" : ""} !mt-0 flex !font-medium`}
                            onClick={() => setIsOpen(!open)}
                            ref={refs.setReference}
                            {...getReferenceProps()}
                        >
                            { headerIcon ?
                                // @ts-ignore
                                React.cloneElement(headerIcon, {
                                    className: "w-5 h-5",
                                })
                                :
                                null
                            }       
                            { headerText ? headerText : null }
                            { chevronIcon ? <ChevronDownIcon className="w-4 h-4" /> : null }
                     
                        </button>
                    </>
                )}
                {open &&
                    <FloatingFocusManager context={context} modal={false}>
                        <div 
                            className="z-40 !max-w-fit !min-w-fit"
                            ref={refs.setFloating}
                            style={floatingStyles}   
                            {...getFloatingProps()}   
                        >               
                            {/* This animation was an attempt of copying the Fluent UI Menubutton, I think it looks good. */}
                            <motion.div 
                                className={`bg-card ${className ? className : ""} border-border border-1 rounded-md w-max h-max p-1 z-50 min-w-48 shadow-sm`}
                                initial={{ opacity: 1, y: -6 }}
                                animate={{ opacity: 1, y: 4 }}
                                exit={{ opacity: 1, y: -6 }}
                                transition={{ duration: 0.4, ease: easing }}
                            >
                                { children }
                            </motion.div>                                                               
                        </div>
                    </FloatingFocusManager>                        
                }
            </div>
        </>
    );
}

/**Dropdown Link
 * Dropdown item that's a NextJS link component.
 * @param {string} text The label of the link, appears beside the icon if given.
 * @param {string} [icon] 
 */

export const DropdownLink = <T extends string>({ text, icon, link }: { text: string, icon: React.ReactElement | null, link: Route<T> | URL  }) => {

    return (
        <Link 
            // @ts-ignore
            href={ link } 
            className="hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden hover:!text-white subtitle rounded-md"
        >
            { icon ? (
                React.cloneElement(icon, {
                    className: "!w-5 !h-5 !rounded",
                })
            ) : (
                null
            )}

            { text }

        </Link>
    );

}

export const DropdownButton = ({ text, icon, onClick, destructive }: { text: string, icon: React.ReactElement, onClick: MouseEventHandler<HTMLButtonElement>, destructive?: boolean }) => {

    return (
        <button 
            onClick={onClick}
            className={`hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden text-gray-300 hover:text-white ${destructive ? "hover:!text-red-400" : ""} rounded-md`}
        >
            {React.cloneElement(icon, {
                className: "w-5 h-5",
            })}               

            { text }
            
        </button>
    );

}

export const DropdownItem = ({ text, icon }: { text: string, icon: React.ReactElement | null }) => {

    return (
        <div 
            className="hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden text-gray-300 hover:text-white rounded-md"
        >
            { icon ? (
                React.cloneElement(icon, {
                    className: "w-5 h-5",
                })    
            ) : (
                null
            )}
          
            { text }
            
        </div>
    );

}

export const DropdownUser = () => {

    const { data: session } = useSession();

    if ( session ) {
        return (
            <Link 
                href={`/user/${session.user.username}`} 
                className="hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden hover:!text-white rounded-md"
            >
                <div className="flex flex-col max-w-48">
                    <span className="subtitle text-white !text-[15px]">{session?.user.username}</span>
                    <div className="overflow-hidden text-ellipsis max-w-48">
                        <span className="subtitle !text-[13px]">{session?.user.email}</span>      
                    </div>                    
                </div>
            </Link>
        );
    }

}

export const DropdownShare = ({ title, text, url, icon }: { title: string, text: string, url: string, icon: React.ReactElement }) => {

    return (
        <button 
            className="hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden text-gray-300 hover:text-white rounded-md"
            onClick={async () => await navigator.share({ title: title, text: text, url: url })}
        >
            {React.cloneElement(icon, {
                className: "w-5 h-5",
            })}
            Share
        </button>
    );
}

export const DropdownCustom = ({ children, className }: { children: React.ReactNode | React.ReactElement, className?: string }) => {

    return (
        <div 
            className={`${className ? className : null} hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden rounded-md`}
        >
            { children }
        </div>
    );

}