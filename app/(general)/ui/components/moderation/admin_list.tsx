import Link from "next/link";

import { prisma } from "../../../lib/db";
import ProfileImage from "../account/ProfileImage";

export async function CommunityAdministrators({ communityId }: { communityId: string }) {

    const community = await prisma.community.findUnique({
        where: {
            id: communityId,
        }
    });

    if ( ! community ) {
        return (
            <div className="p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48">
                <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'>
                    <p className='md:!header-2 header-3'>Sorry, looks like this community doesn&apos;t exist.</p>
                    <p className='text-center !text-white font-medium antialiased w-full'>Don&apos;t worry, you probably mistyped.</p>
                </div>            
            </div>
        );
    }

    const admins = await prisma.communityAdminship.findMany({ where: { communityId: communityId }});

    if ( ! admins ) {
        return (
            <div className="p-2 pt-12 lg:pb-12 lg:p-12 lg:px-48">
                <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'>
                    <p className='md:!header-2 header-4 !text-center'>We couldn&apos;t find any administrators.</p>
                    <p className='subtitle !text-center'>This shouldn&apos;t happen, try reloading the page.</p>
                </div>            
            </div>            
        );
    } else if ( admins ) {
        return (
            <div>
                {admins.map(async (admin) => {

                    const user = await prisma.user.findUnique({
                        where: {
                            id: admin.userId,
                        },
                    });

                    if ( user ) {
                        return (
                            <div key={user.id} className="flex flex-row gap-4 w-full">
                                <div className="bg-card border-0 border-border p-3 rounded-md flex flex-row gap-3 items-center w-full">
                                    <ProfileImage user={user} imgSize={"5"} />
                                    <Link href={`/user/${user.username}`} className="transition-all subtitle hover:!text-white">{user?.username}</Link>   
                                </div>     
                            </div>    
                        )                            
                    } else {
                        return (
                            <p key={admin.userId} className="subtitle">Sorry, this admin couldn&apos;t be displayed.</p>
                        );
                    }

                })}
            </div>
        );
    }
}