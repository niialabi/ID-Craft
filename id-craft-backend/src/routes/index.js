import express from 'express';
import { findUser, createUser } from '../controllers/UsersControllers.js';


const router = express.Router();

router.get('/users/:email', findUser); // get a user by email endpoint (not sure i will use this)
// router.post('/users', UsersController.postNew);

router.post('/users', createUser); // create a new user endpoint



export default router