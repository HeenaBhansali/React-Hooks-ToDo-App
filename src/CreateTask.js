import React, { useState } from "react"

const CreateTask = props => {
  const initialFormState = { id: null, task: "", notes: "" }
  const [list, setList] = useState(initialFormState)

  const handleInputChange = event => {
    const { name, value } = event.target

    setList({ ...list, [name]: value })
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
      <input
        type="text"
        name="task"
        placeholder="Task"
        value={list.task}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="notes"
        placeholder="Notes"
        value={list.notes}
        onChange={handleInputChange}
      />
      <div className="flex-container">
        <div className="flex-1">
          <label>Due Date</label>
        </div>
        <div>
          <input
            type="date"
            name="duedate"
            value={list.duedate}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <label>
        <button>Add new list</button>
      </label>
    </form>
  )
}

export default CreateTask
