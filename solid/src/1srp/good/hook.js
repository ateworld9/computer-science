import { useEffect, useState } from "react";
import { getTodos } from "./api";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then((data) => setTodos(data));
  }, []);

  return todos;
};
