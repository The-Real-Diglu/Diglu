const path = require('path');
const result = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

if (result.error) {
  console.error('Error loading .env file:', result.error);
  process.exit(1);
}

console.log('Parsed Environment Variables:', result.parsed);

const mysql = require('mysql2/promise');

const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`ERROR: ${varName} is not defined in the .env file.`);
    process.exit(1); // Exit if any required environment variable is missing
  }
});

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
