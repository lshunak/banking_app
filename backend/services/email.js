const nodemailer = require('nodemailer');
require('dotenv').config();

// Email transporter setup
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS, // your email password
    },
});

// Function to send the verification email
const sendVerificationEmail = async (user) => {
      
    const verificationLink = `http://localhost:3000/verify-email?verifyCode=${user.verificationCode}`;

    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Verify Your Email',
        html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,

    };

    await transporter.sendMail(mailOptions);
};

// Generate a random 6-digit code
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
};

module.exports = { sendVerificationEmail, generateVerificationCode };
