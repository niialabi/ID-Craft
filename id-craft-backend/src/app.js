import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { config } from 'dotenv';
import router from './routes/index.js';
import initDb from './db/initDb.js';

config(); // load environment variables from a .env file
const port = process.env.PORT || 3000; // set the port for the server
const app = express(); // create an express app

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json()); // enable parsing of JSON data
app.use(cookieParser()); // enable parsing of cookies
app.use(cors(corsOptions)); // enable CORS to allow requests from the frontend
app.use(helmet()); // adds security headers to the response



app.use(passport.initialize()); // initialize the passport middleware

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


export default app;
app.use('/api/auth', router); // use the router middleware. redirects to the routes/index.js file
// app.use('/api/events', require('./routes/events'));
// app.use('/api/id-cards', require('./routes/idCards'));

// initialize the database and start the server
initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error) => {
  console.log('Error initializing database', error);
});
