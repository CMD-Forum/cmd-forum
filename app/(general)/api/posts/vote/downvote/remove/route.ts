import { NextResponse } from "next/server";

import { checkIfVoted, removeDownvote } from "@/app/(general)/lib/data";
import { logError } from "@/app/(general)/lib/utils";

// TO-DO: Add authentication

export async function POST( req: Request ) {

    try {
        const body = await req.json();
        let { userID, postID } = body;
        if ( ! userID || ! postID ) {
            return NextResponse.json({ message: "userID and postID are required." }, { status: 400 });
        }

        const voted = await checkIfVoted({ userID: userID, postID: postID });

        if ( voted.downvote === true ) {
            const removedDownvote = await removeDownvote({ userID: userID, postID: postID });
            return NextResponse.json(removedDownvote, { status: 200 });
        }
              
        return NextResponse.json({ error: "Post is not downvoted or an error occurred." }, { status: 400 })
    } catch (error) {
        logError(error);
        return NextResponse.json({ message: "Error occurred while downvoting."}, { status: 500 })
    }
}