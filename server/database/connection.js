const mysql = require('mysql');

const connection = mysql.createConnection({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
=======
=======
>>>>>>> Stashed changes
  host: '127.0.0.1', // or 'localhost'
  port: 3306,
  user: 'radwan', // usually 'root' for local development
  password: 'RDRsWBWp1Tdv8eQUW5XS',
  database: 'ssa'
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL!');
});

module.exports = connection;