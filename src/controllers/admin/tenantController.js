const admindb = require("../../db/admindb");
const { tenantNameCheck } = require("../../utils");

const adminTenantController = {
  list: (req, res) => {
    admindb.query(`SELECT * FROM ${req.subdomain}.tenants`, (err, result) => {
      if (err) {
        return res.status(500).json({
          error: `Database error: ${err.message}`,
        });
      }
      res.status(200).json(result);
    });
  },
  update: (req, res) => {
    const tenant_id = req.body.tenant_id;
    const newCanAccess = req.body.can_access;
    const newTenantName = req.body.tenant_name;
    const newValidTill = req.body.valid_till;

    if (tenant_id === undefined)
      return res.status(400).json({ error: "Tenant id is required!" });

    let updateQuery = `UPDATE ${req.subdomain}.tenants SET `;

    if (newCanAccess !== undefined)
      updateQuery += `can_access = ${newCanAccess}, `;

    if (newTenantName !== undefined) {
      if (!tenantNameCheck(newTenantName))
        return res.status(400).json({
          error:
            "Invalid tenant_name format. It should be alphanumeric, max 100 characters, and start with a letter.",
        });
      updateQuery += `tenant_name = '${newTenantName}', `;
    }

    if (newValidTill !== undefined)
      updateQuery += `valid_till = '${newValidTill}', `;

    updateQuery = updateQuery.slice(0, -2) + ` WHERE id = ${tenant_id}`;

    if (
      newCanAccess === undefined &&
      newTenantName === undefined &&
      newValidTill === undefined
    )
      return res.status(400).json({ error: "No data provided to update" });

    admindb.query(updateQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          error: `Database error: ${err.message}`,
        });
      }

      if (result.affectedRows === 0)
        return res.status(400).json({
          message: "Bad Request",
        });
      res.status(200).json({
        message: "Update tenant",
      });
    });
  },
};

module.exports = adminTenantController;
