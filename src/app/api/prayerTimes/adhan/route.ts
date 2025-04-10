// all endpoints for adhan times (cacheing result from api for the day,
import AdhanTimesModel from "@/lib/models/AdhanTimesModel";
import { ConnectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from 'next/server';

// GET function to get the adhan times for today, acts as retrieving from cache
export async function GET(req: NextRequest) {
    await ConnectDB(); 
    const todayDate = req.nextUrl.searchParams.get("todayDate") || "";

    if (todayDate === "") {
        return NextResponse.json({ success: false, error: "todayDate is required" }, { status: 400 });
    }

    try {
        const adhanTimes = await AdhanTimesModel.find({ date: todayDate });
        if (adhanTimes.length === 0) {
            return NextResponse.json({ success: false, error: "No adhan times found for today" });
        }
        return NextResponse.json({ success: true,  data: adhanTimes[0] }, { status: 200 });
    } catch (error) {
        console.error("SERVER: error retrieving adhan times:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch adhan times" }, { status: 500 });
    }
}

// POST function to add to adhanTimes to database, used when prayer times on website is outdated and updates from api
export async function PUT(request: Request) {
    await ConnectDB();
    const body = await request.json();

    try {
        const adhanTime = await AdhanTimesModel.findOne();
        if (!adhanTime) {
            return NextResponse.json({ status: false, error: "No Adhan Time Not Found" }, { status: 404 });
        }
        Object.assign(adhanTime, body);
        await adhanTime.save();

        return NextResponse.json({message: "Adhan Time Saved Successfully"}, { status: 200 });
    } catch (error) {
        console.error("SERVER: error saving adhan time:", error);
        return NextResponse.json({ error: "Adhan Time Failed to Save" }, { status: 400 });
    }
}

// DELETE function to remove all entries in adhanTimes. 
export async function DELETE() {
    await ConnectDB();
    try {
        const deleted = await AdhanTimesModel.deleteMany({});
        if (deleted.deletedCount === 0) {
            return NextResponse.json({ success: false }, { status: 404 });
        }
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("SERVER: error deleting adhan times:", error);
        return NextResponse.json({ success: false, error: "failed to delete adhan times" }, { status: 500 });
    }
}