"use client";

import { motion } from "framer-motion";
import { MouseEventHandler, useState } from "react";

export default function Switch({ onEnabled }: { onEnabled: MouseEventHandler<HTMLButtonElement> | undefined }) {

    const [enabled, setEnabled] = useState<boolean>(false);

    const onClickFunc = ( event: any ) => {
        setEnabled(!enabled);
        if (enabled === true) {
            onEnabled?.(event);
        }
    }

    return (
        
        <div>
            <motion.button onClick={onClickFunc} className={`navlink bg-card items-center flex !rounded-lg-full relative h-6 !w-11 transition-all !ring-0 !border-1 !p-[2px] ${enabled === true ? "!bg-accent-blue !border-accent-blue" : " !border-border"}`}>
                <motion.span 
                    className={`w-[18.9px] h-full rounded-lg-full transition-all bg-white !p-[2px]`}
                    initial={{ x: 0 }}
                    animate={{ x: enabled ? '100%' : '0px' }}
                    transition={{ duration: 0.1, ease: "linear" }}
                >

                </motion.span>
            </motion.button>
        </div>
        
    );

}

