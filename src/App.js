import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'
import CreateTask from './CreateTask'
import EditTask from './EditTask'
import Filter from './Filter'

const App = () => {

  const todoItems = []

  const [todos, setTodos] = useState(todoItems)
  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, task: '', notes: '' }
  const [currentTask, setCurrentTask] = useState(initialFormState)
  const [filter, setFilter] = useState("all")


  function fetchData() {
    fetch("http://localhost:3001/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addTask = (todo) => {
    fetch("http://localhost:3001/todos/insert", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: '',
        task: todo.task,
        notes: todo.notes,
        duedate: todo.duedate
      })
    })
      .then(resp => resp.json())
      .then(todoId => {
        todo.id = todoId.id
        console.log(todo)
        setTodos([...todos, todo])
      })
  }

  const delTask = id => {
    setEditing(false)
    fetch(`http://localhost:3001/todos/delete/${id}`, {
      method: "DELETE"
    })
      .then(resp => resp.json())
      .then(data => {
        const newTodo = todos
          .filter(todo => todo.id !== id)
        setTodos(newTodo)
      })
  }

  const editRow = todo => {
    setEditing(true)
    setCurrentTask({ id: todo.id, task: todo.task, notes: todo.notes, duedate: todo.duedate })
  }

  const updateTask = (id, updatedTask) => {
    setEditing(false)
    fetch(`http://localhost:3001/todos/update/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task: updatedTask.task,
        notes: updatedTask.notes,
        duedate: updatedTask.duedate
      })
    })
      .then(resp => resp.json())
      .then(data => {
        setTodos(todos.map(todo => (todo.id === id ? updatedTask : todo)))
      })

  }

  const completeTask = (todo) => {
    console.log("todo", todo)
    const { id, status } = todo
    setEditing(false)
    fetch(`http://localhost:3001/todos/status/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        status: !status
      })
    })
      .then(resp => resp.json())
      .then(data => {
        setTodos(todos.map(todo => {
          if (todo.id === id) todo.status = !status
          return todo
        })
        )
      }
      )
  }

  const filteredList = todos.filter(
    todo =>
      filter === "all" ||
      (filter === "done" && todo.status) ||
      (filter === "pending" && !todo.status)
  )


  return (
    <div className="container">
      <h1>TODOs </h1>
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
                {/* <h2>Add task</h2> */}
                <CreateTask addTask={addTask} />
              </div>
            )}
        </div>
        <div >
        <div class="flex-container">
          <div class="flex-1"><label>View tasks</label></div>
         <div> <Filter filter={filter} setFilter={setFilter} /></div>
         </div>
            <TodoList todos={filteredList} delTask={delTask} editRow={editRow} completeTask={completeTask} />
        </div>
      </div>
    </div>
  )
}

export default App
