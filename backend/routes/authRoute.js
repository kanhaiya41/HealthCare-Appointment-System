import express from 'express';
import { Login, logout } from '../controller/authController.js';

const app = express();

app.post('/login',Login);
app.get('/logOut',logout);

export default app;