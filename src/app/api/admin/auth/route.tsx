// api endpoint for logging in as admin
import { NextResponse } from "next/server";
// import { serialize } from "cookie";

// POST function to handle login given password
export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const password = payload.password;

        if (password === process.env['ADMIN_PASSWORD']) {
            return NextResponse.json({success: true}, {status: 200});
        } 
        
        return NextResponse.json({success: false}, {status: 200}); // TODO check HTTP status code for incorrect auth response code

        /* TODO implement with JWT and cookie for state management possibly
        if (password === process.env['ADMIN_PASSWORD']) {
            // set cookie
            const cookie = serialize("authToken", "authenticated", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24, // cookie lasts for 1 day than expires
                path: "/",
            });
            
            // send cookie in response for client to remember user is logged in
            return new NextResponse(
                JSON.stringify({ status: true }),
                {
                    status: 200,
                    headers: {
                    "Set-Cookie": cookie,
                    },
                }
            );
        } 
        else { 
            return NextResponse.json({ status: false}, { status: 401 });
        } */
    } catch (error) {
        console.log("SERVER: error occurred handling admin password", error);
        return NextResponse.json({ status: false }, { status: 500 });
    } 
}
