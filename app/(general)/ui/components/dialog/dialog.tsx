"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from 'framer-motion';
import React, { MouseEventHandler, useContext, useEffect, useState } from "react";
import { createPortal } from 'react-dom';

import DialogContext from "./dialogContext";

/**
 * ## Dialog
 * ---
 * Component that overlays the screen with a message.
 * @param children
 */

export default function Dialog({
    children
}: {
    children: React.ReactNode
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    return (
        // @ts-ignore
        <DialogContext.Provider value={{ isOpen, setIsOpen, isMounted, setIsMounted }}>
            {children}
        </DialogContext.Provider>
    );
}


/**
 * ## Dialog
 * ---
 * Component that overlays the screen with a message.
 * @param children
 */

export function ControlledDialog({
    children,
    isOpen,
    setIsOpen
}: {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: any;
}) {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    return (
        // @ts-ignore
        <DialogContext.Provider value={{ isOpen, setIsOpen, isMounted, setIsMounted }}>
            {children}
        </DialogContext.Provider>
    );
}

Dialog.Controlled = ControlledDialog

/**
 * ## DialogContent
 * ---
 * Main part of the `Dialog` component.
 * @param children
 */

export function DialogContent({ 
    children,
}: { 
    children: React.ReactNode,
}) {

    const { isOpen, setIsOpen, isMounted, setIsMounted } = useContext(DialogContext);

    useEffect(() => {
        // @ts-ignore
        setIsMounted(true);
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.body.style.overflow = isOpen === true ? "hidden" : "scroll";
        }
    }, [isOpen]); 
    
    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === 'Escape') {
                // @ts-ignore
                setIsOpen(false);
            }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [])

    return isMounted ? (
        <>
            {createPortal(
                <AnimatePresence mode="wait">
                    {isOpen &&
                        <motion.div 
                            className='fixed w-dvw h-dvh inset-0 flex items-center justify-center z-[9999999999999999999999] bg-semitransparent backdrop-blur-sm px-6 overflow-hidden'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ ease: "linear", duration: 0.1 }}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ ease: "linear", duration: 0.1 }}
                                className={`bg-background rounded-md text-wrap h-fit !min-w-0 max-w-[425px] border-border border-1 flex flex-col`}
                                id="dialog-container"
                                tabIndex={0}
                            >
                                {/* @ts-ignore */}
                                <button className="w-fit h-fit absolute top-2 right-2 focus:ring-2 ring-offset-2 ring-offset-semitransparent rounded-md p-1 transition-all" onClick={() => setIsOpen(false)}>
                                    <XMarkIcon className="w-5 h-5 flex text-gray-300 hover:text-white cursor-pointer transition-all"></XMarkIcon>        
                                </button>

                                <div className="">
                                    {/* @ts-ignore */}
                                    <DialogContext.Provider value={{ isOpen, setIsOpen, isMounted }}>
                                        { children }    
                                    </DialogContext.Provider>
                                </div>
                            </motion.div>    
                        </motion.div>
                    }
                </AnimatePresence>,
                document.body
            )}         
        </>
    ) : null;
}

Dialog.Content = DialogContent

/**
 * ## DialogTitle
 * ---
 * Title for the `Dialog` component.
 * @param children
 * @param className Optional, and discouraged, but there if you want to use it.
 */

export function DialogTitle ({ children, className = "", ...other }: { children: React.ReactNode, className?: string }) {
    return (
        <h2 className={`header-3 max-w-full text-wrap px-6 pt-6 ${className ? className : null}`} {...other}>{ children }</h2>    
    );
}

Dialog.Title = DialogTitle

/**
 * ## DialogSubtitle
 * ---
 * Subtitle for the `Dialog` component.
 * @param children
 * @param className Optional, and discouraged, but there if you want to use it.
 */

export function DialogSubtitle ({ children, className = "", ...other }: { children: React.ReactNode, className?: string }) {
    return (
        <p className={`subtitle text-sm px-6 pb-6 ${className}`} {...other}>{ children }</p>    
    );
}

Dialog.Subtitle = DialogSubtitle

/**
 * ## DialogButton
 * ---
 * Button for the `Dialog` component.
 * @param children
 * @param className Optional, and discouraged, but there if you want to use it.
 * @param type Type of button (see `navlink` css classes).
 * @param loadingVariable If you want the button to show a spinner when a variable is true, then set this to that variable.
 * @param spinnerColor Deprecated, do not use. Now handled automatically.
 * @param onClick
 */

export function DialogButton ({ 
    children, 
    className = "", 
    type, 
    loadingVariable, 
    // Below is for compatibility reasons
    // eslint-disable-next-line no-unused-vars
    spinnerColor,
    onClick,
    ...other 
}: { 
    children: React.ReactNode, 
    className?: string, 
    type: "navlink" | "navlink-full" | "navlink-destructive" | "navlink-sidebar" | "navlink-ghost", 
    loadingVariable?: any, 
    spinnerColor: "white" | "black", 
    onClick?: MouseEventHandler<HTMLButtonElement> 
}) {
    return (
        <button className={`${type} ${className} !w-full md:!w-fit justify-center transition-all`} onClick={onClick} {...other}>
            { loadingVariable === true ? <img src={`/spinner_${type === "navlink-full" ? "black" : "white"}.svg`} alt="Loading..." className="spinner"/>  : children }
            { ! loadingVariable ? null : children }
        </button>        
    );
}

Dialog.Button = DialogButton

/**
 * ## DialogButtonContainer
 * ---
 * Wrapper for the `DialogButton` component.
 * @param children
 * @param className Optional, but there if you want to use it.
 */

export function DialogButtonContainer ({ children }: { children: React.ReactNode }) {
    return (
        <div className={`flex justify-end gap-2 px-6 py-4 border-t-1 border-border bg-card`}>
            { children }
        </div>
    );
}

Dialog.ButtonContainer = DialogButtonContainer

/**
 * ## DialogBody
 * ---
 * Wrapper for the `Dialog` component.
 * @param children
 * @param className Optional, but there if you want to use it.
 */

export function DialogBody ({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`px-6 pb-6 ${className}`}>
            { children }
        </div>        
    );
}

Dialog.DialogBody = DialogBody

/**
 * ## DialogCloseButton
 * ---
 * Close button for the `Dialog` component.
 * @param children
 * @param className Optional, but there if you want to use it.
 * @param type
 */

export function DialogCloseButton ({
    children,
}: { 
    children: React.ReactElement,
}) {
    const context = useContext(DialogContext);
    return (
        React.cloneElement(
            children,
            // @ts-ignore
            { onClick: () => context.setIsOpen(false) }
        )
    );
}

Dialog.CloseButton = DialogCloseButton

/**
 * ## DialogCloseButton
 * ---
 * Close button for the `Dialog` component.
 * @param children
 * @param className Optional, but there if you want to use it.
 * @param type
 */

export function DialogTrigger ({
    children,
}: { 
    children: React.ReactNode,
}) {
    const context = useContext(DialogContext);
    return (
        React.cloneElement(
            // @ts-ignore
            children,
            {
                // @ts-ignore
                onClick: () => context.setIsOpen(true)
            }
        )
    );        
}

Dialog.Trigger = DialogTrigger