import { prisma } from "@/app/(general)/lib/db";
import { NextResponse } from "next/server";

export async function GET( req: Request ) {

    try {

        const posts = await prisma.post.findMany({
            include: {

                author: {

                    select: {

                        id: true,
                        name: true,
                        username: true,
                        createdAt: true,
                        updatedAt: true,
                        image: true,

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