const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

connection.connect((err) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error("Database connection was closed.");
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error("Database has too many connections.");
        }
        if (err.code === 'ECONNREFUSED') {
            console.error("Database connection was refused.");
        }
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error("Access denied for user.");
        }
        if (err.code === 'ER_BAD_DB_ERROR') {
            console.error("Database does not exist.");
        }
        else {
            console.error("Database connection error: ", err);
        }
        process.exit(1); // Exit the process with failure
    }
    
    console.log("Connected to the database");
});

module.exports = connection;