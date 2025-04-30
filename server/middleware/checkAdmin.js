const util = require('util');
const connection = require('../database/connection');

const checkAdmin = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(401).json({ message: 'Authorization token is required' });
        }

        const query = util.promisify(connection.query).bind(connection);
        const user = await query('SELECT * FROM user WHERE token = ?', [token]);

        if (user.length === 0) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        if(user[0].isver === 0) {
            return res.status(401).json({ message: 'User not verified' });
        }

        if(!user[0].isActive) {
            return res.status(403).json({ message: 'User is deactivated by admin' });
        }

        if(user[0].role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        // set req.user to user but without password
        const { password, ...userWithoutPassword } = user[0];
        req.user = userWithoutPassword;
        next();
    } catch (error) {
        console.error('Error in checkAuth middleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = checkAdmin;