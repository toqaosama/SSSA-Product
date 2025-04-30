const util = require('util');
const connection = require('../../database/connection');

const getAllReviews = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);

        const sql = `
            SELECT
                r.*,
                u.name as userName,
                p.name as productName
            FROM
                review r
            LEFT JOIN
                user u ON r.user_id = u.id
            LEFT JOIN
                product p ON r.product_id = p.id
            ORDER BY
                r.created_at DESC; 
        `;
        const reviews = await query(sql);

        res.status(200).json({ reviews }); // Send reviews back in the expected format

    } catch (error) {
        console.error('Error fetching all reviews:', error);
        res.status(500).json({ message: 'Internal server error while fetching all reviews' });
    }
};



const getProductReviews = async (req, res) => {
    const { id } = req.params;

    try {
        const query = util.promisify(connection.query).bind(connection);
        const reviews = await query('SELECT * FROM review WHERE product_id = ?', [id]);
        res.status(200).json({reviews});
    } catch (error) {
        console.error('Error fetching product reviews:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const createReview = async (req, res) => {
    const { product_id, rate, comment } = req.body;

    const user_id = req.user.id;

    if (!product_id || !user_id || !rate) {
        return res.status(400).json({ message: 'Product ID, User ID, and Rating are required' });
    }

    try {
        const query = util.promisify(connection.query).bind(connection);
        await query('INSERT INTO review (product_id, user_id, rate, comment, isActive) VALUES (?, ?, ?, ?, ?)', [product_id, user_id, rate, comment,0]);
        res.status(201).json({ message: 'Review created successfully' });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const activateReview = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Review ID is required' });
    }

    try {
        const query = util.promisify(connection.query).bind(connection);
        await query('UPDATE review SET isActive = 1 WHERE id = ?', [id]);
        res.status(200).json({ message: 'Review activated successfully' });
    } catch (error) {
        console.error('Error activating review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deactivateReview = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Review ID is required' });
    }

    try {
        const query = util.promisify(connection.query).bind(connection);
        await query('UPDATE review SET isActive = 0 WHERE id = ?', [id]);
        res.status(200).json({ message: 'Review deactivated successfully' });
    } catch (error) {
        console.error('Error deactivating review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteReview = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Review ID is required' });
    }

    try {
        const query = util.promisify(connection.query).bind(connection);
        await query('DELETE FROM review WHERE id = ?', [id]);
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    getProductReviews,
    createReview,
    activateReview,
    deactivateReview,
    deleteReview,
    getAllReviews
};