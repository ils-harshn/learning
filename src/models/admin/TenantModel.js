const admindb = require("../../db/admindb");

const QUERIES = {
  list: (db) => `SELECT * FROM ${db}.tenants`,
  update: (
    id,
    can_access = undefined,
    tenant_name = undefined,
    valid_till = undefined,
    db
  ) => {
    let updateQuery = `UPDATE ${db}.tenants SET `;
    if (can_access !== undefined) updateQuery += `can_access = ${can_access}, `;

    if (tenant_name !== undefined)
      updateQuery += `tenant_name = '${tenant_name}', `;

    if (valid_till !== undefined)
      updateQuery += `valid_till = '${valid_till}', `;

    updateQuery = updateQuery.slice(0, -2) + ` WHERE id = ${id}`;
    return updateQuery;
  },
};

const AdminTenantModel = {
  list: (db, ...kwargs) => admindb.query(QUERIES.list(db), ...kwargs),
  update: (
    id,
    can_access = undefined,
    tenant_name = undefined,
    valid_till = undefined,
    db,
    ...kwargs
  ) =>
    admindb.query(
      QUERIES.update(
        id,
        (can_access = can_access),
        (tenant_name = tenant_name),
        (valid_till = valid_till),
        (db = db)
      ),
      ...kwargs
    ),
};

module.exports = AdminTenantModel;
