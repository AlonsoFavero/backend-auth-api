const {ZodError} = require("zod")

function errorHandler(error, req, res, next){

    if(error instanceof ZodError){
     return res.status(400).json ({
        success: false,
        message: error.errors.map(e => e.message)
    }) 
    }

    if (error.statusCode !== undefined) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    }

    return res.status(500).json({
        success: false,
        message: "erro interno no servidor"
    })
}

module.exports = {
    errorHandler
}