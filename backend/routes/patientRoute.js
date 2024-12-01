import express from 'express';
import { upload, uploadToGridFs } from '../middleware/upload.js';
import { AppointmentReq, getDoctorList } from '../controller/PatientController.js';

const app = express();

app.post('/appointment', AppointmentReq);
app.get('/doctors', getDoctorList);

export default app;