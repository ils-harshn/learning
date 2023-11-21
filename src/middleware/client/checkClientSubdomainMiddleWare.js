const admindb = require("../../db/admindb");
const config = require("../../config");
const { isExpired } = require("../../utils");

const checkClientSubdomainMiddleWare = (req, res, next) => {
  const host = req.headers.host;
  const subdomain = host.split(".")[0];

  if (subdomain === config.HOST || subdomain === config.DB_ADMIN_DATABASE) {
    return res.status(400).json({
      error: "no-sub-domain-found",
    });
  }

  admindb.query(
    `SELECT * FROM ${config.DB_ADMIN_DATABASE}.tenants WHERE tenant_name = ?`,
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

      const user_config = results[0];

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

      req.user_config = user_config;
      req.subdomain = subdomain;
      next();
    }
  );
};

module.exports = checkClientSubdomainMiddleWare;
