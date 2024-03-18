"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useState } from "react";

export default function Dropdown({ children, headerText, headerIcon, className, headerClassName }: { children: React.ReactNode, headerText?: string | React.ReactNode, headerIcon: React.ReactNode, className?: string, headerClassName?: string }) {

    const [open, setIsOpen] = useState<boolean>(false);

    return (

        <>

                <div className="relative w-fit" onMouseLeave={() => setIsOpen(false)}>

                        <div className='ml-auto flex gap-4'>

                            <button 
                                className={`${headerClassName} ${headerIcon ? "!px-2" : "!border-0 "} hover:underline`}
                                onMouseEnter={() => setIsOpen(true)}
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

                        </div>

                    <AnimatePresence>
                        { open &&
                        <motion.div 
                            className={`bg-card ${className} border-border border-1 rounded-md w-max h-max !z-50 group min-w-52 shadow-xl absolute`}
                            initial={{
                                y: '0px',
                                opacity: '0%',
                                display: 'hidden',
                            }}
                            animate={{
                                y: open ? '5px' : '0px',
                                opacity: open ? '100%' : '0%',
                                display: open ? '' : 'hidden'
                            }}
                            exit={{
                                y: '0px',
                                opacity: '0%',
                                display: 'hidden',
                            }}
                            transition={{
                                duration: 0.12,
                            }}
                            onMouseEnter={() => setIsOpen(true)}
                            onMouseLeave={() => setIsOpen(false)}
                        >
                            
                            <>
                                { children }           
                            </>
                            

                        </motion.div>  
                        }
                    </AnimatePresence>

                </div>
            
     
        </>

    );

}

