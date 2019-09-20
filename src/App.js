import React from 'react'
import TodoList from './TodoList'
const App = () => {
  return (
    <div className="container">
      <h1>TODO App </h1>
      <div className="flex-column">
        <div className="flex-large">
          <h2>Add task</h2>
        </div>
        <div className="flex-large">
          <h2>View tasks</h2>
          <TodoList />
        </div>
      </div>
    </div>
  )
}

export default App