const crypto = require('crypto');
const nodemailer = require('nodemailer');

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

async function sendOTP(email) {
    const otp = generateOTP();

    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS, 
        }
    });

    console.log({
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'SSA OTP Verification',
        text: `Your OTP code is: ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}: ${otp}`);
        return otp; 
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
}

module.exports = sendOTP;