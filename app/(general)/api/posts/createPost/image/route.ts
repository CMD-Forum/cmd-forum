import { NextResponse } from 'next/server';
import xss from 'xss';

import { lucia } from '@/app/(general)/lib/auth';
import { prisma } from '@/app/(general)/lib/db';
import { logError } from '@/app/(general)/lib/utils';

export async function POST(req: Request) {

    try {

        const authorizationHeader = req.headers.get("Authorization");
        const sessionId = lucia.readBearerToken(authorizationHeader ?? "");

        if ( ! sessionId ) {
            return new NextResponse(null, {
                status: 401
            });
        }
        
        const { user } = await lucia.validateSession(sessionId);

        if ( ! user?.id ) {
            return new NextResponse(null, {
                status: 401
            });
        }

        const body = await req.json();

        let { title, communityId, image, imagealt } = body;

        const existingCommunity = prisma.comment.findUnique({
            where: {
                id: communityId,
            },
        });

        if (!existingCommunity) {
            return NextResponse.json({ message: "That community doesn't exist." }, { status: 400 })
        }

        if (image === "" || image === null) {
            return NextResponse.json({ message: "Image must not be blank." }, { status: 400 })
        }

        if (imagealt === "" || imagealt === null) {
            return NextResponse.json({ message: "Imagealt must not be blank." }, { status: 400 })
        }

        const sanitizedTitle = xss(title);
        const sanitizedImageurl = image ? xss(image) : null;
        const sanitizedImagealt = imagealt ? xss(imagealt) : null;
        const sanitizedCommunityID = xss(communityId);

        const post = await prisma.post.create({
            data: {
                title: sanitizedTitle,
                content: "",
                public: user.public,
                imageurl: sanitizedImageurl,
                imagealt: sanitizedImagealt,
                author: {
                    connect: {
                        id: user.id,
                    },
                },
                community: {
                    connect: {
                        id: sanitizedCommunityID,
                    },
                },    
            }
        });

        return NextResponse.json(post, { status: 201 });
        
    } catch (error) {
        logError(error);
        return NextResponse.json({ message: "Error occurred while creating post, please check your request for errors."}, { status: 500 });
    }
}
