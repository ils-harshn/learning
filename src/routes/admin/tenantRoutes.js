const express = require("express");
const checkAdminSubdomainMiddleWare = require("../../middleware/admin/checkAdminSubdomainMiddleWare");
const authAdminMiddleware = require("../../middleware/admin/authAdminMiddleware");
const adminTenantController = require("../../controllers/admin/tenantController");
const adminTenantRouter = express.Router();

adminTenantRouter.use(checkAdminSubdomainMiddleWare);
adminTenantRouter.use(authAdminMiddleware);

adminTenantRouter.get("/list", adminTenantController.list);
adminTenantRouter.put("/update/:id", adminTenantController.update);
adminTenantRouter.delete("/delete/:id", adminTenantController.delete);
adminTenantRouter.get("/get/:id", adminTenantController.get);
adminTenantRouter.post("/create", adminTenantController.create);

module.exports = adminTenantRouter;
