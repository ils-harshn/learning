const mysql = require("mysql");
const config = require("../config");

const admindbConfig = {
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_ADMIN_DATABASE,
};

const admindb = mysql.createConnection(admindbConfig);
module.exports = admindb;
