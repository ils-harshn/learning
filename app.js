const express = require("express");

const app = express();
const PORT = 3000;
const HOST = "localhost:3000";

const mysql = require("mysql");

const formateDate = (dateString) => {
  var dateParts = dateString.split("-");
  var year = parseInt(dateParts[0], 10);
  var month = parseInt(dateParts[1], 10) - 1; // Subtract 1 as months are zero-based
  var day = parseInt(dateParts[2], 10);

  var myDate = new Date(year, month, day);
  myDate.setHours(11, 59, 59, 0);

  return myDate;
};

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "testing@321",
};

const checkSubdomainMiddleWare = (req, res, next) => {
  const host = req.headers.host;
  const subdomain = host.split(".")[0];

  if (subdomain === HOST) {
    return res.status(400).json({
      error: "no-sub-domain-found",
    });
  }

  dbConfig["database"] = subdomain;
  const db = mysql.createConnection(dbConfig);

  db.connect((err) => {
    if (err) {
      return res.status(500).json({
        error: `No connection found for ${subdomain}`,
      });
    }

    const query = "SELECT * FROM config";

    db.query(query, (error, results) => {
      if (error) {
        return res.status(500).json({
          error: "Error checking access in config table",
        });
      } else {
        const config = {};
        results.forEach((item) => {
          config[item.key] = item.value;
        });

        config["valid_till"] = formateDate(config["valid_till"]);
        config["can_access"] = config["can_access"] === "false" ? false : true;

        if (config["can_access"] === false) {
          return res.status(402).json({
            error: "Access denied",
          });
        }

        const currentDate = new Date();
        currentDate.setHours(11, 59, 59, 0);

        if (config["valid_till"] < currentDate) {
          return res.status(402).json({
            error: "Subscription expired",
          });
        }

        req.db = db;
        req.user_config = config;
        req.subdomain = subdomain;
        next();
      }
    });
  });
};

app.get("/", checkSubdomainMiddleWare, (req, res) => {
  res.status(200).json({
    "pre-domain": req.subdomain,
    host: req.headers.host,
  });
});

app.get("/config", checkSubdomainMiddleWare, (req, res) => {
  res.status(200).json(req.user_config);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
