const Pool = require('pg').Pool
const pool = new Pool({
  user: 'heena',
  host: 'localhost',
  database: '',
  password: '',
  port: 5432,
})

const createTable = async () => {
    try {
        await pool.query(`create table if not exists todo  (
            id serial primary key,
            task varchar(30),
            notes varchar(100),
            due_date date,
            priority char(10)
            );
            `)
    } catch (error) {
        console.log('unable to create table', error)
    }
   
}

const inserIntoTable = async (task, notes) => {
    try {
        let result = await pool.query(`insert into todo (task, notes) values ('${task}', '${notes}') returning id;`)
        return result
    } catch (error) {
        console.log('unable to insert task into table', error)
    }                                                                        
}

const getTask = async () => {
    try {
        let result = await pool.query(`select * from todo order by id ASC;`)
        return result.rows
    } catch (error) {
        console.log('unable to get list of task', error)
    }
}

const updateTask = async (id, colName, task) => {
    const updateQuery = {
        text: 'update todo set ' + colName +' = $1 where id = $2',
        values: [task, id]
 }
   try {
    await pool.query(updateQuery)
   } catch (error) {
       console.log('unable to update task', error)
   } 
  
}

createTable()
inserIntoTable('learn postgres', 'hgjhg')
getTask()
updateTask('8', 'task', 'learn hooks')
getTask()

module.exports = {
    createTable,
    updateTask,
    getTask,
    inserIntoTable,
    createTable,
}
