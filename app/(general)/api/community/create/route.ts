import { NextResponse } from "next/server";

export async function GET() {
    
    return NextResponse.json({ message: "Feature unavailable at this time." }, { status: 503})

}