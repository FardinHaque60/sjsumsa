// check admin status to determine to show edit icons or not
import { NextRequest, NextResponse } from 'next/server';

// GET admin session status
export async function GET(req: NextRequest) {
    const cookies = req.headers.get("cookie");

    // if authenticated, continue with normal request
    if (cookies?.includes("authToken=authenticated")) {
        return NextResponse.json({status: true});
    }
    return NextResponse.json({status: false});
}