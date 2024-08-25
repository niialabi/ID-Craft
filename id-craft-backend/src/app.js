import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import router from './routes/index.js';
import initDb from './db/initDb.js';

config(); // load environment variables from a .env file
const port = process.env.PORT || 3000; // set the port for the server
const app = express(); // create an express app

app.use(express.json()); // enable parsing of JSON data
app.use(cors()); // enable CORS to allow requests from the frontend
app.use(helmet()); // adds security headers to the response

app.use('/', router); // use the router middleware. redirects to the routes/index.js file

// initialize the database and start the server
initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error) => {
  console.log('Error initializing database', error);
});
