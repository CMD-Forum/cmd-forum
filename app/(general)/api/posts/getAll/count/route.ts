import { prisma } from "@/app/(general)/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req: NextRequest ) {

    try {;

        const post_count = await prisma.post.count();     
              
        return NextResponse.json(post_count, { status: 200 })

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: "Error occurred while fetching post count."}, { status: 500 })

    }
}