const nodemailer = require('nodemailer');
require('dotenv').config();

// Email transporter setup
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS, // your email password
    },
});

// Generate a random 6-digit code
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
};

// Function to send the verification email
const sendVerificationEmail = async (email, verificationCode) => {

    if (process.env.NODE_ENV === 'test') {
        console.log('Generated verification code:', verificationCode); // Add logging
        return true; // Skip actual email sending in test environment
      }
      
    const verificationLink = `http://localhost:5050/verify-email?verifyCode=${verificationCode}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email',
        html: `
            <h1>Email Verification</h1>
            <p>Click the link below to verify your email:</p>
            <a href="${verificationLink}">Verify Email</a>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Email sending error:', error);
        throw error;
    }
};


module.exports = { sendVerificationEmail, generateVerificationCode };
