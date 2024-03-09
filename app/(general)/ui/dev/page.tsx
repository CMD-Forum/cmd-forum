export default function DeveloperPage() {

    return (

        <div className="p-6">
            <div className="flex flex-col">

                <h1 className="header">Developer Page</h1>
                <p className="text-gray-300 font-bold antialiased w-full">View the user interface of CMD/&gt;</p>   

            </div>

            <hr className="border-border mb-4 mt-4" />

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

        </div>

    );

}