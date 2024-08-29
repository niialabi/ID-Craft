import express from 'express';
import AuthController from '../controllers/AuthControllers.js';

const router = express.Router();


router.post('/signup', AuthController.signup); // create a new user endpoint
router.post('/login', AuthController.login); // login user endpoint
router.get('/logout', AuthController.logout); // logout user endpoint

// router.get('/protected', AuthController.verifyToken, (req, res) => {
//   res.json({ message: 'This is a protected route', userId: req.userId });
// });
// // router.get('/test', AuthController.verifyToken); // authorization test endpoint



export default router