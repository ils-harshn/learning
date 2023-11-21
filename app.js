const express = require("express");
const config = require("./src/config");
const clientConfigRouter = require("./src/routes/client/configRoutes");

const app = express();

app.use("/client/config", clientConfigRouter);

app.listen(config.PORT, () => {
  console.log(`Server is running on host: ${config.HOST}`);
  console.log(`Server running on port: ${config.PORT}`);
});
