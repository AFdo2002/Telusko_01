const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Default XAMPP MySQL username
  password: '', // Default XAMPP MySQL password
  database: 'secureconnect',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();