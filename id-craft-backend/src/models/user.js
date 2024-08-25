import sequelize from "../db/index.js";
import { Sequelize } from "sequelize";

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    indexes: [{
      unique: true,
      fields: ['email']
    }]
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

export default User;