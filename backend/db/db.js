import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to Database');
    } catch (error) {
        console.log('Error while connecting database', error);
    }
}

export default dbConnect;