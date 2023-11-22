require("dotenv").config();

const DEBUG = true;

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_ADMIN_DATABASE = process.env.DB_ADMIN_DATABASE;

const SALT_ROUND = 10;

const SECRET_KEY = process.env.SECRET_KEY;

const EXP_OF_ADMIN_TOKEN = "1h";

module.exports = {
  DEBUG,
  PORT,
  HOST,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_ADMIN_DATABASE,
  SALT_ROUND,
  SECRET_KEY,
  EXP_OF_ADMIN_TOKEN,
};
