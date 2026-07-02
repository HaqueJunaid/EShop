import dns from 'node:dns';
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from './config/config.js';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import aj from './config/arcjet.js';
import { isSpoofedBot } from '@arcjet/inspect';

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  config.client_origin,
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman, etc.)
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.some((allowed) => {
        if (!allowed) return false;
        return allowed.toLowerCase() === origin.toLowerCase();
      });

      if (isAllowed) {
        return callback(null, true);
      }

      // Allow Vercel preview or production deployments of the project
      const isVercelOrigin = origin.endsWith('.vercel.app') && (
        origin.includes('vivahstore') || origin.includes('haquejunaids-projects')
      );

      if (isVercelOrigin) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(cookieParser());

// Global Arcjet protection middleware for every route
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ success: false, error: 'Too many requests' });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ success: false, error: 'Bot traffic detected' });
      }
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    if (decision.ip?.isHosting?.() || decision.results?.some(isSpoofedBot)) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    return next();
  } catch (error) {
    console.error('Arcjet protection error:', error);
    // Continue if Arcjet check encounters an error so server remains operational
    return next();
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Auth routes
app.use('/api/auth', authRoutes);

// Product routes
app.use('/api/products', productRoutes);

// Cart routes
app.use('/api/cart', cartRoutes);

// Address routes
app.use('/api/addresses', addressRoutes);

// Contact routes
app.use('/api/contact', contactRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});