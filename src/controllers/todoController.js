const TodoModel = require("../models/TodoModel");
const Joi = require("joi");

module.exports = {
  getAllUserTodos: async (req, res) => {
    try {
      const userId = req.userId;
      const todos = await TodoModel.getAllUserTodos(userId);
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createUserTodo: async (req, res) => {
    try {
      const userId = req.userId;
      const { task, completed } = req.body;

      const { error } = validateTodo({ task, completed });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const result = await TodoModel.createUserTodo(userId, task, completed);
      res.status(201).json({ id: result.insertId, task, completed });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateUserTodo: async (req, res) => {
    try {
      const userId = req.userId;
      const todoId = req.params.id;
      const { task, completed } = req.body;

      const { error } = validateTodo({ task, completed });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const result = await TodoModel.updateUserTodo(
        userId,
        todoId,
        task,
        completed
      );

      res.status(200).json({ message: "Todo updated successfully" });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  deleteUserTodo: async (req, res) => {
    try {
      const userId = req.userId;
      const todoId = req.params.id;

      const result = await TodoModel.deleteUserTodo(userId, todoId);

      res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },

  clearTodos: async (req, res) => {
    try {
      const userId = req.userId;

      if (!userId) {
        return res
          .status(401)
          .json({ error: "Unauthorized - User ID not provided" });
      }

      await TodoModel.clearTodos(userId);
      res.status(200).json({ message: "All todos deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

function validateTodo(todo) {
  const schema = Joi.object({
    task: Joi.string().required(),
    completed: Joi.boolean().required(),
  });
  return schema.validate(todo);
}
