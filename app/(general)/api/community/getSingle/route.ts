import { prisma } from '@/app/(general)/lib/db';
import { NextResponse } from 'next/server';
import xss from 'xss';

export async function POST( req: Request ) {

    try {

        if ( ! req.body) {

            return NextResponse.json({ message: "Request body is required." }, { status: 400 });

        }

        console.log("req.body = " + req.body);
        const body = await req.json();

        let { communityId } = body;

        if ( ! communityId ) {

            return NextResponse.json({ message: "CommunityId is required." }, { status: 400 })

        }

        const community = await prisma.community.findUnique({

            where: {

                id: communityId

            }
            
        });        
              
        return NextResponse.json(community, { status: 200 })

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: "Error occurred while fetching community."}, { status: 500 })

    }
}

export async function GET() {

    return NextResponse.json({ message: "Use POST to get a single community here, or use GET at the /api/community/getAll endpoint." }, {status: 400})

}