const config = require("../../config");
const jwt = require("jsonwebtoken");

function authAdminMiddleware(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, config.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { iat, exp, ...user } = decoded;
    req.user = user;
    next();
  });
}

module.exports = authAdminMiddleware;
