const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleError = (res, error, status_code = 500) => {
  res.status(status_code).json({ error: error });
};

module.exports = {
  registerUser: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const existingUser = await UserModel.getUserByEmail(email);

      if (existingUser) {
        return handleError(res, "Email already registered", 400);
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await UserModel.createUser(email, hashedPassword);

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      handleError(res, error.message);
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await UserModel.getUserByEmail(email);

      if (!user) {
        return handleError(res, "Invalid credentials", 401);
      }

      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        return handleError(res, "Invalid credentials", 401);
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.json({ token });
    } catch (error) {
      handleError(res, error);
    }
  },
};
