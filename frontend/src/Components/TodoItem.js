import React from 'react';

const TodoItem = ({ todo, handleEdit, handleDelete, handleCheckbox }) => {
  return (
    <div className='todo-item'>
      <input
        type='checkbox'
        checked={todo.isCompleted}
        onChange={() => handleCheckbox(todo._id)}
      />
      <span className={todo.isCompleted ? 'completed' : ''}>{todo.todo}</span>
      <button onClick={() => handleEdit(todo._id)}>Edit</button>
      <button onClick={() => handleDelete(todo._id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
