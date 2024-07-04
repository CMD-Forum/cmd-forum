import { Community } from "@prisma/client";
import Link from "next/link";

export function CardCommunity( { community } : { community: Community } ) {

    return (
        <div className="flex flex-row w-full items-center gap-4 relative group transition-all bg-card border-0 border-border group-hover/title:!border-white h-fit rounded px-6 py-6">
            {community.image 
            ?
                <img src={community.image} alt={`Image of ${community.display_name}`} className={"rounded !max-w-[50px] !min-w-[50px] m-auto !h-[50px] !w-[50px] overflow-hidden bg-cover"} />
            :
                <img src={"/text_post_icon.png"} alt={"This community has no image."} className="rounded hidden sm:flex sm:!max-w-[50px] sm:!min-w-[50x] m-auto sm:!h-[50px] sm:!w-[50px] overflow-hidden bg-cover" />
            }
            <div className="flex w-full bg-transparent h-fit flex-col"> 
                <Link href={`/c/${community.name}`} className="header-4 w-fit hover:!text-gray-300 transition-all">{community.display_name}</Link>
                <p className='subtitle'>{community.description}</p>
            </div>
        </div>
    )
}