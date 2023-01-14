const db = require('../model/db')
const bcrypt = require('bcrypt')
const data = require('../class/data.class')
const massage = require('../class/massage.class')
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
                this.#PasswordCompare(plainTextPassword,rows[0].password,rows[0].iduser,rows[0].email,rows[0].username,next)
            }else{
                massage.SetMassage('Invalid username or email or password ')
                res.redirect('/login')
            }
        })
    }
    #PasswordCompare(plainTextPass,hashedPassword,iduser,email,username,next){
        bcrypt.compare(plainTextPass,hashedPassword,(err,result) => {
            if(err) throw err
            if(result){
                data.SetData(iduser,username,email)
                next()
            }else{
                const {email_username,password} = req.body
                this.#GetUserFromDatabase(email_username,password,res)
            }
        })
    }
}

module.exports = new Login()