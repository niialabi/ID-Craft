import express from 'express';
import UsersController from '../controllers/UsersControllers.js';


const router = express.Router();

router.get('/test', (req, res) => {
  return res.json({ message: 'Hello IDCraft users. router working' });
});
router.post('/users', UsersController.postNew);



export default router