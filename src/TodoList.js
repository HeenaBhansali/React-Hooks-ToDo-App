import React from 'react'

const TodoList = props => (
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
          <button onClick = {() => props.editRow(todo)} className="button muted-button">Edit</button>
          <button onClick = {() => props.delTask(todo.id)} className="button muted-button">Delete</button>
        </td>
      </tr>
      ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default TodoList