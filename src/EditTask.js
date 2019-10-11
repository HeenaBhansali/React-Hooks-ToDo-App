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
      <input type="text" name="task" placeholder="Task" value={task.task} onChange={handleInputChange} />
      <input type="text" name="notes" placeholder="Notes" value={task.notes} onChange={handleInputChange} />
      <div class="flex-container">
      <div class= "flex-1"><label>Due Date</label></div>
      <div><input type="date" name="duedate" value={task.duedate} onChange={handleInputChange} /></div>
      </div>
      <button>Update Task</button>
      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
      <button class="cancelbtn" onClick={() => props.setEditing(false)}>
        Cancel
      </button>
    </form>
  )
}

export default EditTask