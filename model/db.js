const mysql = require('mysql2')
require('dotenv').config({path : '.env'})
const db = mysql.createConnection({
    host : process.env.DB_HOSTNAME ,
    user :  process.env.DB_USERNAME,
    password :   process.env.DB_PASSWORD,
    database :process.env.DB,
    port :process.env.PORT
})

db.connect((err) => {
    if(err) throw err
    console.log('Connect to db succesfully')
})

module.exports = db