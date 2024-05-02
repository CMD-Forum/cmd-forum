"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { MouseEventHandler, useEffect, useRef } from "react";
import { useState } from "react";
import type { Route } from 'next'

/**
 * Dropdown
 * @param {boolean} [alignRight] If set to true, the dropdown will be expand right.
 * @param {React.ReactNode} children Children to be passed.
 * @param {boolean} [accountHeading] If set to true, replaces the dropdown button with the information of the currently signed in user.
 * @param {string} [headerText]
 * @param {React.ReactNode} [headerIcon]  
 * @param {string} [className]
 * @param {string} [headerClassName]
 */

export default function Dropdown({ align, children, accountHeading = false, headerText, headerIcon, className, headerClassName }: { align: "left" | "right" | "center", children: React.ReactNode, accountHeading?: boolean, headerText?: string | React.ReactNode, headerIcon?: React.ReactNode, className?: string, headerClassName?: string }) {

    const [open, setIsOpen] = useState<boolean>(false);
    const [showItems, setShowItems] = useState<boolean>(true);
    const { data: session } = useSession();

    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {

        const handleOutsideClick = (e: any) => {
            if ( dropdownMenuRef.current ) {
                if ( ! dropdownMenuRef.current.contains(e.target) ) {
                    setIsOpen(false);
                    setShowItems(false);
                }            
            }
        }

        document.addEventListener('click', handleOutsideClick, true);    
        
        return () => {
            document.removeEventListener('click', handleOutsideClick, true);
        };

    }, [open])

    const transformOriginAlign = () => {

        switch (align) {

            case "center":
                return "top center"
            case "left":
                return "top left"
            case "right":
                return "top right"

        }

    }

    const cssAlign = () => {

        switch (align) {

            case "center":
                return "!left-1/2 !transform !-translate-x-1/2"
            case "left":
                return "left-0"
            case "right":
                return "right-0"

        }

    }

    return (

        <>

                <div className="relative w-fit" ref={dropdownMenuRef}>

                    { accountHeading === true ? (

                            <>

                                {session && (

                                    <button 
                                        className={`navlink ${headerClassName ? headerClassName : ""} !p-0 lg:!px-2 lg:!py-2 !border-0 !mt-0 flex !font-medium !bg-transparent`}
                                        onClick={() => {
                                            if (open) {
                                              setShowItems(false);  
                                              setIsOpen(false);
                                            } else {
                                              setShowItems(true);  
                                              setIsOpen(true);
                                            }
                                          }}
                                          ref={buttonRef}
                                    >
                                        {session.user.image ?
                                            <img className={`w-[30px] h-[30px] transition-all border-1 border-border hover:brightness-75 ${open === true ? "brightness-75" : ""} rounded-md`} src={session.user.image} alt='Your Account Image' />
                                            :
                                            <img className={`w-[30px] h-[30px] transition-all border-1 border-border hover:brightness-75 ${open === true ? "brightness-75" : ""} rounded-md`} src="/images/favicon/favicon.svg" alt='Your Account Image' />
                                        }

                                    </button>



                                )}        


                            </>
                        

                    ) : (
                        <>

                            <button 
                                className={`navlink ${headerClassName} ${headerIcon && !headerText ? "!px-2" : "!border-0 "} ${open ? "!bg-border" : ""} !mt-0 flex !font-medium`}
                                onClick={() => setIsOpen(!open)}
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
                     
                            </button>

                        </>
                    )}


                        <motion.div 
                            className={`bg-card ${className ? className : ""} border-border border-1 rounded-md w-max h-max py-1 z-50 group min-w-52 ${cssAlign()} shadow-xl absolute`}
                            initial={{
                                y: '4px',
                                opacity: '0%',
                            }}
                            // @ts-ignore
                            animate={{
                                scale: open ? 1 : 0.9,
                                opacity: open ? '100%' : '0%',
                                transformOrigin: transformOriginAlign(),
                                visibility: open ? '' : 'hidden',
                                y: '4px',
                            }}
                            exit={{
                                opacity: '0%',
                            }}
                            transition={{
                                duration: 0.1,
                            }}
                            onAnimationStart={() => setShowItems(open)}
                            onAnimationComplete={ () => setShowItems(open) }
                        >
                            
                            { children }

                        </motion.div>  

                 
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
            className="hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden text-gray-300 hover:text-white"
        >

            { icon ? (

                React.cloneElement(icon, {
                    className: "w-5 h-5",
                })

            ) : (
                null
            )}
             

            { text }

        </Link>
    );

}

export const DropdownButton = ({ text, icon, onClick }: { text: string, icon: React.ReactElement, onClick: MouseEventHandler<HTMLButtonElement> }) => {

    return (
        <button 
            onClick={onClick}
            className="hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden text-gray-300 hover:text-white"
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
            className="hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden text-gray-300 hover:text-white"
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
                    className="hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden"
                >
                    {/* @ts-ignore */}
                    <div className="flex flex-col max-w-48">
                        <span className="text-white text-[15px]">{session?.user.username}</span>
                        <div className="overflow-hidden text-ellipsis max-w-48">
                            <span className="text-gray-300 text-[13px]">{session?.user.email}</span>      
                        </div>                    
                    </div>
                </Link>

        );
    }

}

export const DropdownShare = ({ title, text, url, icon }: { title: string, text: string, url: string, icon: React.ReactElement }) => {

    return (

            <button 
                className="hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden text-gray-300 hover:text-white"
                onClick={() => navigator.share({ title: title, text: text, url: url })}
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
                className={`${className ? className : null} hover:bg-border w-full px-3 py-2 flex gap-2 items-center transition-all text-sm group-[hidden]:hidden`}
            >
                { children }
            </div>

    );

}