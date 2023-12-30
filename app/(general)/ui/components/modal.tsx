"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps {

    title: string;
    body: string;

    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;

    // children: React.ReactNode

}

export default function Modal(modal: ModalProps) {

    const [isOpen, setIsOpen] = useState(true); // Add this line

    return (

        <AnimatePresence>

            {isOpen && (

                <div className='fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm'>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`bg-zinc-900 rounded-md border-zinc-800 border-[1px] px-6 pt-6 w-fit pb-6`}
                    >
                        <h2 className="font-medium text-lg">{ modal.title }</h2>
                        <p className="pb-4 text-gray-300">{ modal.body }</p>
                        {/*{ modal.children }*/}
                        <button className='navlink' onClick={() => setIsOpen(false)}>Cancel</button>
                    </motion.div>    
                </div>
                
            )}

        </AnimatePresence>

    );

}