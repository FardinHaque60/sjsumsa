import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    postedDate: { type: String, required: true },
    eventDate: { type: String, required: false },
    eventTime: { type: String, required: true },
    description: { type: String, required: true }, 
    link: { type: String, required: false },
    location: { type: String, required: false },
    note: { type: String, required: false },
});

const EventModel = mongoose.models.events || mongoose.model('events', EventSchema);

export default EventModel;