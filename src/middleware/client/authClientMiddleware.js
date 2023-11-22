const admindb = require("../../db/admindb");

function authClientMiddleware(req, res, next) {
  const token = req.header("Authorization");
  const user_id = req.header("User-ID");

  if (!token || !user_id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  admindb.query(
    `SELECT * FROM ${req.subdomain}.users WHERE id = ? AND token = ?`,
    [user_id, token],
    (err, results) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
      const user = results[0];
      if (user === undefined) {
        return res.status(404).json({ error: "Unauthorized Access!" });
      }
      req.user = user;
      next();
    }
  );
}

module.exports = authClientMiddleware;
