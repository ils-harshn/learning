const BaseModel = require("./BaseModel");

class UserModel extends BaseModel {
  static queries = {
    createUser: "INSERT INTO users (email, password_hash) VALUES (?, ?)",
    getUserByEmail: "SELECT * FROM users WHERE email = ?",
  };

  createUser = (email, hashedPassword) =>
    this.runQuery(UserModel.queries.createUser, [email, hashedPassword]);

  getUserByEmail = async (email) => {
    const results = await this.runQuery(UserModel.queries.getUserByEmail, [
      email,
    ]);
    return results[0];
  };
}

module.exports = new UserModel();
