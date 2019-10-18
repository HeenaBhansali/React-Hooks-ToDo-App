require('dotenv').config()
const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

const createTable = async () => {
    try {
        await pool.query(`create table if not exists todo  (
                id serial primary key,
                task varchar(30),
                notes varchar(100),
                duedate date,
                priority char(10),
                status boolean);                
            `)
    } catch (error) {
        console.log('unable to create table', error)
    }
   
}

const inserIntoTable = async (task, notes, duedate) => {
    const insertQuery = {
        text: 'insert into todo (task, notes, status, duedate) values ($1, $2, false, $3) returning id;',
        values: [task, notes, duedate]
 }
    try {
        let result = await pool.query(insertQuery)
        return result
    } catch (error) {
        console.log('unable to insert task into table', error)
    }                                                                        
}

const getTask = async () => {
    try {
        let result = await pool.query(`select * from todo order by duedate ASC;`)
        return result.rows
    } catch (error) {
        console.log('unable to get list of task', error)
    }
}

const updateTask = async (id, task, notes, duedate) => {
    const updateQuery = {
        text: 'update todo set task = $1, notes = $2, duedate = $3 where id = $4 returning *',
        values: [task, notes, duedate, id]
 }
   try {
    let result = await pool.query(updateQuery)
    return result
   } catch (error) {
       console.log('unable to update task', error)
   } 
  
}

const taskStatus = async (id, status) => {
    const statusQuery = {
        text: 'update todo set status = $1 where id = $2 returning *',
        values: [status, id]
 }
   try {
    let result = await pool.query(statusQuery)
    return result
   } catch (error) {
       console.log('unable to set status', error)
   } 
  
}


const deleteTask = async (id) => {
    const deleteQuery = {
        text: 'delete from todo where id = $1',
        values: [id]
 }
 try {
    let result = await pool.query(deleteQuery)
    return result
   } catch (error) {
       console.log('unable to delete task', error)
   }                                                                       
}

module.exports = {
    createTable,
    updateTask,
    getTask,
    inserIntoTable,
    createTable,
    deleteTask, 
    taskStatus
}
