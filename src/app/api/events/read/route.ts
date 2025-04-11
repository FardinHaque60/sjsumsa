import { NextResponse } from 'next/server';
import EventModel from "@/lib/models/EventModel";

// GET all events
export async function GET() {
    try {
      const events = await EventModel.find({});
      // sort in descending order by eventDate
      events.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());

      return NextResponse.json({body: events}, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error}, { status: 500 });
    }
}