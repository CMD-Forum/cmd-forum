import { prisma } from '@/app/(general)/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {

        if ( ! req.body) {

            return NextResponse.json({ message: "Request body is required." }, { status: 400 });

        }

        const body = await req.json();

        const { userId } = body;

        const UserDetails = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                email: false,
                password: false,
                supportId: false,
                // Make sure passwords aren't publicly accessible.
                id: true,
                username: true,
                name: true,
                description: true,
                profile_image: true,
                createdAt: true,
                updatedAt: true
            },
        });

        if ( UserDetails ) {

            return NextResponse.json({ UserDetails }, { status: 201 });

        } else if ( ! UserDetails ) {

            return NextResponse.json({ message: "User was not found." }, { status: 404 });

        }

    } catch(error) {
        
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error, check your formatting and that all required fields are present."}, { status: 500 });
    
    }
}
