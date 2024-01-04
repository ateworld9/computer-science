import TodoItem from './TodoItem';

const TodoList = ({ todos }) => (
	<ul>
		{todos.map((todo) => (
			<TodoItem key={todo.id} id={todo.id} title={todo.title} />
		))}
	</ul>
);

export default TodoList;
