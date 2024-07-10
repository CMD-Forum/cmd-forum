import { NextResponse } from "next/server";

import { updateComment } from "@/app/(general)/lib/data";
import { logError } from "@/app/(general)/lib/utils";

// TO-DO: Add authentication

export async function POST( req: Request ) {

    try {
        const body = await req.json();
        let { commentID, content } = body;
        if ( ! commentID ) {
            return NextResponse.json({ message: "commentID and content are required." }, { status: 400 });
        }

        const updatedComment = await updateComment({ commentID: commentID, content: content });
              
        return NextResponse.json(updatedComment, { status: 200 })
    } catch (error) {
        logError(error);
        return NextResponse.json({ message: "Error occurred while editing comment."}, { status: 500 })
    }
}