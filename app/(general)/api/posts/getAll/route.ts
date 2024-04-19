import { prisma } from "@/app/(general)/lib/db";
import { NextResponse } from "next/server";

export async function POST( req: Request ) {

    try {

        if ( ! req.body ) {
            return NextResponse.json({ message: "Request body is required." }, { status: 400 });
        }

        const body = await req.json();
        let { page } = body;

        if ( ! page ) {
            return NextResponse.json({ message: "Please provide a page, 0 is first." }, { status: 400 });
        }

        const posts = await prisma.post.findMany({

            skip: page * 10,
            take: 10,

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