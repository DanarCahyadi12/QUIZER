class Massage {
    #massage ;

    SetMassage(massage){
        this.#massage = massage
    }

    GetMassage(){
        return this.#massage
    }

}

module.exports = new Massage()