import React, {useState, useEffect} from 'react'

const EditTask = props => {
const [task, setTask] = useState(props.currentTask)

useEffect(() => {
    setTask(props.currentTask)
}, [props])


const handleInputChange = event => {
    const {name, value } = event.target

    setTask({ ...task,  [name]: value })
}

return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateTask(task.id, task)
      }}
    >
      <label>Task</label>
      <input type="text" name="task" value={task.task} onChange={handleInputChange} />
      <label>Notes</label>
      <input type="text" name="notes" value={task.notes} onChange={handleInputChange} />
      <br/><br/>
      <button>Update Task</button>
      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => props.setEditing(false)}>
        Cancel
      </button>
    </form>
  )
}

export default EditTask