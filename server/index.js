const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const upload = require('./middleware/upload');
const checkAuth = require('./middleware/checkAuth');
const checkAdmin = require('./middleware/checkAdmin');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --------- Routes --------- 
// Base
app.get('/', (req, res) => res.send('Welcome to the SSA API')); // Welcome message for the API

// Auth
app.post('/auth/register', require('./routes/auth/register')); // Register a new user
app.post('/auth/login', require('./routes/auth/login')); // Login a user
app.post('/auth/logout', checkAuth, require('./routes/auth/logout')); // Logout a user
app.get("/auth/user", checkAuth, require('./routes/auth/user')); // Get user information
app.post("/auth/verify-otp", require("./routes/auth/verifyOTP"))


// Category
const category = require('./routes/category/category');
app.post('/category', checkAdmin, upload.single('image'), category.createCategory); // Create a new category
app.get('/category', category.getCategories); // Get all categories
app.put('/category/:id', checkAdmin, upload.single('image'), category.updateCategory); // Update a category by ID
app.delete('/category/:id', checkAdmin, category.deleteCategory); // Delete a category by ID
app.get('/category/:id/products', category.getCategoryProducts); // Get products of a specific category by ID

// Product
const product = require('./routes/product/product');
app.post('/product/create', checkAdmin, product.createProduct); // Create a new product
app.post('/product/delete/:id', checkAdmin, product.deleteProduct); // Delete a product by ID
app.get('/products', product.getAllProducts); // Get all products
app.post('/product/update/:id', checkAdmin, product.updateProduct); // Update a product by ID

// Review
const review = require('./routes/reviews/reviews');
app.get('/product/:id/reviews', review.getProductReviews); // Get reviews for a specific product by ID
app.post('/review/create', checkAuth, review.createReview); // Create a new review
app.post('/review/:id/activate', checkAdmin, review.activateReview); // Activate a review by ID
app.post('/review/:id/deactivate', checkAdmin, review.deactivateReview); // Deactivate a review by ID
app.delete('/review/:id/', checkAdmin, review.deleteReview); // Delete a review by ID

// Init server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
