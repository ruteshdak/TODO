import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, handleEdit, handleDelete, handleCheckbox }) => {
  return (
    <div>
      {todos.length === 0 ? (
        <p>No tasks to display</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleCheckbox={handleCheckbox}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
