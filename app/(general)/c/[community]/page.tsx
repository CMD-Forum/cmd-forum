import { prisma } from "@/app/(general)/lib/db";
import { notFound } from 'next/navigation';
import { PostListByCommunity } from "../../ui/components/posts/post_list_custom";
import { CommunityInfobarItems } from "../../ui/components/nav_sideitem";

export default async function CommunityPage({ params }: { params: { community: string } }) {

  const dbCommunity = await prisma.community.findUnique({

    where: {

        name: params.community.toLowerCase(),

    }

  })

  if ( ! dbCommunity ) {

    return notFound();

  }

  return (

    <main className="flex min-h-fit flex-col w-full">

      <div className="error flex flex-col w-full">



      </div>

      <div className='flex flex-col px-6 lg:py-12 lg:px-48 mb-6 pt-12'>
        <CommunityInfobarItems 
          community={dbCommunity} 
        />               
        <div className="mb-4" />
        <PostListByCommunity communityID={dbCommunity.id} />
      </div>

    </main>

  );

}
