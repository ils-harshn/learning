const express = require("express");
const checkClientSubdomainMiddleWare = require("../../middleware/client/checkClientSubdomainMiddleWare");
const clientConfigController = require("../../controllers/client/configController");

const clientConfigRouter = express.Router();

clientConfigRouter.use(checkClientSubdomainMiddleWare);

clientConfigRouter.get("/", clientConfigController.configuration);

module.exports = clientConfigRouter;
