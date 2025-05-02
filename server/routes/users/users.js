const util = require('util');
const connection = require('../../database/connection');
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const getAllUsers = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        const users = await query('SELECT * FROM user');
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = util.promisify(connection.query).bind(connection);
        const user = await query('SELECT * FROM user WHERE id = ?', [id]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user: user[0] });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createUser = async (req, res) => {
    let { name, email, phone, password, role } = req.body;
  
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    if (role !== 'admin' && role !== 'user') role = 'user';
  
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // simple 4-digit OTP
    const isver = 1;
    const isActiveDefault = 1;
    try {
        const query = util.promisify(connection.query).bind(connection);
    
        // Check if user already exists
        const existing = await query('SELECT * FROM user WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(409).json({ message: 'User already exists' });
        }
        
        const token = crypto.randomBytes(16).toString('hex');

        const hashPassword = await bcrypt.hash(password, 10);
        // Insert user
        const result = await query(
            'INSERT INTO user (name, email, password, token, role, otp, isver, phone, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, email, hashPassword,token, role, otp, isver, phone, isActiveDefault]
        );

        const createdUser = await query('SELECT id, name, email, role, otp, isver, phone, isActive FROM user WHERE id = ?', [result.insertId]);

        res.status(201).json({ message: 'User created successfully', user: createdUser[0] });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, role, isActive } = req.body;

    if(req.user.id !== id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to update this user' });
    }

    try {
        // Construct an array of fields to update and their values
        const updateFields = [];
        const updateValues = [];

        // Check if each field is provided and add it to the update query
        if (name) {
            updateFields.push('name');
            updateValues.push(name);
        }
        if (email) {
            updateFields.push('email');
            updateValues.push(email);
        }
        if (phone) {
            updateFields.push('phone');
            updateValues.push(phone);
        }
        if (role) {
            updateFields.push('role');
            updateValues.push(role);
        }
        if (typeof isActive !== 'undefined') {
            updateFields.push('isActive');
            updateValues.push(isActive);
        }

        // If no fields are provided, return an error
        if (updateFields.length === 0) {
            return res.status(400).json({ message: 'No valid fields to update' });
        }

        // Construct the SET clause dynamically based on provided fields
        const setClause = updateFields.map(field => `${field} = ?`).join(', ');

        // Add the user ID to the values for the WHERE clause
        updateValues.push(id);

        const query = util.promisify(connection.query).bind(connection);
        // Perform the update query
        await query(`UPDATE user SET ${setClause} WHERE id = ?`, updateValues);

        // Get the updated user information
        const updatedUser = await query('SELECT * FROM user WHERE id = ?', [id]);

        // Send the response with the updated user data
        res.status(200).json({ message: 'User updated successfully', user: updatedUser[0] });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const query = util.promisify(connection.query).bind(connection);
        await query('DELETE FROM user WHERE id = ?', [id]);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};