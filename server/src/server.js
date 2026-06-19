import dns from 'node:dns';
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from './config/config.js';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Auth routes
app.use('/api/auth', authRoutes);

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});