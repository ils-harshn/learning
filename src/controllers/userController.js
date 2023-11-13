const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // ... (existing methods)

  registerUser: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    // Check if email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into the database
    db.query(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, hashedPassword],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ token });
  },
};

async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (error, results) => {
        if (error) {
          console.error(error);
          reject(error);
        }
        const user = results[0];
        resolve(user);
      }
    );
  });
}
