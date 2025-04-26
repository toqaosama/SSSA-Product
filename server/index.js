const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

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
app.post('/product/create',require('./routes/product/product'));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
