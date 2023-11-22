const express = require("express");
const checkClientSubdomainMiddleWare = require("../../middleware/client/checkClientSubdomainMiddleWare");
const admindb = require("../../db/admindb");
const clientUserRoutes = express.Router();
const bcrypt = require("bcrypt");
const authClientMiddleware = require("../../middleware/client/authClientMiddleware");
const config = require("../../config");
const { generateToken } = require("../../utils");

clientUserRoutes.use(checkClientSubdomainMiddleWare);

clientUserRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Requires email and password",
    });
  }

  admindb.query(
    `SELECT * FROM ${req.subdomain}.users WHERE email = ?`,
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const user = results[0];

      if (!user) {
        return res.status(401).json({
          error: "Invalid Credentials",
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return handleError(res, "Invalid credentials", 401);
      }

      let query = "";
      let token = generateToken();
      if (user.token === null)
        query = `UPDATE ${req.subdomain}.users SET last_login = now(), token="${token}", token_expiry = DATE_ADD(now(), INTERVAL 1 DAY) where id=${user.id}`;
      else {
        token = user.token;
        query = `UPDATE ${req.subdomain}.users SET last_login = now(), token_expiry = DATE_ADD(now(), INTERVAL 1 DAY) where id=${user.id}`;
      }

      admindb.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0)
          return res.status(500).json({ error: "No row affected" });
        res.json({ token, user_id: user.id });
      });
    }
  );
});

clientUserRoutes.post("/register", async (req, res) => {
  if (!config.DEBUG) {
    return res.status(400).json({
      error: "Not allowed on production",
    });
  }

  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      error: "Email and password are required",
    });

  try {
    const hashedPassword = await bcrypt.hash(password, config.SALT_ROUND);
    admindb.query(
      `INSERT INTO ${req.subdomain}.users (email, password) VALUES (?, ?)`,
      [email, hashedPassword],
      (err, _) => {
        if (err) {
          return res
            .status(err.code === "ER_DUP_ENTRY" ? 409 : 500)
            .json({ error: err.message });
        }
        res.status(200).json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

clientUserRoutes.get("/profile", authClientMiddleware, (req, res) => {
  return res.status(200).json(req.user);
});

module.exports = clientUserRoutes;
