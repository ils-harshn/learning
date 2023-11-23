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
    const tenant_id = req.params.id;
    const newCanAccess = req.body.can_access;
    const newValidTill = req.body.valid_till;

    if (tenant_id === undefined)
      return res.status(400).json({ error: "Tenant id is required!" });

    if (newCanAccess === undefined && newValidTill === undefined)
      return res.status(400).json({ error: "No data provided to update" });

    AdminTenantModel.update(
      tenant_id,
      newCanAccess,
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
  create: (req, res) => {
    const newTenantName = req.body.tenant_name;
    const newCanAccess = req.body.can_access;
    const newValidTill = req.body.valid_till;

    if (
      newCanAccess === undefined ||
      newTenantName === undefined ||
      newValidTill === undefined
    )
      return res.status(400).json({ error: "Bad Request" });

    if (!tenantNameCheck(newTenantName))
      return res.status(400).json({
        error:
          "Invalid tenant_name format. It should be alphanumeric, max 100 characters, and start with a letter.",
      });

    AdminTenantModel.register(
      newTenantName,
      newCanAccess,
      newValidTill,
      req.subdomain,
      (err, results) => {
        if (err) {
          return res.status(500).json({
            error: `Database error: ${err.message}`,
          });
        }

        if (results.affectedRows === 0)
          return res.status(400).json({
            message: "Bad Request",
          });

        const insertId = results.insertId;

        AdminTenantModel.createDatabase(newTenantName, (err, results) => {
          if (err) {
            return res.status(500).json({
              error: `Database error: ${err.message}`,
            });
          }

          if (results.affectedRows === 0)
            return res.status(400).json({
              message: "Bad Request",
            });

          AdminTenantModel.createUserTable(newTenantName, (err, results) => {
            if (err) {
              return res.status(500).json({
                error: `Database error: ${err.message}`,
              });
            }

            res.status(200).json({
              message: "Created tenant",
              id: insertId,
            });
          });
        });
      }
    );
  },
  delete: (req, res) => {
    const tenant_id = req.params.id;
    AdminTenantModel.getRegistry(tenant_id, req.subdomain, (err, results) => {
      if (err) {
        return res.status(500).json({
          error: `Database error: ${err.message}`,
        });
      }
      const tenant = results[0];
      AdminTenantModel.removeRegistry(
        tenant_id,
        req.subdomain,
        (err, results) => {
          if (err) {
            return res.status(500).json({
              error: `Database error: ${err.message}`,
            });
          }
          if (results.affectedRows === 0)
            return res.status(400).json({
              message: "Bad Request",
            });

          AdminTenantModel.removeDatabase(
            tenant.tenant_name,
            (err, results) => {
              if (err) {
                return res.status(500).json({
                  error: `Database error: ${err.message}`,
                });
              }
              if (results.affectedRows === 0)
                return res.status(400).json({
                  message: "Bad Request",
                });
              delete tenant["id"];
              res.status(200).json(tenant);
            }
          );
        }
      );
    });
  },
};

module.exports = adminTenantController;
