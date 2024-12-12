// backend/config/dbConfig.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Your MySQL username
  password: '',  // Your MySQL password
  database: 'vroomverse'  // Your database name
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database!');
});

module.exports = connection;
