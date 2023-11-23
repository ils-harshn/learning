const admindb = require("../../db/admindb");
const AdminTenantModel = require("../../models/admin/TenantModel");
const { tenantNameCheck } = require("../../utils");

const adminTenantController = {
  list: (req, res) => {
    AdminTenantModel.list(req.subdomain, (err, result) => {
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

    if (
      newCanAccess === undefined &&
      newTenantName === undefined &&
      newValidTill === undefined
    )
      return res.status(400).json({ error: "No data provided to update" });

    if (!tenantNameCheck(newTenantName))
      return res.status(400).json({
        error:
          "Invalid tenant_name format. It should be alphanumeric, max 100 characters, and start with a letter.",
      });

    AdminTenantModel.update(
      tenant_id,
      newCanAccess,
      newTenantName,
      newValidTill,
      req.subdomain,
      (err, result) => {
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
      }
    );
  },
};

module.exports = adminTenantController;
