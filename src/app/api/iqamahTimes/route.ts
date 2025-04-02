// all endpoints for adhan times (cacheing result from api for the day, modifying them, etc.)
import IqamahTimesModel from "@/lib/models/IqamahTimesModel";
import { ConnectDB } from "@/lib/mongodb";
import { NextResponse } from 'next/server'; // add NextRequest import if needed
//import { getBucket } from "@/lib/mongo";
//import { Readable } from "stream";
//import { ObjectId } from 'mongodb';

// GET function to get all iqamah times saved from admin
export async function GET() {
    await ConnectDB(); 
    try {
        const iqamahTimes = await IqamahTimesModel.find({});
        if (iqamahTimes.length === 0) {
            return NextResponse.json({ success: false });
        }
        return NextResponse.json({ success: true,  data: iqamahTimes[0] });
    } catch (error) {
        console.error("Error retrieving adhan times:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch adhan times" }, { status: 500 });
    }
}