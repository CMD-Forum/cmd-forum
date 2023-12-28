import { Infobar } from "@/app/ui/navigation";
import { prisma } from "@/app/lib/db";

export default async function CommunityPage({ params }: { params: { community: string } }) {

  const dbCommunity = await prisma.community.findUnique({

    where: {

        name: params.community.toLowerCase()

    }

  })

  if ( ! dbCommunity ) {

    return( 
    
        <h1>Community not found.</h1>

    );

  }

  console.log(dbCommunity)

  return (

    <main className="">

        <Infobar community={dbCommunity?.name} community_dn={dbCommunity.display_name} administrators={dbCommunity?.admin_ids} main={dbCommunity.sidebar_md} createdAt={dbCommunity?.createdAt.toLocaleDateString()} community_image={dbCommunity?.image} community_description={dbCommunity.description} /> 

        <h1>{`params.community: ${params.community}`}</h1>

    </main>

  );

}
