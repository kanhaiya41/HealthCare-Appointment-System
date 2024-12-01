import express from 'express';
import { upload, uploadToGridFs } from '../middleware/upload.js';
import { deleteDoctor, editProfile, getAppointmentRequests, getBookedAppointments, getCompletedMeetings, getExpiredAppointments, newDoctor } from '../controller/adminController.js';

const app = express();

app.post('/newDoctor', upload.single('ProfilePicture'), uploadToGridFs, newDoctor);
app.get('/bookedAppointments/:doctor', getBookedAppointments);
app.get('/appointmentRequests/:doctor', getAppointmentRequests);
app.get('/expiredAppointments/:doctor', getExpiredAppointments);
app.get('/completedMeetings/:doctor', getCompletedMeetings);
app.get('/deleteDoctor/:id', deleteDoctor);
app.post('/editprofile',upload.single('ProfilePicture'),uploadToGridFs,editProfile);

export default app;