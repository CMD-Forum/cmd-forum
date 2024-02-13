export function FullPostSkeleton() {

    return (

        <div className="rounded-t-md flex w-full bg-[#131313] facebookTheme:bg-white h-fit rounded-b-md facebookTheme:rounded-none px-5 py-5 border-zinc-900 facebookTheme:border-[#b3b3b3] border-[1px]">

            <div className="flex w-full bg-transparent h-fit flex-col px-2">

                <div className="text-sm">

                    <div>

                        <div className="animate-pulse h-[17px] w-20 rounded-sm"></div>  
                        
                    </div>
                    
                    <div className="flex flex-row">

                        <div className="animate-pulse h-[20px] w-[200px]"></div>   

                    </div>    

                </div>
                
                <div className="animate-pulse h-[28px] w-40 rounded-sm"></div>

            </div>

        </div>

    )

}