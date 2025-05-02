const expressValidator = require("express-validator");
const util = require("node:util");
const connection = require("../../database/connection");
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body;

    console.log(req.body)
    try {
        const passwordValidation = expressValidator.check('password').isLength({ min: 6 });
        if(!passwordValidation) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const query = util.promisify(connection.query).bind(connection);

        const result = await query("SELECT password FROM user WHERE id = ?", [req.user.id]);
        const isOk = await bcrypt.compare(oldPassword, result[0].password);
        if(!isOk) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        const id = req.user.id;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await query('UPDATE user SET password = ? WHERE id = ?', [hashedPassword, id]);

        res.status(200).json({ message: 'Password reset successful' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = resetPassword;