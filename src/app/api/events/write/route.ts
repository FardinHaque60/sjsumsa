import EventModel from "@/lib/models/EventModel";
import { ConnectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from 'next/server';

// POST function to create event
export async function POST(request: Request) {
    await ConnectDB();
    const body = await request.json();
    body._id = undefined; // ignore _id field

    try {
        const event = new EventModel(body);
        await event.save();

        return NextResponse.json({message: "Event Saved Successfully", eventSaved: event}, { status: 200 });
    } catch (error) {
        console.error("SERVER: error saving event:", error);
        return NextResponse.json({ error: "Event Failed to Save" }, { status: 400 });
    }
}

// DELETE function to remove event. 
export async function DELETE(request: NextRequest) {
    await ConnectDB();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("_id");
    if (!_id) {
        return NextResponse.json({ success: false, message: "_id not provided" }, { status: 400 });
    }

    try {
        const deleted = await EventModel.findByIdAndDelete(_id);
        if (deleted.deletedCount === 0) {
            return NextResponse.json({ success: false }, { status: 404 });
        }
        return NextResponse.json({ success: true, deleted: deleted }, { status: 200 });
    } catch (error) {
        console.error("SERVER: error deleting event:", error);
        return NextResponse.json({ success: false, error: "failed to delete event" }, { status: 500 });
    }
}