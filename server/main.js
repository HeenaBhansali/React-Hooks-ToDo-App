const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./model')
const port = 3000

app.use(express.static('../build'))
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.post('/todos', async (req, res) => {
    let result = await db.createTable()
    console.log(result)
    res.send(result)
})

app.post('/todos/:id', async (req, res) => {
    let result = await db.inserIntoTable()
    console.log(result)
res.send(result)
})

app.get('/todos', async (req, res) => {
    let result = await db.getTask()
    console.log(result)
    res.send(result)
})

app.put('/todos', async (req, res) => {
    let result = await db.updateTask()
    console.log(result)
res.send(result)
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
