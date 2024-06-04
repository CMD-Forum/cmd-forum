import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/app/(general)/lib/db";

export async function POST( req: NextRequest ) {

    try {

        if ( ! req.body) {
            return NextResponse.json({ message: "Request body is required." }, { status: 400 });
        }

        const body = await req.json();
        let { communityID } = body;

        if ( ! communityID ) {
            return NextResponse.json({ message: "CommunityID is required." }, { status: 400 })
        }

        const postCount = await prisma.post.count({
            where: {
                community: {
                    id: communityID,
                },
            },
        });     
              
        return NextResponse.json(postCount, { status: 200 })

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: "Error occurred while fetching post count."}, { status: 500 })

    }
}