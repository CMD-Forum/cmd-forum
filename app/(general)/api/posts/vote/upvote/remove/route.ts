import { NextResponse } from "next/server";

import { checkIfVoted, removeUpvote } from "@/app/(general)/lib/data";
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

        if ( voted.upvote === true ) {
            const removedUpvote = await removeUpvote({ userID: userID, postID: postID });
            return NextResponse.json(removedUpvote, { status: 200 });
        }
              
        return NextResponse.json({ error: "Post is not upvoted or an error occurred." }, { status: 400 })
    } catch (error) {
        logError(error);
        return NextResponse.json({ message: "Error occurred while upvoting."}, { status: 500 })
    }
}