import { NextResponse } from 'next/server';

// eslint-disable-next-line no-unused-vars
import { prisma } from '@/app/(general)/lib/db';
// eslint-disable-next-line no-unused-vars
import { CreateCommunitySchema } from '@/app/(general)/lib/schemas';


// eslint-disable-next-line no-unused-vars
export async function POST(req: Request) {

    try {

        return NextResponse.json({ message: "Community creation is currently unavailable through the API."}, { status: 500 })

       /* const body = await req.json();
        const { name, description, image_url } = CreateCommunitySchema.parse(body);

        const CommunityNameExists = await prisma.community.findUnique({
            where: { name: name }
        });

        const CommunityDisplayNameExists = await prisma.community.findUnique({
            where: { display_name: name }
        });

        if ( CommunityNameExists || CommunityDisplayNameExists ) {
            return NextResponse.json({ community: null, message: "Community with this name already exists."}, { status: 409 })
        }

        const newCommunity = await prisma.community.create({
            data: {
                name: name.toLowerCase(),
                display_name: name,
                description: description,
                image: image_url,
            }
        });

        return NextResponse.json({ community: newCommunity, message: "Community has been created."}, { status: 201 });*/

    } catch(error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error, check your formatting and that all required fields are present."}, { status: 500 });
    }

}
