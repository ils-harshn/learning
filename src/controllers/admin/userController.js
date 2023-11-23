const config = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminUserModel = require("../../models/admin/UserModel");

const adminUserController = {
  login: async (req, res) => {
    const { email, password: req_password } = req.body;

    if (!email || !req_password) {
      return res.status(400).json({
        error: "Requires email and password",
      });
    }

    AdminUserModel.findByEmail(
      email,
      req.subdomain,
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

        const passwordMatch = await bcrypt.compare(req_password, user.password);

        if (!passwordMatch) {
          return handleError(res, "Invalid credentials", 401);
        }

        AdminUserModel.updateLastLoginById(user.id, req.subdomain);
        const { password, ...data } = user;

        const token = jwt.sign(
          { ...data, subdomain: req.subdomain },
          config.SECRET_KEY,
          { expiresIn: config.EXP_OF_ADMIN_TOKEN }
        );

        res.status(200).json({ token });
      }
    );
  },
  register: async (req, res) => {
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
      AdminUserModel.create(
        email,
        hashedPassword,
        req.subdomain,
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
  },
  profile: (req, res) => {
    return res.status(200).json(req.user);
  },
};

module.exports = adminUserController;
