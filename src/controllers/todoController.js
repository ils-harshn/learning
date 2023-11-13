const db = require("../db");
const Joi = require("joi");

module.exports = {
  getAllUserTodos: (req, res) => {
    const userId = req.userId;

    db.query(
      "SELECT * FROM todos WHERE user_id = ?",
      [userId],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        res.json(results);
      }
    );
  },

  createUserTodo: (req, res) => {
    const userId = req.userId;
    const { task, completed } = req.body;

    const { error } = validateTodo({ task, completed });
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    db.query(
      "INSERT INTO todos (user_id, task, completed) VALUES (?, ?, ?)",
      [userId, task, completed],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        res.status(201).json({ id: result.insertId, task, completed });
      }
    );
  },

  updateUserTodo: (req, res) => {
    const userId = req.userId;
    const todoId = req.params.id;
    const { task, completed } = req.body;

    const { error } = validateTodo({ task, completed });
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    db.query(
      "UPDATE todos SET task = ?, completed = ? WHERE id = ? AND user_id = ?",
      [task, completed, todoId, userId],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        if (result.affectedRows === 0) {
          res.status(404).json({ error: "Todo not found or unauthorized" });
          return;
        }

        res.status(200).json({ message: "Todo updated successfully" });
      }
    );
  },

  deleteUserTodo: (req, res) => {
    const userId = req.userId;
    const todoId = req.params.id;
    db.query(
      "DELETE FROM todos WHERE id = ? AND user_id = ?",
      [todoId, userId],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        if (result.affectedRows === 0) {
          res.status(404).json({ error: "Todo not found or unauthorized" });
          return;
        }

        res.status(200).json({ message: "Todo deleted successfully" });
      }
    );
  },

  clearTodos: (req, res) => {
    const userId = req.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized - User ID not provided" });
    }

    db.query(
      "DELETE FROM todos WHERE user_id = ?",
      [userId],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        res.status(200).json({ message: "All todos deleted successfully" });
      }
    );
  },
};

function validateTodo(todo) {
  const schema = Joi.object({
    task: Joi.string().required(),
    completed: Joi.boolean().required(),
  });
  return schema.validate(todo);
}
