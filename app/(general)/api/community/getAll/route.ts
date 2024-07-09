import { NextResponse } from "next/server";

import { prisma } from "@/app/(general)/lib/db";
import { logError } from "@/app/(general)/lib/utils";

export async function GET() {
    try {
        const communitys = await prisma.community.findMany();         
        return NextResponse.json(communitys, { status: 200 })
        // return NextResponse.json({ message: "Requesting all communitys is currently unavailable." }, { status: 500 })
    } catch (error) {
        logError(error);
        return NextResponse.json({ message: "Error occurred while fetching communitys."}, { status: 500 })
    }
}