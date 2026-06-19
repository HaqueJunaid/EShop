import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    mongo_url: process.env.MONGO_URL,
    env: process.env.NODE_ENV || 'development',
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
        expire: process.env.JWT_EXPIRE || '24h',
    },
    email: {
        service: process.env.EMAIL_SERVICE || 'gmail',
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,
        secure: process.env.EMAIL_SECURE || false,
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
    },
}