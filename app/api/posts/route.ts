import { prisma } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {

        const posts = await prisma.post.findMany();
        return NextResponse.json(posts, { status: 500 })

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: "Error occurred while fetching posts."}, { status: 500 })

    }
}
