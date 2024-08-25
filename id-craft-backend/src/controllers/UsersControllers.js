import { find, create } from "../db/queries.js";



const UserController = {

  findUser: async (req, res) => {
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
  }




};

export default UserController;
