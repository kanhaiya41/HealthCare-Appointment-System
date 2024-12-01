import express from 'express';
import { completMeeting, deleteCompletedMeetings, deleteExpiredAppointments, fixAppointment, shceduleAppointmentReq } from '../controller/doctorController.js';

const app = express();

app.post('/completeMeeting',completMeeting);
app.post('/shceduleAppointment',shceduleAppointmentReq);
app.post('/fixAppointment',fixAppointment);
app.delete('/deleteExpiredAppointments/:id',deleteExpiredAppointments);
app.delete('/deleteCompletedMeeting/:id',deleteCompletedMeetings);

export default app;