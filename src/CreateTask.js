import React, { useState } from 'react'

const CreateTask = props => {
  const initialFormState = { id: null, task: '', notes: '' }
  const [list, setList] = useState(initialFormState)

  const handleInputChange = event => {
    const {name, value } = event.target

    setList({ ...list,  [name]: value })
  }
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        if (!list.task || !list.notes) return

        props.addTask(list)
        setList(initialFormState)
      }}
    >
      <label>Task</label>
      <input type="text" name="task" value={list.task} onChange={handleInputChange} />
      <label>Notes</label>
      <input type="text" name="notes" value={list.notes} onChange={handleInputChange} />
      <label><button>Add new list</button></label>
    </form>
  )
}

export default CreateTask