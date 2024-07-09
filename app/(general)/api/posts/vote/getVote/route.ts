import { NextResponse } from "next/server";

import { checkIfVoted } from "@/app/(general)/lib/data";
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
              
        return NextResponse.json(voted, { status: 200 })
    } catch (error) {
        logError(error);
        return NextResponse.json({ message: "Error occurred while fetching vote."}, { status: 500 })
    }
}