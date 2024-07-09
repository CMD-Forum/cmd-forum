import { NextResponse } from "next/server";

import { checkIfVoted, downvote, removeUpvote } from "@/app/(general)/lib/data";
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
            return NextResponse.json({ message: "Already Downvoted"}, { status: 200 });
        }

        if ( voted.upvote === true ) {
            await removeUpvote({ userID: userID, postID: postID });
        }

        const downvoted = await downvote({ userID: userID, postID: postID });
              
        return NextResponse.json(downvoted, { status: 200 })
    } catch (error) {
        logError(error);
        return NextResponse.json({ message: "Error occurred while downvoting."}, { status: 500 })
    }
}