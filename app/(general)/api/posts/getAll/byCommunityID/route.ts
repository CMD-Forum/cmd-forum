import { prisma } from "@/app/(general)/lib/db";
import { NextResponse } from "next/server";

export async function POST( req: Request ) {

    try {

        const body = await req.json();

        let { communityID, page } = body;

        if ( ! communityID ) {
            console.log("com id err") 
            return NextResponse.json({ message: "CommunityID is required." }, { status: 400 });
        }

        const posts = await prisma.post.findMany({

            // @ts-ignore
            skip: page * 10,
            take: 10,

            where: {
                community: {
                    id: communityID,
                },
            },

            include: {

                author: {

                    select: {

                        id: true,
                        username: true,
                        createdAt: true,
                        updatedAt: true,
                        image: true,
                        description: true,

                    }

                },

                community: {

                    select: {

                        id: true,
                        name: true,
                        // eslint-disable-next-line camelcase
                        display_name: true,
                        image: true,
                        public: true

                    }

                }
            }
        });        
              
        return NextResponse.json(posts, { status: 200 })

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: "Error occurred while fetching posts."}, { status: 500 })

    }
}