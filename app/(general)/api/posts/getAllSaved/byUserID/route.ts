import { NextResponse } from 'next/server'

import { prisma } from '@/app/(general)/lib/db';

export async function POST( req: Request ) {

    try {

        const body = await req.json();
        let { userID, page } = body;

        const savedPostArray = await prisma.user.findUnique({
            where: {
                id: userID,
            },
            select: {
                savedPosts: true,
            },
        })

        if ( savedPostArray ) {
            const savedPosts = await prisma.post.findMany({
                skip: page * 20,
                take: 10,
                where: {
                    id: {
                        in: savedPostArray.savedPosts,
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
                        },
                    },
                },
            })    
            return NextResponse.json( savedPosts, { status: 200 } )   
        }

        

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: "Error occurred while fetching saved posts, please check your request for errors."}, { status: 500 });

    }

}
