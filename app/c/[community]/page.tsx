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
    
        <div className='flex-row gap-2 px-5 py-5 rounded-md w-full bg-zinc-950 facebookTheme:bg-white border-zinc-950 border-l-[1px]'>
        
            <div className='flex-col'>

                <div className='flex flex-row gap-3 items-center mt-4'>

                    <div className='flex flex-col'>

                        <h1 className='text-2xl font-sans font-bold antialiased w-full'>Community not found</h1>   
                        <h2 className="text-gray-300">Make sure you typed it correctly.</h2>

                    </div>

                </div>

            </div>
        </div>

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