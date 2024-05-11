import { BellIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import React from "react";

export default function Alert({ type = "notice", children }: { type: "notice" | "alert" | "success" | "error", children: React.ReactNode }) { 

    const getChildrenOnDisplayName = (children: any, displayName: any) =>
        React.Children.map(children, (child) =>
            child.type.displayName === displayName ? child : null
    );

    const title = getChildrenOnDisplayName(children, "AlertTitle");
    const subtitle = getChildrenOnDisplayName(children, "AlertSubtitle");

    return (

        <div className={`w-full border-border border-[1px] border-l-[8px] transition-all ${type === "notice" ? 'border-l-white' : ''} ${type === "alert" ? 'border-l-[#fb923c]' : '' } ${type === "success" ? 'border-l-[#4ade80]' : '' } ${type === "error" ? 'border-l-[#ef4444]' : '' } rounded px-3 py-3`}>
            <div className="flex flex-row items-centre gap-3">
                
                { type === "notice" 
                ?
                    <BellIcon color="white" className="w-5 h-5" />
                :
                    null
                }

                { type === "alert" 
                ?
                    <ExclamationTriangleIcon color="#fb923c" className="w-5 h-5" />
                :
                    null
                }

                { type === "success" 
                ?
                    <CheckCircleIcon color="#4ade80" className="w-5 h-5" />
                :
                    null
                }
                
                { type === "error" 
                ?
                    <XCircleIcon color="#ef4444" className="w-5 h-5" />
                :
                    null
                }

                { title ? title : subtitle }              
            </div>
            { title ? subtitle : null }      
             
        </div>

    );

}

export const AlertTitle = ({ children, className = "", ...other }: { children: React.ReactNode, className?: string }) => (
    <p className={`text-white font-bold text-sm ${className ? className : null}`} {...other}>{ children }</p>   
)

export const AlertSubtitle = ({ children, className = "", ...other }: { children: React.ReactNode, className?: string }) => (
    <p className={`subtitle ml-8 ${className ? className : null}`} {...other}>{ children }</p>   
)