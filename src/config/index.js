require("dotenv").config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_ADMIN_DATABASE = process.env.DB_ADMIN_DATABASE;

module.exports = {
  PORT,
  HOST,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_ADMIN_DATABASE,
};
