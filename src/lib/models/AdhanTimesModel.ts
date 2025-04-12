import mongoose from 'mongoose';

const AdhanTimesSchema = new mongoose.Schema({
    fajr: { type: String, required: true },
    dhuhr: { type: String, required: true },
    shafiAsr: { type: String, required: true },
    hanafiAsr: { type: String, required: true }, 
    maghrib: { type: String, required: true },
    isha: { type: String, required: true },
    date: { type: String, required: true},
});

const AdhanTimesModel = mongoose.models.adhanTimes || mongoose.model('adhanTimes', AdhanTimesSchema);

export default AdhanTimesModel;