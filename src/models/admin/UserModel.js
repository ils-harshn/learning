const admindb = require("../../db/admindb");

const QUERIES = {
  findByEmail: (email, db) =>
    `SELECT * FROM ${db}.users WHERE email = "${email}"`,
  updateLastLoginById: (id, db) =>
    `UPDATE ${db}.users SET last_login = NOW() WHERE id = ${id}`,
  create: (email, hashedPassword, db) =>
    `INSERT INTO ${db}.users (email, password) VALUES ("${email}", "${hashedPassword}")`,
};

const AdminUserModel = {
  findByEmail: (email, db, ...kwargs) =>
    admindb.query(QUERIES.findByEmail(email, db), ...kwargs),

  updateLastLoginById: (id, db, ...kwargs) =>
    admindb.query(QUERIES.updateLastLoginById(id, db), ...kwargs),

  create: (email, hashedPassword, db, ...kwargs) =>
    admindb.query(QUERIES.create(email, hashedPassword, db), ...kwargs),
};

module.exports = AdminUserModel;
