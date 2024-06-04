"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion, useAnimation, useDragControls, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from 'react-dom';

export default function Bottomdrawer({ children, btnText, btnIcon, btnClassName, btnType = "navlink", btnDisabled }: { children: React.ReactNode, btnText?: string, btnIcon?: React.ReactNode, btnClassName?: string, btnType?: string, btnDisabled?: boolean }) {

    // Thanks to Emil Kowalski's Vaul for inspiration, 
    // and https://codesandbox.io/p/sandbox/framer-motion-bottom-sheet-for-desktop-with-drag-handle-ov8e0o + https://react-spectrum.adobe.com/react-aria/examples/framer-modal-sheet.html for code snippets (more like chunks).

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const constraintsRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const snapPoints = [300];
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true)
    }, [isMounted])    

    const handleScroll = (e: any) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) { 
            setIsScrolling(false);
        } else {
            e.preventDefault();
            setIsScrolling(true);
        }
    }

    let h = window.innerHeight;
    let y = useSpring(h, { stiffness: 500, damping: 40 });  
    const x = useMotionValue(0); 
    
    const nearestSnapPoint = useTransform(y, value => {

        const distances = snapPoints.map(point => Math.abs(point - value));
        const minDistance = Math.min(...distances);

        return snapPoints[distances.indexOf(minDistance)];
    });

    useEffect(() => {
        return y.onChange(() => {
            y.set(nearestSnapPoint.get());
        });
    }, [y, nearestSnapPoint]);
  
    const staticTransition = {
        duration: 0.3,
        ease: [0.32, 0.72, 0, 1]
    };

    isOpen === true ? document.body.style.overflow = "hidden" : document.body.style.overflow = "scroll" 

    return isMounted ? (

            <>
                <button className={`${btnType} ${btnClassName}`} onClick={() => setIsOpen(true)} disabled={btnDisabled}>
                    { btnIcon ?

                        // @ts-ignore
                        React.cloneElement(btnIcon, {
                            className: "w-5 h-5",
                        })
                        :
                        null
                            
                    }
                    { btnText ? btnText : null }
                </button>
                    
                {createPortal(
                
                
                    <AnimatePresence>

                        {isOpen &&

                            <motion.div 
                                className='fixed w-dvw h-dvh inset-0 flex justify-center z-[1000000] bg-semitransparent px-6'
                                initial={{ backgroundColor: "var(--transparent)" }}
                                animate={{ backgroundColor: "var(--semitransparent)" }}
                                exit={{ backgroundColor: "var(--transparent)" }}
                                transition={{ ease: "linear", duration: 0.1 }}
                                ref={constraintsRef}
                            >

                                
                                <motion.div
                                    onScroll={handleScroll}
                                    drag={!isScrolling ? "y" : false}
                                    dragConstraints={{ top: 0 }}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        if (offset.y > window.innerHeight * 1 || velocity.y > 10) {
                                            setIsOpen(false);
                                        }
                                    }}
                                    style={{ 
                                        touchAction: "none",
                                        y,
                                        paddingBottom: y,
                                    }}
                                    initial={{ y: h }}
                                    animate={{ y: snapPoints[0] }}
                                    exit={{ y: h }}
                                    dragElastic={0.2}
                                    transition={staticTransition}
                                    className={`bg-background !rounded-xl md:rounded-md !rounded-b-none fixed text-wrap h-full w-full !min-w-0 border-border border-1 flex flex-col`}
                                >

                                    <span className="absolute flex flex-col top-3 w-14 h-[6px] bg-border rounded-full m-auto left-0 right-0"></span>    

                                    {/*<button onClick={() => setIsOpen(false)} className="navlink absolute right-2 top-2 !p-2"><XMarkIcon className="w-4 h-4" /></button>*/}

                                    { children }
                                    
                                </motion.div>    
                            </motion.div>
                            
                        }

                    </AnimatePresence>,
                    document.body
                )}         
            </>
        

    ) : null;

}

// BottomdrawerTitle

export const BottomdrawerTitle = ({ children, className = "", ...other }: { children: React.ReactNode, className?: string }) => (
    
    <h2 className={`font-medium text-xl text-left max-w-full text-wrap ${className}`} {...other}>{ children }</h2>

)

// BottomdrawerBody

export const BottomdrawerBody = ({ children, className, padding }: { children: React.ReactNode, className?: string, padding?: boolean }) => (
    
    <div className={`w-full h-full overflow-y-scroll ${padding ? "p-6" : ""} ${className}`}>
        { children }
    </div>

)

// BottomdrawerHeader

export const BottomdrawerHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    
    <div className={`w-full h-fit p-4 bg-transparent border-b-1 border-border relative top-2 left-0 ${className}`}>
        { children }
    </div>

)

