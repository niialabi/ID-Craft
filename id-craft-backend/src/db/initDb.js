import sequelize from "./index.js";

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');
    await sequelize.sync({ force: false })
    .catch((error) => {
      console.log('Error syncing models:', error);
    });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.log('Error connecting to the database', error);
  }
};

export default initDb;