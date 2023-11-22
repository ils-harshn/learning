const express = require("express");
const config = require("./src/config");
const bodyParser = require('body-parser');
const clientConfigRouter = require("./src/routes/client/configRoutes");
const adminTenantRouter = require("./src/routes/admin/tenantRoutes");
const adminUserRoutes = require("./src/routes/admin/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

app.use(bodyParser.json());

// admin routes
app.use("/admin/user", adminUserRoutes);
app.use("/admin/tenant", adminTenantRouter);

// client routes
app.use("/client/config", clientConfigRouter);

app.listen(config.PORT, () => {
  console.log(`Server is running on host: ${config.HOST}`);
  console.log(`Server running on port: ${config.PORT}`);
});
