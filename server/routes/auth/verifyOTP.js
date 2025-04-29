const connection = require("../../database/connection");
const util = require("util");

const verifyOTP = async (req, res) => {
    try {
        const { otp, userId } = req.body;

        if (!otp || !userId) {
            return res.status(400).json({ message: "OTP and userId are required." });
        }

        const query = util.promisify(connection.query).bind(connection);

        // Fetch the user from the database
        const users = await query("SELECT * FROM user WHERE id = ?", [userId]);
        const user = users[0];

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Verify the OTP
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP." });
        }

        // Mark OTP as verified
        const updateRes = await query("UPDATE user SET isver = ? WHERE id = ?", [true, userId]);

        const tokens = await query("SELECT token FROM user WHERE id = ?", [userId]);
        const token = tokens[0]?.token;

        if (!token) {
            return res.status(404).json({ message: "Token not found for the user." });
        }

        return res.status(200).json({ message: "OTP verified successfully.", token:token });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = verifyOTP;