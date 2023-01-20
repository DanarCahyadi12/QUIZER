const fs = require('fs')
const fse = require('fs-extra')
const db = require('../model/db')
const path = require('path')
const data = require('../class/data.class')
const massage = require('../class/massage.class')

class Profile {
    #dir = 'public/img/'
    SetProfile(){
        const user = data.GetData()
        const id = user.id
        const ext = ['.jpg','.jpeg','.png']
        for (let index = 0; index < ext.length; index++) {
            if(fs.existsSync( `${this.#dir}${id}${ext[index]}`)){
                try{
                    data.SetProfileSession( `/img/${id}${ext[index]}`)
                }catch(err){
                    throw err
                }
                break
            }else{
                try{
                    data.SetProfileSession('/asset/user.png')
                }catch(err) {
                    throw err
                }
            }
            
        }
    }

    SetProfileImage(res,next,file){
        const user = data.GetData()
        const id = user.id
        let dir = "public/img/"+ file.name
        const ext = ['.jpg','.jpeg','.png']
        if(path.extname(file.name) === '.png' || path.extname(file.name) === '.jpg' || path.extname(file.name) === '.jpeg'){
            for (let index = 0; index < ext.length; index++) {
                if(fs.existsSync( `public/img/${id}${ext[index]}`)){
                    try{
                        fs.unlink( `public/img/${id}${ext[index]}`,err => {
                            if(err) throw err
                        })
                    }catch(err) {
                        throw err
                    }
                    break
                }
            }
            file.mv(dir,err => {
                if(err) throw err
                fs.rename(dir, `public/img/${id}${path.extname(file.name)}`,err => {
                    if(err) throw err
                    data.SetProfileSession( `/img/${id}${path.extname(file.name)}`)
                    next()
                })
            }) 
        }else{
            massage.SetMassage('Extension must be jpg,png or jpeg')
            next()
        }
    }

    SetProfileUser  = (req,res,next) => {
        if(req.files?.img){
            const file = req.files.img
            this.SetProfileImage(res,next,file) 
        }
        this.UpdateUsernameAndDescription(req,res,next)
    }
    
    DeleteProfile(req,res){
        const ext = ['.jpg','.jpeg','.png']
        let path = req.params.path.slice(1)
        fs.unlink(`public/img/${path}.png`,err  => {
            if(err) throw err
        }) 
        data.SetProfileSession('/asset/user.png')
        res.json({
            massage : "Profile succesfully deleted",
            redirect :'/profile'
        })        
    }

    UpdateUsernameAndDescription(req,res,next){
        const user = data.GetData()
        const id = user.id
        const {username,description} = req.body
        let sql = "UPDATE user SET username = ? ,description = ? WHERE iduser = ?"
        db.query(sql,[username,description,id],(err,rows,result) => {
            if(err) throw err
            massage.SetMassage("Profile has been changed")
            console.log({
                massage : 'Update profile succesfully'
            })
            data.GetUpdateData()
            next()



        })
    }   

}
module.exports = new Profile()
