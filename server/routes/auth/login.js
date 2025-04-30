const crypto = require('crypto');
const expressValidator = require('express-validator');
const util = require('util');
const connection = require('../../database/connection');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const emailValidation = expressValidator.check('email').isEmail();
        if (!emailValidation) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const passwordValidation = expressValidator.check('password').isLength({ min: 6 });
        if (!passwordValidation) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // use util.promisify to connect to the database and create query
        const query = util.promisify(connection.query).bind(connection);
        let user = await query('SELECT * FROM user WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        user = user[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if(user.isver !== 1) {
            return res.status(404).json({ message: 'Your account is not verified' });
        }

        if(user.isActive !== 1) {
            return res.status(403).json({ message: 'User is deactivated by admin' });
        }
        
        // TODO: Tell radwan about this
        const token = crypto.randomBytes(16).toString('hex');
        await query('UPDATE user SET token = ? WHERE email = ?', [token, email]);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = login;