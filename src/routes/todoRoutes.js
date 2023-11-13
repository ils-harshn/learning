const express = require("express");
const authenticateUser = require("../middleware/authMiddleware");
const todoController = require("../controllers/todoController");

const router = express.Router();

// Secure todo routes with authentication middleware
router.use(authenticateUser);
//
// Routes for user-specific todos
router.get("/", todoController.getAllUserTodos);
router.post("/", todoController.createUserTodo);
router.put("/:id", todoController.updateUserTodo);
router.delete("/:id", todoController.deleteUserTodo);
router.delete("/", todoController.clearTodos);

module.exports = router;
