import React from 'react'

const TodoList = () => (
  <table>
    <thead>
      <tr>
        <th>Task</th>
        <th>Notes</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Task data</td>
        <td>Notes data</td>
        <td>
          <button className="button muted-button">Edit</button>
          <button className="button muted-button">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
)

export default TodoList