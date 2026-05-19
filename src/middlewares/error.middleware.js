const {ZodError} = require("zod")

function errorHandler(error, req, res, next){

    if(error instanceof ZodError){
     return res.status(400).json ({error: error.errors[0].message}) 
    }

    if (error.statusCode) {
        return res.status(error.statusCode).json({
            sucess: false,
            message: error.message
        })
    }

    return res.status(500).json({error: "erro interno no servidor"})
}

module.exports = {
    errorHandler
}