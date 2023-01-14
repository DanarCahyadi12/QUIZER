const mysql = require('mysql')
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : 'danareksa',
    database : 'quiz'
})

db.connect((err) => {
    if(err) throw err
    console.log('Connect to db succesfully')
})

module.exports = db