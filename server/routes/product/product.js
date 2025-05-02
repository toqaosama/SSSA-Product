const crypto = require('crypto');
const util = require('util');
const connection = require('../../database/connection');
const query = util.promisify(connection.query).bind(connection);

const createProduct = async (req, res) => {
    const { name, category_id, descriptions, price, main_description } = req.body;
    const images = req.files; // multer stores uploaded files in req.files

    console.log(req.body)

    try {
        // Insert product name, category, price and main description
        const result = await query(
            "INSERT INTO product (name, category_id, price, main_description) VALUES(?, ?, ?, ?)",
            [name, category_id, price, main_description]
        );
        const product_id = result.insertId;

        // Insert descriptions
        for (const item of descriptions) {
            if (!item.header || !item.description) {
                return res.status(400).json({ error: 'Each description item must have header and description.' });
            }
            await query(
                "INSERT INTO desc_product (product_id, head, `desc`) VALUES (?, ?, ?)",
                [product_id, item.header, item.description]
            );
        }

        // Insert uploaded images (only if images exist)
        if (Array.isArray(images) && images.length > 0) {
            for (const image of images) {
                const imagePath = image.filename;
                await query(
                    "INSERT INTO img_product (product_id, img) VALUES (?, ?)",
                    [product_id, imagePath]
                );
            }
        }

        res.status(200).json({ message: 'Product, descriptions, and images uploaded successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, category_id, description, price, main_description } = req.body;
    const images = req.files; // multer stores uploaded files

    console.log(req.body)

    try {
        // 1. Get the current product data
        const [currentProduct] = await query("SELECT * FROM product WHERE id = ?", [id]);
        if (!currentProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // 2. Update only if new value is sent, else keep old value
        const updatedName = name || currentProduct.name;
        const updatedCategory = category_id || currentProduct.category_id;
        const updatedMainDescription = main_description !== undefined ? main_description : currentProduct.main_description;

        await query(
            "UPDATE product SET name = ?, category_id = ?, price = ?, main_description = ? WHERE id = ?",
            [updatedName, updatedCategory, price, updatedMainDescription, id]
        );

        // 3. Update descriptions if provided
        if (description && Array.isArray(description)) {
            // Delete old descriptions first (optional, depending on your case)
            await query("DELETE FROM desc_product WHERE product_id = ?", [id]);

            for (const item of description) {
                if (!item.header || !item.description) {
                    return res.status(400).json({ error: 'Each description item must have header and description.' });
                }
                await query(
                    "INSERT INTO desc_product (product_id, head, `desc`) VALUES (?, ?, ?)",
                    [id, item.header, item.description]
                );
            }
        }

        // 4. Add new images if provided
        if (images && images.length > 0) {
            for (const image of images) {
                const imagePath = image.filename;
                await query(
                    "INSERT INTO img_product (product_id, img) VALUES (?, ?)",
                    [id, imagePath]
                );
            }
        }

        res.status(200).json({ message: 'Product updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete product images
        await query("DELETE FROM img_product WHERE product_id = ?", [id]);

        // Delete product descriptions
        await query("DELETE FROM desc_product WHERE product_id = ?", [id]);

        // Delete product
        await query("DELETE FROM product WHERE id = ?", [id]);

        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const queryStr = `
            SELECT
                p.*,
                c.name AS categoryName,
                GROUP_CONCAT(DISTINCT CONCAT(d.head, '||', d.desc) SEPARATOR ';;') AS desc_combined,
                GROUP_CONCAT(DISTINCT i.img SEPARATOR ';;') AS imgs
            FROM product p
                     LEFT JOIN desc_product d ON p.id = d.product_id
                     LEFT JOIN img_product i ON p.id = i.product_id
                     LEFT JOIN category c ON p.category_id = c.id
            GROUP BY p.id
        `;

        const products = await query(queryStr);

        // Process the concatenated strings into arrays of objects
        const formattedProducts = products.map(product => {
            const { desc_combined, imgs, ...rest } = product; // remove desc_combined and imgs

            return {
                ...rest,
                descriptions: desc_combined
                    ? desc_combined.split(';;').map(desc => {
                        const [head, descText] = desc.split('||');
                        return { head, desc: descText };
                    })
                    : [],
                images: imgs
                    ? imgs.split(';;').map(img => ({ img }))
                    : []
            };
        });

        res.status(200).json({ products: formattedProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        // Use JOIN to fetch product, its descriptions, images, and category in one query
        const queryStr = `
            SELECT
                p.*,
                c.name AS categoryName,
                GROUP_CONCAT(DISTINCT CONCAT(d.head, '||', d.desc) SEPARATOR ';;') AS desc_combined,
                GROUP_CONCAT(DISTINCT i.img SEPARATOR ';;') AS imgs
            FROM product p
                     LEFT JOIN desc_product d ON p.id = d.product_id
                     LEFT JOIN img_product i ON p.id = i.product_id
                     LEFT JOIN category c ON p.category_id = c.id
            WHERE p.id = ?
            GROUP BY p.id
        `;

        const [product] = await query(queryStr, [id]);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const reviews = await query('SELECT * FROM review WHERE product_id = ?', [id]);
        const averageRating = reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rate, 0) / reviews.length : 0;

        // Process the concatenated strings into arrays of objects
        const formattedProduct = {
            ...product,
            descriptions: product.desc_combined
                ? product.desc_combined.split(';;').map(desc => {
                    const [head, descText] = desc.split('||');
                    return { head, desc: descText };
                })
                : [],
            images: product.imgs
                ? product.imgs.split(';;').map(img => ({ img }))
                : [],
            rating: averageRating,
            numberOfRatings: reviews.length,
        };

        res.status(200).json({ product: formattedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {createProduct, updateProduct, deleteProduct, getAllProducts, getProductById};