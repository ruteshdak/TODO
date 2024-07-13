//import logo from './logo.svg';
// import { useEffect, useRef, useState } from 'react';
import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { v4 as uuidv4 } from 'uuid'; // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
// import Card from './Components/Card';
// import Footer from './Components/Footer';
// import Navbar from './Components/Navbar';

function App() {
  const [todo, setTodo] = useState();
  const [todos, setTodos] = useState([])
  const handleEdit = () => {

  }

 
  const handleAdd = () => {
    setTodos([...todos, { id:uuidv4(),todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
  }
  const handleChange = (e) => {
    setTodo(e.target.value);
  }
  const handleCheckbox=(e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id===id;
    });
    let newTodos=[...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }
  const handleDelete=(e,id)=>{
    console.log(`the id is ${id}`)
   
  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto rounded-xl my-5 bg-violet-200 p-5 min-h-[80vh]'>
        <div className='Add todo my-5'>
          <h2 className='text-xl font-bold'>Add Todo</h2>
          <input type='text' onChange={handleChange} value={todo} className='w-700px' />
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 py-1 p-3 text-white rounded-md mx-4 font-bold'>Add</button>
        </div>
        <h2 className='text-xl font-bold'>Yours Todo</h2>
        <div className='todos'>
          {todos.map(item => {


            return <div key={item.id} className='todo flex w-1/2 justify-between my-3'>
              <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className='buttons'>
                <button onClick={handleEdit} className='bg-violet-800 hover:bg-violet-950 py-1 p-3 text-white rounded-md mx-1 font-bold'>Edit</button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 py-1 p-3 text-white rounded-md mx-1 font-bold'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  );
}


export default App;
