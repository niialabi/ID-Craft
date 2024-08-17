import validator from "validator";
import { find, create } from "../db/queries.js";
import bcrypt from "bcrypt";





export const findUser = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await find(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);

  } catch (error) {
    console.log('Error getting user by email', error);
    throw error;
  }
};

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  };
  if ( !validator.isEmail(email) ) {
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
}












// const UsersController = {
//   postNew: async (req, res) => {
//     res.json({ message: 'Hello IDCraft users. post' })
//   }
// };

// export default UsersController;