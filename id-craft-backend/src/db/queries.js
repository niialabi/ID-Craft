// import { userdbPool } from "./index.js";
import User from "../models/user.js";


const create = async (email, password) => {
  try {
    const user = await User.create({ email, password });
    return {
      id: user.id,
      email: user.email
    };
  } catch (error) {
    console.log('Error creating user', error);
    throw error;
  }
};

const find = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    console.log('Error getting user by email', error);
    throw error;
  }
};

export { find, create };