const crypto = require('crypto');
const expressValidator = require('express-validator');
const util = require('util');
const connection = require('../../database/connection');
const { Router } = require('express');
const query = util.promisify(connection.query).bind(connection);

const product = async (req, res) => {
    const { name, description, img } = req.body;

    try {
        // Insert product name
        const result = await query("INSERT INTO product (name) VALUES(?)", [name]);
        const product_id = result.insertId;

        // Insert descriptions
        for (const item of description) {
            if (!item.header || !item.description) {
                return res.status(400).json({ error: 'Each description item must have header and description.' });
            }
            await query(
                "INSERT INTO desc_product (product_id, head, `desc`) VALUES (?, ?, ?)",
                [product_id, item.header, item.description]
            );
        }

        // Insert images
        for (const image of img) {
            if (!image) continue; // Skip empty strings/nulls
            await query(
                "INSERT INTO img_product (product_id, img) VALUES (?, ?)",
                [product_id, image]
            );
        }

        res.status(200).json({ message: 'Product, descriptions, and images inserted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
    




module.exports = product;