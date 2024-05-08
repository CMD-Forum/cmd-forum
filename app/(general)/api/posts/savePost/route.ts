import { prisma } from '@/app/(general)/lib/db';
import { NextResponse } from 'next/server'

export async function POST( req: Request ) {

    try {

        const body = await req.json();

        let { userID, postID } = body;

        const postAlreadySaved = await prisma.user.findUnique({
            where: {
                id: userID,
                savedPosts: {
                    has: postID,
                }
            },
        })

        if ( postAlreadySaved ) {
            return NextResponse.json({ message: "Post is already saved." }, { status: 400 })
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: userID,
            },
            data: {
                savedPosts: {
                    push: postID,
                },
            },
        });

        return NextResponse.json({ message: "Successfully saved post." }, { status: 201 });

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: "Error occurred while creating post, please check your request for errors."}, { status: 500 });

    }

}
