const util = require('util');
const connection = require('../../database/connection');
const upload = require('../../middleware/upload');

// Create a new category
const createCategory = async (req, res) => {
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
    }

    if (!image) {
        return res.status(400).json({ message: 'Category image is required' });
    }

    try {
        const query = util.promisify(connection.query).bind(connection);
        await query('INSERT INTO category (name, img) VALUES (?, ?)', [name, image]);
        res.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Read all categories
const getCategories = async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        const categories = await query('SELECT * FROM category');

        const categoriesWithCount = await Promise.all(categories.map(async (cat) => {
            const [result] = await query('SELECT COUNT(*) as count FROM product WHERE category_id = ?', [cat.id]);
            return {
                ...cat,
                products: result.count
            };
        }));

        res.status(200).json({categories: categoriesWithCount});
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const getCategoryProducts = async (req, res) => {
    const { id } = req.params;

    try {
        const query = util.promisify(connection.query).bind(connection);
        const products = await query('SELECT * FROM product WHERE category_id = ?', [id]);
        res.status(200).json({products});
    } catch (error) {
        console.error('Error fetching category products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Update a category
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;


    if (image) {
        try {
            const query = util.promisify(connection.query).bind(connection);
            await query('UPDATE category SET img = ? WHERE id = ?', [image, id]);
        } catch (error) {
            console.error('Error updating category image:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
    }

    try {
        const query = util.promisify(connection.query).bind(connection);
        const result = await query('UPDATE category SET name = ? WHERE id = ?', [name, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const query = util.promisify(connection.query).bind(connection);
        const result = await query('DELETE FROM category WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    getCategoryProducts
};