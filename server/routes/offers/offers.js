const util = require('util');
const connection = require('../../database/connection');

const createOffer = async (req, res) => {
    const {
        offer_name,
        offer_description,
        percentage,
        type,
        start_date,
        end_date,
        category_id,
        product_ids
    } = req.body;

    if (!offer_name || !offer_description || !percentage || !type || !start_date || !end_date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const query = util.promisify(connection.query).bind(connection);

        // Insert offer into the offers table
        const result = await query(
            'INSERT INTO offers (offer_name, offer_description, percentage, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
            [offer_name, offer_description, percentage, start_date, end_date]
        );

        const offer_id = result.insertId;

        // Handle association logic based on type
        if (type === 'category') {
            if (!category_id) {
                return res.status(400).json({ message: 'category_id is required when type is category' });
            }
            await query(
                'INSERT INTO offers_product (offer_id, category_id) VALUES (?, ?)',
                [offer_id, category_id]
            );

        } else if (type === 'products') {
            if (!Array.isArray(product_ids) || product_ids.length === 0) {
                return res.status(400).json({ message: 'product_ids array is required when type is products' });
            }

            for (const product_id of product_ids) {
                await query(
                    'INSERT INTO offers_product (offer_id, product_id) VALUES (?, ?)',
                    [offer_id, product_id]
                );
            }

        } else if (type === 'all') {
            await query(
                'INSERT INTO offers_product (offer_id, is_all) VALUES (?, ?)',
                [offer_id, true]
            );

        } else {
            return res.status(400).json({ message: 'Invalid offer type' });
        }

        return res.status(201).json({ message: 'Offer created successfully', offer_id });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const getOffers = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);

        // Get all offers
        const offers = await query('SELECT * FROM offers');

        for (let offer of offers) {
            // Get associations
            const associations = await query(
                'SELECT product_id, category_id, is_all FROM offers_product WHERE offer_id = ?',
                [offer.id]
            );

            offer.products = [];
            offer.is_all = false;

            for (const row of associations) {
                if (row.is_all) {
                    offer.is_all = true;
                }

                // If products directly attached
                if (row.product_id) {
                    const product = await query('SELECT * FROM product WHERE id = ?', [row.product_id]);
                    if (product.length) {
                        offer.products.push(product[0]);
                    }
                }

                // If category attached, get all products in that category
                if (row.category_id) {
                    const categoryProducts = await query('SELECT * FROM product WHERE category_id = ?', [row.category_id]);
                    offer.products.push(...categoryProducts);
                }
            }
        }

        return res.status(200).json(offers);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
// Get offers return example
// [
//     {
//         "id": 3,
//         "offer_name": "Electronics Offer",
//         "offer_description": "20% on electronics",
//         "percentage": 20,
//         "start_date": "2025-05-01T00:00:00.000Z",
//         "end_date": "2025-05-15T00:00:00.000Z",
//         "products": [
//             { "id": 101, "name": "Smartphone", "category_id": 5 },
//             { "id": 102, "name": "Laptop", "category_id": 5 }
//         ],
//         "is_all": false
//     }
// ]


const deleteOffer = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'offer_id is required' });
    }

    try {
        const query = util.promisify(connection.query).bind(connection);

        // Delete offer (CASCADE will handle offers_product)
        const result = await query('DELETE FROM offers WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        return res.status(200).json({ message: 'Offer deleted successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


const updateOffer = async (req, res) => {
    const { id } = req.params;
    const {
        offer_name,
        offer_description,
        percentage,
        type,
        start_date,
        end_date,
        category_id,
        product_ids
    } = req.body;

    if (!id || !offer_name || !offer_description || !percentage || !type || !start_date || !end_date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const query = util.promisify(connection.query).bind(connection);

        // Update offer in the offers table
        await query(
            'UPDATE offers SET offer_name = ?, offer_description = ?, percentage = ?, start_date = ?, end_date = ? WHERE id = ?',
            [offer_name, offer_description, percentage, start_date, end_date, id]
        );

        // Delete existing associations
        await query('DELETE FROM offers_product WHERE offer_id = ?', [id]);

        // Re-create associations based on type
        if (type === 'category') {
            if (!category_id) {
                return res.status(400).json({ message: 'category_id is required when type is category' });
            }
            await query(
                'INSERT INTO offers_product (offer_id, category_id) VALUES (?, ?)',
                [id, category_id]
            );

        } else if (type === 'products') {
            if (!Array.isArray(product_ids) || product_ids.length === 0) {
                return res.status(400).json({ message: 'product_ids array is required when type is products' });
            }

            for (const product_id of product_ids) {
                await query(
                    'INSERT INTO offers_product (offer_id, product_id) VALUES (?, ?)',
                    [id, product_id]
                );
            }

        } else if (type === 'all') {
            await query(
                'INSERT INTO offers_product (offer_id, is_all) VALUES (?, ?)',
                [id, true]
            );

        } else {
            return res.status(400).json({ message: 'Invalid offer type' });
        }

        return res.status(200).json({ message: 'Offer updated successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {
    createOffer,
    getOffers,
    deleteOffer,
    updateOffer
}