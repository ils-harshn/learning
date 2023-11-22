const express = require("express");
const checkAdminSubdomainMiddleWare = require("../../middleware/admin/checkAdminSubdomainMiddleWare");
const admindb = require("../../db/admindb");
const authAdminMiddleware = require("../../middleware/admin/authAdminMiddleware");
const adminTenantRouter = express.Router();

adminTenantRouter.use(checkAdminSubdomainMiddleWare);
adminTenantRouter.use(authAdminMiddleware);

adminTenantRouter.get("/list", (req, res) => {
  admindb.query(`SELECT * FROM ${req.subdomain}.tenants`, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: `Database error: ${err.message}`,
      });
    }
    res.status(200).json(result);
  });
});

module.exports = adminTenantRouter;
