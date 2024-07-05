/**
 * ## getCurrentUser
 * ---
 * Returns the session of the currently logged in user.
 * @returns {JSON} session
 */

import { NextResponse } from 'next/server';

import { getAuth } from '@/app/(general)/lib/auth';

export async function GET() {
    try {
        const session = await getAuth();

        if (!session) {
            return NextResponse.json({ message: "Session doesn't exist." }, { status: 401 })
        }

        return NextResponse.json({ session }, { status: 200 })
    } catch ( error ) {
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 })
    }
}