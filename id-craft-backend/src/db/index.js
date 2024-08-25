// import pg from 'pg';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // loads the .env file

// setting up db credentials and connection using the Sequelize class
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false //turning off default logging
});

export default sequelize;
























// const { Pool } = pg; // Pool is a class in the pg module

// setting up db credentials and connection using the Pool class
// credentials are stored in the .env file
// const userdbPool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   port: process.env.DB_PORT,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// const connectToDatabase = async () => {
//   try {
//     await userdbPool.connect();
//     console.log('Connected to the database');
//   } catch (error) {
//     console.log('Error connecting to the database', error);
//   }
// };

// export { connectToDatabase, userdbPool };
