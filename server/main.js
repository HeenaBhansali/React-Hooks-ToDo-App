const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = process.argv
if (db[2] === 'postgres') require('./model')
else if (db[2] === 'redis') require('../redis/redisModel.js')
console.log(db[2])
const port = 3001

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, undefined")
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    next()
})

// app.use(express.static('../build'))
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req, res) => res.send('hello world'))

app.get('/todos', async (req, res) => {
    let result = await db.getTask()
    console.log(result)
    res.send(result)
})

app.post('/todos/insert', async (req, res) => {
    try {
        let result = await db.inserIntoTable(req.body.task, req.body.notes, req.body.duedate)
        res.json(result.rows[0])
    } catch (error) {
        // console.log(error)
    }
})

app.put('/todos/update/:id', async (req, res) => {
    try {
        let result = await db.updateTask(req.params.id, req.body.task, req.body.notes, req.body.duedate, req.body.status)
        console.log(req.params, req.body)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})

app.put('/todos/status/:id', async (req, res) => {
    try {
        console.log(req.params, req.body)
        
        let result = await db.taskStatus(req.params.id,  req.body.status, req.body.task, req.body.notes, req.body.duedate)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})


app.delete('/todos/delete/:id', async (req, res) => {
    let result = await db.deleteTask(req.params.id)
    // console.log(req.params)
    res.json(result)
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
