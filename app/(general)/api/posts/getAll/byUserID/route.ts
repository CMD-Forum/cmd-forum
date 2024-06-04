import { NextResponse } from "next/server";

import { prisma } from "@/app/(general)/lib/db";

export async function POST( req: Request ) {

    try {

        const body = await req.json();
        let { userID, page } = body;

        if ( ! userID ) {
            return NextResponse.json({ message: "UserID is required." }, { status: 400 });
        }

        const posts = await prisma.post.findMany({

            skip: page * 10,
            take: 10,

            where: {
                author: {
                    id: userID,
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