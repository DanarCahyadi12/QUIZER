class Data {
    #id
    #username
    #email

    SetData(id,username,email){
        this.#id = id
        this.#username = username
        this.#email = email
    }



    GetData() {
        return {
            id : this.#id,
            username : this.#username,
            email : this.#email,
        }
    }


}

module.exports = new Data()