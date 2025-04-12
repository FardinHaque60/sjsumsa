// read endpoint for iqamah times 
import IqamahTimesModel from "@/lib/models/IqamahTimesModel";
import { ConnectDB } from "@/lib/mongodb";
import { NextResponse } from 'next/server';

// GET function to get all iqamah times saved from admin
export async function GET() {
    await ConnectDB(); 
    try {
        const iqamahTimes = await IqamahTimesModel.find({});
        if (iqamahTimes.length === 0) {
            return NextResponse.json({ success: false }, { status: 404 });
        }
        return NextResponse.json({ success: true,  data: iqamahTimes[0] }, { status: 200 });
    } catch (error) {
        console.error("Error retrieving iqamah times:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch iqamah times" }, { status: 500 });
    }
}