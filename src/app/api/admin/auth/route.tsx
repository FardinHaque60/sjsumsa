// api endpoint for logging in as admin
import { NextResponse } from "next/server";
import { serialize } from "cookie";

// POST function to handle login given password
export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const password = payload.password;

        if (password === process.env['ADMIN_PASSWORD']) {
            const cookie = serialize("authToken", "authenticated", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24, // cookie lasts for 1 day than expires
                path: "/",
            });

            return NextResponse.json({success: true}, {
                status: 200,
                headers: {
                    "Set-Cookie": cookie,
                }
            });
        } 
        return NextResponse.json({success: false});
    } catch (error) {
        console.log("SERVER: error occurred handling admin password", error);
        return NextResponse.json({ success: false }, { status: 500 });
    } 
}

// handle admin logout
export async function DELETE() {
    const cookie = serialize("authToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0, // cookie expires immediately
        path: "/",
    });

    return NextResponse.json({success: true}, {
        status: 200,
        headers: {
            "Set-Cookie": cookie,
        }
    });
}