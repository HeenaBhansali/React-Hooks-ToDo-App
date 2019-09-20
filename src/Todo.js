import React, { useState } from 'react'
import CreateTask from './CreateTask'

function Task({ task }) {
    return (
        <div
            className="task"
            style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
            {task.title}
        </div>
    )
}

function Todo() {
    const [tasks, setTasks] = useState([
        {
            title: "Kikbkjn",
            completed : true
        },
        {
            title: "Tojn",
            completed : false
        }
    ])

    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false }]
        setTasks(newTasks)
    }

    return (
        <div className="todo-container">
             <div className="createTask" >
                <CreateTask addTask={addTask} />
            </div>
            <div className="todo">TODO - ITEMS</div>
            <div className="tasks">
                {tasks.map((task, index) => (
                    <Task
                        task={task}
                        key={index}
                    />
                ))}
            </div>
           
        </div>
    );
}

export default Todo


// TodoItem
// AddTodo
// TodoApp