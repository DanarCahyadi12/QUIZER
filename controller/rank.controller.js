const db = require("../model/db")
const data = require('../class/data.class')
class Rank {
    #rankMassage
    SetRank(){
        let sql = 'SELECT iduser,username,email,point,ranks,total_quiz,description FROM user'
        db.query(sql,(err,rows) => {
            if(err) throw err
            this.#SetRankUser(JSON.parse(JSON.stringify(rows)))
        })
    }
    #UpdateRankIntoDB(id,rank,massage){
        let sql = 'UPDATE user SET ranks = ? WHERE iduser = ?'
        db.query(sql,[rank,id],(err,rows) => {
            if(err) throw err
            this.#rankMassage = massage
        })
    }
    GetRankMassage(){
        return {
            massage : this.#rankMassage,
        }
    }
    #SetRankUser(datas) {
        datas.forEach(data => {
            if(data.point < 1500) this.#UpdateRankIntoDB(data.iduser,'Bronze')
            if(data.point >= 1500 && data.point < 3000) this.#UpdateRankIntoDB(data.iduser,'Elite','Congrats your rank is Elite now!')
            if(data.point >= 3000 && data.point < 4500) this.#UpdateRankIntoDB(data.iduser,'Gold','Congrats your rank is Elite now!')
            if(data.point >= 4500) this.#UpdateRankIntoDB(data.iduser,'Brainzer','Congrats you have a nice brain. Your rank is brainzer now!!')
        });

        
    } 

}

module.exports = new Rank()