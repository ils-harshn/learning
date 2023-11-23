const express = require("express");
const checkAdminSubdomainMiddleWare = require("../../middleware/admin/checkAdminSubdomainMiddleWare");
const authAdminMiddleware = require("../../middleware/admin/authAdminMiddleware");
const adminTenantController = require("../../controllers/admin/tenantController");
const adminTenantRouter = express.Router();

adminTenantRouter.use(checkAdminSubdomainMiddleWare);
adminTenantRouter.use(authAdminMiddleware);

adminTenantRouter.get("/list", adminTenantController.list);
adminTenantRouter.post("/update", adminTenantController.update);

module.exports = adminTenantRouter;
