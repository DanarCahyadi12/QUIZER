const db = require('../model/db')
const bcrypt = require('bcrypt')
const data = require('../class/data.class')
const massage = require('../class/massage.class')
const profile = require('./profile.controller')

class Login{
    LoginAccount = (req,res,next) => {
        const {email_username,password} = req.body
        this.#GetUserFromDatabase(email_username,password,res,next)
    }
    #GetUserFromDatabase(username_email,plainTextPassword,res,next){
        let sql = 'SELECT * FROM user WHERE username = ? OR email = ?'
        db.query(sql,[username_email,username_email],(err,rows,fields) => {
            if(err) throw err
            if(rows.length > 0){
                console.log({
                    length : " Greater than 0"
                })
                const {iduser,username,password,email,point,ranks,total_quiz,description} = rows[0]
                this.#PasswordCompare(plainTextPassword,password,iduser,email,username,point,ranks,total_quiz,description,res,next)
            }else{
                massage.SetMassage('Invalid username or email or password ')
                res.redirect('/login')
            }
        })
    }
    #PasswordCompare(plainTextPass,hashedPassword,iduser,email,username,point,ranks,total_quiz,description,res,next){
        bcrypt.compare(plainTextPass,hashedPassword,(err,result) => {
            if(err) throw err
            if(result){
                data.SetDataUser(iduser,username,email,point,total_quiz,ranks,description)
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