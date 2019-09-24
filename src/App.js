import React, {useState} from 'react'
import TodoList from './TodoList'
import CreateTask from './CreateTask'
import EditTask from './EditTask'

const App = () => {
  const todoItems = [
    { id: 1, task: 'Learn React', notes: 'React handbook' },
    { id: 2, task: 'Create ToDo', notes: 'React hooks' },
    { id: 3, task: 'Workout', notes: 'Exercise' },
  ]

  const [todos, setTodos] = useState(todoItems)
  const [editing,setEditing] = useState(false)
  const initialFormState = { id: null, task: '', notes: '' }
  const [currentTask, setCurrentTask] = useState(initialFormState)

  const addTask = todo => {
    todo.id = todos.length + 1
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
      <div className="flex-column">
        <div className="flex">
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
        <div className="flex">
          <h2>View tasks</h2>
          <TodoList todos = {todos} delTask = {delTask} editRow = {editRow}/>
        </div>
      </div>
    </div>
  )
}

export default App