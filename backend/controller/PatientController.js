import { AppointmentReqs } from '../model/appointmentReq.js'
import { Doctor } from '../model/doctor.js';
import nodemailer from 'nodemailer';

export const AppointmentReq = async (req, res) => {
    try {
        const { name, email, mobile, date, time, doctor } = req.body;
        const exist = await AppointmentReqs.findOne({ email });
        const doctorsab = await Doctor.findOne({ name: doctor });
        if (exist) {
            console.log(exist.name);
            return res.status(400).json({
                success: false,
                message: `${exist.name} Already requested`,
                exist
            })
        }
        else {
            if (doctorsab) {
                const book = await AppointmentReqs({ name, email, mobile, date, time, doctor });
                const confirm = await book.save();
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
                    to: doctorsab.email,
                    subject: 'HealthCare Appointment Status',
                    html: `<h3>HealthCare</h1><br><h3>Hello Dr. ${doctor}</h3><p>You have a new patient ${name} <br>Please cheack the Request.</p>`,
                };
                try {
                    let info = await transtporter.sendMail(mailBody);
                } catch (error) {
                    console.error('error sending mail:' + error);
                }
                return res.status(200).json({
                    success: true,
                    message: `Request sent to Dr. ${doctor}`,
                    confirm
                });
            }
            else {
                return res.status(404).json({
                    success: true,
                    message: `Dr. ${doctor} not found`,
                });
            }
        }

    } catch (error) {
        console.log("While appointment request", error);
    }
}

export const getDoctorList = async (req, res) => {
    try {
        const doctor = await Doctor.find({ name: { $ne: "Host" } });
        return res.status(200).json({
            success: true,
            doctor
        })
    } catch (error) {
        console.log("while geting doctor list");
    }
}