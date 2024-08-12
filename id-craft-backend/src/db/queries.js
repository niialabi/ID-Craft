import { userdbPool } from "./index.js";


const find = async (email) => {
  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email]
  };
  try {
    const result = await userdbPool.query(query);
    return result.rows[0];
  } catch (error) {
    console.log('Error getting user by email', error);
    throw error;
  }
};



const create = async (email, password) => {
   const query = {
    text: 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *',
    values: [email, password]
  };
  try {
    const result = await userdbPool.query(query);
    return result.rows[0];
  } catch (error) {
    console.log('Error creating user', error);
    throw error;
  }
}

export { find, create };