"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon } from "@heroicons/react/24/solid";
import { createPortal } from 'react-dom';

export default function Modal({children}: {children: React.ReactNode}) {

    const [isOpen, setIsOpen] = useState(false);

    const getChildrenOnDisplayName = (children: any, displayName: any) =>
        React.Children.map(children, (child) =>
            child.type.displayName === displayName ? child : null
    );

    const title = getChildrenOnDisplayName(children, "Title")
    const subtitle = getChildrenOnDisplayName(children, "Subtitle")
    const button = getChildrenOnDisplayName(children, "Button")

    return (

        <>
            <button className="navlink" onClick={() => setIsOpen(true)}>Modal</button>
                
            {createPortal(
            
            <AnimatePresence>

                    {isOpen &&

                        <div className='fixed w-dvw h-dvh inset-0 flex items-center justify-center z-[1000000] bg-semitransparent'>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={`bg-card rounded-md fixed text-wrap h-fit max-w-[425px] border-border border-[1px] p-5 flex flex-col`}
                            >

                                <button className="w-fit h-fit absolute top-2 right-2" onClick={() => setIsOpen(false)}>
                                    <XMarkIcon className="w-5 h-5 flex text-gray-300 hover:text-white cursor-pointer transition-all"></XMarkIcon>        
                                </button>

                                {title}    
                                
                                {subtitle}

                                {subtitle ? null : <div className="mb-4" /> }

                                <div className="flex flex-col md:!flex-row gap-2">
                                    {button}    
                                </div>
                                
                                
                            </motion.div>    
                        </div>
                        
                    }

            </AnimatePresence>,
            document.body
            )}         
        </>
    

    );

}

// Modal.Title

const Title = ({ children, className = "", ...other }: { children: React.ReactNode, className: string }) => (
    
    <h2 className={`font-medium text-lg text-center md:text-left max-w-full w-[425px] text-wrap ${className}`} {...other}>{ children }</h2>

)

Title.displayName = "Title";
Modal.Title = Title;

// Modal.Subtitle

const Subtitle = ({ children, className = "", ...other }: { children: React.ReactNode, className: string }) => (
    
    <p className={`pb-4 text-gray-300 text-center md:text-left ${className}`} {...other}>{ children }</p>

)

Subtitle.displayName = "Subtitle";
Modal.Subtitle = Subtitle;

// Modal.Button

const Button = ({ children, className = "", type = "navlink" || "navlink-full" || "navlink-destructive" || "navlink-success" || "navlink-sidebar" || "navlink-small", ...other }: { children: React.ReactNode, className: string, type: string }) => (
    
    <button className={`${type} ${className} !w-full md:!w-fit justify-center transition-all`} {...other}>{ children }</button>

)

Button.displayName = "Button";
Modal.Button = Button;