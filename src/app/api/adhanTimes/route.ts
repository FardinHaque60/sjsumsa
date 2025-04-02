// all endpoints for adhan times (cacheing result from api for the day, modifying them, etc.)
import AdhanTimesModel from "@/lib/models/AdhanTimesModel";
import { ConnectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from 'next/server';
//import { getBucket } from "@/lib/mongo";
//import { Readable } from "stream";
//import { ObjectId } from 'mongodb';

// GET function to get the adhan times for today, acts as retrieving from cache
export async function GET(req: NextRequest) {
    await ConnectDB(); 
    const todayDate = req.nextUrl.searchParams.get("todayDate") || "";
    try {
        const adhanTimes = await AdhanTimesModel.find({ date: todayDate });
        if (adhanTimes.length === 0) {
            return NextResponse.json({ success: false });
        }
        return NextResponse.json({ success: true,  data: adhanTimes[0] });
    } catch (error) {
        console.error("Error retrieving adhan times:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch adhan times" }, { status: 500 });
    }
}

// POST function to add to adhanTimes to database, used when prayer times on website is outdated and updates from api
export async function POST(request: Request) {
    await ConnectDB();
    const body = await request.json();

    try {
        await AdhanTimesModel.create(body);
        console.log("SERVER: Adhan Time Saved");
        return NextResponse.json({message: "Adhan Time Saved Successfully"});
    } catch (error) {
        console.error("SERVER: Error saving adhan time:", error);
        return NextResponse.json({ error: "Adhan Time Failed to Save" }, { status: 400 });
    }
}

// DELETE function to remove all entries in adhanTimes. used before new adhan time is added to cache to clear old entries
export async function DELETE() {
    await ConnectDB();
    try {
        const deleted = await AdhanTimesModel.deleteMany({});
        if (deleted.deletedCount === 0) {
            return NextResponse.json({ success: false });
        }
        console.log("SERVER: Deleted all adhan times");
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting adhan times:", error);
        return NextResponse.json({ success: false, error: "Failed to delete adhan times" }, { status: 500 });
    }
}