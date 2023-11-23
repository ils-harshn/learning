const express = require("express");
const checkClientSubdomainMiddleWare = require("../../middleware/client/checkClientSubdomainMiddleWare");
const clientUserRoutes = express.Router();
const authClientMiddleware = require("../../middleware/client/authClientMiddleware");
const clientUserController = require("../../controllers/client/userController");

clientUserRoutes.use(checkClientSubdomainMiddleWare);

clientUserRoutes.post("/login", clientUserController.login);
clientUserRoutes.post("/register", clientUserController.register);
clientUserRoutes.get(
  "/profile",
  authClientMiddleware,
  clientUserController.profile
);

module.exports = clientUserRoutes;
