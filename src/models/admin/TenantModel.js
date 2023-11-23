const admindb = require("../../db/admindb");

const QUERIES = {
  list: (db) => `SELECT * FROM ${db}.tenants`,
  update: (id, can_access = undefined, valid_till = undefined, db) => {
    let updateQuery = `UPDATE ${db}.tenants SET `;
    if (can_access !== undefined) updateQuery += `can_access = ${can_access}, `;

    if (valid_till !== undefined)
      updateQuery += `valid_till = '${valid_till}', `;

    updateQuery = updateQuery.slice(0, -2) + ` WHERE id = ${id}`;
    return updateQuery;
  },
  register: (tenant_name, can_access, valid_till, db) =>
    `INSERT INTO ${db}.tenants (tenant_name, can_access, valid_till) VALUE ("${tenant_name}", ${
      can_access ? 1 : 0
    }, "${valid_till}")`,

  removeRegistry: (tenant_id, db) =>
    `DELETE FROM ${db}.tenants WHERE id = ${tenant_id};`,

  removeDatabase: (tenant_name) => `DROP DATABASE ${tenant_name}`,

  getRegistry: (tenant_id, db) =>
    `SELECT * FROM ${db}.tenants where id=${tenant_id}`,

  createDatabase: (tenant_name) => `CREATE DATABASE ${tenant_name}`,
  createUserTable: (tenant_name) =>
    `CREATE TABLE ${tenant_name}.users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, last_login DATETIME, created_on DATETIME DEFAULT CURRENT_TIMESTAMP)`,
};

const AdminTenantModel = {
  register: (tenant_name, can_access, valid_till, db, ...kwargs) =>
    admindb.query(
      QUERIES.register(tenant_name, can_access, valid_till, db),
      ...kwargs
    ),

  createDatabase: (tenant_name, ...kwargs) =>
    admindb.query(QUERIES.createDatabase(tenant_name), ...kwargs),

  createUserTable: (tenant_name, ...kwargs) =>
    admindb.query(QUERIES.createUserTable(tenant_name), ...kwargs),

  removeRegistry: (tenant_id, db, ...kwargs) =>
    admindb.query(QUERIES.removeRegistry(tenant_id, db), ...kwargs),

  getRegistry: (tenant_id, db, ...kwargs) =>
    admindb.query(QUERIES.getRegistry(tenant_id, db), ...kwargs),

  removeDatabase: (tenant_name, ...kwargs) =>
    admindb.query(QUERIES.removeDatabase(tenant_name), ...kwargs),

  list: (db, ...kwargs) => admindb.query(QUERIES.list(db), ...kwargs),

  update: (id, can_access = undefined, valid_till = undefined, db, ...kwargs) =>
    admindb.query(
      QUERIES.update(
        id,
        (can_access = can_access),
        (valid_till = valid_till),
        (db = db)
      ),
      ...kwargs
    ),
};

module.exports = AdminTenantModel;
