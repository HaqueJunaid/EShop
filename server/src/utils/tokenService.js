import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

/**
 * Generate JWT token with user id and role
 * @param {string} id - User ID
 * @param {string} role - User role (user or admin)
 * @returns {string} JWT token
 */
export const generateToken = (id, role = 'user') => {
    return jwt.sign({ id, role }, config.jwt.secret, {
        expiresIn: config.jwt.expire,
    });
};

/**
 * Verify and decode JWT token
 * @param {string} token - JWT token to verify
 * @returns {object} Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwt.secret);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

/**
 * Extract token from request
 * @param {object} req - Express request object
 * @returns {string|null} Token string or null
 */
export const extractToken = (req) => {
    return req.cookies.token || req.headers.authorization?.split(' ')[1] || null;
};

/**
 * Set token in cookie
 * @param {object} res - Express response object
 * @param {string} token - JWT token
 */
export const setTokenCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: config.env === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
};

/**
 * Clear token cookie
 * @param {object} res - Express response object
 */
export const clearTokenCookie = (res) => {
    res.clearCookie('token');
};
