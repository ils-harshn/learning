const db = require("../db");

class BaseModel {
  async runQuery(query, values) {
    return new Promise((resolve, reject) => {
      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }
}

module.exports = BaseModel;
