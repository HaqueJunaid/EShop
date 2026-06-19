import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

const transporter = nodemailer.createTransport({
    service: config.email.service,
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: {
        user: config.email.user,
        pass: config.email.password,
    },
});

// Verify transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.log('Email service error:', error);
    } else {
        console.log('Email service is ready to send messages');
    }
});

// Verification Email
export const sendOTPEmail = async (email, otp, userName) => {
    const mailOptions = {
        from: config.email.user,
        to: email,
        subject: 'Email Verification - OTP',
        html: emailTemplates.otpVerification(userName, otp),
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return { success: true, message: 'OTP sent to email' };
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};

// Welcome Email
export const sendWelcomeEmail = async (email, userName) => {
    const mailOptions = {
        from: config.email.user,
        to: email,
        subject: 'Welcome to Our Service',
        html: emailTemplates.welcomeEmail(userName),
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Welcome email sent:', info.response);
        return { success: true, message: 'Welcome email sent' };
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw new Error('Failed to send welcome email');
    }
};

// Email Tempelate
const emailTemplates = {
    otpVerification: (name, otp) => `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 40px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .header {
                    text-align: center;
                }
                .header h1 {
                    color: #ff44b1;
                    margin: 0;
                    font-size: 40px;
                    weight: 700;
                }
                .header h4 {
                    color: #333333;
                    margin: 0;
                    font-size: 16px;
                    weight: 300;
                    margin-bottom: 30px;
                }
                .content {
                    color: #666666;
                    line-height: 1.6;
                    margin-bottom: 30px;
                }
                .otp-box {
                    background-color: #f0f0f0;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                    margin: 20px 0;
                }
                .otp-code {
                    font-size: 32px;
                    font-weight: bold;
                    color: #2196F3;
                    letter-spacing: 5px;
                    font-family: 'Courier New', monospace;
                }
                .footer {
                    text-align: center;
                    color: #999999;
                    font-size: 12px;
                    border-top: 1px solid #eeeeee;
                    padding-top: 20px;
                    margin-top: 30px;
                }
                .warning {
                    background-color: #fff3cd;
                    border-left: 4px solid #ffc107;
                    padding: 15px;
                    margin: 20px 0;
                    border-radius: 4px;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Vivah Store</h1>
                    <h4>Email Verification</h4>
                </div>
                
                <div class="content">
                    <p>Hi <strong>${name}</strong>,</p>
                    <p>Thank you for signing up! Please use the OTP code below to verify your email address:</p>
                    
                    <div class="otp-box">
                        <div class="otp-code">${otp}</div>
                    </div>
                    
                    <p>This OTP will expire in 10 minutes.</p>
                    
                    <div class="warning">
                        <strong>Security Note:</strong> Never share this OTP with anyone. Our team will never ask for your OTP.
                    </div>
                    
                    <p>If you didn't sign up for this account, please ignore this email.</p>
                </div>
                
                <div class="footer">
                    <p>&copy; 2026 Our Service. All rights reserved.</p>
                    <p>This is an automated email, please do not reply.</p>
                </div>
            </div>
        </body>
        </html>
    `,
    
    welcomeEmail: (name) => `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 40px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .header h1 {
                    color: #333333;
                    margin: 0;
                    font-size: 28px;
                }
                .content {
                    color: #666666;
                    line-height: 1.6;
                }
                .button {
                    display: inline-block;
                    background-color: #2196F3;
                    color: white;
                    padding: 12px 30px;
                    border-radius: 4px;
                    text-decoration: none;
                    margin: 20px 0;
                }
                .footer {
                    text-align: center;
                    color: #999999;
                    font-size: 12px;
                    border-top: 1px solid #eeeeee;
                    padding-top: 20px;
                    margin-top: 30px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Welcome! 🎉</h1>
                </div>
                
                <div class="content">
                    <p>Hi <strong>${name}</strong>,</p>
                    <p>Welcome to our service! Your email has been verified and your account is now active.</p>
                    
                    <p>You can now log in and start using all the features available.</p>
                    
                    <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
                    
                    <p>Happy to have you on board!</p>
                </div>
                
                <div class="footer">
                    <p>&copy; 2026 Our Service. All rights reserved.</p>
                    <p>This is an automated email, please do not reply.</p>
                </div>
            </div>
        </body>
        </html>
    `,
};
