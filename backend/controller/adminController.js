import { AppointmentReqs } from "../model/appointmentReq.js";
import { BookedAppointments } from "../model/bookedAppointments.js";
import { Doctor } from "../model/doctor.js";
import bcrypt from 'bcryptjs';
import { ExpiredAppointments } from "../model/expiredReq.js";
import { CompletedMeetings } from "../model/completedMeetings.js";

export const newDoctor = async (req, res) => {
    try {
        const { name, email, mobile, password, address, des } = req.body;
        const ProfilePicture = `${process.env.BACKEND_URL}/file/${req.file.originalname}`;

        const user = await Doctor.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Email already exist'
            })
        }
        else {
            const hashedPass = await bcrypt.hash(password, 10);
            const manager = await Doctor({ name, email, mobile, password: hashedPass, address, ProfilePicture, des });
            const data = await manager.save();
            return res.status(200).json({
                success: true,
                message: `Dr. ${name} joined us`,
                data
            })
        }
    } catch (error) {
        console.log("while joining new doctor", error);
    }
}

export const getBookedAppointments = async (req, res) => {
    try {
        const doctor = req.params.doctor;

        // Fetch all appointments for the given doctor
        const data = await BookedAppointments.find({ doctor });

        // Get current date and time in IST
        const now = new Date();
        const localNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })); // Convert to IST
        const currentDate = localNow.toLocaleDateString("en-CA"); // Format: "YYYY-MM-DD" (ISO format for IST)
        const currentTime = localNow.getHours() * 60 + localNow.getMinutes(); // Minutes since midnight in IST

        for (const curElem of data) {
            const appointmentDate = new Date(curElem.date).toLocaleDateString("en-CA"); // Format in IST
            const [hours, minutes] = curElem.time.split(':').map(Number); // Split time into hours and minutes
            const appointmentTime = hours * 60 + minutes; // Convert to total minutes



            if (
                appointmentDate < currentDate || // Expired date
                (appointmentDate === currentDate && appointmentTime < currentTime) // Same date but earlier time
            ) {

                // Move expired appointment to ExpiredAppointments collection
                await ExpiredAppointments.create({
                    name: curElem.name,
                    email: curElem.email,
                    mobile: curElem.mobile,
                    date: curElem.date,
                    time: curElem.time,
                    doctor: curElem.doctor,
                });

                // Delete expired appointment from BookedAppointments collection
                await BookedAppointments.deleteOne({ _id: curElem._id });
            }
        }

        // Fetch remaining appointments
        const updatedData = await BookedAppointments.find({ doctor });

        return res.status(200).json({
            success: true,
            data: updatedData,
        });
    } catch (error) {
        console.error("Error while getting booked appointments:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};




export const getAppointmentRequests = async (req, res) => {
    try {
        const doctor = req.params.doctor;
        const data = await AppointmentReqs.find({ doctor });
        return res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        console.log("while geting appointments requests", error);
    }
}
export const getExpiredAppointments = async (req, res) => {
    try {
        const doctor = req.params.doctor;
        const data = await ExpiredAppointments.find({ doctor });
        return res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        console.log("while geting expired appointments", error);
    }
}
export const getCompletedMeetings = async (req, res) => {
    try {
        const doctor = req.params.doctor;
        const data = await CompletedMeetings.find({ doctor });
        return res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        console.log("while geting completed meetings", error);
    }
}

export const deleteDoctor = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Doctor.deleteOne({ _id: id });
        if (data.deletedCount > 0) {
            return res.status(200).json({
                success: true,
                message: 'Doctor removed from the list',
                data
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Request does not complete',
                data
            })
        }
    } catch (error) {
        console.log("while deleting doctor", error);
    }
}


export const editProfile = async (req, res) => {
    let success = false;
    let message = 'User not Updated';
    try {
        const { name, email, mobile, password, address, des, id } = req.body;
        const image = req.file;
        const user = await Doctor.findById(id);
        console.log(image);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        if (name) {
            const uuser = await Doctor.findByIdAndUpdate(id, { name: name });
            success = true;
            message = 'Account Updated';
        }
        if (email) {
            const uemail = await Doctor.findByIdAndUpdate(id, { email: email });
            success = true;
            message = 'Account Updated';
        }
        if (mobile) {
            const umobile = await Doctor.findByIdAndUpdate(id, { mobile: mobile });
            success = true;
            message = 'Account Updated';
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const upassword = await Doctor.findByIdAndUpdate(id, { password: hashedPassword });
            success = true;
            message = 'Account Updated';
        }
        if (address) {
            const upassword = await Doctor.findByIdAndUpdate(id, { address: address });
            success = true;
            message = 'Account Updated';
        }
        if (des) {
            const upassword = await Doctor.findByIdAndUpdate(id, { des: des });
            success = true;
            message = 'Account Updated';
        }
        if (image) {
            const imageUrl = `${process.env.BACKEND_URL}/file/${req.file.originalname}`;
            const uimage = await Doctor.findByIdAndUpdate(id, { ProfilePicture: imageUrl });
            success = true;
            message = 'Account Updated';
        }

        const updateduser = await Doctor.findById(id);
        return res.status(200).json({
            success: success,
            message: message,
            updateduser
        })

    } catch (error) {
        console.log("error while edit Profile", error);
    }
}