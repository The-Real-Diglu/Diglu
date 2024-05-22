const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'yourusername',
  password: 'yourpassword',
  database: 'police_scanner',
});

module.exports = pool;
