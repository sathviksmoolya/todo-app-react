import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    
  }, [])
  
  const saveToLS = () =>{
      localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e,id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()


  }

  const handleDelete = (e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()


  }

  const handleAdd = () =>{
    setTodos([...todos,{id:uuidv4(), todo, isCompleted:false}])
    saveToLS()
    setTodo("")
    


  }

  const handleChange = (e)=>{
    setTodo(e.target.value);
  }

  const handleCheckbox=(e)=>{
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id==id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS();
  }

  const toggleFinished =(e)=>{
    setshowFinished(!showFinished)


  }
 
  

  return (
    <>
      <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className='text-center text-xl font-bold'>ez-Task Your Daily task planner</h1>
        <div className="addTodo flex flex-col ">
          <h2 className='mx-2 my-2 text-lg font-bold'>Add Todo</h2>
          <input onChange={handleChange} type="text" value={todo} className='w-full'/>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 text-white rounded-md px-2 py-1 my-3 hover:bg-violet-950'>Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox"/>show finshed
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className='todos'>
          {todos.length===0 && <div className='m-5'>No todos to display</div>}
          {todos.map(item=>{
               return (showFinished || item.isCompleted) && <div key={item.id} className="todo flex my-3 md:w-1/2 justify-between">
                <div className='flex gap-5' >
                <input name={item.id} type="checkbox" onChange={handleCheckbox}  checked={item.isCompleted} />
                <div className={item.isCompleted?"line-through" :"" }><p id='ptag'>{item.todo}</p></div>
                </div>
                
               <div className="buttons flex h-full">
               <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 text-white rounded-md px-2 py-1 mx-4 hover:bg-violet-950'><FaEdit /></button>
               <button onClick={(e)=>handleDelete(e,item.id)} className='bg-violet-800 text-white rounded-md px-2 py-1 hover:bg-violet-950'><MdDelete /></button>
               </div>
             </div>
             })}
          
        </div>
    
      </div>
        
    </>
  )
}

export default App
