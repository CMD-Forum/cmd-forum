import { Infobar } from "@/app/(general)/ui/navigation";
import { prisma } from "@/app/(general)/lib/db";
import Link from "next/link";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default async function CommunityPage({ params }: { params: { community: string } }) {

  const dbCommunity = await prisma.community.findUnique({

    where: {

        name: params.community.toLowerCase()

    }

  })

  if ( ! dbCommunity ) {

    return( 
    
        <div className='flex-row gap-2 p-6 rounded-md w-full bg-transparent'>
            <div className='flex-col'>
                <div className='flex flex-row gap-3 items-center'>
                    <div className='flex flex-col'>
                        <h1 className='text-2xl font-sans font-bold antialiased w-full'>Sorry, we couldn&apos;t find that community. </h1>   
                        <h2 className="text-gray-300">Make sure you typed it correctly, or select an option below.</h2>
                        <div className="flex flex-row gap-2 mt-2">
                          <Link className='navlink' href='/'><HomeIcon className="font-medium h-5 w-5" />Home</Link>
                          <Link className='navlink' href='/search'><MagnifyingGlassIcon className="font-medium h-5 w-5" />Search</Link>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

  }

  return (

    <main>

        <Infobar community={dbCommunity?.name} community_dn={dbCommunity.display_name} administrators={dbCommunity?.admin_ids} main={dbCommunity.sidebar_md} createdAt={dbCommunity?.createdAt.toLocaleDateString()} community_image={dbCommunity?.image} community_description={dbCommunity.description} /> 

    </main>

  );

}
