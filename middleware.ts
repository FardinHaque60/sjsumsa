import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// middleware function runs before every api request
export function middleware(req: NextRequest) {
    const cookies = req.headers.get("cookie");

    // if authenticated, continue with normal request
    if (cookies?.includes("authToken=authenticated")) {
        return NextResponse.next();
    }

    // Check if the request is for an API route
    if (req.nextUrl.pathname.startsWith('/api/')) {
        return new NextResponse(
            JSON.stringify({ message: "Unauthenticated access" }),
            { status: 401 }
        );
    }
    // if request is to a protected page, redirect to login page
    return NextResponse.redirect(new URL('/pages/login', req.url));
}

// Define which paths to protect
export const config = {
    matcher: [
        // add post api methods for events, iqamah, adhan times, etc. here
        '/api/prayerTimes/write/:path*',
        // add protected pages (see all archived events, etc.) 
    ], 
};