const express = require("express");
const checkSubdomainMiddleWare = require("./src/middleware/checkSubdomainMiddleWare");
const config = require("./src/config");
const app = express();


app.get("/", checkSubdomainMiddleWare, (req, res) => {
  res.status(200).json({
    "pre-domain": req.subdomain,
    host: req.headers.host,
  });
});

app.get("/config", checkSubdomainMiddleWare, (req, res) => {
  res.status(200).json(req.user_config);
});

app.listen(config.PORT, () => {
  console.log(`Server is running on host: ${config.HOST}`);
  console.log(`Server running on port: ${config.PORT}`);
});
