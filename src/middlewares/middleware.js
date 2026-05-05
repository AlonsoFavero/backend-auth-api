const jwt = require("jsonwebtoken")

function authMiddleware(req,res,next){
const auth =  req.headers.authorization

if(!auth){
    return res.status(401).json({ erro: "token não enviado"})
}

const partes = auth.split("")
const tokem = partes[1]

try{
jwt.verify(token, "segredo123")

next()
    }catch(error){
   return res.status(401).json({"error": "tokem inválido"})
 }


}

