const redis = require('redis')
const client = redis.createClient()

client.on('connect', () => {
    console.log('Redis client connected')
})

client.on('error', function (err) {
    console.log('Something went wrong ' + err)
})

const init = () => {
    client.setnx('count', 1) 
}

const getCount = () => {
    return new Promise ( (resolve, reject) => {
        client.get('count', (err, obj) => {
            resolve (obj)
    })
    })
}

const inserIntoTable = async (task,notes,duedate) => {
    let id = await getCount()
    let todo ={
        id,
        task,
        notes,
        duedate,
        status : false
    }
    return new Promise ( (resolve, reject) => {
        client.zadd('todos', id,JSON.stringify(todo), (err, obj) => {
            client.incr('count')
            resolve (obj)
    })
    })
    // client.zadd('todos', id, JSON.stringify(todo))
    // client.incr('count')
}

const getTask = () => {
    return new Promise ( (resolve, reject) => {
        client.zrange('todos',  0, -1, (err, obj) => {
            resolve (obj.map(JSON.parse))
    })
    })
}

const deleteTask = (id) => {
    return new Promise ( (resolve, reject) => {
        client.zremrangebyscore('todos', id, id, (err, obj) => {
            resolve (obj)
    })
    })
}
const updateTask = (id,task,notes,duedate,status) => {
    client.zremrangebyscore('todos', id, id)
    let todo ={
        id: `${id}`,
        task,
        notes,
        duedate,
        status
    }
    return new Promise ( (resolve, reject) => {
        client.zadd('todos', id, JSON.stringify(todo), (err, obj) => {
            resolve (obj)
    })
    })
}

const taskStatus = (id,status,task,notes,duedate) => {
    client.zremrangebyscore('todos', id, id)
    let todo ={
        id: `${id}`,
        task,
        notes,
        duedate,
        status
    }
    return new Promise ( (resolve, reject) => {
        client.zadd('todos', id, JSON.stringify(todo), (err, obj) => {
            resolve (obj)
    })
    })
}

// inserIntoTable("taskbbb","notes","status","date")
// updateTask(3, "taskkk","notesss")
// // insertTask("t","notes","status","date")
// // insertTask("tk","notes","status","date")
// // insertTask("tk","notes","status","date")

// delTask(9)
// getTask()
init()
module.exports = {
    updateTask,
    getTask,
    inserIntoTable,
    deleteTask,
    taskStatus
}

