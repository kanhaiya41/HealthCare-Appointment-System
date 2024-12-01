import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    date: Date,
    time: String,
    doctor: String
});

export const BookedAppointments = new mongoose.model('booked-appointment', customerSchema);