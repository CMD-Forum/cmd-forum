import Link from "next/link";

const support = async () => {

    return (

        <main className="flex min-h-screen flex-col w-full">

            <div className="error flex flex-col gap-4 w-full">

                <div className="flex flex-col">

                    <h1 className="text-3xl font-sans font-bold antialiased w-full">Support</h1>
                    <p className="text-gray-300 font-bold antialiased w-full">Need help?</p>   

                </div>

                <div className="flex flex-col w-full bg-zinc-950 p-5 border-zinc-900 border-[1px] rounded-md">
                    <Link href="/support/understand-posting" className="w-fit font-sans font-semibold text-lg hover:underline">Understand Posting</Link>    
                    <p className="text-gray-300">The terminology and all you need to understand.</p>
                </div>
                

             </div>

        </main>

    ) 

};

export default support