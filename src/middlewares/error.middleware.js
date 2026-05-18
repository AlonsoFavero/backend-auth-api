const {ZodError} = require("zod")

function errorHandler(error, req, res, next){

    if(error instanceof ZodError){
     return res.status(400).json ({error: error.errors[0].message}) 
    }

    return res.status(500).json({error: "erro interno no servidor"})
}