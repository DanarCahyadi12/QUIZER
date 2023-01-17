const fs = require('fs')
const fse = require('fs-extra')
const { basename } = require('path')
const path = require('path')
const { off } = require('process')
const data = require('../class/data.class')
const massage = require('../class/massage.class')

class Profile {
    #dir = 'public/img/'
    SetProfile(){
        const user = data.GetData()
        const id = user.id
        const ext = ['.jpg','.jpeg','.png']
        for (let index = 0; index < ext.length; index++) {
            console.log({
                CheckProfile : index
            })
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



    GetProfileImage (req,res){
        const file = req.files.img
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
                            console.log({
                                isSucces : "Delete previous profile succes"
                            })
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
                    console.log(data.GetData())
                    res.redirect('/profile')
                })
            }) 
        }else{
            massage.SetMassage('Extension must be jpg,png or jpeg')
            res.redirect('/profile')
        }
    }
}
module.exports = new Profile()
