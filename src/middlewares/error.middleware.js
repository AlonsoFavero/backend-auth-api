const {ZodError} = require("zod")

function errorHandler(error, req, res, next){

    console.log(error)

    if(error instanceof ZodError){
     return res.status(400).json ({
        success: false,
        message: "erro de validação"
    }) 
    }

    if (error.statusCode) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    }

    return res.status(500).json({
        success: false,
        message: error.message || "erro interno no servidor"
    })
}

module.exports = {
    errorHandler
}