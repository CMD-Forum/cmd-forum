import { NextResponse } from 'next/server'

import { prisma } from '@/app/(general)/lib/db';

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
        });

        if ( postAlreadySaved ) {

            const savedPosts = await prisma.user.findUnique({
                where: {
                    id: userID,
                },
                select: {
                    savedPosts: true,
                },
            });

            if ( savedPosts ) {

                try {

                    // @ts-ignore
                    const updatedSavedPosts = savedPosts.savedPosts.filter(post => post !== postID);

                    await prisma.user.update({
                        where: {
                            id: userID,
                        },
                        data: {
                            savedPosts: {
                                set: updatedSavedPosts,
                            },
                        },
                    });          
                    
                    return NextResponse.json({ message: "Post was successfully unsaved." }, { status: 200 })

                } catch (error) {
                    return NextResponse.json({ message: "Sorry, an error occurred." }, { status: 500 })
                }
                                  
            }

            return NextResponse.json({ message: "Sorry, an error occurred." }, { status: 500 })
        
        }

        return NextResponse.json({ message: "Post is not saved." }, { status: 400 })

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: "Error occurred while unsaving post, please check your request for errors."}, { status: 500 });

    }

}
