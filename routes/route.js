const express = require('express')
const router = express.Router()
const massage = require('../class/massage.class')
const login = require('../controller/login.controller')
const register = require('../controller/register.controller')
const data= require('../class/data.class')
const profile = require('../controller/profile.controller')
const bodyParser = require('body-parser')
const rank = require('../controller/rank.controller')
router.use(bodyParser.json())

let sess;
const Auth = (req,res,next) => {
     sess = req.session
    if(sess.user){
        next()
    }else{
        massage.SetMassage('Acces denied. Please login to your account')
        res.redirect('/login')
    }
}

router.get('/',(req,res) =>{
    res.render('index')
}) 

router.get('/login',(req,res) => {
    rank.SetRank()
    res.render('login',{
        massage : massage.GetMassage()
    })
})

router.get('/overview',(req,res) => {
    rank.SetRank()
    sess = req.session
    res.render('quiz',{
        sess,
        dataMassage :rank.GetRankMassage()
    })
})

router.get('/register',(req,res) => {
    rank.SetRank()
    res.render('register',{
        massage : massage.GetMassage()
    })
})

router.post('/register',register.RegisterAccount,(req,res) => {
    sess = req.session
    sess.user = data.GetDataUser()
    res.redirect('/overview')
})

router.post('/login',login.LoginAccount,(req,res) => {
    sess = req.session
    sess.user = data.GetDataUser()
    res.redirect('/overview')
})

router.get('/logout',(req,res) =>{
    req.session.destroy((err) => {
        if(err) throw  err
        res.redirect('/login')
    })
})

router.get('/profile',Auth,(req,res) => {
    rank.SetRank()
    sess = req.session
    sess.user = data.GetDataUser()
    res.render('profile',{
        sess,
        massage: massage.GetProfileMassage(),
        isSucces : profile.IsSucces()
    })
})
router.post('/profile',profile.SetProfileUser,(req,res) => {
    res.redirect('/profile')
})
router.delete('/profile/:path',profile.DeleteProfile)

router.get('/create',(req,res) => {
    sess = req.session
    res.render('create',{
        sess
    })
})





module.exports = router