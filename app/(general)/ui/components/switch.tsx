"use client";

import { motion } from "framer-motion";
import { MouseEventHandler, useState } from "react";

export default function Switch({ label, onEnabled }: { label: string, onEnabled: MouseEventHandler<HTMLButtonElement> | undefined }) {

    const [enabled, setEnabled] = useState<boolean>(false);

    const onClickFunc = (event) => {
        setEnabled(!enabled);
        if (enabled === false) {
            onEnabled?.(event);
        }
    }

    return (
        
        <div>
            <motion.button onClick={onClickFunc} className={`navlink bg-card !rounded-full relative h-6 !w-11 transition-all !ring-0 ${enabled === true ? "!bg-accent-blue !border-accent-blue" : "!border-1 !border-border"}`}>
                <motion.span 
                    className={`absolute translate-y-0 w-5 h-5 rounded-full transition-all bg-white`}
                    initial={{ x: 0 }}
                    animate={{ x: enabled ? 8 : -10 }}
                    transition={{ duration: 0.1, ease: "linear" }}
                >

                </motion.span>
            </motion.button>
        </div>
        
    );

}

