import mongoose from 'mongoose';

const AdhanTimesSchema = new mongoose.Schema({
    fajr: { type: String, required: true },
    dhuhr: { type: String, required: false },
    shafiAsr: { type: String, required: false },
    hanafiAsr: { type: String, required: true }, 
    maghrib: { type: String, required: true },
    isha: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const AdhanTimesModel = mongoose.models.adhanTimes || mongoose.model('adhanTimes', AdhanTimesSchema);

export default AdhanTimesModel;