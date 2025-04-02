import mongoose from 'mongoose';

const IqamahTimesSchema = new mongoose.Schema({
    fajr: { type: String, required: true },
    dhuhr: { type: String, required: true },
    dhuhr2: { type: String, required: false },
    shafiAsr: { type: String, required: true },
    hanafiAsr: { type: String, required: true }, 
    maghrib: { type: String, required: true },
    isha: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const IqamahTimesModel = mongoose.models.iqamahTimes || mongoose.model('iqamahTimes', IqamahTimesSchema);

export default IqamahTimesModel;