const crypto = require('crypto');
const expressValidator = require('express-validator');
const util = require('util');
const connection = require('../../database/connection');
const bcrypt = require('bcrypt');
const sendOTP = require('./sendOTP');

const register = async (req, res) => {
    const {name, email, password, phone} = req.body;

    try {
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const emailValidation = expressValidator.check('email').isEmail();
        if (!emailValidation) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const passwordValidation = expressValidator.check('password').isLength({ min: 6 });
        if (!passwordValidation) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        

        const query = util.promisify(connection.query).bind(connection);
        const existingUser = await query('SELECT * FROM user WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // TODO: check if user phone exists

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = crypto.randomBytes(16).toString('hex');
        // const otp = await sendOTP(email);
        // Random OTP generation for testing
        // In production, you would use sendOTP function to send the OTP to the user's email
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
        console.log("OTP: ", otp)
        const qres = await query('INSERT INTO user (name, email, password, role, phone, token, otp, isver) VALUES (?, ?, ?, ?, ?, ?, ?, ?);', [name, email, hashedPassword, "user", phone, token, otp, 0]);
        const userId = qres.insertId;
        res.status(201).json({ message: 'User registered successfully. Please verify your email with the OTP sent.', userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal error' });
    }
}

module.exports = register;