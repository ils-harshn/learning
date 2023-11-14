const ResponseError = require("../errors/ResponseError");
const BaseModel = require("./BaseModel");

class TodoModel extends BaseModel {
  static queries = {
    getAllUserTodos: "SELECT * FROM todos WHERE user_id = ?",
    createUserTodo:
      "INSERT INTO todos (user_id, task, completed) VALUES (?, ?, ?)",
    updateUserTodo:
      "UPDATE todos SET task = ?, completed = ? WHERE id = ? AND user_id = ?",
    deleteUserTodo: "DELETE FROM todos WHERE id = ? AND user_id = ?",
    clearTodos: "DELETE FROM todos WHERE user_id = ?",
  };

  getAllUserTodos(userId) {
    return this.runQuery(TodoModel.queries.getAllUserTodos, [userId]);
  }

  async createUserTodo(userId, task, completed) {
    const result = await this.runQuery(TodoModel.queries.createUserTodo, [
      userId,
      task,
      completed,
    ]);
    return { id: result.insertId, task, completed };
  }

  async updateUserTodo(userId, todoId, task, completed) {
    const result = await this.runQuery(TodoModel.queries.updateUserTodo, [
      task,
      completed,
      todoId,
      userId,
    ]);
    if (result.affectedRows === 0)
      throw new ResponseError("Todo not found to update", 404);
    return { todoId };
  }

  async deleteUserTodo(userId, todoId) {
    const result = await this.runQuery(TodoModel.queries.deleteUserTodo, [
      todoId,
      userId,
    ]);
    if (result.affectedRows === 0)
      throw new ResponseError("Todo not found to delete", 404);
    return { todoId };
  }

  async clearTodos(userId) {
    return this.runQuery(TodoModel.queries.clearTodos, [userId]);
  }
}

module.exports = new TodoModel();
