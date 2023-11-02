import { useState } from "react";
import useTodos from "../hooks/useTodos";

const Todo = () => {
  const [todos, { add, remove, clear }] = useTodos([]);
  const [todoInput, setTodoInput] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (todoInput.trim() !== "") {
      add(todoInput);
      setTodoInput("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Enter your task"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
      </form>
      <button onClick={clear}>Clear All</button>
      
      {todos.map((todo, index) => (
        <p key={index} onDoubleClick={() => remove(todo)}>
          {todo}
        </p>
      ))}
    </div>
  );
};

export default Todo;
