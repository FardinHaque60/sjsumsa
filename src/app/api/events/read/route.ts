import { NextResponse } from 'next/server';
import EventModel from "@/lib/models/EventModel";
import { ConnectDB } from '@/lib/mongodb';

// GET all events
export async function GET() {
    await ConnectDB();
    try {
      const events = await EventModel.find({})
        .sort({ eventDate: -1 })
        .limit(10); // limit to most recent 10 events

      return NextResponse.json({body: events}, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error}, { status: 500 });
    }
}