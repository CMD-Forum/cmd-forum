import { ChatBubbleBottomCenterTextIcon, NewspaperIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function CreatePage() {

    return (

        <div className="flex flex-col lg:flex-row gap-2">
        
            <Link href="/create/community" className="flex flex-row bg-[#131313] hover:bg-zinc-800 p-5 rounded-md gap-5 transition-all w-full h-full font-sans font-semibold text-lg items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <ChatBubbleBottomCenterTextIcon className="size-10 min-h-10 min-w-10" />
                <div className="flex flex-col leading-6">
                    <h2 className="text-xl">Community</h2>
                    <p className="text-gray-300 text-sm">Create a community for people of similar interests</p>    
                </div>
            </Link>

            <Link href="/create/post" className="flex flex-row bg-[#131313] hover:bg-zinc-800 p-5 rounded-md gap-5 transition-all w-full h-full font-sans font-semibold text-lg items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <NewspaperIcon className="size-10 min-h-10 min-w-10" />
                <div className="flex flex-col leading-6">
                    <h2 className="text-xl">Post</h2>
                    <p className="text-gray-300 text-sm">Create a post about whatever you want</p>    
                </div>
            </Link>      
        
        </div>

    );

}