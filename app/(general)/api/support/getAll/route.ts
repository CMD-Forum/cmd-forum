import { NextResponse } from 'next/server';

import { prisma } from '@/app/(general)/lib/db';

export async function GET() {

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

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

        await timeout(5000);
              
        return NextResponse.json(support, { status: 200 })

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: "Error occurred while fetching support articles."}, { status: 500 })

    }
}

export async function POST() {
    
    return NextResponse.json({ error: "503 Service Unavailable"}, { status: 503})

}