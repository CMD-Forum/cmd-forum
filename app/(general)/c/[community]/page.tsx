import { Metadata } from "next";
import { notFound } from 'next/navigation';

import { prisma } from "@/app/(general)/lib/db";
import { auth } from "@/auth";

import { CommunityInfobar } from "../../ui/components/nav_sideitem";
import { PostListByCommunity } from "../../ui/components/posts/post_list_custom";
 
export async function generateMetadata(
  { params }: { params: { community: string } },
): Promise<Metadata> {
  const name = params.community.toLowerCase()
  return {
    title: name ? `c/${name}` : "CMD/>",
  }
}

export default async function CommunityPage({ params }: { params: { community: string } }) {

  const dbCommunity = await prisma.community.findUnique({ where: { name: params.community.toLowerCase() } });

  if ( ! dbCommunity ) {
    return notFound();
  }

  const session = await auth();

  if ( session?.user.id ) {
    // const userMemberships = await getAllUserMembershipRecords({ userID: session.user.id }) 
    return (
      <main className="flex min-h-fit flex-col w-full">   
        <div className="error flex flex-col w-full mt-14 md:mt-0">
          <CommunityInfobar 
            community={dbCommunity} 
          />      
        </div>
        <div className='flex flex-col px-6 lg:py-12 lg:px-48 mb-6 pt-12'>
          <PostListByCommunity communityID={dbCommunity.id} />
        </div>
      </main>
    );    
  } else {
    return (
      <main className="flex min-h-fit flex-col w-full">   
        <div className="error flex flex-col w-full mt-14 md:mt-0">
          <CommunityInfobar 
            community={dbCommunity} 
          />      
        </div>
        <div className='flex flex-col px-6 lg:py-12 lg:px-48 mb-6 pt-12'>
          <PostListByCommunity communityID={dbCommunity.id} />
        </div>
      </main>
    );        
  }
}
