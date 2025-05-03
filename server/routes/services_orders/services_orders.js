const util = require('util');
const connection = require('../../database/connection');
const {query} = require("express");

const createServiceOrder = async (req, res) => {
    const { product_id } = req.body;

    try {
        const user_id = req.user.id;
        const query = util.promisify(connection.query).bind(connection);

        // Check product exists
        const products = await query('SELECT * FROM product WHERE id = ?', [product_id]);
        if (!products[0]) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if active order for this product already exists
        const orders = await query(
            'SELECT * FROM services_orders WHERE user_id = ? AND product_id = ? AND isActive = 1',
            [user_id, product_id]
        );

        if (orders.length > 0 && !['done', 'cancelled'].includes(orders[0].status)) {
            return res.status(409).json({ message: 'User already ordered this product' });
        }

        // Create new order
        await query(
            'INSERT INTO services_orders (product_id, user_id) VALUES (?, ?)',
            [product_id, user_id]
        );

        return res.status(201).json({ message: 'Service order created successfully' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const getUserOrders = async (req, res) => {
    const user_id = req.user.id;

    try {
        const query = util.promisify(connection.query).bind(connection);
        const orders = await query(`
            SELECT 
                s.*,
                p.name AS productName
            FROM services_orders s
            JOIN product p ON s.product_id = p.id
            WHERE s.user_id = ?
            ORDER BY s.created_at DESC;
        `, [user_id]);
        return res.status(200).json({ orders });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllServiceOrders = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        const orders = await query(`
            SELECT 
                s.*,
                u.name AS userName,
                u.email AS userEmail,
                u.phone AS userPhone,
                p.name AS productName
            FROM services_orders s
            JOIN user u ON s.user_id = u.id
            JOIN product p ON s.product_id = p.id
            ORDER BY s.created_at DESC;
        `);

        return res.status(200).json({orders});
    } catch (error) {
        console.error(error);  // Optional: log the error for debugging
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const deleteServiceOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const query = util.promisify(connection.query).bind(connection);
        await query('UPDATE services_orders SET isActive = 1 WHERE id = ?', [id]);

        return res.status(200).json({ message: 'Service order deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getUserOrderForProduct = async (req, res) => {
    const { product_id } = req.params;
    const user_id = req.user.id;

    try {
        const query = util.promisify(connection.query).bind(connection);
        const orders = await query(`
            SELECT 
            * 
            FROM services_orders WHERE user_id=? AND product_id=? ORDER BY id DESC;
        `, [user_id, product_id]);

        const order = orders[0];

        return res.status(200).json({ order });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const updateStatus = async (req, res) => {
    const { order_id } = req.params;
    const { status } = req.body;
    try {
        const query = util.promisify(connection.query).bind(connection);
        await query(`UPDATE services_orders SET status = ? WHERE id = ?`, [status, order_id]);
        return res.status(200).json({ message: 'Order status updated successfully' });
    } catch (e) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createServiceOrder,
    getUserOrders,
    getAllServiceOrders,
    deleteServiceOrder,
    getUserOrderForProduct,
    updateStatus
};