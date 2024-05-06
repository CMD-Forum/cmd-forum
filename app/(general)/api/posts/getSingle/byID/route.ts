import { prisma } from '@/app/(general)/lib/db';
import { NextResponse } from 'next/server';

export async function POST( req: Request ) {

    try {

        if ( ! req.body) {

            return NextResponse.json({ message: "Request body is required." }, { status: 400 });

        }

        const body = await req.json();

        let { postID } = body;

        if ( ! postID ) {

            return NextResponse.json({ message: "Post ID is required." }, { status: 400 })

        }

        const post = await prisma.post.findUnique({

            where: {

                id: postID

            }
            
        });        

        if ( ! post ) {
            return NextResponse.json({ message: "Post not found."}, { status: 404 })
        }
              
        return NextResponse.json(post, { status: 200 })

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: "Error occurred while fetching community."}, { status: 500 })

    }
}

export async function GET() {

    return NextResponse.json({ message: "This API endpoint uses POST." }, {status: 400})

}