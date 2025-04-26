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



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
