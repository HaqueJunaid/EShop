import express from 'express';
import {
    register,
    verifyOTP,
    login,
    logout,
    getCurrentUser,
    resendOTP,
} from '../controllers/authController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.post('/resend-otp', resendOTP);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.post('/logout', protect, logout);

export default router;
