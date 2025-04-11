// check admin status to determine to show edit icons or not
import { NextRequest, NextResponse } from 'next/server';

// GET admin session status
export async function GET(req: NextRequest) {
    const cookies = req.headers.get("cookie");

    if (cookies?.includes("authToken=authenticated")) {
        return NextResponse.json({authenticated: true}, {status: 200});
    }
    return NextResponse.json({authenticated: false});
}