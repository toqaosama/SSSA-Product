    const crypto = require('crypto');
    const util = require('util');
    const connection = require('../../database/connection');
    const query = util.promisify(connection.query).bind(connection);

    const createProduct = async (req, res) => {
        const { name, description } = req.body;
        const images = req.files; // multer stores uploaded files in req.files
    
        try {
            // Insert product name
            const result = await query("INSERT INTO product (name ,category_id ) VALUES(?,?)", [name,'4']);
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
    

    module.exports = createProduct;