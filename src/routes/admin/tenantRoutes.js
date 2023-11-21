const express = require("express");
const checkAdminSubdomainMiddleWare = require("../../middleware/admin/checkAdminSubdomainMiddleWare");
const adminTenantRouter = express.Router();

adminTenantRouter.use(checkAdminSubdomainMiddleWare)
adminTenantRouter.get("/", (req, res) => {
  res.json({
    jello: "bello",
  });
});

module.exports = adminTenantRouter;
