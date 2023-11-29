import { useEffect, useState } from 'react';

const SrpBad = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
      );
      const data = await response.json();
      setTodos(data);
    }
    getTodos();
  }, []);

  return (
    <div style={{ fontFamily: 'serif' }}>
      <h1>Todos: </h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{`ID:${todo.id} Title:${todo.title}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default SrpBad;
