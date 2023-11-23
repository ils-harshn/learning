const express = require("express");
const checkAdminSubdomainMiddleWare = require("../../middleware/admin/checkAdminSubdomainMiddleWare");
const adminUserRoutes = express.Router();
const authAdminMiddleware = require("../../middleware/admin/authAdminMiddleware");
const adminUserController = require("../../controllers/admin/userController");

adminUserRoutes.use(checkAdminSubdomainMiddleWare);

adminUserRoutes.post("/login", adminUserController.login);

adminUserRoutes.post("/register", adminUserController.register);

adminUserRoutes.get("/profile", authAdminMiddleware, adminUserController.profile);

module.exports = adminUserRoutes;
