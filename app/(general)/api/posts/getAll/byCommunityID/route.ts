import { NextResponse } from "next/server";

import { prisma } from "@/app/(general)/lib/db";

export async function POST( req: Request ) {

    try {

        const body = await req.json();

        let { communityID, page } = body;

        if ( ! communityID ) {
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
                        display_name: true,
                        image: true,
                        public: true,
                        description: true
                    }
                }
            }
        });

        const post_count = await prisma.post.count({
            where: {
                communityId: communityID
            }
        });
              
        return NextResponse.json({ posts, post_count }, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error occurred while fetching posts. Make sure you have included all fields correctly."}, { status: 500 })
    }
}