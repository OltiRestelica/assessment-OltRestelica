const sequelize = require("sequelize");
require("dotenv").config();

const database = new sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  "",
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log,
  },
);

const connectDatabase = async () => {
  try {
    await database.authenticate();
    console.log("connected to the database");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { database, connectDatabase };
