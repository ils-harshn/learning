import { useState } from "react";

const useTodos = (initialState = []) => {
  const [todos, setTodos] = useState(initialState);

  const add = (todo) => {
    setTodos([...todos, todo]);
  };

  const remove = (todo) => setTodos([...todos.filter((item) => item !== todo)]);

  const clear = () => setTodos([]);

  return [todos, { add, remove, clear }];
};

export default useTodos;
