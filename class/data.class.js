
const db = require('../model/db')
const fs = require('fs')
class Data {
    #id
    #username
    #email
    #rank
    #point
    #uploadedQuiz
    #description
    #profileImg
    #sess
    SetData(id,username,email,point,uploadedQuiz,rank,desc){
        this.#id = id
        this.#username = username
        this.#email = email
        this.#point = point
        this.#uploadedQuiz = uploadedQuiz
        this.#rank = rank
        this.#description = desc

        
    }

    SetProfileSession(path){
        this.#profileImg = path
        console.log({
            pathNow :this.#profileImg
        })
    }
    GetUpdateData(){
        const { id } = session.GetSession().user
        let sql = "SELECT iduser,username,email,point,ranks,total_quiz,description FROM user WHERE iduser = ?"
        db.query(sql,[id],(err,rows) => {
            if(err) throw err
            if(result.length > 0){
                const {iduser,username,email,point,ranks,total_quiz,description} = rows[0]
                this.SetData(iduser,username,email,point,total_quiz,ranks,description)
            } else{
                console.log('NO DATA')
            }
        })
    }

    GetData() {
        return {
            id : this.#id,
            username : this.#username,
            email : this.#email,
            point : this.#point,
            uploadedquiz : this.#uploadedQuiz,
            rank : this.#rank,
            description : this.#description,
            profilePath : this.#profileImg
        }
    }


}

module.exports = new Data()