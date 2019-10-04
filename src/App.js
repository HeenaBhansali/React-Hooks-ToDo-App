import React, {useState, useEffect} from 'react'
import TodoList from './TodoList'
import CreateTask from './CreateTask'
import EditTask from './EditTask'

const App = () => {

  const todoItems = []

  const [todos, setTodos] = useState(todoItems)
  const [editing,setEditing] = useState(false)
  const initialFormState = { id: null, task: '', notes: '' }
  const [currentTask, setCurrentTask] = useState(initialFormState)

  async function fetchData() {
    await fetch("http://localhost:3000/todos")
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    console.log(fetchData())
  }, [])

  const addTask = todo => {
    todo.id = new Date().getTime()
    setTodos([...todos, todo])
  }

  const delTask = id => {
    setEditing(false)
    setTodos(todos.filter(todo => (todo.id !== id)))
  }

  const editRow = todo => {
    setEditing(true)
    setCurrentTask({id: todo.id, task: todo.task, notes: todo.notes})
  }

  const updateTask = (id, updatedTask) => {
    setEditing(false)
    setTodos(todos.map(todo => (todo.id === id ? updatedTask : todo)))
  }

  return (
    <div className="container">
      <h1>TODO App </h1>
      <div>
        <div>
          {editing ? (
             <div>
             <h2>Edit Task</h2>
             <EditTask
               editing={editing}
               setEditing={setEditing}
               currentTask={currentTask}
               updateTask={updateTask}
             />
           </div>
         ) : (
           <div>
          <h2>Add task</h2>
          <CreateTask addTask={addTask}/>
          </div>
         )}
        </div>
        <div >
          <h2>View tasks</h2>
          <TodoList todos = {todos} delTask = {delTask} editRow = {editRow}/>
        </div>
      </div>
    </div>
  )
}

export default App
