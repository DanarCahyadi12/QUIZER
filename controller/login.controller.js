const db = require('../model/db')
const bcrypt = require('bcrypt')
const data = require('../class/data.class')
const massage = require('../class/massage.class')
const fse = require('fs-extra')
const fs = require('fs')
const path = require('path')
const profile = require('./profile.controller')

class Login{
    LoginAccount = (req,res,next) => {
        const {email_username,password} = req.body
        this.#GetUserFromDatabase(email_username,password,res,next)
    }
    #GetUserFromDatabase(username_email,plainTextPassword,res,next){
        let sql = 'SELECT * FROM user WHERE username = ? OR email = ?'
        console.log({
            username : username_email,
            plainTextPassword 
        })
        db.query(sql,[username_email,username_email],(err,rows,fields) => {
            if(err) throw err
            console.log({
                datas : rows
            })
            if(rows.length > 0){
                console.log({
                    length : " Greater than 0"
                })
                const {iduser,username,password,email,point,ranks,total_quiz,description} = rows[0]
                this.#PasswordCompare(plainTextPassword,password,iduser,email,username,point,ranks,total_quiz,description,res,next)
            }else{
                console.log({
                    length : " Less than 0"
                })
                massage.SetMassage('Invalid username or email or password ')
                res.redirect('/login')
            }
        })
    }
    #PasswordCompare(plainTextPass,hashedPassword,iduser,email,username,point,ranks,total_quiz,description,res,next){
        bcrypt.compare(plainTextPass,hashedPassword,(err,result) => {
            if(err) throw err
            console.log({
                ResultCompare : result
            })
            if(result){
                data.SetData(iduser,username,email,point,total_quiz,ranks,description)
                profile.SetProfile()
                next()
            }else{
                massage.SetMassage('Invalid username or email or password ')
                res.redirect('/login')
            }
        })
    }
}

module.exports = new Login()