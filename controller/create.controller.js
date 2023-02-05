const data = require("../class/data.class")
const db = require('../model/db')

class Create {
    #massage;
    CreateQuiz = (req,res) => {
        const header = req.body.header
        const body = req.body.body
        console.log(body)
        if(this.#Validate(header,body)) this.#InsertIntoDb(res,header,body)
        else res.json({isOk : false,massagae : this.#massage})
    }

    #InsertIntoDb(res,header,body){
        const dataUser = data.GetDataUser()
        let sql = "INSERT INTO quiz_list (fk_id_user,subject,description,totalQuestion,question,answerOpA,answerOpB,answerOpC,answer,timeLimit VALUES(?,?,?,?,?,?,?,?,?)"
        
        for(let list of body){
            db.query(sql,[dataUser.id,header.subject,header.description,total,list.question,list.answerOpA,list.answerOpB,list.answerOpC,list.answer],(err,result) => {
                if(err) throw err
            })
        }
    }
    
    #Validate(header,body){
        let number = 0
        if(header.subject.length === 0){
            this.#massage = "Subject field is required"
            return false
        }
        
        for(let quiz of body){
            number++
            if(quiz.question.length === 0){
                this.#massage = `Question field is empty at number ${number}`
                return false
            }
            if(quiz.answerOpA.length === 0 ){
                this.#massage = `Option answer A is empty at number ${number}`
                return false
            }
            if(quiz.answerOpB.length === 0 ){
                this.#massage = `Option answer B is empty at number ${number}`
                return false
            }
            if(quiz.answerOpC.length === 0 ){
                this.#massage = `Option answer C is empty at number ${number}`
                return false
            }
            if(!quiz?.answer ){
                this.#massage = `You did not choose a true answer at number ${number}. Please choose a true answer`
                return false
            }
        }
        this.#massage = "Quiz is succesfully created"
        return true
    }
      

}

module.exports = new Create()