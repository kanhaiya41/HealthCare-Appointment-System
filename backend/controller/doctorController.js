import { AppointmentReqs } from "../model/appointmentReq.js";
import { BookedAppointments } from "../model/bookedAppointments.js";
import { CompletedMeetings } from "../model/completedMeetings.js";
import { ExpiredAppointments } from "../model/expiredReq.js";
import nodemailer from 'nodemailer';


export const completMeeting = async (req, res) => {
    try {
        const { name, email, mobile, date, time, doctor, _id } = req.body;
        const completed = await CompletedMeetings({ name, email, mobile, date, time, doctor });
        const deleteAssign = await BookedAppointments.deleteOne({ _id: _id });
        const tour = await completed.save();
        return res.status(200).json({
            success: true,
            message: `Meeting Completed with ${name}`,
            tour
        });
    } catch (error) {
        console.log("while completing meeting", error);
    }
}

export const shceduleAppointmentReq = async (req, res) => {
    try {
        const { id, date, time } = req.body;
        const data = await AppointmentReqs.findByIdAndUpdate(id, { date, time });
        if (!data) {
            return res.status(400).json({
                success: false,
                message: 'cannot Shcedule'
            });
        }
        else {
            return res.status(200).json({
                success: true,
                message: 'Shcedule Successfully',
                data
            });
        }
    } catch (error) {
        console.log("while shceduling requests", error);
    }
}

export const fixAppointment = async (req, res) => {
    try {
        const { name, email, mobile, date, time, doctor, _id } = req.body;
        const completed = await BookedAppointments({ name, email, mobile, date, time, doctor });
        const deleteAssign = await AppointmentReqs.deleteOne({ _id: _id });
        const tour = await completed.save();
        if (tour) {
            const transtporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'kingkanhaiya57@gmail.com',
                    pass: 'trvvqgskjviocabw'
                }
            });
            //body of mail
            const mailBody = {
                from: 'kingkanhaiya57@gmail.com',
                to: email,
                subject: 'HealthCare Appointment Status',
                html: `<h3>HealthCare</h1><br><h3>Hello Dear ${name}</h3><p>Your Appointment is fixed with Dr. ${doctor} on ${new Date(date).toISOString().split('T')[0]} at ${time}</p>`,
            };
            try {
                let info = await transtporter.sendMail(mailBody);
            } catch (error) {
                console.error('error sending mail:' + error);
            }
            return res.status(200).json({
                success: true,
                message: `Appointment Fixed with ${name}`,
                tour
            });
        }
        else {
            return res.status(400).json({
                success: true,
                message: `Request doet not completed`,

            });
        }

    } catch (error) {
        console.log("while fix appointment", error);
    }
}

export const deleteExpiredAppointments = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ExpiredAppointments.deleteOne({ _id: id });
        if (data.deletedCount > 0) {
            return res.status(200).json({
                success: true,
                message: 'Meeting record deleted',
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
        console.log("while delete expired request", error);
    }
}

export const deleteCompletedMeetings = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await CompletedMeetings.deleteOne({ _id: id });
        if (data.deletedCount > 0) {
            return res.status(200).json({
                success: true,
                message: 'Meeting record deleted',
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
        console.log("while delete complete meeting", error);
    }
}