function validate(Schema){
    return function(req,res,next){

           Schema.parse(req.body)
        next()
    }
}

module.exports = {
    validate
}