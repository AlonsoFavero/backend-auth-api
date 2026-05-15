function errorHandler(error, req, res, next){
    return res.status(500).json({error: "erro interno no servidor"})
}