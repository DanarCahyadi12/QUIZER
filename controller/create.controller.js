

class Create {

    CreateQuiz = (req,res,next) => {
        console.log(req.body)
        res.json({
            redirect : "/create",
            isOk : true,
            massage : "Insert succesfully"
        })
    }


}

module.exports = new Create()