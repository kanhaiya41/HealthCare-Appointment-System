import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    date: Date,
    time: String,
    doctor: String
});

export const CompletedMeetings = new mongoose.model('completed-meeting', customerSchema);