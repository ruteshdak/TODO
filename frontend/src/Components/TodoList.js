import React from 'react';

function TodoList({ todos, handleEdit, handleDelete, handleCheckbox }) {
  return (
    <div className="todos grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {todos.length === 0 && <div className='m-5'>No task to display</div>}
      {todos.map(item => (
        <div key={item._id} className='todo p-4 bg-white shadow rounded-md flex justify-between items-center'>
          <div className='flex items-center space-x-3'>
            <input 
              type="checkbox" 
              onChange={() => handleCheckbox(item._id)} 
              checked={item.isCompleted} 
              className='h-5 w-5'
            />
            <div className={item.isCompleted ? "line-through text-gray-500" : ""}>{item.todo}</div>
          </div>
          <div className='flex space-x-3'>
            <button onClick={() => handleEdit(item._id)} className='bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded'>Edit</button>
            <button onClick={() => handleDelete(item._id)} className='bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded'>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
