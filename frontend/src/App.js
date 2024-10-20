import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import TodoList from './Components/TodoList';
import axios from 'axios';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    // Fetch tasks from the API when the component mounts
    axios.get('http://localhost:5000/api/tasks')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleAdd = () => {
    axios.post('http://localhost:5000/api/tasks', { todo })
      .then(response => {
        setTodos([...todos, response.data]);
        setTodo(""); // Clear the input field
      })
      .catch(error => {
        console.error("There was an error adding the task!", error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => {
        setTodos(todos.filter(task => task._id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the task!", error);
      });
  };

  const handleEdit = (id) => {
    const taskToEdit = todos.find(task => task._id === id);
    setTodo(taskToEdit.todo);
    handleDelete(id);  // Optionally delete the task first, then re-add it on submission
  };

  const handleCheckbox = (id) => {
    const task = todos.find(task => task._id === id);
    axios.put(`http://localhost:5000/api/tasks/${id}`, { isCompleted: !task.isCompleted })
      .then(response => {
        const updatedTasks = todos.map(t => t._id === id ? response.data : t);
        setTodos(updatedTasks);
      })
      .catch(error => {
        console.error("There was an error updating the task!", error);
      });
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className='container mx-auto rounded-xl my-5 bg-violet-200 p-5 min-h-[80vh]'>
        <div className='Add todo my-5'>
          <h2 className='text-xl font-bold'>Add Todo</h2>
          <input type='text' onChange={handleChange} value={todo} className='w-700px' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 hover:bg-violet-950 py-1 p-3 text-white rounded-md mx-4 font-bold disabled:bg-violet'>
            Save
          </button>
        </div>
        <h2 className='text-xl font-bold'>Your Todos</h2>
        <input type='checkbox' checked={showFinished} onChange={toggleFinished} /> Show Finished
        <TodoList todos={todos.filter(item => showFinished || !item.isCompleted)} handleEdit={handleEdit} handleDelete={handleDelete} handleCheckbox={handleCheckbox} />
      </div>
    </>
  );
}

export default App;
