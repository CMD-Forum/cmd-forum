import { NextResponse } from "next/server";

import { createComment } from "@/app/(general)/lib/data";
import { logError } from "@/app/(general)/lib/utils";

// TO-DO: Add authentication

export async function POST( req: Request ) {

    try {
        const body = await req.json();
        let { userID, postID, content } = body;
        if ( ! userID || ! postID ) {
            return NextResponse.json({ message: "userID, postID and content are required." }, { status: 400 });
        }

        const comment = await createComment({ userID: userID, postID: postID, content: content });
              
        return NextResponse.json(comment, { status: 200 })
    } catch (error) {
        logError(error);
        return NextResponse.json({ message: "Error occurred while creating comment."}, { status: 500 })
    }
}