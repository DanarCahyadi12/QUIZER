

class Session {
    #sess;

    SetUserDataSession = (userid,username,email) =>  {
        this.#sess.user = {
            id: userid,
            username : username,
            email : email
        }
    }

    GetSession(){
        return this.#sess
    }
}

module.exports = new Session()