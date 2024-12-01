import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    password: String,
    address: String,
    ProfilePicture: String,
    des: String
});

export const Doctor = new mongoose.model('doctor', customerSchema);