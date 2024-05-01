import Link from "next/link";
import { prisma } from "../../../lib/db";

export async function CommunityAdministrators({ communityId }: { communityId: string }) {


        const community = await prisma.community.findUnique({

            where: {
        
                id: communityId,
        
            }
        
        })

        if ( community ) {

            return (
                <div>
                    {Array.isArray(community.admin_ids) && community.admin_ids.map(async (admin_id) => {

                        const user = await prisma.user.findUnique({
                            where: {
                                id: admin_id,
                            }
                        })

                        if ( user ) {
                            return (
                                <div key={admin_id} className="flex flex-row gap-4 w-full">
                                    <div className="bg-card border-1 border-border p-4 rounded-md flex flex-row gap-4 items-center w-full">
                                        <img src={user.image} className="w-6 h-6 rounded-sm" alt={`Profile Picture of ${user.username}`} />
                                        <Link href={`/user/${user.username}`} className="hover:text-gray-300 transition-all">{user?.username}</Link>   
                                    </div>     
                                </div>    
                            )                            
                        } else {
                            return (
                                <p key={admin_id}>Sorry, this admin couldn&apos;t be displayed.</p>
                            );
                        }

                    })}
                </div>
            );

        } else if ( ! community ) {
            return (
                <div className="p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48">
                    <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'>
                        <p className='md:!header-2 header-3'>Sorry, looks like this community doesn&apos;t exist.</p>
                        <p className='text-center !text-white font-medium antialiased w-full'>Don&apos;t worry, you probably mistyped.</p>
                    </div>            
                </div>
            );
        }

}