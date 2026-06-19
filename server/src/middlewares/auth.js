import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const protect = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route',
            });
        }

        // Verify token
        const decoded = jwt.verify(token, config.jwt.secret);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route',
        });
    }
};

export const optional = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (token) {
            const decoded = jwt.verify(token, config.jwt.secret);
            req.user = decoded;
        }
        next();
    } catch (error) {
        // Token is optional, so we continue even if verification fails
        next();
    }
};
