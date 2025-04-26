const express = require('express');
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());


// --------- Routes --------- 
app.get('/', (req, res) => {
  res.send('Welcome to the SSA API');
});

// Auth Routes
app.post('/auth/register', require('./routes/auth/register'));
app.post('/auth/login', require('./routes/auth/login'));
app.post('/auth/logout', require('./routes/auth/logout'));

// Category Routes
app.post('/category', require('./routes/category/category').createCategory);
app.get('/category', require('./routes/category/category').getCategories);
app.get('/category/:id/products', require('./routes/category/category').getCategoryProducts);
app.put('/category/:id', require('./routes/category/category').updateCategory);
app.delete('/category/:id', require('./routes/category/category').deleteCategory);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
