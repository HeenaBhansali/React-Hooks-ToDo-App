import React, {useState} from 'react'
import Todo from './Todo'
function CreateTask({addTask}) {
    const [value, setValue] = useState("")
    const handleSubmit = e => {
        e.preventDefault()
        addTask(value);
        setValue("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value= {value}
                placeholder="Add a new task"
                onChange={e => setValue(e.target.value)}
            />
        </form>
    )
}

export default CreateTask