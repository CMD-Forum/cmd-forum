import { NextResponse } from "next/server";

import { editComment } from "@/app/(general)/lib/data";
import { logError } from "@/app/(general)/lib/utils";

// TO-DO: Add authentication

export async function POST( req: Request ) {

    try {
        const body = await req.json();
        let { commentID, content } = body;
        if ( ! commentID ) {
            return NextResponse.json({ message: "commentID and content are required." }, { status: 400 });
        }

        const editedComment = await editComment({ commentID: commentID, content: content });
              
        return NextResponse.json(editedComment, { status: 200 })
    } catch (error) {
        logError(error);
        return NextResponse.json({ message: "Error occurred while editing comment."}, { status: 500 })
    }
}