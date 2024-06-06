"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from 'framer-motion';
import React, { MouseEventHandler, useEffect, useState } from "react";
import { createPortal } from 'react-dom';

const Modal = ({ 
    children,
    openBtn,
    openBtnComponent,
    closeBtn, 
    closeBtnComponent,
}: { 
    children: React.ReactNode, 
    openBtn?: boolean, 
    openBtnComponent?: React.ReactElement,
    closeBtn?: boolean, 
    closeBtnComponent?: React.ReactElement,
}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const getChildrenOnDisplayName = (children: any, displayName: any) =>
        React.Children.map(children, (child) =>
            child.type.displayName === displayName ? child : null
    );

    const title = getChildrenOnDisplayName(children, "Title")
    const subtitle = getChildrenOnDisplayName(children, "Subtitle")
    const button = getChildrenOnDisplayName(children, "Button")
    const custom = getChildrenOnDisplayName(children, "Custom")

    useEffect(() => {
        setIsMounted(true)
    }, [])

    { isMounted 
        ?
        isOpen === true ? document.body.style.overflow = "hidden" : document.body.style.overflow = "scroll" 
        :
        null
    }

    return isMounted ? (

            <>
                { openBtnComponent && openBtn === true 
                    ? 
                        React.cloneElement(openBtnComponent, {
                            onClick: () => setIsOpen(true)
                        })
                    : 
                        null 
                }

                { ! openBtnComponent && openBtn === true 
                    ?
                        <button onClick={() => setIsOpen(true)} className="navlink-full justify-center">Open</button>
                    :
                        null
                }
                    
                {createPortal(
                
                    <AnimatePresence mode="wait">

                        {isOpen &&

                            <motion.div 
                                className='fixed w-dvw h-dvh inset-0 flex items-center justify-center z-[1000000] bg-semitransparent px-6'
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
                                    className={`bg-background rounded-md fixed text-wrap h-fit !min-w-0 max-w-[425px] border-border border-1 flex flex-col`}
                                >

                                    <button className="w-fit h-fit absolute top-2 right-2 focus:ring-2 ring-white rounded-md p-1 transition-all" onClick={() => setIsOpen(false)}>
                                        <XMarkIcon className="w-5 h-5 flex text-gray-300 hover:text-white cursor-pointer transition-all"></XMarkIcon>        
                                    </button>

                                    <div className="p-6">

                                        {title} 

                                        <div className="mb-1" />   
                                        
                                        {subtitle}

                                        {custom}

                                    </div>

                                    <div className="flex flex-col md:!flex-row gap-2 bg-card px-6 py-3 justify-end border-t-1 border-border">

                                        {button} 

                                        { closeBtnComponent && closeBtn === true 
                                            ? 
                                            React.cloneElement(closeBtnComponent, {
                                                onClick: () => setIsOpen(false)
                                            })
                                            : 
                                            null 
                                        }

                                        { ! closeBtnComponent && closeBtn === true 
                                            ?
                                            <button onClick={() => setIsOpen(false)} className="navlink-full justify-center !w-full md:!w-fit">Cancel</button>
                                            :
                                            null
                                        }
                                        
                                    </div>
                                    
                                    
                                </motion.div>    
                            </motion.div>
                            
                        }

                    </AnimatePresence>,
                    document.body
                )}         
            </>
        

    ) : null ;

}

// Modal.Title

const Title = ({ children, className = "", ...other }: { children: React.ReactNode, className?: string }) => (
    
    <h2 className={`header-3 !text-center md:!text-left max-w-full text-wrap ${className}`} {...other}>{ children }</h2>

)

Title.displayName = "Title";
Modal.Title = Title;

// Modal.Subtitle

const Subtitle = ({ children, className = "", ...other }: { children: React.ReactNode, className?: string }) => (
    
    <p className={`pb-4 subtitle text-center md:text-left text-sm ${className}`} {...other}>{ children }</p>

)

Subtitle.displayName = "Subtitle";
Modal.Subtitle = Subtitle;

// Modal.Button

const Button = ({ children, className = "", type, loadingVariable, onClick, spinnerColor, ...other }: { children: React.ReactNode, className?: string, type: "navlink" | "navlink-full" | "navlink-destructive" | "navlink-success" | "navlink-sidebar"| "navlink-small", loadingVariable?: any, spinnerColor: "white" | "black", onClick?: MouseEventHandler<HTMLButtonElement> }) => (
    
    <button className={`${type} ${className} !w-full md:!w-fit justify-center transition-all`} onClick={onClick} {...other}>
        { loadingVariable === true ? <img src={`/spinner_${spinnerColor}.svg`} alt="Loading..." className="spinner"/>  : children }
        { ! loadingVariable ? null : children }
    </button>

)

Button.displayName = "Button";
Modal.Button = Button;

// Modal.Custom

const Custom = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    
    <div className={`w-full ${className}`}>
        { children }
    </div>

)

Custom.displayName = "Custom";
Modal.Custom = Custom;

export default Modal;