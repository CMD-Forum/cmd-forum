import { Metadata } from "next";

import { prisma } from "@/app/(general)/lib/db";
import LargeDropdown from "@/app/(general)/ui/components/large_dropdown";
import { CommunityAdministrators } from "@/app/(general)/ui/components/moderation/admin_list";
import { ModlogList } from "@/app/(general)/ui/components/moderation/modlog_list";
 
export async function generateMetadata(
  { params }: { params: { community: string } },
): Promise<Metadata> {
  const name = params.community.toLowerCase()
  return {
    title: name ? `c/${name} - Moderation` : "",
  }
}

export default async function ModerationPage({ params }: { params: { community: string } }) {
    
    const community = await prisma.community.findUnique({
        where: {
            name: params.community
        },
        select: {
            id: true,
        }
    })

    if ( community ) {
        return (
            <main className="flex min-h-screen flex-col w-full">
                <div className="error flex flex-col w-full">
                    <div className="flex flex-col border-0 border-border p-6 md:pt-12 bg-background/35 md:mt-0 lg:px-4">
                        <h1 className="header">Moderation</h1>
                        <p className={`subtitle sm:hidden`}>You are viewing the moderation page of <br /> c/{ params.community }.</p>
                        <p className={`subtitle hidden sm:flex`}>You are viewing the moderation page of c/{ params.community }.</p>   
                    </div>

                    <div className='flex flex-col lg:pb-12 px-4 mb-6 gap-4'>
                        <p className="subtitle">Community ID: {community.id}</p>

                        <LargeDropdown 
                            title={"Administrators"} 
                            description={"List of the community administrators."}
                        >
                            <CommunityAdministrators communityId={community.id} />      
                        </LargeDropdown>

                        <LargeDropdown title={"Administration Logs"} description={"Records of all actions taken by the administrators."}>
                            <ModlogList communityId={community.id} />      
                        </LargeDropdown>
                    </div>
                </div>
            </main>
        );
    }
}