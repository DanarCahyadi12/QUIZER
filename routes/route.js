const express = require('express')
const router = express.Router()
const index = require('../controller/index.controller')
const massage = require('../class/massage.class')
const login = require('../controller/login.controller')
const register = require('../controller/register.controller')
const data= require('../class/data.class')
let sess;
const Auth = (req,res,next) => {
     sess = req.session
    if(sess.user){
        console.log("USER ADAA SS")
        next()
    }else{
        massage.SetMassage('Acces denied. Please login to your account')
        res.redirect('/login')
    }
}

router.get('/',index.GetIndexPage) //index 

router.get('/login',(req,res) => {
    res.render('login',{
        massage : massage.GetMassage()
    })
})

router.get('/overview',(req,res) => {
    res.render('quiz')
})

router.get('/register',(req,res) => {
    res.render('register',{
        massage : massage.GetMassage()
    })
})

router.post('/register',register.RegisterAccount,(req,res) => {
    sess = req.session
    sess.user = data.GetData()
    res.redirect('/overview')
})

router.post('/login',login.LoginAccount,(req,res) => {
    sess = req.session
    sess.user = data.GetData()
    res.redirect('/overview')
})

router.get('/logout',(req,res) =>{
    req.session.destroy((err) => {
        if(err) throw  err
        res.redirect('/login')
    })
})





module.exports = router