
class IndexController {
    GetIndexPage(req,res){
        res.render('index')
    }
}

module.exports = new IndexController()