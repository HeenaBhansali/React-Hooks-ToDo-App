import React from 'react'

const TodoList = props =>{
  // console.log(props.todos)
  // const toggleTask = props.status ? "Done" : "Not Done"

  return(
  <table>
    <thead>
      <tr>
        <th>Task</th>
        <th>Notes</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.todos.length > 0 ? (
        props.todos.map(todo => (
          <tr key={todo.id}>
            <td>{todo.task}</td>
            <td>{todo.notes}</td>
        <td>
          <button onClick = {() => props.editRow(todo)}>Edit</button>
          &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick = {() => props.delTask(todo.id)}>Delete</button>
          &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick = {() => props.completeTask(todo)}>{todo.status ? "Done" : "Not Done"}</button>
        
        </td>
      </tr>
      ))
      ) : (
        <tr>
          <td colSpan={3}>No todos</td>
        </tr>
      )}
    </tbody>
  </table>
)
      }

export default TodoList