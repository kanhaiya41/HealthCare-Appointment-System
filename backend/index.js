import express from 'express';
import dotenv from 'dotenv';
import authApp from './routes/authRoute.js';
import adminApp from './routes/adminRoute.js';
import doctorApp from './routes/doctorRoute.js';
import patientApp from './routes/patientRoute.js';
import dbConnect from './db/db.js';
import cors from 'cors';
import { getProfilePic } from './middleware/upload.js';
import path from 'path';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

dbConnect();

app.use('/admin', adminApp);
app.use('/doctor', doctorApp);
app.use('/patient', patientApp);
app.use('/auth', authApp);
app.get('/file/:filename', getProfilePic);

const direname = path.resolve();

app.use(express.static(path.join(direname, 'frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(direname, 'frontend', 'build', 'index.html'));
})

app.listen(8000, () => {
    console.log("server runs");
})