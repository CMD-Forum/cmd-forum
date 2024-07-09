import { NextResponse } from "next/server";

import { getTotalDownvotes, getTotalUpvotes } from "@/app/(general)/lib/data";
import { logError } from "@/app/(general)/lib/utils";

export async function POST( req: Request ) {

    try {
        const body = await req.json();
        let { postID } = body;
        if ( ! postID ) {
            return NextResponse.json({ message: "postID is required." }, { status: 400 });
        }
        
        const upvotes = await getTotalUpvotes({ postID: postID });
        const downvotes = await getTotalDownvotes({ postID: postID });

        return NextResponse.json({ upvotes, downvotes }, { status: 200 })
    } catch (error) {
        logError(error);
        return NextResponse.json({ message: "Error occurred while fetching score."}, { status: 500 })
    }
}