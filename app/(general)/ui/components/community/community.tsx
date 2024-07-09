import { CalendarDaysIcon, ChatBubbleBottomCenterTextIcon, PencilSquareIcon, UserIcon } from "@heroicons/react/16/solid";
import { Community } from "@prisma/client";
import Link from "next/link";

import { useSession } from "@/app/(general)/lib/sessioncontext";

import { JoinCommunityButton } from "../button";
import MemberCount from "./memberCount";
import PostCount from "./postCount";

export function CardCommunity( { community } : { community: Community } ) {

    const session = useSession();

    return (
        <div className="flex flex-col sm:flex-row w-full items-center gap-4 relative group transition-all bg-transparent hover:bg-card active:bg-card hover:cursor-pointer border-0 border-border group-hover/title:!border-white h-fit rounded-lg px-6 py-6">
            <div className="flex w-full bg-transparent h-fit flex-col"> 
                <div className="flex flex-row gap-2 items-center">
                    {community.image 
                    ?
                        <img src={community.image} alt={`Image of ${community.display_name}`} className={"rounded !max-w-[25px] !min-w-[25px] !h-[25px] !w-[25px] overflow-hidden bg-cover"} />
                    :
                        <img src={"/text_post_icon.png"} alt={"This community has no image."} className="rounded-lg hidden sm:flex sm:!max-w-[50px] sm:!min-w-[50x] m-auto sm:!h-[50px] sm:!w-[50px] overflow-hidden bg-cover" />
                    }                    
                    <Link href={`/c/${community.name}`} className="header-5 w-fit hover:!text-gray-300 hover:underline transition-all">{community.display_name}</Link>    
                </div>
                <div className="flex gap-2 mt-2">
                    <div className='flex flex-row gap-1 items-center'>
                        <CalendarDaysIcon className='w-[20px] text-gray-300' />
                        <p className='subtitle'>{community.createdAt.toLocaleDateString()}</p>  
                    </div>
                    <div className='flex flex-row gap-1 items-center'>
                        <UserIcon className='w-[20px] text-gray-300' />
                        <MemberCount communityID={community.id} />
                    </div>
                    <div className='flex flex-row gap-1 items-center'>
                        <PencilSquareIcon className='w-[20px] text-gray-300' />
                        <PostCount communityID={community.id} />
                    </div>
                    <div className='flex flex-row gap-1 items-center'>
                        <ChatBubbleBottomCenterTextIcon className='w-[20px] text-gray-300' />
                        <p className='subtitle'>---</p>
                    </div>
                </div>
                <p className='subtitle mb-4 mt-1'>{community.description}</p>
                { session.user?.id && 
                    <JoinCommunityButton communityID={community.id} userID={session.user.id} showLabelOnMobile={true} />
                }
            </div>
        </div>
    )
}