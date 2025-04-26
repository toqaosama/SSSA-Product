const util = require('util');
const connection = require('../../database/connection');

const logout = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        const result = await query('UPDATE user SET token = NULL WHERE id = ?', [req.user.id]);

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'User already logged out or invalid user' });
        }

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = logout;