import { BellIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/16/solid";

export default function Alert({title = "Notice", description = "Sorry, no details were provided with this notice.", type = "notice"}: { title: string, description: string, type: "notice" | "alert" | "success" | "error" }) { 

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

                <p className="text-white font-bold text-sm">{ title }</p>              
            </div>
            <p className="text-white font-normal text-sm ml-8 subtitle leading-4">{ description }</p>     
        </div>

    );

}