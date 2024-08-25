import validator from "validator";
import { find, create } from "../db/queries.js";
import bcrypt from "bcrypt";


const AuthController = {
  signup: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    };
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Email is not valid' });
    }
    try {
      const existingUser = await find(email);
      // console.log('existingUser', existingUser); // testing existing user
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await create(email, hashedPassword);
      return res.status(201).json(newUser);
    } catch (error) {
      console.log('Error creating user', error);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    console.log('contacted login endpoint');
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    };
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Email is not valid' });
    }
    try {
      const user = await find(email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.log('Error logging in user', error);
    }
  }






};

export default AuthController;