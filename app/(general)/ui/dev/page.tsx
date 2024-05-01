import ComIDBtn from "./test";

export default function DeveloperPage() {

    return (

        <div className="">
            <div className="flex flex-col border-b-1 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48">

                <h1 className="header">Developer Page</h1>

            </div>

            <div className="flex flex-col px-6 lg:py-12 lg:px-48 mt-6 mb-6">
                <h2 className="text-gray-300 font-bold antialiased w-full">Buttons</h2>              

                <div className="flex flex-col gap-2 mt-4">
                    <button className={"navlink"}>normal</button>
                    <button className={"navlink-ghost"}>ghost</button>
                    <button className={"navlink-full"}>full</button>
                    <button className={"navlink-destructive"}>destructive</button>
                </div>   

                <h2 className="text-gray-300 font-bold antialiased w-full mt-4">Inputs</h2>

                <div className="flex flex-col gap-2 mt-4">       
                    <input className="generic_field" placeholder="This is an input."></input> 
                    <input className="generic_field errored" placeholder="This is an errored input."></input> 
                </div>

                <h2 className="text-gray-300 font-bold antialiased w-full mt-4">Debug</h2> 

                <div className="flex flex-col gap-2 mt-4">       
                    <ComIDBtn />  
                </div>  

            </div>     

        </div>

    );

}