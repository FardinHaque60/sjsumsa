import IqamahTimesModel from "@/lib/models/IqamahTimesModel";
import { ConnectDB } from "@/lib/mongodb";
import { NextResponse } from 'next/server';

// POST function to add to adhanTimes to database, used when prayer times on website is outdated and updates from api
export async function PUT(request: Request) {
    await ConnectDB();
    const body = await request.json();

    try {
        const iqamahTime = await IqamahTimesModel.findOne();
        if (!iqamahTime) {
            return NextResponse.json({ status: false, error: "No Iqamah Time Not Found" }, { status: 404 });
        }

        Object.assign(iqamahTime, body);
        await iqamahTime.save();

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("SERVER: error updating iqamah time:", error);
        return NextResponse.json({ error: "Iqamah Time Failed to Update" }, { status: 400 });
    }
}