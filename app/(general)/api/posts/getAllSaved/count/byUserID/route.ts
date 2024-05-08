import { prisma } from '@/app/(general)/lib/db';
import { NextResponse } from 'next/server'

export async function POST( req: Request ) {

    try {

        const body = await req.json();
        let { userID } = body;

        const savedPostArray = await prisma.user.findUnique({
            where: {
                id: userID,
            },
            select: {
                savedPosts: true,
            },
        })

        if ( savedPostArray ) {
            const savedPostCount = await Promise.all(savedPostArray.savedPosts.map(async (postID) => {
                return prisma.post.count({
                    where: {
                        id: postID,
                    },
                })
            }))         
            return NextResponse.json( savedPostCount, { status: 200 } )   
        }

        

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: "Error occurred while fetching saved posts, please check your request for errors."}, { status: 500 });

    }

}
