const config = require("../../config");

const checkAdminSubdomainMiddleWare = (req, res, next) => {
  const host = req.headers.host;
  const subdomain = host.split(".")[0];

  if (subdomain === config.HOST) {
    return res.status(400).json({
      error: "no-sub-domain-found",
    });
  }

  if (subdomain !== config.DB_ADMIN_DATABASE) {
    return res.status(403).json({
      error: "If you're trying to access this resource, please use the correct subdomain.",
    });
  }

  req.subdomain = subdomain;
  next();
};

module.exports = checkAdminSubdomainMiddleWare;
