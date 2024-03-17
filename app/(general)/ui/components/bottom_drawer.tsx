"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, animate, motion, useDragControls, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { createPortal } from 'react-dom';

export default function Bottomdrawer({ children, btnText, btnClassName, btnType = "navlink", btnDisabled }: { children: React.ReactNode, btnText: string, btnClassName?: string, btnType?: string, btnDisabled?: boolean }) {

    // Thanks to Emil Kowalski's Vaul for inspiration, and https://codesandbox.io/p/sandbox/framer-motion-bottom-sheet-for-desktop-with-drag-handle-ov8e0o for code snippets.

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const constraintsRef = useRef(null);
    const [expanded, setExpanded] = useState<boolean>(false);

    const SHEET_MARGIN = 34;
    const SHEET_RADIUS = 12;

    const root = document.body.firstChild as HTMLElement;

    let h = window.innerHeight - SHEET_MARGIN;
    let y = useMotionValue(h);

    let bodyScale = useTransform(
        y,
        [0, h],
        [(window.innerWidth - SHEET_MARGIN) / window.innerWidth, 1]
    );

    let bodyTranslate = useTransform(y, [0, h], [SHEET_MARGIN - SHEET_RADIUS, 0]);
    let bodyBorderRadius = useTransform(y, [0, h], [SHEET_RADIUS, 0]);

    useMotionValueEvent(bodyScale, 'change', (v) => root.style.scale = `${v}`);
    useMotionValueEvent(
      bodyTranslate,
      'change',
      (v) => root.style.translate = `0 ${v}px`
    );
    useMotionValueEvent(
      bodyBorderRadius,
      'change',
      (v) => root.style.borderRadius = `${v}px`
    );

    
    const inertiaTransition = {
        type: 'inertia' as const,
        bounceStiffness: 300,
        bounceDamping: 40,
        timeConstant: 300
    };
  
    const staticTransition = {
        duration: 0.5,
        ease: [0.32, 0.72, 0, 1]
    };
  

    const controls = useDragControls();

    { isOpen === true ? document.body.style.overflow = "hidden" : document.body.style.overflow = "scroll" }

    return (

            <>
                <button className={`${btnType} ${btnClassName}`} onClick={() => setIsOpen(true)} disabled={btnDisabled}>{ btnText }</button>
                    
                {createPortal(
                
                
                    <AnimatePresence>

                        {isOpen &&

                            <motion.div 
                                className='fixed w-dvw h-dvh inset-0 flex justify-center z-[1000000] bg-semitransparent px-6'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ ease: "linear", duration: 0.1 }}
                                ref={constraintsRef}
                            >

                                
                                <motion.div
                                    drag="y"
                                    dragConstraints={{ top: 0 }}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
                                          setIsOpen(false);
                                        } else {
                                          animate(y, 0, { ...inertiaTransition, min: 0, max: 0 });
                                        }
                                    }}
                                    dragControls={controls}
                                    style={{ 
                                        touchAction: "none" ,
                                        y,
                                        top: SHEET_MARGIN,
                                        paddingBottom: window.screen.height,
                                    }}
                                    initial={{ y: h }}
                                    animate={{ y: 0 }}
                                    exit={{ y: h }}
                                    dragElastic={0.2}
                                    transition={staticTransition}
                                    className={`bg-background p-6 mt-2 pb-0 !rounded-xl md:rounded-md !rounded-b-none fixed text-wrap h-fit w-full bottom-0 !min-w-0 border-border border-1 flex flex-col`}
                                >

                                    <span className="absolute top-2 w-14 h-[4px] bg-border rounded-full m-auto left-0 right-0"></span>    

                                    { children }
                                    
                                </motion.div>    
                            </motion.div>
                            
                        }

                    </AnimatePresence>,
                    document.body
                )}         
            </>
        

    );

}