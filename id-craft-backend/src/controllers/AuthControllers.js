import validator from "validator";
import { find, create } from "../db/queries.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();


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

      // JWT token
      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {expiresIn: '1h'});

      return res.status(201).json({ user: newUser, token });
    } catch (error) {
      console.log('Error creating user', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
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

      // JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {expiresIn: '1h'});

      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.log('Error logging in user', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  verifyToken: (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    };
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.log('Error verifying token', error);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  },

  logout: (req, res) => {
    // localStorage.removeItem('token'); client side
    // sessionStorage.removeItem('token'); client side
    return res.status(200).json({ message: 'Logout successful' });
  }






};

export default AuthController;