"use client";

import { cubicBezier, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { MouseEventHandler } from "react";
import { useState } from "react";
import type { Route } from 'next';

import {
    useFloating,
    autoUpdate,
    shift,
    useClick,
    useDismiss,
    useRole,
    useInteractions,
    FloatingFocusManager,
    Placement,
} from '@floating-ui/react';

/**
 * ## Menu
 * ---
 * @param [defaultPlacement] Where the menu is aligned to the button.
 * @param trigger The component that triggers the menu.
 * @param children Children to be passed.
 * @param [className] Optional, className(s) to be passed.
 * @example
 *  <Menu
        trigger={<button className='navlink !px-2'>Menu</button>}
    >
        <MenuLink text={"Item a"} icon={null} link={`/example-a`} />
        <MenuLink text={"Item b"} icon={null} link={`/example-b`} />
        <hr className='mt-1 !mb-1'/>
        <MenuLink text={"Item c"} icon={null} link={`/example-c`} />
    </Menu> 
 */

export default function Menu({ 
    defaultPlacement = "bottom-end", 
    trigger,
    children,
    className,
}: { 
    defaultPlacement?: Placement, 
    trigger: React.ReactNode,
    children: React.ReactNode, 
    className?: string,
}) {

    const [open, setIsOpen] = useState<boolean>(false);

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

                <>
                    {/* @ts-ignore */}
                    {React.cloneElement(trigger, {
                        onClick: () => setIsOpen(!open),
                        ref: refs.setReference,
                        "data-navlink-enabled": open ? "true" : "false" ,
                        ...getReferenceProps()
                    })}
                </>

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

/**Menu Link
 * Menu item that's a NextJS link component.
 * @param text The label of the link, appears beside the icon if given.
 * @param [icon]
 */

export const MenuLink = <T extends string>({ text, icon, link }: { text: string, icon?: React.ReactElement | null, link: Route<T> | URL  }) => {

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

export const MenuButton = ({ text, icon, onClick, destructive }: { text: string, icon: React.ReactElement, onClick: MouseEventHandler<HTMLButtonElement>, destructive?: boolean }) => {

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

export const MenuItem = ({ text, icon }: { text: string, icon: React.ReactElement | null }) => {

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

export const MenuUser = () => {

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

export const MenuShare = ({ title, text, url, icon }: { title: string, text: string, url: string, icon: React.ReactElement }) => {

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

export const MenuCustom = ({ children, className }: { children: React.ReactNode | React.ReactElement, className?: string }) => {

    return (
        <div 
            className={`${className ? className : null} hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden rounded-md`}
        >
            { children }
        </div>
    );

}