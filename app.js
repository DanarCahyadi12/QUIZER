const express = require('express')
const app = express()
const logger = require('morgan')
const router = require('./routes/route')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
//config


let sess
app.use(fileUpload({
    debug : true,
    tempFileDir: 'public/tmp',
    useTempFiles :true,
    abortOnLimit : true,
    limits : {
        fileSize : 50 * 1024 * 1024 * 1024 * 1024
        
    }
}))
app.use(logger('dev'))
app.use(cookieParser())
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(session({
    secret : process.env.SECRET_KEY,
    resave : true,
    saveUninitialized : false
    

}))
app.use(express.json())
app.use((req,res,next) => {
    sess = req.session
    console.log(sess)
    next()
})

//main
app.use('/',router)












app.listen(8000)