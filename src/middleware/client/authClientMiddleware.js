const jwt = require("jsonwebtoken");
const config = require("../../config");

function authClientMiddleware(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const { iat, exp, ...data } = decoded;
    if (data.subdomain !== req.subdomain)
      return res.status(401).json({
        error: "Please your domain address!",
      });
    req.user = data;
    next();
  });
}

module.exports = authClientMiddleware;
