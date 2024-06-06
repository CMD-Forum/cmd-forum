import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/app/(general)/lib/db";

export async function GET( req: NextRequest ) {

    try {

        if ( ! req.body) {
            return NextResponse.json({ message: "Request body is required." }, { status: 400 });
        }

        const body = await req.json();
        let { userID } = body;

        if ( ! userID ) {
            return NextResponse.json({ message: "UserID is required." }, { status: 400 })
        }

        const postCount = await prisma.post.count({
            where: {
                author: {
                    id: userID,
                },
            },
        });     
              
        return NextResponse.json(postCount, { status: 200 })

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: "Error occurred while fetching post count."}, { status: 500 })

    }
}