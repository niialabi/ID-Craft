import { userdbPool } from "./index.js";


const find = async (email) => {
  query = {
    test: 'SELECT * FROM users WHERE email = $1',
    valles: [email]
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
   query = {
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