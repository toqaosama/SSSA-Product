const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const upload = require('./middleware/upload');

dotenv.config();

app.use(express.json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --------- Routes --------- 
app.get('/', (req, res) => {
  res.send('Welcome to the SSA API');
});

// Auth Routes
app.post('/auth/register', require('./routes/auth/register'));
app.post('/auth/login', require('./routes/auth/login'));
app.post('/auth/logout', require('./routes/auth/logout'));

// Category Routes
app.post('/category', upload.single('image'), require('./routes/category/category').createCategory);
app.get('/category', require('./routes/category/category').getCategories);
app.put('/category/:id', upload.single('image'), require('./routes/category/category').updateCategory);
app.delete('/category/:id', require('./routes/category/category').deleteCategory);
app.get('/category/:id/products', require('./routes/category/category').getCategoryProducts);

// Product Routes
app.post('/product/create', require('./routes/product/product').createProduct);
app.post('/product/delete/:id', require('./routes/product/product').deleteProduct);
app.get('/products', require('./routes/product/product').getAllProducts);
app.post('/product/update/:id', require('./routes/product/product').updateProduct);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
