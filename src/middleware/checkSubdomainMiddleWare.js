const mysql = require("mysql");
const admindb = require("../db/admindb");
const config = require("../config");
const { isExpired } = require("../utils");

const checkSubdomainMiddleWare = (req, res, next) => {
  const host = req.headers.host;
  const subdomain = host.split(".")[0];

  if (subdomain === config.HOST) {
    return res.status(400).json({
      error: "no-sub-domain-found",
    });
  }

  admindb.query(
    "SELECT * FROM tenants WHERE tenant_name = ?",
    [subdomain],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          error: `Database error: ${err.message}`,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          error: "No tenant found",
        });
      }

      const user_config = JSON.parse(JSON.stringify(results[0]));

      if (user_config.can_access == false) {
        return res.status(404).json({
          error: "Access Denied",
        });
      }

      if (isExpired(user_config.valid_till)) {
        return res.status(404).json({
          error: "Subscription expired!",
        });
      }

      const tenantdbConfig = {
        host: config.DB_HOST,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: subdomain,
      };

      const tenantdb = mysql.createConnection(tenantdbConfig);

      tenantdb.connect((err) => {
        if (err) {
          return res.status(500).json({
            error: `Failed to connect to tenant database: ${err.message}`,
          });
        }

        req.tenantdb = tenantdb;
        req.subdomain = subdomain;
        next();
      });
    }
  );
};

module.exports = checkSubdomainMiddleWare;
