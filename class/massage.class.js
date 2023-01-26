class Massage {
    #massage ;
    #profileMassage;
    SetMassage(massage,profileMassage){
        this.#massage = massage
        this.#profileMassage = profileMassage
    }

    GetMassage(){
        return this.#massage
    }

    GetProfileMassage(){
        return this.#profileMassage
    }

}

module.exports = new Massage()