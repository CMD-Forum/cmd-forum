import { NextResponse } from "next/server";

import getOGS from "../../lib/ogs";
import { logError } from "../../lib/utils";

export async function POST( req: Request ) {

    try {
        const body = await req.json();
        let { url } = body;
        if ( ! url ) {
            return NextResponse.json({ message: "URL is required." }, { status: 400 });
        }

        const result = await getOGS({ url: url });

        if (result.error === false) {
            return NextResponse.json(result, { status: 200 })    
        } else {
            logError("Unknown error occurred in OGS Api Endpoint.")
            return NextResponse.json({ message: "Error occurred while fetching OGS data." }, { status: 500 })
        }
        
    } catch (error) {
        // @ts-ignore
        logError("OGS Request Failed: " + error.result.error + " @ " + error.result.requestUrl);
        // @ts-ignore
        return NextResponse.json({ message: "OGS Request Failed: " + error.result.error + " @ " + error.result.requestUrl }, { status: 500 })
    }
}