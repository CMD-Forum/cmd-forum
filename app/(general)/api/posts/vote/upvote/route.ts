import { NextResponse } from "next/server";

import { checkIfVoted, removeDownvote, upvote } from "@/app/(general)/lib/data";
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
            return NextResponse.json({ message: "Already Upvoted"}, { status: 200 });
        }

        if ( voted.downvote === true ) {
            await removeDownvote({ userID: userID, postID: postID });
        }

        const upvoted = await upvote({ userID: userID, postID: postID });
              
        return NextResponse.json(upvoted, { status: 200 })
    } catch (error) {
        logError(error);
        return NextResponse.json({ message: "Error occurred while upvoting."}, { status: 500 })
    }
}