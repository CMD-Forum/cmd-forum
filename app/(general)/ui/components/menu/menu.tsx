"use client";

import {
    autoUpdate,
    flip,
    FloatingFocusManager,
    offset,
    Placement,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
} from '@floating-ui/react';
import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import type { Route } from 'next';
import Link from "next/link";
import React, { MouseEventHandler, useContext, useEffect } from "react";
import { useState } from "react";

import { useSession } from "@/app/(general)/lib/sessioncontext";

import Dialog from '../dialog/dialog';
import MenuContext from './menuContext';

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
    children,
    defaultPlacement = "bottom-end"
}:{
    children: React.ReactNode
    defaultPlacement?: Placement,
}) {
    const [open, setIsOpen] = useState<boolean>(false);
    const {refs, floatingStyles, context} = useFloating({
        open: open,
        onOpenChange: setIsOpen,
        middleware: [shift(), flip(), offset(4)],
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
        <MenuContext.Provider value={{ open, setIsOpen, refs, floatingStyles, context, getReferenceProps, getFloatingProps, easing }}>
            { children }
        </MenuContext.Provider>
    );
}

export function MenuContent({ 
    children,
    className,
}: { 
    children: React.ReactNode,
    className?: string,
}) {
    const context = useContext(MenuContext);

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === 'Escape') {
                // @ts-ignore
                context.setIsOpen(false);
            }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [context])

    return (
        <>
            {/* @ts-ignore */}
            {context.open &&
                <AnimatePresence>
                    {/* @ts-ignore */}
                    <FloatingFocusManager context={context.context} modal={false}>
                        <div 
                            className="z-40 !max-w-fit !min-w-fit !p-0"
                            /* @ts-ignore */
                            ref={context.refs.setFloating}
                            /* @ts-ignore */
                            style={context.floatingStyles}   
                            /* @ts-ignore */
                            {...context.getFloatingProps()}   
                        >               
                            <motion.div 
                                className={`bg-card ${className ? className : ""} border-border border-1 rounded-lg w-full h-max p-1 z-50 min-w-48 shadow-md`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ ease: "backOut", duration: 0.2 }}
                            >
                                { children }
                            </motion.div>
                        </div>
                    </FloatingFocusManager>                    
                </AnimatePresence>
            }
        </>
    );
}

Menu.Content = MenuContent

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
            className="hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden hover:!text-white subtitle rounded-lg"
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

Menu.Link = MenuLink

export const MenuButton = ({ text, icon, onClick, destructive }: { text: string, icon: React.ReactElement, onClick: MouseEventHandler<HTMLButtonElement>, destructive?: boolean }) => {
    return (
        <button 
            onClick={onClick}
            className={`hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden text-gray-300 hover:text-white ${destructive ? "hover:!text-red-400" : ""} rounded-lg`}
        >
            {React.cloneElement(icon, {
                className: "w-5 h-5",
            })}               

            { text }
            
        </button>
    );
}

Menu.Button = MenuButton

export const MenuItem = ({ text, icon }: { text: string, icon?: React.ReactElement | null }) => {
    return (
        <div 
            className="hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden text-gray-300 hover:text-white rounded-lg"
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

Menu.Item = MenuItem

export const MenuUser = () => {
    const session = useSession();
    if ( session ) {
        return (
            <Link 
                href={`/user/${session.user?.username}`} 
                className="hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden hover:!text-white rounded-lg"
            >
                <div className="flex flex-col max-w-48">
                    <span className="subtitle text-white !text-[15px]">{session.user?.username}</span>
                    <div className="overflow-hidden text-ellipsis max-w-48">
                        <span className="subtitle !text-[13px]">{session.user?.email || null}</span>      
                    </div>                    
                </div>
            </Link>
        );
    }
}

Menu.User = MenuUser

export const MenuShare = ({ title, text, url, icon }: { title: string, text: string, url: string, icon: React.ReactElement }) => {
    
    if (navigator.share) {
        return (
            <button 
                className="hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden text-gray-300 hover:text-white rounded-lg"
                onClick={async () => await navigator.share({ title: title, text: text, url: url })}
            >
                {React.cloneElement(icon, {
                    className: "w-5 h-5",
                })}
                Share
            </button>
        );        
    } else {
        return (
            // This can cause scrolling to stop working (since the dialog might disappear because of the menu closing instead of the dialog closing)
            <Dialog>
                <Dialog.Trigger>
                    <button className="hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden text-gray-300 hover:text-white rounded-lg">
                        {React.cloneElement(icon, {
                            className: "w-5 h-5",
                        })}
                        Share
                    </button>
                </Dialog.Trigger>
                <Dialog.Content>
                    <Dialog.Title>Sharing is unsupported.</Dialog.Title>
                    <Dialog.Subtitle>Your browser does not support web sharing.</Dialog.Subtitle>
                    <Dialog.ButtonContainer>
                        <Dialog.CloseButton><button className='navlink'>Close</button></Dialog.CloseButton>    
                    </Dialog.ButtonContainer>
                </Dialog.Content>
            </Dialog>
        );
    }

}

Menu.Share = MenuShare

export const MenuCustom = ({ children, className }: { children: React.ReactNode | React.ReactElement, className?: string }) => {
    return (
        <div 
            className={`${className ? className : null} hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden rounded-lg`}
        >
            { children }
        </div>
    );
}

Menu.Custom = MenuCustom

export function MenuTrigger ({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    const context = useContext(MenuContext);
    return (
        React.cloneElement(
            // @ts-ignore
            children,
            {
                // @ts-ignore
                onClick: () => context.setIsOpen(!context.open),
                // @ts-ignore
                ref: context.refs.setReference,
                // @ts-ignore
                'data-navlink-open': context.open ? "true" : "false"
            }
        )
    );
}

Menu.Trigger = MenuTrigger