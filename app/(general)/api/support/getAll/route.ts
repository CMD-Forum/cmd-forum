import { prisma } from '@/app/(general)/lib/db';
import { NextResponse } from 'next/server';

export async function GET( req: Request ) {

    try {

        const support = await prisma.support.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        name: true
                    }
                }
            }
        });        
              
        return NextResponse.json(support, { status: 200 })

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: "Error occurred while fetching support articles."}, { status: 500 })

    }
}

export async function POST( req: Request) {
    
    return NextResponse.json({ error: "503 Service Unavailable"}, { status: 503})

}