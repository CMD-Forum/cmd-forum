import { Infobar } from "@/app/(general)/ui/navigation";
import { prisma } from "@/app/(general)/lib/db";
import { notFound } from 'next/navigation';

export default async function CommunityPage({ params }: { params: { community: string } }) {

  const dbCommunity = await prisma.community.findUnique({

    where: {

        name: params.community.toLowerCase()

    }

  })

  if ( ! dbCommunity ) {

    return notFound();

  }

  return (

    <main className="mt-12">

        <Infobar community={dbCommunity?.name} community_dn={dbCommunity.display_name} administrators={dbCommunity?.admin_ids} main={dbCommunity.sidebar_md} createdAt={dbCommunity?.createdAt.toLocaleDateString()} community_image={dbCommunity?.image} community_description={dbCommunity.description} /> 

    </main>

  );

}
