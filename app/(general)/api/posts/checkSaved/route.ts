import { NextResponse } from 'next/server'

import { prisma } from '@/app/(general)/lib/db';

export async function POST( req: Request ) {

    try {

        const body = await req.json();

        let { userID, postID } = body;

        const user = await prisma.user.findUnique({
            where: {
                id: userID,
            },
        })

        if ( user ) {
            // @ts-ignore
            const postAlreadySaved = user.savedPosts.map(post => post.trim()).includes(postID.trim());

            if ( postAlreadySaved ) {
                return NextResponse.json({ message: "Post is already saved." }, { status: 400 })
            }            
        }
        
        return NextResponse.json({ message: "Post is not saved." }, { status: 201 });

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: "Error occurred."}, { status: 500 });

    }

}
