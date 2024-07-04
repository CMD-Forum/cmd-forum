"use client";

import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import React from "react";
import { useState } from "react";

/**
 * ## Hovercard
 * ---
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

export default function Hovercard({ children, className, trigger }: { children: React.ReactNode, className?: string, trigger: React.ReactNode }) {

    const [open, setIsOpen] = useState<boolean>(false);

    const easing = cubicBezier(0,0,0,1);

    return (
        <>
            <div className="relative w-fit" onMouseLeave={() => setIsOpen(false)}>
                <div className='ml-auto flex gap-4 subtitle'>
                    {/* @ts-ignore */}
                    {React.cloneElement(trigger, {
                        onMouseEnter: () => setIsOpen(true)
                    })}
                </div>

                <AnimatePresence>
                    <>
                        <div className="absolute w-full bg-card h-2" />
                        { open &&
                            <div 
                                className={`bg-card ${className} border-border border-1 rounded-md w-max h-max !z-50 group min-w-52 shadow-md absolute mt-1`}
                                onMouseEnter={() => setIsOpen(true)}
                                onMouseLeave={() => setIsOpen(false)}
                            >   
                                <>
                                    { children }           
                                </>
                            </div>  
                        }                        
                    </>
                </AnimatePresence>
            </div> 
        </>
    );
}