import { prisma } from '@/app/(general)/lib/db';
import { NextResponse } from 'next/server';
import xss from 'xss';

export async function POST(req: Request, res: Response) {

    try {

        const body = await req.json();

        let { title, content, authorId, communityId, tagline, imageurl, imagealt } = body;

        authorId = Number(authorId);
        communityId = Number(communityId);

        const sanitizedTitle = xss(title);
        const sanitizedContent = xss(content);
        const sanitizedTagline = xss(tagline);
        const sanitizedImageurl = imageurl ? xss(imageurl) : null;
        const sanitizedImagealt = imagealt ? xss(imagealt) : null;

        const data = {
            title: sanitizedTitle,
            content: sanitizedContent,
            tagline: sanitizedTagline,
            public: true, // default value
            downvotes: 0, // default value
            upvotes: 0, // default value
            imageurl: sanitizedImageurl,
            imagealt: sanitizedImagealt,

            author: {
                connect: {
                    id: authorId
                }
            },
            community: {
                connect: {
                    id: communityId
                }
            }
        };

        if ( imageurl ) {
            data.imageurl = imageurl;
        }
        if ( imagealt ) {
            data.imagealt = imagealt;
        }

        const post = await prisma.post.create({

            data,

        });

        return NextResponse.json(post, { status: 201 });

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: "Error occurred while creating post, please check your request for errors."}, { status: 500 });

    }

}
