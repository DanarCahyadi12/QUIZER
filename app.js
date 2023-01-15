const express = require('express')
const app = express()
const logger = require('morgan')
const router = require('./routes/route')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')

//config
const fse = require('fs-extra')

let sess
app.use(logger('dev'))
app.use(cookieParser())
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(session({
    secret : process.env.SECRET_KEY,
    saveUninitialized : true,
    resave : true
}))
app.use((req,res,next) => {
    sess = req.session
    console.log(sess)
    next()
})

//main
app.use('/',router)












app.listen(8000)