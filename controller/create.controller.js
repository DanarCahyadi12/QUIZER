

class Create {

    CreateQuiz = (req,res,next) => {
        console.log(req.body)
        next()
    }


}

module.exports = new Create()