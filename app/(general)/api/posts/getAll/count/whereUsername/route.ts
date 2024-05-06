import { prisma } from "@/app/(general)/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req: NextRequest ) {

    try {;

        if ( ! req.body) {
            return NextResponse.json({ message: "Request body is required." }, { status: 400 });
        }

        const body = await req.json();
        let { username } = body;

        if ( ! username ) {
            return NextResponse.json({ message: "Username is required." }, { status: 400 })
        }

        const postCount = await prisma.post.count({
            where: {
                author: {
                    username: username,
                },
            },
        });     
              
        return NextResponse.json(postCount, { status: 200 })

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: "Error occurred while fetching post count."}, { status: 500 })

    }
}