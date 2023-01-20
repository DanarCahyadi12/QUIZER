const db = require('../model/db')
const massage = require('../class/massage.class')
const bcrypt = require('bcrypt')
const BcryptSalt = require('bcrypt-salt');
const bs = new BcryptSalt()
const data = require('../class/data.class')
const profile = require('./profile.controller')

class Register {

    #InsertDataIntoDatabase(res,next,username,email,password){
        let sql = "INSERT INTO user (username,email,password,point,ranks,total_quiz) VALUE (?,?,?,?,?,?)"
        let querySelectData = " SELECT username FROM user"
        db.query(querySelectData,(err,rank) => {
            if(err) throw err
            db.query(sql,[username,email,password,'0',rank.length +1,'0'],(err,rows,fields) => {
                if(err){
                    massage.SetMassage('Username , email or password maybe already takens. Please try again')
                    res.redirect('/register')
                } else{
                    data.SetData(rows.insertId,username,email,0,0,rank.length + 1,null)
                    data.SetProfileSession('/asset/user.png')
                    next()
                }
            })
        })
    }

    #HashingPassword(res,next,username,email,password){
        bcrypt.genSalt(bs.saltRounds,(err,salt) => {
            if(err) throw err
            bcrypt.hash(password,salt,(err,hash) => {
                if(err) throw err
                this.#InsertDataIntoDatabase(res,next,username,email,hash)
                
            })
        })
    }

    #UsernamePasswordValidate(plainTextPass,username,email){
        if(plainTextPass.length === 0 || username.length === 0 || email.length === 0) {
            massage.SetMassage('Username,password,email must be filled')
            return false
        }
        if(plainTextPass.length <= 7 ) {
            massage.SetMassage('"Password length must be greater than 7 characters"')
            return false
        } 
        if(!plainTextPass.match(/[0-9]/g)){
            massage.SetMassage('"Password must be filled with a number"')
            return false
        } 

     
  

        return true
    }
    RegisterAccount = (req,res,next) => {
        let {username,email,password} = req.body
        if(this.#UsernamePasswordValidate(password,username,email)){
            this.#HashingPassword(res,next,username,email,password)
        }else{
            
            res.redirect('/register')
        }
        
    }

    
}

module.exports = new Register()