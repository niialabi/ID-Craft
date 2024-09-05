import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import validator from "validator";
import { find, create } from "../db/queries.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    // console.log('payload', payload);
    const user = await find(payload.email);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

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

      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      return res.status(201).json({ user: { id: newUser.id, email: newUser.email }, message: 'Signup successful' });
    } catch (error) {
      console.error('Error creating user', error);
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
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {expiresIn: '1h'});

      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      return res.status(200).json( {user: {id: user.id, email: user.email }, message: 'Login successful', tokenTest: token });
    } catch (error) {
      console.log('Error logging in user', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  verifyToken: passport.authenticate('jwt', { session: false }),

  logout: (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logout successful' });
  }






};

export default AuthController;