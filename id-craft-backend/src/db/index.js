import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // loads the .env file

const { Pool } = pg; // Pool is a class in the pg module

// setting up db credentials and connection using the Pool class
// credentials are stored in the .env file
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const result = await pool.query('SELECT * FROM users');
console.log(result.rows);
console.log(result.rowCount);
console.log(result.rows[1]);








