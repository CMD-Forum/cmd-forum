/* eslint-disable no-unused-vars */
import Link from "next/link";

import { prisma } from "../../../lib/db";

export async function ModlogList({ communityId }: { communityId: string }) {


        /*const modlogs = await prisma.{fill in}.findUnique({

            where: {
        
                id: communityId,
        
            }
        
        }) */

        //if ( community ) {

            return (
                <div>
                    <div className="p-2 pt-12 lg:pb-12 lg:p-12 lg:px-48">
                        <div className='flex flex-col items-center justify-center w-full relative group transition-all bg-card h-[174px] rounded-md px-5 py-5'>
                            <p className='md:!header-2 header-4 !text-center'>Oops, sorry about this.</p>
                            <p className='subtitle !text-center'>This feature hasn&apos;t been implemented yet.</p>
                        </div>            
                    </div>
                    {/*{Array.isArray(community.admin_ids) && community.admin_ids.map(async (admin_id) => {

                        return (
                            <div key={admin_id} className="flex flex-row gap-4 w-full">
                                <div className="bg-card border-1 border-border p-4 rounded-md flex flex-row gap-4 items-center w-full">
                                    <img src={user.image} className="w-6 h-6 rounded-sm" alt={`Profile Picture of ${user.username}`} />
                                    <Link href={`/user/${user.username}`} className="hover:text-gray-300 transition-all">{user?.username}</Link>   
                                </div>     
                            </div>    
                        )                            

                    })}*/}
                </div>
            );            
        //}

}