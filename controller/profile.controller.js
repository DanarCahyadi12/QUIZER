const fs = require('fs')
const db = require('../model/db')
const path = require('path')
const data = require('../class/data.class')
const massage = require('../class/massage.class')

class Profile {
    #dir = 'public/img/'
    #isSucces= null
    SetIsSucces(succes) {
        this.#isSucces = succes
    }
    IsSucces(){
        return this.#isSucces
    }
    SetProfile(){
        const user = data.GetDataUser()
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
    ImageExtValidation(file){
        if(path.extname(file.name) === '.png' || path.extname(file.name) === '.jpg' || path.extname(file.name) === '.jpeg'){
            this.SetIsSucces(true)
            return true
        }
            massage.SetMassage(null,'Extension must be jpg,png or jpeg')
            this.SetIsSucces(false)
            return false
    }
    UsernameValidation(username) {
        if(username.includes(' ')){
            massage.SetMassage(null,'Username must not be contains a whitespace')
            this.SetIsSucces(false)
            return false
        }else{
            this.SetIsSucces(true)
            return true
        }


    }
    SetProfileImage(file){
        const user = data.GetDataUser()
        const id = user.id
        let dir = "public/img/"+ file.name
        const ext = ['.jpg','.jpeg','.png']
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
                })
            }) 
    }

    SetProfileUser  = (req,res,next) => {
        const {username,description} = req.body
        if(req.files?.img){
            const file = req.files.img
            if(this.ImageExtValidation(file) && this.UsernameValidation(username)){
                this.SetProfileImage(file)
                this.UpdateUsernameAndDescription(username,description) 
                massage.SetMassage(null,"Profile succesfully updated")
            }
        }else{
            if(this.UsernameValidation(username)) this.UpdateUsernameAndDescription(username,description)
        }
        next()
    }
    
    DeleteProfile(req,res){
        const ext = ['.jpg','.jpeg','.png']
        let path = req.params.path.slice(1)
        ext.forEach(el => {
            if(fs.existsSync(`public/img/${path}${el}`))
            fs.unlink( `public/img/${path}${el}`,err  => {
                if(err) throw err
            }) 
        })
        res.json({
            redirect :'/profile'
        })        
        data.SetProfileSession('/asset/user.png')
        massage.SetMassage(null,"Profile image succesfully deleted")
        this.IsSucces(true)
    }

    UpdateUsernameAndDescription(username,description){
        const user = data.GetDataUser()
        const id = user.id
            let sql = "UPDATE user SET username = ? ,description = ? WHERE iduser = ?"
            db.query(sql,[username,description,id],(err,rows,result) => {
                if(err) throw err
                data.GetUpdateDataUser()
        })
}  

}
module.exports = new Profile()
