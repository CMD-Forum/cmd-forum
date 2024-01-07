import { CardPost } from "@/app/(general)/ui/components/posts/post";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const support = async () => {

    return (

        <main className="flex min-h-screen flex-col w-full">

            <div className="error flex flex-col gap-4 w-full">

                <div className="flex flex-col">

                    <h1 className="text-3xl font-sans font-bold antialiased w-full">Understand Posting</h1>
                    <p className="text-gray-300 font-bold antialiased w-full">The terminology and all you need to understand.</p>   

                </div>

                <hr className='border-zinc-900 mt-1 mb-1' />

                <div className="flex flex-col">

                    <h1 className="text-3xl font-sans font-bold antialiased w-full">The Typical Post</h1>
                    <p className="text-gray-300 font-bold antialiased w-full mb-2">Below is your typical post.</p>   

                    {/* @ts-ignore-error */}
                    <CardPost title="This is the title." community="Community" id={1} author="1" upvotes={2} downvotes={1} ratio="50.00%" submitted="19/12/2023" subtitle="The tagline is here" link="" />

                </div>

                <div className="flex flex-row gap-2">
                    <Link href="/support/understand-posting" className="flex flex-row bg-[#131313] hover:bg-zinc-800 p-5 rounded-md gap-1 hover:gap-2 transition-all w-full h-full font-sans font-semibold text-lg items-center"> <ArrowLongLeftIcon className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none h-6 w-6"></ArrowLongLeftIcon>Last Article</Link>    
                    <Link href="/support/understand-posting" className="flex flex-row bg-[#131313] hover:bg-zinc-800 p-5 rounded-md gap-1 hover:gap-2 transition-all w-full h-full font-sans font-semibold text-lg items-center">Next Article <ArrowLongRightIcon className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none h-6 w-6"></ArrowLongRightIcon></Link>           
                </div>

             </div>

        </main>

    ) 

};

export default support