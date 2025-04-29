const connection = require('../../database/connection');

const user = async (req, res) => {
    const user = req?.user;

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    return res.status(200).json({user});
}

module.exports = user;