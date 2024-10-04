const { createPool } = require('mysql2/promise');
require('dotenv').config();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,   

  database: process.env.DB_NAME   

});

pool.query('SELECT 1')
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

module.exports = pool;
