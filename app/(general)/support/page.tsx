import Link from "next/link";
import SupportList from "../ui/components/support/support_list";

const support = async () => {

    return (

        <main className="flex min-h-screen flex-col w-full">

            <div className="error flex flex-col gap-4 w-full">

                <div className="flex flex-col">

                    <h1 className="text-3xl font-sans font-bold antialiased w-full">Support</h1>
                    <p className="text-gray-300 font-bold antialiased w-full">Need help?</p>   

                </div>

                <SupportList />

             </div>

        </main>

    ) 

};

export default support