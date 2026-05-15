const jwt = require("jsonwebtoken")

function authMiddleware(req,res,next){
const auth =  req.headers.authorization

if(!auth){
    return res.status(401).json({ erro: "token não enviado"})
}

const partes = auth.split(" ")

if (partes.length !== 2){
    return res.status(401).json({erro: "token mal formatado"})
}
const token = partes[1]

try{
const decoded = jwt.verify(token, "segredo123")

req.user = decoded

next()
    }catch(error){
   return res.status(401).json({"error": "tokem inválido"})
 }

}

function adminMiddleware(req, res, next) {

    const user =  req.user

    if(!user) {
        return res.status(401).json({error: "não autenticado"})
    }

    if(req.user.role !== "admin"){
        return res.status(403).json({error: "acesso negado: apenas admin"})
    }

    next()
}

module.exports = {
    authMiddleware,
    adminMiddleware
}

