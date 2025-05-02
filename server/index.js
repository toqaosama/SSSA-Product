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
// Base route
app.get('/', (req, res) => res.send('Welcome to the SSA API')); // Welcome message for the API

// Auth routes
const authRegister = require('./routes/auth/register');
const authLogin = require('./routes/auth/login');
const authLogout = require('./routes/auth/logout');
const authUser = require('./routes/auth/user');
const verifyOTP = require("./routes/auth/verifyOTP");
const resetPassword = require("./routes/auth/resetPassword");

app.post('/auth/register', authRegister); // Register a new user
app.post('/auth/login', authLogin); // Login a user
app.post('/auth/logout', checkAuth, authLogout); // Logout a user
app.get("/auth/user", checkAuth, authUser); // Get user information
app.post("/auth/verify-otp", verifyOTP); // Verify OTP
app.post("/auth/reset-password", checkAuth, resetPassword);

// Category routes
const category = require('./routes/category/category');
app.post('/category', checkAdmin, upload.single('image'), category.createCategory); // Create a new category
app.get('/category', category.getCategories); // Get all categories
app.put('/category/:id', checkAdmin, upload.single('image'), category.updateCategory); // Update a category by ID
app.delete('/category/:id', checkAdmin, category.deleteCategory); // Delete a category by ID
app.get('/category/:id/products', category.getCategoryProducts); // Get products of a specific category by ID

// Product routes
const product = require('./routes/product/product');
app.post('/product/create', checkAdmin, upload.array("images"), product.createProduct); // Create a new product
app.post('/product/delete/:id', checkAdmin, product.deleteProduct); // Delete a product by ID
app.get('/products', product.getAllProducts); // Get all products
app.post('/product/update/:id', checkAdmin, upload.array("images"), product.updateProduct); // Update a product by ID
app.get("/products/:id", product.getProductById)

// Review routes
const review = require('./routes/reviews/reviews');
app.get('/product/:id/reviews', review.getProductReviews); // Get reviews for a specific product by ID
app.post('/review/create', checkAuth, review.createReview); // Create a new review
app.post('/review/:id/activate', checkAdmin, review.activateReview); // Activate a review by ID
app.post('/review/:id/deactivate', checkAdmin, review.deactivateReview); // Deactivate a review by ID
app.delete('/review/:id/', checkAdmin, review.deleteReview); // Delete a review by ID
app.get("/review/", checkAdmin, review.getAllReviews); // Get all reviews

// User routes
const users = require('./routes/users/users');
app.get('/users', checkAdmin, users.getAllUsers); // Get all users
app.get('/users/:id', checkAdmin, users.getUserById); // Get user by ID
app.post('/users', checkAdmin, users.createUser); // Create a new user
app.put('/users/:id', checkAuth, users.updateUser); // Update a user by ID
app.delete('/users/:id', checkAdmin, users.deleteUser); // Delete a user by ID

// Offer routes
const offers = require('./routes/offers/offers');
const {getProductById} = require("./routes/product/product");
app.get("/offers", offers.getOffers); // Get all offers
app.post("/offers/create", offers.createOffer); // Create an offer
app.delete("/offers/:id/delete", offers.deleteOffer); // Delete an offer by ID
app.put("/offers/:id/update", offers.updateOffer); // Delete an offer by ID


// Services Orders routes
const servicesOrders = require('./routes/services_orders/services_orders');
app.post("/service-order", checkAuth, servicesOrders.createServiceOrder);
app.get("/service-order", checkAdmin, servicesOrders.getAllServiceOrders);
app.get("/service-order/me", checkAuth, servicesOrders.getUserOrders);
app.delete("/service-order", checkAuth, servicesOrders.deleteServiceOrder)

// Init server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
