import { prisma } from "@/app/(general)/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req: NextRequest ) {

    try {

        const params = req.nextUrl.searchParams;
        const page = params.get("page");

        if ( ! page ) {
            return NextResponse.json({ message: "Page is required." }, { status: 400 });
        }

        const posts = await prisma.post.findMany({

            // @ts-ignore
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