import express from 'express';
import AuthController from '../controllers/AuthControllers.js';

const router = express.Router();


router.post('/api/auth/signup', AuthController.signup); // create a new user endpoint
// router.post('/api/auth/login', AuthController.login); // login user endpoint



export default router