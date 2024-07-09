import { Metadata } from "next";

import { prisma } from "@/app/(general)/lib/db";
import LargeDropdown from "@/app/(general)/ui/components/large_dropdown";
 
export async function generateMetadata(
  { params }: { params: { community: string } },
): Promise<Metadata> {
  const name = params.community.toLowerCase()
  return {
    title: name ? `c/${name} - Information` : "",
  }
}

export default async function InformationPage({ params }: { params: { community: string } }) {
    
    const community = await prisma.community.findUnique({
        where: {
            name: params.community
        },
        select: {
            id: true,
            rules: true,
        }
    });

    if ( community ) {
        return (
            <main className="flex min-h-screen flex-col w-full">
                <div className="error flex flex-col w-full">
                    <div className="flex flex-col border-0 border-border p-6 md:pt-12 bg-background/35 md:mt-0 lg:px-4">
                        <h1 className="header">Community Information</h1>
                        <p className={`subtitle hidden sm:flex`}>All the information about c/{ params.community }.</p>   
                    </div>

                    <div className='flex flex-col lg:pb-12 px-4 mb-6 gap-4'>

                        { Array.isArray(community.rules) && community.rules.length > 0 
                        ?
                            <LargeDropdown 
                                title={"Rules"} 
                                description={"List of the community rules."}
                            >
                                {community.rules.map((rule, index) =>
                                    <div key={index + 1}>
                                        <p className="subtitle">{index + 1}. {rule}</p>
                                    </div>                                    
                                )}
                            </LargeDropdown>     
                        :
                            <LargeDropdown 
                                title={"Rules"} 
                                description={"List of the community rules."}
                            >
                                <p className="subtitle">This community has no rules.</p>
                            </LargeDropdown>           
                        }
                    </div>
                </div>
            </main>
        );
    }
}