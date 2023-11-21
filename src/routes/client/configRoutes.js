const express = require("express");
const checkSubdomainMiddleWare = require("../../middleware/checkSubdomainMiddleWare");
const configController = require("../../controllers/client/configController");
const clientConfigRouter = express.Router();

clientConfigRouter.use(checkSubdomainMiddleWare);

clientConfigRouter.get("/", configController.configuration);

module.exports = clientConfigRouter;