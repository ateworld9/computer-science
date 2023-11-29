import { useTodos } from './hook';
import TodoList from './ui/TodoList';

const SrpGood = () => {
  const todos = useTodos();

  return (
    <div style={{ fontFamily: 'serif' }}>
      <h1>Todos: </h1>
      <TodoList todos={todos} />
    </div>
  );
};

export default SrpGood;
